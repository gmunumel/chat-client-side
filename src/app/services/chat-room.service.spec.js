"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/http/testing");
var http_1 = require("@angular/http");
var chat_room_1 = require("../models/chat-room");
var chat_room_service_1 = require("./chat-room.service");
var makeChatRoomData = function () { return [
    { id: 0, title: 'Sports', created_id: 1, sender_id: 1, recipient_id: 1 },
    { id: 1, title: 'News', created_id: 1, sender_id: 1, recipient_id: 1 },
    { id: 2, title: 'Random', created_id: 1, sender_id: 1, recipient_id: 1 },
    { id: 3, title: 'Politics', created_id: 1, sender_id: 1, recipient_id: 1 },
]; };
describe('ChatRoomService (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                chat_room_service_1.ChatRoomService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        })
            .compileComponents();
    }));
    it('can instantiate service when inject service', testing_1.inject([chat_room_service_1.ChatRoomService], function (service) {
        expect(service instanceof chat_room_service_1.ChatRoomService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http], function (http) {
        expect(http).not.toBeNull('http should be provided');
        var service = new chat_room_service_1.ChatRoomService(http);
        expect(service instanceof chat_room_service_1.ChatRoomService).toBe(true, 'new service should be ok');
    }));
    it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
        expect(backend).not.toBeNull('backend should be provided');
    }));
    describe('when create chat room', function () {
        var backend;
        var service;
        var chatRoom;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new chat_room_service_1.ChatRoomService(http);
            chatRoom = new chat_room_1.ChatRoom(0, 'test', 1, 1, 1);
            var options = new http_1.ResponseOptions({ status: 200, body: { chatRoom: chatRoom } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake chat rooms (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.create(chatRoom)
                .then(function (res) {
                expect(res.chatRoom.title).toBe(chatRoom.title, 'should have expected title');
            });
        })));
        it('should be OK returning no chat room', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { chatRoom: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.create(chatRoom)
                .then(function (res) {
                expect(res.chatRoom.length).toBe(0, 'should have no chat room');
            });
        })));
        it('should treat 404 as a Promise error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.create(chatRoom)
                .then()
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Promise.reject(err.message || err); // failure is the expected test result
            });
        })));
    });
    describe('when get all chat rooms', function () {
        var backend;
        var service;
        var fakeChatRooms;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new chat_room_service_1.ChatRoomService(http);
            fakeChatRooms = makeChatRoomData();
            var options = new http_1.ResponseOptions({ status: 200, body: { chatRooms: fakeChatRooms } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake chat rooms (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getChatRooms()
                .then(function (res) {
                expect(res.chatRooms.length).toBe(fakeChatRooms.length, 'should have expected no. of chat rooms');
            });
        })));
        it('should be OK returning no chat room', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { chatRooms: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getChatRooms()
                .then(function (res) {
                expect(res.chatRooms.length).toBe(0, 'should have no chat room');
            });
        })));
        it('should treat 404 as a Promise error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getChatRooms()
                .then()
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Promise.reject(err.message || err); // failure is the expected test result
            });
        })));
    });
});
//# sourceMappingURL=chat-room.service.spec.js.map