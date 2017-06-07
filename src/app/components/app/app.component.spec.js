"use strict";
var app_component_1 = require("./app.component");
var testing_1 = require("../../../testing");
var testing_2 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
describe('AppComponent', function () {
    var comp;
    var fixture;
    var links;
    var linkDes;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent, testing_1.RouterLinkStubDirective, testing_1.RouterOutletStubComponent],
            providers: [
                { provide: testing_1.Router, useClass: testing_1.RouterStub },
            ]
        })
            .compileComponents()
            .then(function () {
            fixture = testing_2.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
            // trigger initial data binding
            fixture.detectChanges();
            // find DebugElements with an attached RouterLinkStubDirective
            linkDes = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(testing_1.RouterLinkStubDirective));
            // get the attached link directive instances using the DebugElement injectors
            links = linkDes
                .map(function (dex) { return dex.injector.get(testing_1.RouterLinkStubDirective); });
        });
    }));
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('can get RouterLinks from template', function () {
        expect(links.length).toBe(4, 'should have 4 links');
        expect(links[0].linkParams[0]).toBe('/dashboard', '1st link should go to Dashboard');
        expect(links[1].linkParams[0]).toBe('/signin', '2nd link should go to Sign In');
        expect(links[2].linkParams[0]).toBe('/signup', '3rd link should go to Sign Up');
        expect(links[3].linkParams[0]).toBe('/about', '4th link should go to About');
    });
    it('can click Sign In link in template', function () {
        var signInLinkDe = linkDes[1];
        var signInLink = links[1];
        expect(signInLink.navigatedTo).toBeNull('link should not have navigated yet');
        signInLinkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(signInLink.navigatedTo[0]).toBe('/signin');
    });
    it('can click Sign Up link in template', function () {
        var signUpLinkDe = linkDes[2];
        var signUpLink = links[2];
        expect(signUpLink.navigatedTo).toBeNull('link should not have navigated yet');
        signUpLinkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(signUpLink.navigatedTo[0]).toBe('/signup');
    });
});
//# sourceMappingURL=app.component.spec.js.map