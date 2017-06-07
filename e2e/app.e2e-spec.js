"use strict";
var protractor_1 = require("protractor");
describe('Client Side Chat E2E Tests', function () {
    beforeEach(function () {
        protractor_1.browser.get('');
    });
    it('should have links', function () {
        expect(protractor_1.element(protractor_1.by.id('dashboard-link')).getText()).toEqual('My Simple Chat App');
        expect(protractor_1.element(protractor_1.by.id('sign-in-link')).getText()).toEqual('Sign In');
        expect(protractor_1.element(protractor_1.by.id('sign-up-link')).getText()).toEqual('Sign Up');
        expect(protractor_1.element(protractor_1.by.id('about-link')).getText()).toEqual('About');
    });
    it('can click Sign In link in template', function () {
        protractor_1.element(protractor_1.by.id('sign-in-link')).click();
        expect(protractor_1.element(protractor_1.by.className('sign-in')).getText()).toEqual('Sign In');
    });
    it('can click Sign Up link in template', function () {
        protractor_1.element(protractor_1.by.id('sign-up-link')).click();
        expect(protractor_1.element(protractor_1.by.className('sign-up')).getText()).toEqual('Sign Up');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map