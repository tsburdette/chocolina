// Test dependencies for PingHandler
const assert = require('assert');
const sinon = require('sinon');
const sut = require('../../app/handlers/pingHandler.js');

describe('PingHandler', () => {
    describe('#ping', () => {
        it('should send a message to the channel when pinged', () => {
            let handler = new sut.PingHandler();
            let channel = {
                sendMessage: sinon.stub()
            };
            handler.ping(channel, "Test-User");

            assert(channel.sendMessage.called);
        });
    });
});