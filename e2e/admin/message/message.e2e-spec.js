"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("../helper.e2e-spec");
describe('Admin Message e2e Tests', function () {
    var chatRoomId = 1;
    beforeAll(function () {
        helper_e2e_spec_1.SignIn();
    });
    beforeEach(function () {
        protractor_1.element(protractor_1.by.id('admin-message-link')).click();
        // select chat-room
        protractor_1.element(protractor_1.by.id("select-" + chatRoomId)).click();
    });
    // This is used for testing purposes.
    // Redis and rails servers must be running for this to work
    var expectedMsg = 'Admin Message';
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('admin-message')).getText()).toEqual(expectedMsg);
    });
    it('should display an add button', function () {
        expect(protractor_1.element(protractor_1.by.id('add-message')).isPresent()).toBeTruthy();
    });
    it('should navigate to edit a message', function () {
        var messageElement = protractor_1.element.all(protractor_1.by.xpath('//ul[@class="chat"]/li/div/p')).get(1);
        messageElement.getText()
            .then(function (body) {
            // little hack to scroll down the whole page to move where the delete button is
            protractor_1.browser.executeScript('window.scrollTo(0, 10000);').then(function () {
                messageElement.click();
                protractor_1.element(protractor_1.by.id('body')).getAttribute('value')
                    .then(function (messageDetailBody) {
                    expect(body).toEqual(messageDetailBody);
                });
            });
        });
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
});
//# sourceMappingURL=message.e2e-spec.js.map