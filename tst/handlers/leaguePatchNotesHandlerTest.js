// Test dependencies for LeaguePatchNotesHandler
const assert = require('assert');
const sinon = require('sinon');
const proxy = require('proxyquire');
const pathToSystemUnderTest = '../../app/handlers/leaguePatchNotesHandler.js';

// Mock scraper.js to test Handler in isolation
let scraper = {
    scrape: sinon.mock()
};
proxy(pathToSystemUnderTest, {'../scraper.js': scraper});

const sut = require(pathToSystemUnderTest);
describe('LeaguePatchNotesHandler', () => {
    describe('#fetchPatchNotes', () => {
        it('should call the scraper with the patch notes', () => {
            let handler = new sut.LeaguePatchNotesHandler();
            handler.fetchPatchNotes({channel: sinon.mock()});

            assert(scraper.scrape.called);
        });
    });
});
