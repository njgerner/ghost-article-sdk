const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const GhostArticleSDK = require('../../index');
const GhostArticleSDKClient = new GhostArticleSDK(Config.get('sdk'));
const service = GhostArticleSDKClient.IngestService;

const articleKeys = ["author", "description", "title", "url", "urlToImage", "publishedAt"];

describe('NewsApiIngestService', function () {
  this.timeout(10000);
  
  describe('getLatest', () => {
    
    it('should return an error when provided no source', () => {
      return service.getLatest()
      .catch(err => expect(err).to.exist);
    });
    
    it('should return the latest articles for a given source', () => {
      return service.getLatest({ source: 'the-next-web' })
      .then(articles => {
        expect(articles).to.exist;
        expect(articles).to.be.an('array');
        articles.forEach(article => {
          expect(article).to.exist;
          expect(article).to.contain.all.keys(articleKeys);
        })
      })
    });
    
  });
  
  describe('getTop', () => {
  
    it('should return an error when provided no source', () => {
      return service.getLatest()
      .catch(err => expect(err).to.exist);
    });
  
    it('should return the top articles for a given source', () => {
      return service.getTop({ source: 'time' })
      .then(articles => {
        expect(articles).to.exist;
        expect(articles).to.be.an('array');
        articles.forEach(article => {
          expect(article).to.exist;
          expect(article).to.contain.all.keys(articleKeys);
        })
      })
    });
    
  });
  
});