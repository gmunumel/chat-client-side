"use strict";
var protractor_1 = require("protractor");
// NOTICE: Redis and rails servers must be running for this to work
// To sign in a specific user. 
function SignIn() {
    protractor_1.browser.get('');
    protractor_1.element(protractor_1.by.id('sign-in-link')).click();
    protractor_1.element(protractor_1.by.id('name')).sendKeys('admin');
    protractor_1.element(protractor_1.by.id('email')).sendKeys('admin@admin.com');
    protractor_1.element(protractor_1.by.id('sign-in-submit')).click();
}
exports.SignIn = SignIn;
function LogOut() {
    protractor_1.browser.get('');
    protractor_1.element(protractor_1.by.id('admin-log-out')).click();
}
exports.LogOut = LogOut;
// Create a dummy user. Will be remove later
function AddUser(userName, userEmail) {
    SignIn();
    protractor_1.element(protractor_1.by.id('admin-user-link')).click();
    protractor_1.element(protractor_1.by.id('add-user')).click();
    protractor_1.element(protractor_1.by.id('name')).sendKeys(userName);
    protractor_1.element(protractor_1.by.id('email')).sendKeys(userEmail);
    protractor_1.browser.executeScript('window.scrollTo(0,0);').then(function () {
        protractor_1.element(protractor_1.by.id('user-detail-save')).click();
        protractor_1.browser.waitForAngular();
    });
}
exports.AddUser = AddUser;
// To remove a specific user. For clean up purposes
function RemoveUser(userName) {
    SignIn();
    protractor_1.element(protractor_1.by.id('admin-user-link')).click();
    var elementToClick = protractor_1.element(protractor_1.by.id("delete-" + userName));
    // wait for the element to be clickable 
    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.elementToBeClickable(elementToClick), 10000)
        .then(function () {
        // little hack to scroll down the whole page to move where the delete button is
        protractor_1.browser.executeScript('window.scrollTo(10000,10000);').then(function () {
            elementToClick.click();
            protractor_1.browser.waitForAngular();
        });
    });
}
exports.RemoveUser = RemoveUser;
// Create a dummy chat room. Will be remove later
function AddChatRoom(title) {
    SignIn();
    protractor_1.element(protractor_1.by.id('admin-chat-room-link')).click();
    protractor_1.element(protractor_1.by.id('add-chat-room')).click();
    protractor_1.element(protractor_1.by.id('title')).sendKeys(title);
    protractor_1.browser.executeScript('window.scrollTo(0,0);').then(function () {
        protractor_1.element(protractor_1.by.id('chat-room-detail-save')).click();
        protractor_1.browser.waitForAngular();
    });
}
exports.AddChatRoom = AddChatRoom;
// To remove a specific chat room. For clean up purposes
function RemoveChatRoom(title) {
    SignIn();
    protractor_1.element(protractor_1.by.id('admin-chat-room-link')).click();
    var elementToClick = protractor_1.element(protractor_1.by.id("delete-" + title));
    // wait for the element to be clickable 
    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.elementToBeClickable(elementToClick), 10000)
        .then(function () {
        // little hack to scroll down the whole page to move where the delete button is
        protractor_1.browser.executeScript('window.scrollTo(10000,10000);').then(function () {
            elementToClick.click();
            protractor_1.browser.waitForAngular();
        });
    });
}
exports.RemoveChatRoom = RemoveChatRoom;
// Create a dummy message. Will be remove later
function AddMessage(body, chatRoomId) {
    SignIn();
    protractor_1.element(protractor_1.by.id('admin-message-link')).click();
    // select chat-room
    protractor_1.element(protractor_1.by.id("select-" + chatRoomId)).click();
    // little hack to scroll down the whole page to move where the add message is
    protractor_1.browser.executeScript('window.scrollTo(0,10000);').then(function () {
        protractor_1.element(protractor_1.by.id('body')).sendKeys(body);
        protractor_1.element(protractor_1.by.id('add-message')).click();
        protractor_1.browser.waitForAngular();
    });
}
exports.AddMessage = AddMessage;
// To remove a specific message. For clean up purposes
function RemoveMessage(body, chatRoomId) {
    SignIn();
    protractor_1.element(protractor_1.by.id('admin-message-link')).click();
    // select chat-room
    protractor_1.element(protractor_1.by.id("select-" + chatRoomId)).click();
    var elementToClick = protractor_1.element.all(protractor_1.by.className('messages')).last();
    // little hack to scroll down the whole page to move where the add message is
    protractor_1.browser.executeScript('window.scrollTo(0,10000);').then(function () {
        elementToClick.click();
        protractor_1.element(protractor_1.by.id('message-detail-delete')).click();
        protractor_1.browser.waitForAngular();
    });
}
exports.RemoveMessage = RemoveMessage;
function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.GetRandomInt = GetRandomInt;
//# sourceMappingURL=helper.e2e-spec.js.map