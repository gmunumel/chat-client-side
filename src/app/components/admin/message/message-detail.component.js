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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var message_1 = require("../../../models/message");
var message_service_1 = require("../../../services/message.service");
var session_service_1 = require("../../../services/session.service");
var MessageDetailComponent = (function () {
    function MessageDetailComponent(fb, messageService, route, router) {
        this.fb = fb;
        this.messageService = messageService;
        this.route = route;
        this.router = router;
        this.page = 'Admin Message Detail';
        this.response = 0;
        this.chatRoomId = -1;
        this.messageDetailForm = this.fb.group({
            id: [-1],
            body: ['', forms_1.Validators.required],
            user_id: [1],
            chat_room_id: [1] // default chat room id
        });
    }
    MessageDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!session_service_1.SessionService.getInstance().isLoggedIn()) {
            this.router.navigate(['signin']);
        }
        this.paramsSubscription = this.route.params
            .subscribe(function (p) { return _this.getMessage(+p['id'], +p['chat_room_id']); });
    };
    MessageDetailComponent.prototype.update = function () {
        var _this = this;
        var message = new message_1.Message();
        Object.assign(message, this.messageDetailForm.value);
        this.messageService.setUrl(this.chatRoomId);
        this.messageService.update(message)
            .then(function () {
            _this.response = 1; // It will be lost
            _this.goBack();
        })
            .catch(function (error) {
            _this.response = -1;
        });
    };
    MessageDetailComponent.prototype.delete = function () {
        var _this = this;
        var message = new message_1.Message();
        Object.assign(message, this.messageDetailForm.value);
        this.messageService.setUrl(this.chatRoomId);
        this.messageService.delete(message)
            .then(function () {
            _this.response = 1; // It will be lost
            _this.goBack();
        })
            .catch(function () {
            _this.response = -1;
        });
    };
    MessageDetailComponent.prototype.goBack = function () {
        this.router.navigate(["/admin/chat-room/" + this.chatRoomId + "/message"]);
    };
    MessageDetailComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.paramsSubscription.unsubscribe();
    };
    MessageDetailComponent.prototype.getMessage = function (messageId, chatRoomId) {
        var _this = this;
        if (chatRoomId === -1) {
            this.goBack();
        }
        this.chatRoomId = chatRoomId;
        this.messageService.setUrl(this.chatRoomId);
        this.messageService.getMessage(messageId)
            .then(function (message) {
            message ? _this.messageDetailForm.patchValue(message) : _this.goBack();
        })
            .catch(function () {
            _this.goBack();
        });
    };
    return MessageDetailComponent;
}());
MessageDetailComponent = __decorate([
    core_1.Component({
        selector: 'message-detail',
        templateUrl: './message-detail.component.html',
        styleUrls: ['./resources/css/message-detail.component.css'],
        providers: [session_service_1.SessionService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        message_service_1.MessageService,
        router_1.ActivatedRoute,
        router_1.Router])
], MessageDetailComponent);
exports.MessageDetailComponent = MessageDetailComponent;
//# sourceMappingURL=message-detail.component.js.map