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
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var environment_service_1 = require("./environment.service");
var ChatRoomService = (function () {
    function ChatRoomService(http) {
        this.http = http;
        this.chatRoomsUrl = environment_service_1.EnvironmentService.getInstance().getApiUrl() + "/chat_rooms"; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    ChatRoomService.prototype.getChatRoom = function (id) {
        var url = this.chatRoomsUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handlePromiseError);
    };
    ChatRoomService.prototype.getChatRooms = function () {
        return this.http.get(this.chatRoomsUrl)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    ChatRoomService.prototype.search = function (title) {
        var url = this.chatRoomsUrl + "/search?title=" + title;
        return this.http.get(url)
            .map(function (res) { return res.json() || {}; })
            .catch(this.handleObservableError);
    };
    ChatRoomService.prototype.create = function (chatRoom) {
        var body = JSON.stringify({
            title: chatRoom.title,
            created_id: chatRoom.created_id,
            sender_id: chatRoom.sender_id,
            recipient_id: chatRoom.recipient_id
        });
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.post(this.chatRoomsUrl, body, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    ChatRoomService.prototype.update = function (chatRoom) {
        var url = this.chatRoomsUrl + "/" + chatRoom.id;
        var body = JSON.stringify({
            title: chatRoom.title,
            created_id: chatRoom.created_id,
            sender_id: chatRoom.sender_id,
            recipient_id: chatRoom.recipient_id
        });
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.put(url, body, options)
            .toPromise()
            .then(function () { return chatRoom; })
            .catch(this.handlePromiseError);
    };
    ChatRoomService.prototype.delete = function (chatRoom) {
        var url = this.chatRoomsUrl + "/" + chatRoom.id;
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.delete(url, options)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handlePromiseError);
    };
    ChatRoomService.prototype.handlePromiseError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ChatRoomService.prototype.handleObservableError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    return ChatRoomService;
}());
ChatRoomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ChatRoomService);
exports.ChatRoomService = ChatRoomService;
//# sourceMappingURL=chat-room.service.js.map