const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const ArticleTextHelper = require('../helpers/articleTextHelper');
const GhostArticleSDK = require('../../index');
const GhostArticleSDKClient = new GhostArticleSDK(Config.get('sdk'));
const service = GhostArticleSDKClient.AFINNModelService;

describe('AFINNModelService', function () {

  describe('score', () => {

    it('should score an article', () => {
      const content = ArticleTextHelper.generateArticleContent();
      return service.score(content)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.a('number');
      })
    });

    it('should score a html content string', () => {
      const html = ArticleTextHelper.generateHtmlContent();
      return service.score(html)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.a('number');
      })
    });

  });

  describe('scoreEmoji', () => {

    it('should score an article', () => {
      const content = ArticleTextHelper.generateArticleContent();
      return service.scoreEmoji(content)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.an('object');
        expect(result).to.contain.keys(['score', 'emojis']);
        expect(result.score).to.be.a('number');
        expect(result.emojis).to.be.an('array');
      })
    });

    it('should score a html content string', () => {
      const html = ArticleTextHelper.generateHtmlContent();
      return service.scoreEmoji(html)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.an('object');
        expect(result).to.contain.keys(['score', 'emojis']);
        expect(result.score).to.be.a('number');
        expect(result.emojis).to.be.an('array');
      })
    });

  });

});