"use strict";
var testing_1 = require("@angular/core/testing");
var session_service_1 = require("./session.service");
describe('SessionService test', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [session_service_1.SessionService]
        })
            .compileComponents();
        session_service_1.SessionService.getInstance().collection$.subscribe(function () { });
    }));
    it('can instantiate service when inject service', testing_1.inject([session_service_1.SessionService], function (service) {
        expect(service instanceof session_service_1.SessionService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([], function () {
        var service = new session_service_1.SessionService();
        expect(service instanceof session_service_1.SessionService).toBe(true, 'new service should be ok');
    }));
    it('can set user id', testing_1.async(function () {
        var userId = '0';
        var service = session_service_1.SessionService.getInstance();
        session_service_1.SessionService.getInstance().clear();
        service.setUserId(userId);
        expect(localStorage.getItem('userId')).toEqual(userId);
    }));
    it('can set user name', testing_1.async(function () {
        var userName = 'test';
        var service = session_service_1.SessionService.getInstance();
        session_service_1.SessionService.getInstance().clear();
        service.setUserName(userName);
        expect(localStorage.getItem('userName')).toEqual(userName);
    }));
    it('can set user email', testing_1.async(function () {
        var userEmail = 'test@example.com';
        var service = session_service_1.SessionService.getInstance();
        session_service_1.SessionService.getInstance().clear();
        service.setUserEmail(userEmail);
        expect(localStorage.getItem('userEmail')).toEqual(userEmail);
    }));
    describe('when logged in user', function () {
        it('returns false', testing_1.async(function () {
            var service = session_service_1.SessionService.getInstance();
            expect(service.isLoggedIn()).toBe(false);
        }));
        it('returns true', testing_1.async(function () {
            var userId = '0';
            var userName = 'test';
            var userEmail = 'test@example.com';
            var service = session_service_1.SessionService.getInstance();
            service.setUserId(userId);
            service.setUserName(userName);
            service.setUserEmail(userEmail);
            expect(service.isLoggedIn()).toBe(true);
        }));
    });
    it('can clear all data', testing_1.async(function () {
        expect(localStorage.getItem('userId')).not.toBeNull();
        expect(localStorage.getItem('userName')).not.toBeNull();
        expect(localStorage.getItem('userEmail')).not.toBeNull();
        session_service_1.SessionService.getInstance().clear();
        expect(localStorage.getItem('userId')).toBeNull();
        expect(localStorage.getItem('userName')).toBeNull();
        expect(localStorage.getItem('userEmail')).toBeNull();
    }));
});
//# sourceMappingURL=session.service.spec.js.map