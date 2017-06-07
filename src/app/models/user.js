"use strict";
var User = (function () {
    function User(id, name, email) {
        if (id === void 0) { id = 0; }
        if (name === void 0) { name = ''; }
        if (email === void 0) { email = ''; }
        this.id = id;
        this.name = name;
        this.email = email;
    }
    User.prototype.clone = function () { return new User(this.id, this.name, this.email); };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map