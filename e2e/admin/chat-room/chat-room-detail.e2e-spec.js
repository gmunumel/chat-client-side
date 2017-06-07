"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("../helper.e2e-spec");
describe('Admin Chat Room Detail e2e Tests', function () {
    var url = '/admin/chat-room/detail/2';
    beforeAll(function () {
        helper_e2e_spec_1.SignIn();
    });
    beforeEach(function () {
        protractor_1.browser.get(url);
    });
    // This is used for testing purposes.
    // Redis and rails servers must be running for this to work
    var expectedMsg = 'Admin Chat Room Detail';
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('admin-chat-room-detail')).getText()).toEqual(expectedMsg);
    });
    it('should display a save button', function () {
        expect(protractor_1.element(protractor_1.by.id('chat-room-detail-save')).isPresent()).toBeTruthy();
    });
    it('should display a back button', function () {
        expect(protractor_1.element(protractor_1.by.id('chat-room-detail-back')).isPresent()).toBeTruthy();
    });
    it('should navigate to chat rooms list', function () {
        protractor_1.element(protractor_1.by.id('chat-room-detail-back')).click();
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual('Admin Chat Room');
    });
    it('should update a chat room', function () {
        protractor_1.element(protractor_1.by.id('title')).getAttribute('value')
            .then(function (originalTitle) {
            var testTitle = "testTitle-" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
            expect(originalTitle).not.toBe(testTitle);
            setChatRoomTitle(testTitle);
            protractor_1.browser.get(url);
            protractor_1.element(protractor_1.by.id('title')).getAttribute('value')
                .then(function (newTitle) {
                expect(testTitle).toEqual(newTitle);
                // clean up the chat room title
                setChatRoomTitle(originalTitle);
            });
        });
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
    function setChatRoomTitle(title) {
        protractor_1.element(protractor_1.by.id('title')).clear();
        protractor_1.element(protractor_1.by.id('title')).sendKeys(title);
        protractor_1.element(protractor_1.by.id('chat-room-detail-save')).click();
        protractor_1.browser.waitForAngular();
    }
    ;
});
//# sourceMappingURL=chat-room-detail.e2e-spec.js.map