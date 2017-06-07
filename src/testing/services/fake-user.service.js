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
var user_1 = require("../../app/models/user");
exports.User = user_1.User;
var user_service_1 = require("../../app/services/user.service");
exports.UserService = user_service_1.UserService;
var environment_service_1 = require("../../app/services/environment.service");
exports.EnvironmentService = environment_service_1.EnvironmentService;
var user_2 = require("../../app/models/user");
var environment_service_2 = require("../../app/services/environment.service");
exports.USERS = [
    new user_2.User(0, 'Bob', 'bob@example.com'),
    new user_2.User(1, 'Carol', 'carol@example.com'),
    new user_2.User(2, 'Ted', 'ted@example.com'),
    new user_2.User(3, 'Alice', 'alice@example.com'),
    new user_2.User(4, 'Speedy', 'speedy@example.com'),
    new user_2.User(5, 'Stealthy', 'stealthy@example.com')
];
// Dummy UserService. Pretend it makes real http requests 
var FakeUserService = (function () {
    function FakeUserService(http) {
        this.http = http;
        this.usersUrl = environment_service_2.EnvironmentService.getInstance().getApiUrl() + "/users"; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.users = exports.USERS.map(function (u) { return u.clone(); });
    }
    FakeUserService.prototype.getUser = function (id) {
        var userFound = this.users.find(function (u) { return u.id === id; });
        return this.lastPromise = Promise.resolve(userFound);
    };
    FakeUserService.prototype.getUsers = function (ids) {
        if (ids) {
            var filteredUsers = this.users.filter(function (u) { return ids.indexOf(u.id) >= 0; });
            return this.lastPromise = Promise.resolve(filteredUsers);
        }
        return this.lastPromise = Promise.resolve(this.users);
    };
    FakeUserService.prototype.search = function (name, email) {
        var userFound = null;
        if (email) {
            userFound = this.users.find(function (u) { return u.name === name && u.email === email; });
        }
        else {
            userFound = (name === '') ? this.users : this.users.find(function (u) { return u.name === name; });
        }
        this.lastObservable = (userFound) ? Observable_1.Observable.of(userFound) : Observable_1.Observable.of(null);
        return this.lastObservable;
    };
    FakeUserService.prototype.fetch = function (user) {
        var userFound = this.users.find(function (u) { return u.name === user.name && u.email === user.email; });
        return this.lastPromise = Promise.resolve(userFound);
    };
    FakeUserService.prototype.create = function (user) {
        var _this = this;
        return this.search(user.name, user.email).toPromise().then(function (u) {
            if (u) {
                return Promise.reject({ status: 409 });
            }
            else {
                _this.users.push(user);
                return _this.lastPromise = Promise.resolve(user);
            }
        });
    };
    FakeUserService.prototype.update = function (user) {
        return this.lastPromise = this.getUser(user.id).then(function (u) {
            return u ?
                Object.assign(u, user) :
                Promise.reject("User " + user.id + " not found");
        });
    };
    FakeUserService.prototype.delete = function (user) {
        return this.lastPromise = this.getUser(user.id).then(function (u) {
            return u ?
                Promise.resolve(null) :
                Promise.reject("User " + user.id + " not found");
        });
    };
    FakeUserService.prototype.handlePromiseError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    FakeUserService.prototype.handleObservableError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    return FakeUserService;
}());
FakeUserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FakeUserService);
exports.FakeUserService = FakeUserService;
//# sourceMappingURL=fake-user.service.js.map