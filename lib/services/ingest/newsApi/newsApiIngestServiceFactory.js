'use strict';

const NewsApiIngestService = require('./newsApiIngestService');

class NewsApiIngestServiceFactory {
  
  /**
   * @param {GhostArticleSDKClient_IngestConfig} options
   * @return {NewsApiIngestService}
   */
  static create(options) {
    return new NewsApiIngestService(options);
  }
  
}

module.exports = NewsApiIngestServiceFactory;