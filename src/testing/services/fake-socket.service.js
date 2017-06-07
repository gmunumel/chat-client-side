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
// Observable class extensions
require("rxjs/add/observable/of");
// re-export for tester convenience
var socket_service_1 = require("../../app/services/socket.service");
exports.SocketService = socket_service_1.SocketService;
var message_1 = require("../../app/models/message");
exports.Message = message_1.Message;
var environment_service_1 = require("../../app/services/environment.service");
exports.EnvironmentService = environment_service_1.EnvironmentService;
var message_2 = require("../../app/models/message");
var environment_service_2 = require("../../app/services/environment.service");
// Dummy ChatService. Pretend it emit real data 
var FakeSocketService = (function () {
    function FakeSocketService() {
        this.url = environment_service_2.EnvironmentService.getInstance().getSocketUrl();
        this.channel = 'messages';
    }
    FakeSocketService.prototype.emit = function (message) {
    };
    FakeSocketService.prototype.receive = function () {
        return Observable_1.Observable.of(new message_2.Message);
    };
    return FakeSocketService;
}());
FakeSocketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], FakeSocketService);
exports.FakeSocketService = FakeSocketService;
//# sourceMappingURL=fake-socket.service.js.map