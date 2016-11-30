'use strict';

const ArticleSummaryService = require('./articleSummaryService');

class ArticleSummaryServiceFactory {
  
  /**
   * @param {GhostArticleSDKClient_SummaryConfig} options
   * @return {ArticleSummaryService}
   */
  static create (options = {}) {
    const summarizer = require('node-summary');
    return new ArticleSummaryService(summarizer);
  }
  
}

module.exports = ArticleSummaryServiceFactory;