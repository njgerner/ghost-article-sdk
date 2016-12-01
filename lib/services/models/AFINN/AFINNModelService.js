'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

class AFINNModelService {

  /**
   * @name GhostArticleSDKClient_AFINNModelService_ScoreResult
   * @type {Object}
   */

  /**
   * @param {Object} sentiment
   * @param {Array} emojiEmotions
   * @param {ArticleParsingService} parsingService
   */
  constructor (sentiment, emojiEmotions, parsingService) {
    this._sentiment = sentiment;
    this._parsingService = parsingService;
    this._emojisByAFINN = this._setEmojiAFINNByPolarity(emojiEmotions);
  }

  /**
   * @param {String} content
   * @return {GhostArticleSDKClient_AFINNModelService_ScoreResult}
   */
  score (content) {
    return Promise.resolve()
    .then(() => this._parsingService.removeHtmlTags(content))
    .then(str => this._sentiment(str))
    .then(result => _.clamp(_.round(result.comparative), -5, 5))
  }

  /**
   * @param {String} content
   * @return {GhostArticleSDKClient_AFINNModelService_ScoreResult}
   */
  scoreEmoji (content) {
    return Promise.resolve()
    .then(() => this.score(content))
    .then(score => _.clamp(_.round(score), -5, 5))
    .then(comparativeScore => {
      return {
        score: comparativeScore,
        emojis: this._emojisByAFINN[comparativeScore]
      }
    })
  }

  /**
   * @param {Array} emojiEmotions
   * @return {Object}
   */
  _setEmojiAFINNByPolarity (emojiEmotions = []) {
    return emojiEmotions.reduce((result, obj) => {
      result[obj.polarity] = result[obj.polarity] || [];
      result[obj.polarity].push(obj.emoji);
      return result;
    }, {})
  }

}

module.exports = AFINNModelService;