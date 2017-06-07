"use strict";
var protractor_1 = require("protractor");
describe('About e2e Tests', function () {
    var expectedMsg = 'About';
    beforeEach(function () {
        protractor_1.browser.get('');
        protractor_1.element(protractor_1.by.id('about-link')).click();
    });
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.className('about')).getText()).toEqual(expectedMsg);
    });
});
//# sourceMappingURL=about.e2e-spec.js.map