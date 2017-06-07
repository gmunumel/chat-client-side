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
var user_1 = require("../../models/user");
var session_service_1 = require("../../services/session.service");
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        this.toggled = 'toggled';
    }
    AppComponent.prototype.ngOnInit = function () {
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
    AppComponent.prototype.toggleSidebar = function () {
        if (this.toggled === 'toggled') {
            this.toggled = '';
        }
        else {
            this.toggled = 'toggled';
        }
    };
    AppComponent.prototype.logOut = function () {
        session_service_1.SessionService.getInstance().clear();
        this.router.navigate(['dashboard']);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.sessionSubscription.unsubscribe();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./css/simple-sidebar.css', './css/styles.css'],
        providers: [session_service_1.SessionService]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map