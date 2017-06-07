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
var user_service_1 = require("../../../services/user.service");
var session_service_1 = require("../../../services/session.service");
var UserComponent = (function () {
    function UserComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.page = 'Admin User';
        this.response = 0;
        this.searchTerms = new Subject_1.Subject();
        this.deleteSubject = new Subject_1.Subject();
    }
    UserComponent.prototype.ngOnInit = function () {
        if (!session_service_1.SessionService.getInstance().isLoggedIn()) {
            this.router.navigate(['signin']);
        }
        this.setUsers();
    };
    UserComponent.prototype.ngAfterViewInit = function () {
        this.searchTerms.next('');
    };
    UserComponent.prototype.gotoDetail = function (user) {
        this.router.navigate(['/admin/user/detail', user.id]);
    };
    UserComponent.prototype.add = function () {
        this.router.navigate(['/admin/user/detail', -1]);
    };
    UserComponent.prototype.search = function (term) {
        // Push a search term into the observable stream.
        this.searchTerms.next(term);
    };
    UserComponent.prototype.delete = function (user) {
        var _this = this;
        this.userService
            .delete(user)
            .then(function () {
            _this.response = 1;
            _this.deleteSubject.next({ op: 'delete', id: user.id });
        })
            .catch(function () {
            _this.response = -1;
        });
    };
    UserComponent.prototype.setUsers = function () {
        var _this = this;
        this.users = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.userService.search(term)
            : _this.userService.search(''); })
            .catch(function () {
            _this.response = -1;
            return Observable_1.Observable.of([]);
        });
        this.users = this.users.merge(this.deleteSubject)
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
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        templateUrl: './user.component.html',
        providers: [session_service_1.SessionService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        user_service_1.UserService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map