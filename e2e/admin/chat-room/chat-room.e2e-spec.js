"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("../helper.e2e-spec");
describe('Admin Chat Room e2e Tests', function () {
    var testChatRoom = "test-" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
    beforeAll(function () {
        helper_e2e_spec_1.SignIn();
    });
    beforeEach(function () {
        protractor_1.element(protractor_1.by.id('admin-chat-room-link')).click();
    });
    // This is used for testing purposes.
    // Redis and rails servers must be running for this to work
    var expectedMsg = 'Admin Chat Room';
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('admin-chat-room')).getText()).toEqual(expectedMsg);
    });
    it('should display an add button', function () {
        expect(protractor_1.element(protractor_1.by.id('add-chat-room')).isPresent()).toBeTruthy();
    });
    it('should navigate to add new chat room', function () {
        protractor_1.element(protractor_1.by.id('add-chat-room')).click();
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual('Admin Chat Room Detail');
        expect(protractor_1.element(protractor_1.by.id('title')).getText()).toEqual('');
    });
    it('should navigate to edit a chat room', function () {
        var userElement = protractor_1.element.all(protractor_1.by.className('chat-rooms')).get(1);
        userElement.getAttribute('value')
            .then(function (title) {
            userElement.click();
            expect(protractor_1.element(protractor_1.by.id('title')).getAttribute('value')).toEqual(title);
        });
    });
    it('should add a chat room', function () {
        var chatRoomElement = protractor_1.element(protractor_1.by.id("delete-" + testChatRoom));
        helper_e2e_spec_1.AddChatRoom(testChatRoom);
        protractor_1.element(protractor_1.by.id('admin-chat-room-link')).click();
        expect(chatRoomElement.isPresent()).toBeTruthy();
    });
    it('should delete a chat room', function () {
        var chatRoomElement = protractor_1.element(protractor_1.by.id("delete-" + testChatRoom));
        helper_e2e_spec_1.RemoveChatRoom(testChatRoom);
        protractor_1.element(protractor_1.by.id('admin-chat-room-link')).click();
        expect(chatRoomElement.isPresent()).toBeFalsy();
    });
    it('should shown an existing chat room', function () {
        var chatRoomElement = protractor_1.element.all(protractor_1.by.className('chat-rooms')).get(2);
        chatRoomElement.getAttribute('value')
            .then(function (title) {
            protractor_1.element(protractor_1.by.id('chat-room-search-box')).sendKeys(title);
            protractor_1.element.all(protractor_1.by.className('chat-rooms')).count().then(function (size) {
                expect(size).toBe(1);
            });
        });
    });
    it('should not shown a no existing chat room', function () {
        var title = 'f4k3T1tl3';
        protractor_1.element(protractor_1.by.id('chat-room-search-box')).sendKeys(title);
        protractor_1.element.all(protractor_1.by.className('chat-rooms')).count().then(function (size) {
            expect(size).toBe(0);
        });
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
});
//# sourceMappingURL=chat-room.e2e-spec.js.map