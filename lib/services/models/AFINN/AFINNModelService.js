'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

class AFINNModelService {

  /**
   * @param {Object} sentiment
   * @param {Object} emojiEmotion
   */
  constructor (sentiment, emojiEmotion) {
    this._sentiment = sentiment;
    this._emojiEmotion = emojiEmotion;
  }



}

module.exports = AFINNModelService;