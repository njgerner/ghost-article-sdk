class GhostArticleSDKClient {

    /**
     * @param {NewsAPIIngestService} newsAPIIngestService
     * @param {AFINNService} AFINNModelService
     * @param {ParsingService} parsingService
     * @param {SummaryService} summaryService
     */
    constructor (newsAPIIngestService, AFINNModelService, parsingService, summaryService) {
        this.IngestService = newsAPIIngestService;
        this.AFINNModelService = AFINNModelService;
        this.ParsingService = parsingService;
        this.SummaryService = summaryService;
    }


}

module.exports = GhostArticleSDKClient;