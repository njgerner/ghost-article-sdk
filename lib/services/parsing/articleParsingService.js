'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const NodeFetch = require('node-fetch');

class ArticleParsingService {

  /**
   * @name GhostArticleSDKClient_ModelConfig
   * @type {Object}
   */
  
  /**
   * @param {GhostArticleSDKClient_ParsingConfig} options
   * @param {ArticleParser} articleParser
   * @param {LDA} lda
   */
  constructor (options, articleParser, lda) {
    this._parser = articleParser;
    this._lda = lda;

    this._numberOfTopicsToGenerate = options.numberOfTopicsToGenerate || 3;
  }
  
  /**
   * @param {String} url
   * @return {Object}
   */
  extractFromUrl (url) {
    return Promise.resolve()
    .then(() => this._parser.extract(url))
  }

  /**
   * @param {String} content
   * @return {Object}
   */
  extractTopicsFromContent (content = '') {
    return Promise.resolve()
    .then(() => this.removeHtmlTags(content))
    .then(str => str.match( /[^\.!\?]+[\.!\?]+/g ))
    .then(docs => this._lda(docs, 1, this._numberOfTopicsToGenerate))
    .then(topics => _.map(topics[0], 'term'))
  }

  /**
   * @name GhostArticleSDKClient_TitleCaptionContentResult
   * @type {Object}
   * @property {String} title
   * @property {String} caption
   * @property {String} content
   */

  /**
   * @param {String} url
   * @returns {GhostArticleSDKClient_TitleCaptionContentResult} result
   */
  extractTitleCaptionAndContentFromUrl (url) {
    const result = { title: '', caption: '', content: '' };
    return Promise.resolve()
    .then(() => this.extractFromUrl(url))
    .tap(extract => result.title = extract.title)
    .tap(extract => result.caption = extract.description)
    .then(extract => this.getArticleContentFromUrl(url))
    .tap(content => result.content = content)
    .then(() => result);
  }

  /**
   * @param {String} url
   * @return {String} content
   */
  getArticleContentFromUrl (url) {
    return Promise.resolve()
    .then(() => NodeFetch(url))
    .then(res => res.text())
    .then(html => this._parser.getArticle(html))
  }

  /**
   * @param {String} content
   * @return {String} content
   */
  removeHtmlTags (content) {
    return content.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
  }
  
}

module.exports = ArticleParsingService;