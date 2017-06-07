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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/scan");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var chat_room_service_1 = require("../../../services/chat-room.service");
var session_service_1 = require("../../../services/session.service");
var ChatRoomComponent = (function () {
    function ChatRoomComponent(router, chatRoomService) {
        this.router = router;
        this.chatRoomService = chatRoomService;
        this.page = 'Admin Chat Room';
        this.response = 0;
        this.messageVersionInput = false;
        this.messageSelectedChatRoomId = -1;
        this.getChatRoomId = new core_1.EventEmitter();
        this.searchTerms = new Subject_1.Subject();
        this.deleteSubject = new Subject_1.Subject();
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
        if (!session_service_1.SessionService.getInstance().isLoggedIn()) {
            this.router.navigate(['signin']);
        }
        this.setChatRooms();
    };
    ChatRoomComponent.prototype.ngAfterViewInit = function () {
        this.searchTerms.next('');
    };
    ChatRoomComponent.prototype.gotoDetail = function (chatRoom) {
        this.selectedChatRoomId = chatRoom.id;
        if (this.messageVersionInput) {
            this.getChatRoomId.emit(chatRoom.id);
        }
        else {
            this.router.navigate(['/admin/chat-room/detail', chatRoom.id]);
        }
    };
    ChatRoomComponent.prototype.add = function () {
        this.router.navigate(['/admin/chat-room/detail', -1]);
    };
    ChatRoomComponent.prototype.search = function (term) {
        // Push a search term into the observable stream.
        this.searchTerms.next(term);
    };
    ChatRoomComponent.prototype.delete = function (chatRoom) {
        var _this = this;
        this.chatRoomService
            .delete(chatRoom)
            .then(function () {
            _this.response = 1;
            _this.deleteSubject.next({ op: 'delete', id: chatRoom.id });
        })
            .catch(function () {
            _this.response = -1;
        });
    };
    ChatRoomComponent.prototype.setChatRooms = function () {
        var _this = this;
        this.selectedChatRoomId = this.messageSelectedChatRoomId;
        this.chatRooms = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.chatRoomService.search(term)
            : _this.chatRoomService.search(''); })
            .catch(function () {
            _this.response = -1;
            return Observable_1.Observable.of([]);
        });
        this.chatRooms = this.chatRooms.merge(this.deleteSubject)
            .startWith([])
            .scan(function (acc, val) {
            if (val.op && val.op === 'delete') {
                var index = acc.findIndex(function (elt) { return elt.id === val.id; });
                acc.splice(index, 1);
                return acc;
            }
            else {
                return val;
            }
        });
    };
    return ChatRoomComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ChatRoomComponent.prototype, "messageVersionInput", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ChatRoomComponent.prototype, "messageSelectedChatRoomId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ChatRoomComponent.prototype, "getChatRoomId", void 0);
ChatRoomComponent = __decorate([
    core_1.Component({
        selector: 'chat-room',
        templateUrl: './chat-room.component.html',
        styleUrls: ['./chat-room.component.css'],
        providers: [session_service_1.SessionService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        chat_room_service_1.ChatRoomService])
], ChatRoomComponent);
exports.ChatRoomComponent = ChatRoomComponent;
//# sourceMappingURL=chat-room.component.js.map