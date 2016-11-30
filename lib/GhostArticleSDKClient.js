class GhostArticleSDKClient {

    /**
     * @param {NewsAPIIngestService} newsAPIIngestService
     * @param {AFINNService} AFINNService
     * @param {ParsingService} parsingService
     * @param {SummaryService} summaryService
     */
    constructor (newsAPIIngestService, AFINNService, parsingService, summaryService) {
        this.ingest = newsAPIIngestService;
        this.AFINN = AFINNService;
        this.parsing = parsingService;
        this.summary = summaryService;
    }


}

module.exports = GhostArticleSDKClient;