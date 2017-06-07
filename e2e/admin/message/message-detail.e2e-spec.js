"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("../helper.e2e-spec");
describe('Admin Message Detail e2e Tests', function () {
    var chatRoomId = 1;
    var url = '/admin/chat-room/1/message/detail/1';
    var testMessage = "test-" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
    beforeAll(function () {
        helper_e2e_spec_1.SignIn();
    });
    beforeEach(function () {
        protractor_1.browser.get(url);
    });
    // This is used for testing purposes.
    // Redis and rails servers must be running for this to work
    var expectedMsg = 'Admin Message Detail';
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('admin-message-detail')).getText()).toEqual(expectedMsg);
    });
    it('should display an update button', function () {
        expect(protractor_1.element(protractor_1.by.id('message-detail-update')).isPresent()).toBeTruthy();
    });
    it('should display a back button', function () {
        expect(protractor_1.element(protractor_1.by.id('message-detail-back')).isPresent()).toBeTruthy();
    });
    it('should display a delete button', function () {
        expect(protractor_1.element(protractor_1.by.id('message-detail-delete')).isPresent()).toBeTruthy();
    });
    it('should navigate to message list', function () {
        protractor_1.element(protractor_1.by.id('message-detail-back')).click();
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual('Admin Message');
    });
    it('should update a message', function () {
        protractor_1.element(protractor_1.by.id('body')).getAttribute('value')
            .then(function (originalBody) {
            var testBody = "testBody-" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
            expect(originalBody).not.toBe(testBody);
            setMessageBody(testBody);
            protractor_1.browser.get(url);
            protractor_1.element(protractor_1.by.id('body')).getAttribute('value')
                .then(function (newBody) {
                expect(testBody).toEqual(newBody);
                // clean up the message body
                setMessageBody(originalBody);
            });
        });
    });
    it('should add a message', function () {
        var messageElement = protractor_1.element.all(protractor_1.by.xpath('//ul[@class="chat"]/li/div/p')).last();
        helper_e2e_spec_1.AddMessage(testMessage, chatRoomId);
        protractor_1.element(protractor_1.by.id('admin-message-link')).click();
        messageElement.getText()
            .then(function (newBody) {
            expect(testMessage).toBe(newBody);
        });
    });
    it('should delete a message', function () {
        var messageElement = protractor_1.element.all(protractor_1.by.xpath('//ul[@class="chat"]/li/div/p')).last();
        helper_e2e_spec_1.RemoveMessage(testMessage, chatRoomId);
        messageElement.getText()
            .then(function (newBody) {
            expect(testMessage).not.toBe(newBody);
        });
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
    function setMessageBody(body) {
        protractor_1.element(protractor_1.by.id('body')).clear();
        protractor_1.element(protractor_1.by.id('body')).sendKeys(body);
        protractor_1.element(protractor_1.by.id('message-detail-update')).click();
        protractor_1.browser.waitForAngular();
    }
    ;
});
//# sourceMappingURL=message-detail.e2e-spec.js.map