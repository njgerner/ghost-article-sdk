const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const ArticleTextHelper = require('../helpers/articleTextHelper');
const GhostArticleSDK = require('../../index');
const GhostArticleSDKClient = new GhostArticleSDK(Config.get('sdk'));
const service = GhostArticleSDKClient.ParsingService;

describe('ArticleParsingService', function () {
  this.timeout(10000);
  
  describe('extractFromUrl', () => {
    
    it('should extract article information from a url', () => {
      const url = "http://www.nationalreview.com/article/443227/consumer-financial-protection-bureau-tragic-failures";
      
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

  describe('extractTitleCaptionAndContentFromUrl', () => {

    it('should return a title, caption and article content from a url', () => {
      const url = 'https://www.nationalreview.com/magazine/2016-12-31-0000/donald-trump-job-conservatives';
      return service.extractTitleCaptionAndContentFromUrl(url)
      .then(result => {
        expect(result).to.exist;
        expect(result.title).to.exist;
        expect(result.caption).to.exist;
        expect(result.content).to.exist;
      });
    });

    it('should return a title, caption and article from a url with options passed in', () => {
      const url = 'http://www.nationalreview.com/article/444325/state-department-staffers-resignation';
      return service.extractTitleCaptionAndContentFromUrl(url, {
        excludeRegex: new RegExp('(, by\\s)[A-Za-z\\s]+(, National Review)'),
        decodeCharacterReferences: true,
        cleanHtml: true,
        replaceDoubleQuotes: true
      })
      .then(result => {
        expect(result).to.exist;
        expect(result.title).to.exist;
        expect(result.caption).to.exist;
        expect(result.content).to.exist;
      });
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

  describe("decodeCharacterReferences", () => {
    it('should remove character references', () => {
      const str = 'Leave aside the distractions about crowd sizes and vote fraud. There is an aspect to Trump&#x2019;s egotism that is more than unseemly or clownish; it&#x2019;s aggressive.';
      const expectedResult = "Leave aside the distractions about crowd sizes and vote fraud. There is an aspect to Trump’s egotism that is more than unseemly or clownish; it’s aggressive.";
      const result = service.decodeCharacterReferences(str, true);
      expect(result).to.be.equal(expectedResult);
    });

    it('should not remove character references if the activation flag is not passed in', () => {
      const str = 'Leave aside the distractions about crowd sizes and vote fraud. There is an aspect to Trump&#x2019;s egotism that is more than unseemly or clownish; it&#x2019;s aggressive.';
      const result = service.decodeCharacterReferences(str);
      expect(result).to.be.equal(str);
    });
  });

  describe('removeRegexString', () => {
    it('should remove from string as defined in regex', () => {
      const str = 'The State of State, by Luke Thompson, National Review';
      const regex = new RegExp('(, by\\s)[A-Za-z\\s]+(, National Review)');

      const result = service.removeRegexString(str, regex);
      expect(result).to.be.equal('The State of State');

    });
  });
});