"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var sign_up_component_1 = require("./sign-up.component");
var user_service_1 = require("../../services/user.service");
var fake_user_service_1 = require("../../../testing/services/fake-user.service");
var firstUser = fake_user_service_1.USERS[0];
describe('SignUpComponent', function () {
    var de;
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, http_1.HttpModule],
            declarations: [sign_up_component_1.SignUpComponent],
        })
            .overrideComponent(sign_up_component_1.SignUpComponent, {
            set: {
                providers: [
                    { provide: user_service_1.UserService, useClass: fake_user_service_1.FakeUserService },
                ]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(sign_up_component_1.SignUpComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('should have expected <h1> text', function () {
        fixture.detectChanges();
        var h1 = de.nativeElement;
        expect(h1.innerText).toMatch(/sign up/i, '<h1> should say something about "Sign Up"');
    });
    it('user should update from form changes', testing_1.fakeAsync(function () {
        comp.signUpForm.patchValue(firstUser);
        expect(comp.signUpForm.value.name).toEqual(firstUser.name);
        expect(comp.signUpForm.value.email).toEqual(firstUser.email);
    }));
    it('isValid should be false when form is invalid', testing_1.fakeAsync(function () {
        var isvalidTestUser = {
            name: 'testUserName',
            email: 'test@',
        };
        comp.signUpForm.patchValue(isvalidTestUser);
        expect(comp.signUpForm.valid).toBeFalsy();
    }));
    it('should not create an user who already exists', testing_1.fakeAsync(function () {
        comp.signUpForm.patchValue(firstUser);
        comp.doSignUp();
        testing_1.tick();
        expect(comp.response).toEqual(-2);
    }));
    it('should update model on submit', testing_1.fakeAsync(function () {
        var validTestUser = {
            name: 'testUserName',
            email: 'testUserName@example.com',
        };
        comp.signUpForm.patchValue(validTestUser);
        comp.doSignUp();
        testing_1.tick();
        expect(comp.response).toEqual(1);
        expect(comp.signUpForm.value.name).toEqual(validTestUser.name);
        expect(comp.signUpForm.value.email).toEqual(validTestUser.email);
    }));
});
//# sourceMappingURL=sign-up.component.spec.js.map