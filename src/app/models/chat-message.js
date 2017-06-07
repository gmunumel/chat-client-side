"use strict";
var ChatMessage = (function () {
    function ChatMessage(message, user) {
        if (message === void 0) { message = null; }
        if (user === void 0) { user = null; }
        this.message = message;
        this.user = user;
    }
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=chat-message.js.map