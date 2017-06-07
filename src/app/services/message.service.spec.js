"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/http/testing");
var http_1 = require("@angular/http");
var message_1 = require("../models/message");
var message_service_1 = require("./message.service");
var makeMessageData = function () { return [
    { id: 0, body: 'Long Message', user_id: 1, chat_room_id: 1 },
    { id: 1, body: 'First Message', user_id: 1, chat_room_id: 1 },
    { id: 2, body: 'Second Message', user_id: 1, chat_room_id: 1 },
    { id: 3, body: 'Third Message', user_id: 1, chat_room_id: 1 },
]; };
describe('MessageService (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                message_service_1.MessageService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        })
            .compileComponents();
    }));
    it('can instantiate service when inject service', testing_1.inject([message_service_1.MessageService], function (service) {
        expect(service instanceof message_service_1.MessageService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http], function (http) {
        expect(http).not.toBeNull('http should be provided');
        var service = new message_service_1.MessageService(http);
        expect(service instanceof message_service_1.MessageService).toBe(true, 'new service should be ok');
    }));
    it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
        expect(backend).not.toBeNull('backend should be provided');
    }));
    describe('when create message', function () {
        var backend;
        var service;
        var message;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new message_service_1.MessageService(http);
            message = new message_1.Message(0, 'test', 1, 1);
            var options = new http_1.ResponseOptions({ status: 200, body: { message: message } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake messages (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.create(message)
                .then(function (res) {
                expect(res.message.body).toBe(message.body, 'should have expected body');
            });
        })));
        it('should be OK returning no message', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { message: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.create(message)
                .then(function (res) {
                expect(res.message.length).toBe(0, 'should have no message');
            });
        })));
        it('should treat 404 as a Promise error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.create(message)
                .then()
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Promise.reject(err.message || err); // failure is the expected test result
            });
        })));
    });
    describe('when get all message', function () {
        var backend;
        var service;
        var fakeMessages;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new message_service_1.MessageService(http);
            fakeMessages = makeMessageData();
            var options = new http_1.ResponseOptions({ status: 200, body: { messages: fakeMessages } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake messages (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getMessages()
                .then(function (res) {
                expect(res.messages.length).toBe(fakeMessages.length, 'should have expected no. of messages');
            });
        })));
        it('should be OK returning no message', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { messages: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getMessages()
                .then(function (res) {
                expect(res.messages.length).toBe(0, 'should have no message');
            });
        })));
        it('should treat 404 as a Promise error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getMessages()
                .then()
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Promise.reject(err.message || err); // failure is the expected test result
            });
        })));
    });
});
//# sourceMappingURL=message.service.spec.js.map