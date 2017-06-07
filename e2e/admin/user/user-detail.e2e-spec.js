"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("../helper.e2e-spec");
describe('Admin User Detail e2e Tests', function () {
    var url = '/admin/user/detail/2';
    beforeAll(function () {
        helper_e2e_spec_1.SignIn();
    });
    beforeEach(function () {
        protractor_1.browser.get(url);
    });
    // This is used for testing purposes.
    // Redis and rails servers must be running for this to work
    var expectedMsg = 'Admin User Detail';
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('admin-user-detail')).getText()).toEqual(expectedMsg);
    });
    it('should display a save button', function () {
        expect(protractor_1.element(protractor_1.by.id('user-detail-save')).isPresent()).toBeTruthy();
    });
    it('should display a back button', function () {
        expect(protractor_1.element(protractor_1.by.id('user-detail-back')).isPresent()).toBeTruthy();
    });
    it('should navigate to users list', function () {
        protractor_1.element(protractor_1.by.id('user-detail-back')).click();
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual('Admin User');
    });
    it('should update an user', function () {
        protractor_1.element(protractor_1.by.id('name')).getAttribute('value')
            .then(function (originalName) {
            var testUserName = "testName-" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
            expect(originalName).not.toBe(testUserName);
            setUserName(testUserName);
            protractor_1.browser.get(url);
            protractor_1.element(protractor_1.by.id('name')).getAttribute('value')
                .then(function (newUserName) {
                expect(testUserName).toEqual(newUserName);
                // clean up the user name
                setUserName(originalName);
            });
        });
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
    function setUserName(name) {
        protractor_1.element(protractor_1.by.id('name')).clear();
        protractor_1.element(protractor_1.by.id('name')).sendKeys(name);
        protractor_1.element(protractor_1.by.id('user-detail-save')).click();
        protractor_1.browser.waitForAngular();
    }
    ;
});
//# sourceMappingURL=user-detail.e2e-spec.js.map