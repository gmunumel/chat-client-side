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
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.usersUrl = environment_service_1.EnvironmentService.getInstance().getApiUrl() + "/users"; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserService.prototype.getUser = function (id) {
        var url = this.usersUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handlePromiseError);
    };
    UserService.prototype.getUsers = function (ids) {
        if (ids) {
            var stringIds = ids.map(String).join();
            this.usersUrl = this.usersUrl + "?ids=" + stringIds;
        }
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    UserService.prototype.search = function (name, email) {
        var url = this.usersUrl + "/search?name=" + name;
        if (email) {
            url = url + "&email=" + email;
        }
        return this.http.get(url)
            .map(function (res) { return res.json() || {}; })
            .catch(this.handleObservableError);
    };
    UserService.prototype.fetch = function (user) {
        var url = this.usersUrl + "/fetch?name=" + user.name + "&email=" + user.email;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    UserService.prototype.create = function (user) {
        var body = JSON.stringify({ name: user.name, email: user.email });
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.post(this.usersUrl, body, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handlePromiseError);
    };
    UserService.prototype.update = function (user) {
        var url = this.usersUrl + "/" + user.id;
        var body = JSON.stringify({ name: user.name, email: user.email });
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.put(url, body, options)
            .toPromise()
            .then(function () { return user; })
            .catch(this.handlePromiseError);
    };
    UserService.prototype.delete = function (user) {
        var url = this.usersUrl + "/" + user.id;
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.delete(url, options)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handlePromiseError);
    };
    UserService.prototype.handlePromiseError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    UserService.prototype.handleObservableError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map