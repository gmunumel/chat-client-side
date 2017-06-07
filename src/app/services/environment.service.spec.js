"use strict";
var testing_1 = require("@angular/core/testing");
var environment_service_1 = require("./environment.service");
var config_1 = require("../config");
describe('EnvironmentService test', function () {
    var envService;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [environment_service_1.EnvironmentService]
        })
            .compileComponents();
        envService = new environment_service_1.EnvironmentService();
        envService.isDevMode = true;
    }));
    it('can instantiate service when inject service', testing_1.inject([environment_service_1.EnvironmentService], function (service) {
        expect(service instanceof environment_service_1.EnvironmentService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([], function () {
        var service = new environment_service_1.EnvironmentService();
        expect(service instanceof environment_service_1.EnvironmentService).toBe(true, 'new service should be ok');
    }));
    it('can get api url', testing_1.async(function () {
        var configApiUrl = config_1.CONFIG.development.API_URL;
        var apiUrl = envService.getApiUrl();
        expect(apiUrl).toEqual(configApiUrl, 'api url must be the same');
    }));
    it('can get socket url', testing_1.async(function () {
        var configSocketUrl = config_1.CONFIG.development.SOCKET_URL;
        var socketUrl = envService.getSocketUrl();
        expect(socketUrl).toEqual(configSocketUrl, 'socket url must be the same');
    }));
});
//# sourceMappingURL=environment.service.spec.js.map