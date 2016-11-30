'use strict';

const ArticleParsingService = require('./articleParsingService');

class ArticleParsingServiceFactory {

  /**
   * {GhostArticleSDKClient_ParsingConfig} options
   * @return {ArticleParsingService}
   */
  static create (options = {}) {
    const articleParser = require('article-parser');
    const lda = require('lda');
    articleParser.configure(options);
    return new ArticleParsingService(options, articleParser, lda);
  }
  
}

module.exports = ArticleParsingServiceFactory;