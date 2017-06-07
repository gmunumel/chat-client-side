"use strict";
var message_1 = require("./message");
describe('Message', function () {
    it('has id', function () {
        var message = new message_1.Message(0, '', 1, 1);
        expect(message.id).toBe(0);
    });
    it('has body', function () {
        var message = new message_1.Message(0, 'Long Body', 1, 1);
        expect(message.body).toBe('Long Body');
    });
    it('has user id', function () {
        var message = new message_1.Message(0, '', 42, 1);
        expect(message.user_id).toBe(42);
    });
    it('has chat room id', function () {
        var message = new message_1.Message(0, '', 1, 42);
        expect(message.chat_room_id).toBe(42);
    });
    it('can clone itself', function () {
        var message = new message_1.Message(0, 'Super Cat', 1, 2);
        var clone = message.clone();
        expect(message).toEqual(clone);
    });
});
//# sourceMappingURL=message.spec.js.map