"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
// re-export for tester convenience
var message_1 = require("../../app/models/message");
exports.Message = message_1.Message;
var message_service_1 = require("../../app/services/message.service");
exports.MessageService = message_service_1.MessageService;
var environment_service_1 = require("../../app/services/environment.service");
exports.EnvironmentService = environment_service_1.EnvironmentService;
var message_2 = require("../../app/models/message");
var environment_service_2 = require("../../app/services/environment.service");
var fake_chat_room_service_1 = require("../../testing/services/fake-chat-room.service");
exports.MESSAGES = [
    new message_2.Message(0, 'First Message', 1, 0),
    new message_2.Message(1, 'Second Message', 1, 0),
    new message_2.Message(2, 'Test 1', 1, 0),
    new message_2.Message(3, 'Test 2', 1, 0),
    new message_2.Message(4, 'Long Message', 1, 0),
    new message_2.Message(5, 'Very Long Message', 1, 0)
];
// Dummy MessageService. Pretend it makes real http requests 
var FakeMessageService = (function () {
    function FakeMessageService(http) {
        this.http = http;
        this.chatRoomId = -1;
        this.messagesUrl = '';
        this.chatRoomsUrl = environment_service_2.EnvironmentService.getInstance().getApiUrl() + "/chat_rooms"; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.messages = exports.MESSAGES.map(function (m) { return m.clone(); });
        this.chatRooms = fake_chat_room_service_1.CHATROOMS.map(function (cr) { return cr.clone(); });
    }
    FakeMessageService.prototype.setUrl = function (chat_room_id) {
        this.messagesUrl = this.chatRoomsUrl + "/" + chat_room_id + "/messages";
        this.chatRoomId = chat_room_id;
    };
    FakeMessageService.prototype.getMessage = function (id) {
        var _this = this;
        if (!this.isValidChatRoom(this.chatRoomId)) {
            return this.lastPromise =
                Promise.reject("Chat Room " + this.chatRoomId + " not found");
        }
        var messageFound = this.messages.find(function (m) { return m.id === id
            && m.chat_room_id === _this.chatRoomId; });
        return this.lastPromise = Promise.resolve(messageFound);
    };
    FakeMessageService.prototype.getMessages = function () {
        var _this = this;
        if (!this.isValidChatRoom(this.chatRoomId)) {
            return this.lastPromise =
                Promise.reject("Chat Room " + this.chatRoomId + " not found");
        }
        var messagesFound = this.messages.filter(function (m) { return m.chat_room_id === _this.chatRoomId; });
        return this.lastPromise = Promise.resolve(messagesFound);
    };
    FakeMessageService.prototype.search = function (user_id) {
        var _this = this;
        var messagesFound = this.messages.filter(function (m) { return m.user_id === user_id
            && m.chat_room_id === _this.chatRoomId; });
        return this.lastPromise = Promise.resolve(messagesFound);
    };
    FakeMessageService.prototype.create = function (message) {
        this.messages.push(message);
        return this.lastPromise = Promise.resolve(message);
    };
    FakeMessageService.prototype.update = function (message) {
        return this.lastPromise = this.getMessage(message.id).then(function (m) {
            return m ?
                Object.assign(m, message) :
                Promise.reject("Message " + message.id + " not found");
        });
    };
    FakeMessageService.prototype.delete = function (message) {
        return this.lastPromise = this.getMessage(message.id).then(function (m) {
            return m ?
                Promise.resolve(null) :
                Promise.reject("Message " + message.id + " not found");
        });
    };
    FakeMessageService.prototype.handlePromiseError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    FakeMessageService.prototype.isValidChatRoom = function (chatRoomId) {
        var chatRoomFound = this.chatRooms.find(function (cr) { return cr.id === chatRoomId; });
        return chatRoomFound ? true : false;
    };
    return FakeMessageService;
}());
FakeMessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FakeMessageService);
exports.FakeMessageService = FakeMessageService;
//# sourceMappingURL=fake-message.service.js.map