'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const NodeFetch = require('node-fetch');
const Striptags = require('striptags');
const HtmlEntities = require('he');

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
   * @param {String} content
   * @param {Boolean} shouldDecodeCharacterReferences
   * @return {String} content - decoded string
   */
  decodeCharacterReferences (content = '', shouldDecodeCharacterReferences) {
    if (!shouldDecodeCharacterReferences) return content;
    return HtmlEntities.decode(content);
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
   * @name GhostArticleSDKClient_TitleCaptionContentOptions
   * @type {Object}
   * @property {RegExp} excludeRegex
   * @property {Boolean} decodeCharacterReferences
   * @property {Boolean} cleanHtml
   * @property {Boolean} replaceDoubleQuotes
   */

  /**
   * @param {String} url
   * @param {GhostArticleSDKClient_TitleCaptionContentOptions} options
   * @returns {GhostArticleSDKClient_TitleCaptionContentResult} result
   */
  extractTitleCaptionAndContentFromUrl (url, options = {}) {
    const result = { title: '', caption: '', content: '' };
    return Promise.resolve()
    .then(() => this.extractFromUrl(url))
    .tap(extract => result.title = extract.title)
    .tap(extract => result.caption = extract.description)
    .then(extract => this.getArticleContentFromUrl(url))
    .then(content => this.removeHtmlTags(content, options.cleanHtml))
    .then(content => this.replaceDoubleQuotes(content, options.replaceDoubleQuotes))
    .then(content => this.decodeCharacterReferences(content, options.decodeCharacterReferences))
    .tap(content => result.content = content)
    .then(() => this.removeRegexString(result.title, options.excludeRegex))
    .tap(title => result.title = title)
    .then(() => this.removeRegexString(result.caption, options.excludeRegex))
    .tap(caption => result.caption = caption)
    .then(() => this.removeRegexString(result.content, options.excludeRegex))
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
   * @param {Boolean} shouldRemoveHtmlTags
   * @return {String} content
   */
  removeHtmlTags (content, shouldRemoveHtmlTags) {
    if (!shouldRemoveHtmlTags) return content;
    return Striptags(content);
  }

  /**
   * @param {String} content
   * @param {RegExp} regex
   * @returns {String}
   */
  removeRegexString (content, regex) {
    if (!regex) return content;
    return content.replace(regex, "")
  }

  /**
   * @param {String} content
   * @param {Boolean} shouldReplaceDoubleQuotes
   * @return {String} content
   */
  replaceDoubleQuotes (content, shouldReplaceDoubleQuotes) {
    if (!shouldReplaceDoubleQuotes) return content;

    return content.replace(/(?:\\*)?"([^"\\]*\\.)*[^"]*"/g, function (match) {
      return match
      // unescape double-quotes
      .replace(/([^\\]|^)\\"/g, '$1"')
      // escape escapes
      .replace(/(^|[^\\])(\\+)'/g, '$1$2\\\'')
      // escape single-quotes - round 1
      .replace(/([^\\])'/g, '$1\\\'')
      // escape single-quotes - round 2 (for consecutive single-quotes)
      .replace(/([^\\])'/g, '$1\\\'')
      // convert
      .replace(/^"|"$/g, '\'');
    });
  }

  
}

module.exports = ArticleParsingService;