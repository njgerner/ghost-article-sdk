class GhostArticleSDKClient {

    /**
     * @param {NewsApiIngestService} newsApiIngestService
     * @param {AFINNModelService} AFINNModelService
     * @param {ParsingService} parsingService
     * @param {SummaryService} summaryService
     */
    constructor (newsApiIngestService, AFINNModelService, parsingService, summaryService) {
        this.IngestService = newsApiIngestService;
        this.AFINNModelService = AFINNModelService;
        this.ParsingService = parsingService;
        this.SummaryService = summaryService;
    }


}

module.exports = GhostArticleSDKClient;