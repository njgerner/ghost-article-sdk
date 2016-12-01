'use strict';

const AFINNModelService = require('./AFINNModelService');

class AFINNModelServiceFactory {

  /**
   * {GhostArticleSDKClient_ModelConfig} options
   * @param {ArticleParsingService} parsingService
   * @return {AFINNModelService}
   */
  static create (options = {}, parsingService) {
    const sentiment = require('sentiment');
    const emojiEmotion = require('emoji-emotion');
    return new AFINNModelService(sentiment, emojiEmotion, parsingService);
  }

}

module.exports = AFINNModelServiceFactory;