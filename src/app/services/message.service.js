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
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var environment_service_1 = require("./environment.service");
var MessageService = (function () {
    function MessageService(http) {
        this.http = http;
        this.chatRoomsUrl = environment_service_1.EnvironmentService.getInstance().getApiUrl() + "/chat_rooms"; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.messagesUrl = '';
    }
    MessageService.prototype.setUrl = function (chat_room_id) {
        this.messagesUrl = this.chatRoomsUrl + "/" + chat_room_id + "/messages";
    };
    MessageService.prototype.getMessage = function (id) {
        var url = this.messagesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handlePromiseError);
    };
    MessageService.prototype.getMessages = function () {
        return this.http.get(this.messagesUrl)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    MessageService.prototype.search = function (user_id) {
        var url = this.messagesUrl + "/search?user_id=" + user_id;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    MessageService.prototype.create = function (message) {
        var body = JSON.stringify({
            body: message.body,
            user_id: message.user_id,
            chat_room_id: message.chat_room_id
        });
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.post(this.messagesUrl, body, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    MessageService.prototype.update = function (message) {
        var url = this.messagesUrl + "/" + message.id;
        var body = JSON.stringify({
            body: message.body,
            user_id: message.user_id,
            chat_room_id: message.chat_room_id
        });
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.put(url, body, options)
            .toPromise()
            .then(function () { return message; })
            .catch(this.handlePromiseError);
    };
    MessageService.prototype.delete = function (message) {
        var url = this.messagesUrl + "/" + message.id;
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.delete(url, options)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handlePromiseError);
    };
    MessageService.prototype.handlePromiseError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map