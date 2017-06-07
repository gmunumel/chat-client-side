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
var user_service_1 = require("../../../services/user.service");
var session_service_1 = require("../../../services/session.service");
var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
var UserDetailComponent = (function () {
    function UserDetailComponent(fb, userService, route, router) {
        this.fb = fb;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.page = 'Admin User Detail';
        this.response = 0;
        this.userDetailForm = this.fb.group({
            id: [-1],
            name: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(emailRegex)]],
        });
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!session_service_1.SessionService.getInstance().isLoggedIn()) {
            this.router.navigate(['signin']);
        }
        this.paramsSubscription = this.route.params
            .subscribe(function (p) { return _this.getUser(+p['id']); });
    };
    UserDetailComponent.prototype.save = function () {
        var user = new user_1.User();
        Object.assign(user, this.userDetailForm.value);
        this.saveOrUpdate(user);
    };
    UserDetailComponent.prototype.goBack = function () {
        this.router.navigate(['/admin/user']);
    };
    UserDetailComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.paramsSubscription.unsubscribe();
    };
    UserDetailComponent.prototype.getUser = function (id) {
        var _this = this;
        // when id===-1, create new user
        if (id === -1) {
            return;
        }
        this.userService.getUser(id)
            .then(function (user) {
            _this.userDetailForm.patchValue(user);
        })
            .catch(function () {
            _this.goBack();
        });
    };
    UserDetailComponent.prototype.saveOrUpdate = function (user) {
        var _this = this;
        if (user.id === -1) {
            this.userService.create(user)
                .then(function () {
                _this.response = 1; // It will be lost
                _this.goBack();
            })
                .catch(function (error) {
                return (error.status === 409) ? _this.response = -2 : _this.response = -1;
            });
        }
        else {
            this.userService.update(user)
                .then(function () {
                _this.response = 1; // It will be lost
                _this.goBack();
            })
                .catch(function (error) {
                return (error.status === 409) ? _this.response = -2 : _this.response = -1;
            });
        }
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    core_1.Component({
        selector: 'admin-user-detail',
        templateUrl: './user-detail.component.html',
        providers: [session_service_1.SessionService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map