"use strict";
var protractor_1 = require("protractor");
describe('Dashboard e2e Tests', function () {
    var expectedMsg = 'Dashboard';
    beforeEach(function () {
        protractor_1.browser.get('');
        protractor_1.element(protractor_1.by.id('dashboard-link')).click();
    });
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('dashboard')).getText()).toEqual(expectedMsg);
    });
});
//# sourceMappingURL=dashboard.e2e-spec.js.map