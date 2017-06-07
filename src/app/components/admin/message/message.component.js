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
var user_1 = require("../../../models/user");
var message_1 = require("../../../models/message");
var chat_message_1 = require("../../../models/chat-message");
var message_service_1 = require("../../../services/message.service");
var session_service_1 = require("../../../services/session.service");
var socket_service_1 = require("../../../services/socket.service");
var user_service_1 = require("../../../services/user.service");
var MessageComponent = (function () {
    function MessageComponent(fb, route, router, messageService, socketService, userService, ngZone) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.messageService = messageService;
        this.socketService = socketService;
        this.userService = userService;
        this.ngZone = ngZone;
        this.page = 'Admin Message';
        this.response = 0;
        this.chatRoomId = -1;
        this.messageForm = this.fb.group({
            id: [-1],
            body: [''],
            user_id: [1],
            chat_room_id: [1] // default chat room id
        });
    }
    MessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!session_service_1.SessionService.getInstance().isLoggedIn()) {
            this.router.navigate(['signin']);
        }
        this.getUsers();
        this.paramsSubscription = this.route.params
            .subscribe(function (p) { return _this.getMessage(+p['chat_room_id']); });
        this.loadSession();
        this.syncMessages();
        this.scrollToBottom();
    };
    MessageComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    MessageComponent.prototype.save = function () {
        var _this = this;
        if (this.messageForm.value.body === '' || this.chatRoomId === -1) {
            return;
        }
        var message = new message_1.Message();
        message.body = this.messageForm.value.body;
        message.chat_room_id = this.chatRoomId;
        message.user_id = this.user.id;
        this.messageService.setUrl(this.chatRoomId);
        this.messageService.create(message)
            .then(function (msg) {
            _this.response = 1;
            _this.messages.push(new chat_message_1.ChatMessage(msg, _this.user));
            _this.messageForm.reset();
            _this.socketService.emit(msg); // emit message to node server
        })
            .catch(function (error) {
            _this.response = -1;
        });
    };
    MessageComponent.prototype.showMessage = function (chatRoomId) {
        this.chatRoomId = chatRoomId;
        this.getMessage(this.chatRoomId);
    };
    MessageComponent.prototype.gotoDetail = function (message) {
        this.router.navigate(["admin/chat-room/" + this.chatRoomId + "/message/detail/" + message.id]);
    };
    MessageComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.sessionSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
        this.chatSubscription.unsubscribe();
    };
    MessageComponent.prototype.getMessage = function (chatRoomId) {
        var _this = this;
        // in case we haven't selected a chat room
        if (chatRoomId === -1) {
            return;
        }
        this.messages = [];
        this.chatRoomId = chatRoomId;
        this.messageService.setUrl(this.chatRoomId);
        this.messageService.getMessages()
            .then(function (messages) {
            _this.response = 1;
            _this.mergeMessagesAndUsers(messages, _this.users);
        })
            .catch(function () {
            _this.response = -1;
        });
    };
    MessageComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .then(function (users) {
            _this.users = users;
        })
            .catch(function () {
            _this.response = -1;
        });
    };
    MessageComponent.prototype.loadSession = function () {
        var _this = this;
        this.sessionSubscription = session_service_1.SessionService.getInstance().collection$
            .subscribe(function (latestCollection) {
            _this.user = new user_1.User;
            _this.user.id = latestCollection[0];
            _this.user.name = latestCollection[1];
            _this.user.email = latestCollection[2];
        });
        session_service_1.SessionService.getInstance().load();
    };
    MessageComponent.prototype.syncMessages = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.chatSubscription = _this.socketService.receive()
                .subscribe(function (message) {
                // Come back into Angular zone when there is a callback from the Observable
                _this.ngZone.run(function () {
                    if (message.chat_room_id === _this.chatRoomId
                        && message.user_id != _this.user.id) {
                        var foundUser = _this.users.find(function (user) { return user.id === message.user_id; });
                        _this.messages.push(new chat_message_1.ChatMessage(message, foundUser));
                    }
                });
            });
        });
    };
    MessageComponent.prototype.scrollToBottom = function () {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
            this.response = -1;
        }
    };
    MessageComponent.prototype.mergeMessagesAndUsers = function (messages, users) {
        var _this = this;
        messages.forEach(function (message) {
            var foundUser = users.find(function (user) { return user.id === message.user_id; });
            _this.messages.push(new chat_message_1.ChatMessage(message, foundUser));
        });
    };
    return MessageComponent;
}());
__decorate([
    core_1.ViewChild('scrollMe'),
    __metadata("design:type", core_1.ElementRef)
], MessageComponent.prototype, "myScrollContainer", void 0);
MessageComponent = __decorate([
    core_1.Component({
        selector: 'message',
        templateUrl: './message.component.html',
        styleUrls: ['./resources/css/message.component.css'],
        providers: [session_service_1.SessionService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.ActivatedRoute,
        router_1.Router,
        message_service_1.MessageService,
        socket_service_1.SocketService,
        user_service_1.UserService,
        core_1.NgZone])
], MessageComponent);
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map