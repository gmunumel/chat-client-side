"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("./admin/helper.e2e-spec");
describe('Sign Up e2e Tests', function () {
    var expectedMsg = 'Sign Up';
    beforeEach(function () {
        protractor_1.browser.get('');
        protractor_1.element(protractor_1.by.id('sign-up-link')).click();
    });
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('sign-up')).getText()).toEqual(expectedMsg);
    });
    it('should not create an user', function () {
        var userName = "testName" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
        var userEmail = userName;
        protractor_1.element(protractor_1.by.id('name')).sendKeys(userName);
        protractor_1.element(protractor_1.by.id('email')).sendKeys(userEmail);
        protractor_1.element(protractor_1.by.id('sign-up-submit')).click();
        expect(protractor_1.element(protractor_1.by.className('alert-success')).isPresent()).
            toBe(false);
    });
    // won't create user if rails server is not up
    it('should add one user', function () {
        var userName = "testName" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
        var userEmail = userName + "@foo.com";
        protractor_1.element(protractor_1.by.id('name')).sendKeys(userName);
        protractor_1.element(protractor_1.by.id('email')).sendKeys(userEmail);
        protractor_1.element(protractor_1.by.id('sign-up-submit')).click();
        expect(protractor_1.element(protractor_1.by.className('alert-success')).getText()).
            toContain('Your user has been created');
        // remove user just created
        helper_e2e_spec_1.RemoveUser(userName);
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
});
//# sourceMappingURL=sign-up.e2e-spec.js.map