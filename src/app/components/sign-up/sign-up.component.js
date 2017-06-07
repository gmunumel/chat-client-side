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
var forms_1 = require("@angular/forms");
var user_1 = require("../../models/user");
var user_service_1 = require("../../services/user.service");
var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
var SignUpComponent = (function () {
    function SignUpComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.page = 'Sign Up';
        this.response = 0;
        this.signUpForm = this.fb.group({
            id: [-1],
            name: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(emailRegex)]],
        });
    }
    SignUpComponent.prototype.doSignUp = function () {
        var _this = this;
        this.user = new user_1.User();
        Object.assign(this.user, this.signUpForm.value);
        this.userService.create(this.user)
            .then(function (user) {
            _this.response = 1;
        })
            .catch(function (error) {
            return (error.status === 409) ? _this.response = -2 : _this.response = -1;
        });
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    core_1.Component({
        selector: 'sign-up',
        templateUrl: './sign-up.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=sign-up.component.js.map