"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("../../../../testing");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var user_component_1 = require("./user.component");
var user_service_1 = require("../../../services/user.service");
var fake_user_service_1 = require("../../../../testing/services/fake-user.service");
describe('UserComponent', function () {
    var comp;
    var fixture;
    var page;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            declarations: [user_component_1.UserComponent],
            providers: [
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .overrideComponent(user_component_1.UserComponent, {
            set: {
                providers: [
                    { provide: user_service_1.UserService, useClass: fake_user_service_1.FakeUserService },
                ]
            }
        })
            .compileComponents()
            .then(createComponent);
    }));
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('should have expected <h1> text', function () {
        expect(page.pageName.textContent).toMatch(/admin user/i, '<h1> should say something about "Admin User"');
    });
    it('should display users', function () {
        var allUsers = fake_user_service_1.USERS;
        var displayUsers = page.userRows;
        expect(page.userRows.length).toBeGreaterThan(0);
        expect(allUsers.length).toBe(displayUsers.length);
    });
    it('1st user should match 1st test user', function () {
        var expectedUser = fake_user_service_1.USERS[0];
        var actualUser = page.userRows[0].value;
        expect(actualUser).toContain(expectedUser.name, 'user.name');
    });
    it('should navigate to selected user detail on click', testing_1.fakeAsync(function () {
        var expectedUser = fake_user_service_1.USERS[1];
        var input = page.userRows[1];
        input.dispatchEvent(testing_2.newEvent('click'));
        testing_1.tick();
        // should have navigated
        expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
        // composed user detail will be URL like 'users/42'
        // expect link array with the route path and user id
        // first argument to router.navigate is link array
        var navArgs = page.navSpy.calls.first().args[0];
        expect(navArgs[0]).toContain('user', 'nav to user detail URL');
        expect(navArgs[1]).toBe(expectedUser.id, 'expected user.id');
    }));
    it('should navigate to add user on click', testing_1.fakeAsync(function () {
        var btn = page.addUserBtn;
        btn.dispatchEvent(testing_2.newEvent('click'));
        testing_1.tick();
        // should have navigated
        expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
        // composed user detail will be URL like 'users/42'
        // expect link array with the route path and user id
        // first argument to router.navigate is link array
        var navArgs = page.navSpy.calls.first().args[0];
        expect(navArgs[0]).toContain('user', 'nav to user detail URL');
        expect(navArgs[1]).toBe(-1, 'expected to be -1');
    }));
    it('should delete an user', testing_1.fakeAsync(function () {
        var deletedUser = fake_user_service_1.USERS[1];
        var oldUsersLength = page.userRows.length;
        comp.delete(deletedUser);
        testing_1.tick();
        expect(comp.response).toBe(1);
        // wait for ui to be complete updated
        fixture.whenStable().then(function () {
            fixture.detectChanges();
            var newUsers = fixture.debugElement.queryAll(platform_browser_1.By.css('.users')).map(function (de) { return de.nativeElement; });
            var newUsersLength = newUsers.length;
            expect(newUsersLength).toBe(oldUsersLength - 1, 'no of users must be minus one');
            expect(newUsers.some(function (userName) { return userName === deletedUser.name; }))
                .toBe(false, 'user does not exists');
        });
    }));
    /////////// Helpers /////
    // Create the component and set the `page` test variables 
    function createComponent() {
        fixture = testing_1.TestBed.createComponent(user_component_1.UserComponent);
        comp = fixture.componentInstance;
        // change detection triggers ngOnInit which gets an user
        fixture.detectChanges();
        return fixture.whenStable().then(function () {
            // got the users and updated component
            // change detection updates the view
            fixture.detectChanges();
            page = new Page();
        });
    }
    var Page = (function () {
        function Page() {
            this.userRows = fixture.debugElement.queryAll(platform_browser_1.By.css('.users')).map(function (de) { return de.nativeElement; });
            // Get the component's injected router and spy on it
            var router = fixture.debugElement.injector.get(testing_2.Router);
            this.navSpy = spyOn(router, 'navigate');
            this.pageName = fixture.debugElement.query(platform_browser_1.By.css('.admin-user')).nativeElement;
            this.addUserBtn = fixture.debugElement.query(platform_browser_1.By.css('#add-user')).nativeElement;
        }
        ;
        return Page;
    }());
});
//# sourceMappingURL=user.component.spec.js.map