const NewsApiIngestServiceFactory = require('./services/ingest/newsApi/newsApiIngestServiceFactory');
const AFINNModelServiceFactory = require('./services/models/AFINN/AFINNModelServiceFactory');
const ArticleParsingServiceFactory = require('./services/parsing/articleParsingServiceFactory');
const ArticleSummaryServiceFactory = require('./services/summary/articleSummaryServiceFactory');

const GhostArticleSDKClient = require('./GhostArticleSDKClient');

class GhostArticleSDKClientFactory {

    /**
     * @name GhostArticleSDKClient_IngestConfig
     * @type {Object}
     * @property {String} newsApiKey
     */

    /**
     * @name GhostArticleSDKClient_ModelConfig
     * @type {Object}
     */

    /**
     * @name GhostArticleSDKClient_ParsingConfig
     * @type {Object}
     * @property {Number} numberOfTopicsToGenerate
     * @property {Number} wordsPerMinute
     * @property {Array} blackList
     * @property {Array} exceptDomain
     * @property {Array} adsDomain
     * @property {Object} htmlRules
     * @property {String} SoundCloudKey
     * @property {String} YouTubeKey
     * @property {String} EmbedlyKey
     */

    /**
     * @name GhostArticleSDKClient_SummaryConfig
     * @type {Object}
     */

    /**
     * @name GhostArticleSDKClientFactory_Config
     * @type {Object}
     * @property {GhostArticleSDKClient_IngestConfig} ingest
     * @property {GhostArticleSDKClient_ParsingConfig} parsing
     * @property {GhostArticleSDKClient_ModelConfig} models
     * @property {GhostArticleSDKClient_SummaryConfig} summary
     */

    /**
     * @param {GhostArticleSDKClientFactory_Config} options
     * @returns {GhostArticleSDKClient}
     */
    constructor (options = {}) {
        return new GhostArticleSDKClient(
            NewsApiIngestServiceFactory.create(options.ingest),
            AFINNModelServiceFactory.create(options.models),
            ArticleParsingServiceFactory.create(options.parsing),
            ArticleSummaryServiceFactory.create(options.summary)
        )
    }
}

module.exports = GhostArticleSDKClientFactory;