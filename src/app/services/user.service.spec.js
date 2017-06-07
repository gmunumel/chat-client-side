"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/http/testing");
var http_1 = require("@angular/http");
var user_1 = require("../models/user");
var user_service_1 = require("./user.service");
var makeUserData = function () { return [
    { id: 0, name: 'Ted', email: 'ted@example.com' },
    { id: 1, name: 'Bob', email: 'bob@example.com' },
    { id: 2, name: 'Jack', email: 'jack@example.com' },
    { id: 3, name: 'Barry', email: 'barry@example.com' }
]; };
var makeFilteredUserData = function () { return [
    { id: 0, name: 'Ted', email: 'ted@example.com' },
    { id: 2, name: 'Jack', email: 'jack@example.com' },
]; };
describe('UserService (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                user_service_1.UserService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        })
            .compileComponents();
    }));
    it('can instantiate service when inject service', testing_1.inject([user_service_1.UserService], function (service) {
        expect(service instanceof user_service_1.UserService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http], function (http) {
        expect(http).not.toBeNull('http should be provided');
        var service = new user_service_1.UserService(http);
        expect(service instanceof user_service_1.UserService).toBe(true, 'new service should be ok');
    }));
    it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
        expect(backend).not.toBeNull('backend should be provided');
    }));
    describe('when create user', function () {
        var backend;
        var service;
        var user;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new user_service_1.UserService(http);
            user = new user_1.User(0, 'test', 'test@example.com');
            var options = new http_1.ResponseOptions({ status: 200, body: { user: user } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake users (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.create(user)
                .then(function (res) {
                expect(res.user.name).toBe(user.name, 'should have expected name');
                expect(res.user.email).toBe(user.email, 'should have expected email');
            });
        })));
        it('should be OK returning no user', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { user: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.create(user)
                .then(function (res) {
                expect(res.user.length).toBe(0, 'should have no user');
            });
        })));
        it('should treat 404 as a Promise error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.create(user)
                .then()
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Promise.reject(err.message || err); // failure is the expected test result
            });
        })));
    });
    describe('when get all users with not ids defined', function () {
        var backend;
        var service;
        var fakeUsers;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new user_service_1.UserService(http);
            fakeUsers = makeUserData();
            var options = new http_1.ResponseOptions({ status: 200, body: { users: fakeUsers } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake users (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getUsers()
                .then(function (res) {
                expect(res.users.length).toBe(fakeUsers.length, 'should have expected no. of users');
            });
        })));
        it('should be OK returning no user', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { users: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getUsers()
                .then(function (res) {
                expect(res.users.length).toBe(0, 'should have no user');
            });
        })));
        it('should treat 404 as a Promise error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getUsers()
                .then()
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Promise.reject(err.message || err); // failure is the expected test result
            });
        })));
    });
    describe('when get all users with ids defined', function () {
        var backend;
        var service;
        var fakeUsers;
        var response;
        var filteredIds;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new user_service_1.UserService(http);
            fakeUsers = makeFilteredUserData();
            filteredIds = [0, 2];
            var options = new http_1.ResponseOptions({ status: 200, body: { users: fakeUsers } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake users (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getUsers(filteredIds)
                .then(function (res) {
                expect(res.users.length).toBe(filteredIds.length, 'should have expected no. of users');
            });
        })));
        it('should be OK returning no user', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { users: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getUsers(filteredIds)
                .then(function (res) {
                expect(res.users.length).toBe(0, 'should have no user');
            });
        })));
        it('should treat 404 as a Promise error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getUsers(filteredIds)
                .then()
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Promise.reject(err.message || err); // failure is the expected test result
            });
        })));
    });
});
//# sourceMappingURL=user.service.spec.js.map