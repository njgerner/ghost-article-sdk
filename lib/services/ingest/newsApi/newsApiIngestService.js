'use strict';

const _ = require('lodash');
const Request = require('request-promise');
const Promise = require('bluebird');
const ValidUrl = require('valid-url');

class NewsApiIngestService {
  
  /**
   * @param {GhostArticleSDKClient_IngestConfig} options
   */
  constructor (options) {
    this._apiKey = options.newsApiKey;
    this._excludedSources = options.exludedSources;
  }
  
  /**
   * @return {[String]}
   */
  getSources () {
    return Promise.resolve()
    .then(() => Request({
      method: 'GET',
      url: 'https://newsapi.org/v1/sources',
      headers: {
        "x-api-key": this._apiKey
      }
    }))
    .then(response => JSON.parse(response).sources)
    .then(sources => _.filter(sources, (source) => { return this._excludedSources.indexOf(source.id) == -1 }))
  }
  
  /**
   * @name NewsApiIngestService_Article
   * @type {Object}
   * @property {String} author
   * @property {String} description
   * @property {String} title
   * @property {String} url
   * @property {String} urlToImage
   * @property {Date} publishedAt
   */
  
  /**
   * @param {Object} options
   * @param {String} options.source
   * @return {Promise<[NewsApiIngestService_Article],Error>}
   */
  getLatest (options = {}) {
    return Promise.resolve()
    .then(() => Request({
      method: 'GET',
      url: 'https://newsapi.org/v1/articles',
      qs: {
        source: options.source,
        sortBy: 'latest'
      },
      headers: {
        "x-api-key": this._apiKey
      }
    }))
    .then(response => JSON.parse(response).articles)
    .filter(article => ValidUrl.isUri(article.url))
  }
  
  /**
   * @param {Object} options
   * @param {String} options.source
   * @return {Promise<[NewsApiIngestService_Article],Error>}
   */
  getPopular (options = {}) {
    return Promise.resolve()
    .then(() => Request({
      method: 'GET',
      url: 'https://newsapi.org/v1/articles',
      qs: {
        source: options.source,
        sortBy: 'popular'
      },
      headers: {
        "x-api-key": this._apiKey
      }
    }))
    .then(response => JSON.parse(response).articles)
    .filter(article => ValidUrl.isUri(article.url))
  }
  
  /**
   * @param {Object} options
   * @param {String} options.source
   * @return {Promise<[NewsApiIngestService_Article],Error>}
   */
  getTop (options = {}) {
    return Promise.resolve()
    .then(() => Request({
      method: 'GET',
      url: 'https://newsapi.org/v1/articles',
      qs: {
        source: options.source,
        sortBy: 'top'
      },
      headers: {
        "x-api-key": this._apiKey
      }
    }))
    .then(response => JSON.parse(response).articles)
    .filter(article => ValidUrl.isUri(article.url))
  }
  
}

module.exports = NewsApiIngestService;