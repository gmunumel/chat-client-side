"use strict";
var user_1 = require("./user");
describe('User', function () {
    it('has id', function () {
        var user = new user_1.User(0, '', '');
        expect(user.id).toBe(0);
    });
    it('has name', function () {
        var user = new user_1.User(0, 'Super Cat', '');
        expect(user.name).toBe('Super Cat');
    });
    it('has email', function () {
        var user = new user_1.User(0, '', 'foo@bar.com');
        expect(user.email).toBe('foo@bar.com');
    });
    it('can clone itself', function () {
        var user = new user_1.User(0, 'Super Cat', 'super.cat@example.com');
        var clone = user.clone();
        expect(user).toEqual(clone);
    });
});
//# sourceMappingURL=user.spec.js.map