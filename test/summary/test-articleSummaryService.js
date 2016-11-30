const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const ArticleTextHelper = require('../../../../helpers/articleTextHelper');
const ServiceLocator = require('../../../../../server/services/serviceLocatorFactory').getServiceLocatorSingleton();
const service = ServiceLocator.getArticleSummaryService();

describe('ArticleSummaryService', function () {
  this.timeout(10000);
  
  describe('summarizeContent', () => {
    
    it('should summarize html content', () => {
      const title = ArticleTextHelper.generateArticleTitle();
      const html = ArticleTextHelper.generateHtmlContent();
      return service.summarizeContent(title, html)
      .then(summary => {
        expect(summary).to.exist;
        expect(summary.length).to.be.below(html.length);
      })
    });
    
  });
  
});