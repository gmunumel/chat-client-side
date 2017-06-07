"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var sign_in_component_1 = require("./sign-in.component");
var user_service_1 = require("../../services/user.service");
var session_service_1 = require("../../services/session.service");
var fake_user_service_1 = require("../../../testing/services/fake-user.service");
var firstUser = fake_user_service_1.USERS[0];
describe('SignInComponent', function () {
    var de;
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, http_1.HttpModule],
            declarations: [sign_in_component_1.SignInComponent],
            providers: [session_service_1.SessionService],
        })
            .overrideComponent(sign_in_component_1.SignInComponent, {
            set: {
                providers: [
                    { provide: user_service_1.UserService, useClass: fake_user_service_1.FakeUserService },
                ]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(sign_in_component_1.SignInComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
    });
    it('should search component', function () { return expect(comp).toBeDefined(); });
    it('should have expected <h1> text', function () {
        fixture.detectChanges();
        var h1 = de.nativeElement;
        expect(h1.innerText).toMatch(/sign in/i, '<h1> should say something about "Sign In"');
    });
    it('user should update from form changes', testing_1.fakeAsync(function () {
        comp.signInForm.patchValue(firstUser);
        expect(comp.signInForm.value.name).toEqual(firstUser.name);
        expect(comp.signInForm.value.email).toEqual(firstUser.email);
    }));
    it('isValid should be false when form is invalid', testing_1.fakeAsync(function () {
        var isvalidTestUser = {
            name: 'testUserName',
            email: 'test@',
        };
        comp.signInForm.patchValue(isvalidTestUser);
        expect(comp.signInForm.valid).toBeFalsy();
    }));
    it('should update model on submit', testing_1.fakeAsync(function () {
        session_service_1.SessionService.getInstance().collection$.subscribe(function () { });
        session_service_1.SessionService.getInstance().clear();
        comp.signInForm.patchValue(firstUser);
        comp.doSignIn();
        testing_1.tick();
        expect(comp.response).toEqual(1);
        expect(localStorage.getItem('userName')).toEqual(firstUser.name);
        expect(localStorage.getItem('userEmail')).toEqual(firstUser.email);
        expect(comp.signInForm.value.name).toEqual(firstUser.name);
        expect(comp.signInForm.value.email).toEqual(firstUser.email);
    }));
    afterAll(function () {
        session_service_1.SessionService.getInstance().clear();
    });
});
//# sourceMappingURL=sign-in.component.spec.js.map