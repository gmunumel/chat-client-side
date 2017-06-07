"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("../../../../testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var user_detail_component_1 = require("./user-detail.component");
var user_service_1 = require("../../../services/user.service");
var fake_user_service_1 = require("../../../../testing/services/fake-user.service");
var firstUser = fake_user_service_1.USERS[0];
describe('UserDetailComponent', function () {
    var activatedRoute;
    var comp;
    var fixture;
    var page;
    beforeEach(testing_1.async(function () {
        activatedRoute = new testing_2.ActivatedRouteStub();
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, http_1.HttpModule],
            declarations: [user_detail_component_1.UserDetailComponent],
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .overrideComponent(user_detail_component_1.UserDetailComponent, {
            set: {
                providers: [
                    { provide: user_service_1.UserService, useClass: fake_user_service_1.FakeUserService },
                ]
            }
        })
            .compileComponents();
    }));
    describe('when navigate to existing user', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: firstUser.id };
            createComponent();
        }));
        it('should create component', function () { return expect(comp).toBeDefined(); });
        it('should have expected <h1> text', function () {
            expect(page.pageName.textContent).toMatch(/admin user detail/i, '<h1> should say something about "Admin User Detail"');
        });
        it('user should update from form changes', testing_1.fakeAsync(function () {
            comp.userDetailForm.patchValue(firstUser);
            expect(comp.userDetailForm.value.name).toEqual(firstUser.name);
            expect(comp.userDetailForm.value.email).toEqual(firstUser.email);
        }));
        it('should be false when form is invalid', testing_1.fakeAsync(function () {
            var invalidTestUser = {
                name: 'testUserName',
                email: 'test@',
            };
            comp.userDetailForm.patchValue(invalidTestUser);
            expect(comp.userDetailForm.valid).toBeFalsy();
        }));
        it('should update model on submit', testing_1.fakeAsync(function () {
            comp.userDetailForm.patchValue(firstUser);
            comp.save();
            testing_1.tick();
            expect(comp.response).toBe(1);
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    describe('when navigate with user id -1', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: -1 };
            createComponent();
        }));
        it('should have user.id === -1', function () {
            expect(comp.userDetailForm.value.id).toBe(-1);
        });
        it('should display empty user name', function () {
            expect(page.nameDisplay.textContent).toBe('');
        });
    });
    describe('when navigate to non-existant user id', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: 99999 };
            createComponent();
        }));
        it('should try to navigate back to user list', testing_1.fakeAsync(function () {
            testing_1.tick();
            expect(page.goBackSpy.calls.any()).toBe(true, 'comp.goBack called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    /////////// Helpers /////
    // Create the UserDetailComponent, initialize it, set test variables 
    function createComponent() {
        fixture = testing_1.TestBed.createComponent(user_detail_component_1.UserDetailComponent);
        comp = fixture.componentInstance;
        page = new Page();
        // 1st change detection triggers ngOnInit which gets a user
        fixture.detectChanges();
        return fixture.whenStable().then(function () {
            // 2nd change detection displays the async-fetched user
            fixture.detectChanges();
            page.addPageElements();
        });
    }
    var Page = (function () {
        function Page() {
            var router = testing_1.TestBed.get(testing_2.Router); // get router from root injector
            this.goBackSpy = spyOn(comp, 'goBack').and.callThrough();
            this.navSpy = spyOn(router, 'navigate');
        }
        // Add page elements after user arrives 
        Page.prototype.addPageElements = function () {
            if (comp.userDetailForm) {
                // have a form group element so these elements are now in the DOM
                var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
                this.cancelBtn = buttons[0];
                this.saveBtn = buttons[1];
                this.pageName = fixture.debugElement.query(platform_browser_1.By.css('.admin-user-detail')).nativeElement;
                this.nameDisplay = fixture.debugElement.query(platform_browser_1.By.css('#name')).nativeElement;
            }
        };
        return Page;
    }());
});
//# sourceMappingURL=user-detail.component.spec.js.map