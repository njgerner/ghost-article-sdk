'use strict';

const Promise = require('bluebird');

class ArticleSummaryService {
  
  /**
   * @param {NodeSummary} summarizer
   */
  constructor (summarizer) {
    this._summarizer = summarizer;
  }
  
  /**
   * @param {String} title
   * @param {String} content
   * @return {Promise<String,Error>} summarizedContent
   */
  summarizeContent (title, content) {
    return new Promise((resolve, reject) => {
      this._summarizer.summarize(title, content, (err, summarizedContent) => {
        if (err) reject(err);
        else resolve(summarizedContent);
      })
    })
  }
  
}

module.exports = ArticleSummaryService;