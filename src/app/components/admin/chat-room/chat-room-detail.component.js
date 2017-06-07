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
var chat_room_1 = require("../../../models/chat-room");
var chat_room_service_1 = require("../../../services/chat-room.service");
var session_service_1 = require("../../../services/session.service");
var ChatRoomDetailComponent = (function () {
    function ChatRoomDetailComponent(fb, chatRoomService, route, router) {
        this.fb = fb;
        this.chatRoomService = chatRoomService;
        this.route = route;
        this.router = router;
        this.page = 'Admin Chat Room Detail';
        this.response = 0;
        this.chatRoomDetailForm = this.fb.group({
            id: [-1],
            title: ['', forms_1.Validators.required],
            created_id: [1],
            sender_id: [1],
            recipient_id: [1],
        });
    }
    ChatRoomDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!session_service_1.SessionService.getInstance().isLoggedIn()) {
            this.router.navigate(['signin']);
        }
        this.paramsSubscription = this.route.params
            .subscribe(function (p) { return _this.getChatRoom(+p['id']); });
    };
    ChatRoomDetailComponent.prototype.save = function () {
        var chatRoom = new chat_room_1.ChatRoom();
        Object.assign(chatRoom, this.chatRoomDetailForm.value);
        this.saveOrUpdate(chatRoom);
    };
    ChatRoomDetailComponent.prototype.goBack = function () {
        this.router.navigate(['/admin/chat-room']);
    };
    ChatRoomDetailComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.paramsSubscription.unsubscribe();
    };
    ChatRoomDetailComponent.prototype.getChatRoom = function (id) {
        var _this = this;
        // when id===-1, create new chat room
        if (id === -1) {
            return;
        }
        this.chatRoomService.getChatRoom(id)
            .then(function (chatRoom) {
            _this.chatRoomDetailForm.patchValue(chatRoom);
        })
            .catch(function () {
            _this.goBack();
        });
    };
    ChatRoomDetailComponent.prototype.saveOrUpdate = function (chatRoom) {
        var _this = this;
        if (chatRoom.id === -1) {
            this.chatRoomService.create(chatRoom)
                .then(function () {
                _this.response = 1; // It will be lost
                _this.goBack();
            })
                .catch(function (error) {
                return (error.status === 409) ? _this.response = -2 : _this.response = -1;
            });
        }
        else {
            this.chatRoomService.update(chatRoom)
                .then(function () {
                _this.response = 1; // It will be lost
                _this.goBack();
            })
                .catch(function (error) {
                return (error.status === 409) ? _this.response = -2 : _this.response = -1;
            });
        }
    };
    return ChatRoomDetailComponent;
}());
ChatRoomDetailComponent = __decorate([
    core_1.Component({
        selector: 'admin-chat-room-detail',
        templateUrl: './chat-room-detail.component.html',
        providers: [session_service_1.SessionService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        chat_room_service_1.ChatRoomService,
        router_1.ActivatedRoute,
        router_1.Router])
], ChatRoomDetailComponent);
exports.ChatRoomDetailComponent = ChatRoomDetailComponent;
//# sourceMappingURL=chat-room-detail.component.js.map