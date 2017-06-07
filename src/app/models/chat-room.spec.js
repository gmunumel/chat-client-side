"use strict";
var chat_room_1 = require("./chat-room");
describe('Chat Room', function () {
    it('has id', function () {
        var chatRoom = new chat_room_1.ChatRoom(0, '', 1, 1, 1);
        expect(chatRoom.id).toBe(0);
    });
    it('has title', function () {
        var chatRoom = new chat_room_1.ChatRoom(0, 'Super Cat', 1, 1, 1);
        expect(chatRoom.title).toBe('Super Cat');
    });
    it('has created id', function () {
        var chatRoom = new chat_room_1.ChatRoom(0, '', 42, 1, 1);
        expect(chatRoom.created_id).toBe(42);
    });
    it('has sender id', function () {
        var chatRoom = new chat_room_1.ChatRoom(0, '', 1, 42, 1);
        expect(chatRoom.sender_id).toBe(42);
    });
    it('has recipient id', function () {
        var chatRoom = new chat_room_1.ChatRoom(0, '', 1, 1, 42);
        expect(chatRoom.recipient_id).toBe(42);
    });
    it('can clone itself', function () {
        var chatRoom = new chat_room_1.ChatRoom(0, 'Super Cat', 1, 2, 3);
        var clone = chatRoom.clone();
        expect(chatRoom).toEqual(clone);
    });
});
//# sourceMappingURL=chat-room.spec.js.map