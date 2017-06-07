"use strict";
var chat_message_1 = require("./chat-message");
var message_1 = require("./message");
var user_1 = require("./user");
describe('Chat Message', function () {
    it('has message', function () {
        var message = new message_1.Message(0, '', 1, 1);
        var chatMessage = new chat_message_1.ChatMessage(message);
        expect(chatMessage.message).not.toBe(null);
        expect(chatMessage.user).toBe(null);
    });
    it('has user', function () {
        var user = new user_1.User(0, 'Super Cat', '');
        var chatMessage = new chat_message_1.ChatMessage(null, user);
        expect(chatMessage.user).not.toBe(null);
        expect(chatMessage.message).toBe(null);
    });
});
//# sourceMappingURL=chat-message.spec.js.map