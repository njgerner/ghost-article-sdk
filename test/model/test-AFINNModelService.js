const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const GhostArticleSDK = require('../../index');
const GhostArticleSDKClient = new GhostArticleSDK(Config.get('sdk'));
const service = GhostArticleSDKClient.AFINNModelService;

describe('AFINNModelService', function () {

});