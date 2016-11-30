'use strict';

const AFINNModelService = require('./AFINNModelService');

class AFINNModelServiceFactory {

  /**
   * {GhostArticleSDKClient_ModelConfig} options
   * @return {AFINNModelService}
   */
  static create (options = {}) {
    const sentiment = require('sentiment');
    const emojiEmotion = require('emoji-emotion');
    return new AFINNModelService(sentiment, emojiEmotion);
  }

}

module.exports = AFINNModelServiceFactory;