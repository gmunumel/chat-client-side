"use strict";
var protractor_1 = require("protractor");
var helper_e2e_spec_1 = require("../helper.e2e-spec");
describe('Admin User e2e Tests', function () {
    var testUserName = "test" + helper_e2e_spec_1.GetRandomInt(1, 1000000);
    var testUserEmail = testUserName + "@test.com";
    beforeAll(function () {
        helper_e2e_spec_1.SignIn();
    });
    beforeEach(function () {
        protractor_1.element(protractor_1.by.id('admin-user-link')).click();
    });
    // This is used for testing purposes.
    // Redis and rails servers must be running for this to work
    var expectedMsg = 'Admin User';
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('admin-user')).getText()).toEqual(expectedMsg);
    });
    it('should display an add button', function () {
        expect(protractor_1.element(protractor_1.by.id('add-user')).isPresent()).toBeTruthy();
    });
    it('should navigate to add new user', function () {
        protractor_1.element(protractor_1.by.id('add-user')).click();
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual('Admin User Detail');
        expect(protractor_1.element(protractor_1.by.id('name')).getText()).toEqual('');
        expect(protractor_1.element(protractor_1.by.id('email')).getText()).toEqual('');
    });
    it('should navigate to edit an user', function () {
        var userElement = protractor_1.element.all(protractor_1.by.className('users')).get(1);
        userElement.getAttribute('value')
            .then(function (name) {
            userElement.click();
            expect(protractor_1.element(protractor_1.by.id('name')).getAttribute('value')).toEqual(name);
        });
    });
    it('should add an user', function () {
        var userElement = protractor_1.element(protractor_1.by.id("delete-" + testUserName));
        helper_e2e_spec_1.AddUser(testUserName, testUserEmail);
        protractor_1.element(protractor_1.by.id('admin-user-link')).click();
        expect(userElement.isPresent()).toBeTruthy();
    });
    it('should delete an user', function () {
        var userElement = protractor_1.element(protractor_1.by.id("delete-" + testUserName));
        helper_e2e_spec_1.RemoveUser(testUserName);
        protractor_1.element(protractor_1.by.id('admin-user-link')).click();
        expect(userElement.isPresent()).toBeFalsy();
    });
    it('should shown an existing user', function () {
        var userElement = protractor_1.element.all(protractor_1.by.className('users')).get(2);
        userElement.getAttribute('value')
            .then(function (name) {
            protractor_1.element(protractor_1.by.id('user-search-box')).sendKeys(name);
            protractor_1.element.all(protractor_1.by.className('users')).count().then(function (size) {
                expect(size).toBe(1);
            });
        });
    });
    it('should not shown a no existing user', function () {
        var userName = 'f4k3N4m3';
        protractor_1.element(protractor_1.by.id('user-search-box')).sendKeys(userName);
        protractor_1.element.all(protractor_1.by.className('users')).count().then(function (size) {
            expect(size).toBe(0);
        });
    });
    afterAll(function () {
        helper_e2e_spec_1.LogOut();
    });
});
//# sourceMappingURL=user.e2e-spec.js.map