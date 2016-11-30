const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const ArticleTextHelper = require('../../../../helpers/articleTextHelper');
const GhostArticleSDK = require('../../index');
const GhostArticleSDKClient = new GhostArticleSDK(Config.get('sdk'));
const service = GhostArticleSDKClient.ParsingService;

describe('ArticleParsingService', function () {
  this.timeout(10000);
  
  describe('extractFromUrl', () => {
    
    it('should extract article information from a url', () => {
      const url = "https://techcrunch.com/2016/11/18/google-reverses-its-digital-death-sentence-for-pixel-phone-resellers";
      
      return service.extractFromUrl(url)
      .then(articleInfo => {
        expect(articleInfo).to.exist;
      });
    });
    
  });

  describe('extractTopicsFromContent', () => {

    it('should return the desired number of topics given an html string', () => {
      const result = ['facebook', 'company', 'shares'];
      const html = ArticleTextHelper.generateHtmlContent();
      return service.extractTopicsFromContent(html)
      .then(topics => {
        expect(topics).to.exist;
        expect(topics).to.be.an('array');
        expect(topics.length).to.be.eql(3);
        expect(topics).to.be.eql(result);
      })
    });

    it('should return the desired number of topics given a paragraph string', () => {
      const result = ['theater', 'movie', 'seats'];
      const content = ArticleTextHelper.generateArticleContent();
      return service.extractTopicsFromContent(content)
      .then(topics => {
        expect(topics).to.exist;
        expect(topics).to.be.an('array');
        expect(topics.length).to.be.eql(3);
        expect(topics).to.be.eql(result);
      })
    });

  });
  
  describe('getArticleContentFromUrl', () => {
    
    it('should get article content from a url', () => {
      const url = "https://techcrunch.com/2016/11/18/facebook-authorizes-a-6b-stock-buyback";
      
      return service.getArticleContentFromUrl(url)
      .then(content => {
        expect(content).to.exist;
        expect(content).to.be.a('string');
      })
    });
    
  });
  
});