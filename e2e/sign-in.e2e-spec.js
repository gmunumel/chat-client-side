"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("./admin/helper.e2e-spec");
describe('Sign In e2e Tests', function () {
    var expectedMsg = 'Sign In';
    beforeEach(function () {
        protractor_1.browser.get('');
        protractor_1.element(protractor_1.by.id('sign-in-link')).click();
    });
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('sign-in')).getText()).toEqual(expectedMsg);
    });
    it('should not found an user', function () {
        protractor_1.element(protractor_1.by.id('name')).sendKeys('admin');
        protractor_1.element(protractor_1.by.id('email')).sendKeys('admin.email');
        protractor_1.element(protractor_1.by.id('sign-in-submit')).click();
        expect(protractor_1.element(protractor_1.by.className('alert-success')).isPresent()).
            toBe(false);
    });
    // won't create user if rails server is not up
    it('should found an user', function () {
        protractor_1.element(protractor_1.by.id('name')).sendKeys('admin');
        protractor_1.element(protractor_1.by.id('email')).sendKeys('admin@admin.com');
        protractor_1.element(protractor_1.by.id('sign-in-submit')).click();
        expect(protractor_1.element(protractor_1.by.className('alert-success')).getText()).
            toContain('Your user has been logged in!');
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
});
//# sourceMappingURL=sign-in.e2e-spec.js.map