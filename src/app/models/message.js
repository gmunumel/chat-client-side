"use strict";
var Message = (function () {
    function Message(id, body, user_id, chat_room_id, created_at) {
        if (id === void 0) { id = 0; }
        if (body === void 0) { body = ''; }
        if (user_id === void 0) { user_id = 1; }
        if (chat_room_id === void 0) { chat_room_id = 1; }
        if (created_at === void 0) { created_at = null; }
        this.id = id;
        this.body = body;
        this.user_id = user_id;
        this.chat_room_id = chat_room_id;
        this.created_at = created_at;
    }
    Message.prototype.clone = function () { return new Message(this.id, this.body, this.user_id, this.chat_room_id); };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.js.map