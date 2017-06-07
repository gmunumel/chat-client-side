"use strict";
var ChatRoom = (function () {
    function ChatRoom(id, title, created_id, sender_id, recipient_id) {
        if (id === void 0) { id = 0; }
        if (title === void 0) { title = ''; }
        if (created_id === void 0) { created_id = 1; }
        if (sender_id === void 0) { sender_id = 1; }
        if (recipient_id === void 0) { recipient_id = 1; }
        this.id = id;
        this.title = title;
        this.created_id = created_id;
        this.sender_id = sender_id;
        this.recipient_id = recipient_id;
    }
    ChatRoom.prototype.clone = function () { return new ChatRoom(this.id, this.title, this.created_id, this.sender_id, this.recipient_id); };
    return ChatRoom;
}());
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=chat-room.js.map