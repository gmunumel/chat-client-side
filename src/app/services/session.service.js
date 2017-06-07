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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/share");
var SessionService = SessionService_1 = (function () {
    function SessionService() {
        var _this = this;
        this.collection = new Array();
        this.collection$ = new Observable_1.Observable(function (observer) {
            _this.collectionObserver = observer;
        }).share();
    }
    SessionService.getInstance = function () {
        if (SessionService_1.instance == null) {
            SessionService_1.instance = new SessionService_1();
        }
        return SessionService_1.instance;
    };
    SessionService.prototype.setUserId = function (userId) {
        var userIdStorage = localStorage.getItem('userId');
        if (userIdStorage) {
            return;
        }
        localStorage.setItem('userId', userId);
        this.collection.push(userId);
        this.collectionObserver.next(this.collection);
    };
    SessionService.prototype.setUserName = function (userName) {
        var userNameStorage = localStorage.getItem('userName');
        if (userNameStorage) {
            return;
        }
        localStorage.setItem('userName', userName);
        this.collection.push(userName);
        this.collectionObserver.next(this.collection);
    };
    SessionService.prototype.setUserEmail = function (userEmail) {
        var userEmailStorage = localStorage.getItem('userEmail');
        if (userEmailStorage) {
            return;
        }
        localStorage.setItem('userEmail', userEmail);
        this.collection.push(userEmail);
        this.collectionObserver.next(this.collection);
    };
    SessionService.prototype.isLoggedIn = function () {
        var userId = localStorage.getItem('userId');
        var userName = localStorage.getItem('userName');
        var userEmail = localStorage.getItem('userEmail');
        return (userId && userName && userEmail) ? true : false;
    };
    SessionService.prototype.load = function () {
        var userId = localStorage.getItem('userId');
        var userName = localStorage.getItem('userName');
        var userEmail = localStorage.getItem('userEmail');
        if (userId && userName && userEmail) {
            this.collection.push(userId);
            this.collection.push(userName);
            this.collection.push(userEmail);
        }
        this.collectionObserver.next(this.collection);
    };
    SessionService.prototype.clear = function () {
        localStorage.clear();
        this.collection = [];
        this.collectionObserver.next(this.collection);
    };
    return SessionService;
}());
SessionService = SessionService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SessionService);
exports.SessionService = SessionService;
var SessionService_1;
//# sourceMappingURL=session.service.js.map