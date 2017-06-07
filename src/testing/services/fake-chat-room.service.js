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
var Observable_1 = require("rxjs/Observable");
// Observable class extensions
require("rxjs/add/observable/of");
// re-export for tester convenience
var chat_room_1 = require("../../app/models/chat-room");
exports.ChatRoom = chat_room_1.ChatRoom;
var chat_room_service_1 = require("../../app/services/chat-room.service");
exports.ChatRoomService = chat_room_service_1.ChatRoomService;
var environment_service_1 = require("../../app/services/environment.service");
exports.EnvironmentService = environment_service_1.EnvironmentService;
var chat_room_2 = require("../../app/models/chat-room");
var environment_service_2 = require("../../app/services/environment.service");
exports.CHATROOMS = [
    new chat_room_2.ChatRoom(0, 'Music', 1),
    new chat_room_2.ChatRoom(1, 'Programming', 1),
    new chat_room_2.ChatRoom(2, 'Television', 1),
    new chat_room_2.ChatRoom(3, 'Movies', 1),
    new chat_room_2.ChatRoom(4, 'Sex', 1),
    new chat_room_2.ChatRoom(5, 'Random', 1)
];
// Dummy ChatRoomService. Pretend it makes real http requests 
var FakeChatRoomService = (function () {
    function FakeChatRoomService(http) {
        this.http = http;
        this.chatRoomsUrl = environment_service_2.EnvironmentService.getInstance().getApiUrl() + "/chat_rooms"; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.chatRooms = exports.CHATROOMS.map(function (cr) { return cr.clone(); });
    }
    FakeChatRoomService.prototype.getChatRoom = function (id) {
        var userFound = this.chatRooms.find(function (cr) { return cr.id === id; });
        return this.lastPromise = Promise.resolve(userFound);
    };
    FakeChatRoomService.prototype.getChatRooms = function () {
        return this.lastPromise = Promise.resolve(this.chatRooms);
    };
    FakeChatRoomService.prototype.search = function (title) {
        var chatRoomFound = null;
        chatRoomFound = (title === '') ? this.chatRooms : this.chatRooms.find(function (cr) { return cr.title === title; });
        this.lastObservable = (chatRoomFound) ? Observable_1.Observable.of(chatRoomFound) : Observable_1.Observable.of(null);
        return this.lastObservable;
    };
    FakeChatRoomService.prototype.fetch = function (chatRoom) {
        var chatRoomFound = this.chatRooms.find(function (cr) { return cr.title === chatRoom.title; });
        return this.lastPromise = Promise.resolve(chatRoomFound);
    };
    FakeChatRoomService.prototype.create = function (chatRoom) {
        var _this = this;
        return this.search(chatRoom.title).toPromise().then(function (cr) {
            if (cr) {
                return Promise.reject({ status: 409 });
            }
            else {
                _this.chatRooms.push(chatRoom);
                return _this.lastPromise = Promise.resolve(chatRoom);
            }
        });
    };
    FakeChatRoomService.prototype.update = function (chatRoom) {
        return this.lastPromise = this.getChatRoom(chatRoom.id).then(function (cr) {
            return cr ?
                Object.assign(cr, chatRoom) :
                Promise.reject("ChatRoom " + chatRoom.id + " not found");
        });
    };
    FakeChatRoomService.prototype.delete = function (chatRoom) {
        return this.lastPromise = this.getChatRoom(chatRoom.id).then(function (cr) {
            return cr ?
                Promise.resolve(null) :
                Promise.reject("ChatRoom " + chatRoom.id + " not found");
        });
    };
    FakeChatRoomService.prototype.handlePromiseError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    FakeChatRoomService.prototype.handleObservableError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    return FakeChatRoomService;
}());
FakeChatRoomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FakeChatRoomService);
exports.FakeChatRoomService = FakeChatRoomService;
//# sourceMappingURL=fake-chat-room.service.js.map