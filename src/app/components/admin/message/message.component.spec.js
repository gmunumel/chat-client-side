"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("../../../../testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var message_component_1 = require("./message.component");
var message_service_1 = require("../../../services/message.service");
var user_service_1 = require("../../../services/user.service");
var socket_service_1 = require("../../../services/socket.service");
var fake_socket_service_1 = require("../../../../testing/services/fake-socket.service");
var fake_message_service_1 = require("../../../../testing/services/fake-message.service");
var fake_chat_room_service_1 = require("../../../../testing/services/fake-chat-room.service");
var fake_user_service_1 = require("../../../../testing/services/fake-user.service");
var firstChatRoom = fake_chat_room_service_1.CHATROOMS[0];
var firstUser = fake_user_service_1.USERS[0];
describe('MessageComponent', function () {
    var activatedRoute;
    var comp;
    var fixture;
    var page;
    beforeEach(testing_1.async(function () {
        activatedRoute = new testing_2.ActivatedRouteStub();
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, http_1.HttpModule],
            declarations: [message_component_1.MessageComponent],
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: testing_2.Router, useClass: testing_2.RouterStub }
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
            .overrideComponent(message_component_1.MessageComponent, {
            set: {
                providers: [
                    { provide: message_service_1.MessageService, useClass: fake_message_service_1.FakeMessageService },
                    { provide: user_service_1.UserService, useClass: fake_user_service_1.FakeUserService },
                    { provide: socket_service_1.SocketService, useClass: fake_socket_service_1.FakeSocketService },
                ]
            }
        })
            .compileComponents();
    }));
    describe('when navigate to existing message', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { chat_room_id: firstChatRoom.id };
            createComponent();
        }));
        it('should create component', function () { return expect(comp).toBeDefined(); });
        it('should have expected <h1> text', function () {
            expect(page.pageName.textContent).toMatch(/admin message/i, '<h1> should say something about "Admin Message"');
        });
        it('should display all messages for chat id 1', testing_1.fakeAsync(function () {
            var allMessages = fake_message_service_1.MESSAGES;
            comp.showMessage(firstChatRoom.id);
            testing_1.tick();
            expect(comp.response).toBe(1);
            expect(comp.messages.length).toBe(allMessages.length);
        }));
        it('1st message should match 1st chat room message', testing_1.fakeAsync(function () {
            var expectedMessage = fake_message_service_1.MESSAGES[0];
            comp.showMessage(firstChatRoom.id);
            testing_1.tick();
            expect(comp.messages[0].message).toEqual(expectedMessage, 'first message is the same');
            expect(comp.messages[0].user).not.toBe(null, 'first user is not null');
        }));
        it('should navigate to selected message detail on click', testing_1.fakeAsync(function () {
            var expectedMessage = fake_message_service_1.MESSAGES[1];
            var expectedChatRoom = fake_chat_room_service_1.CHATROOMS[1];
            var input = page.messagesRows[1];
            input.dispatchEvent(testing_2.newEvent('click'));
            testing_1.tick();
            // should have navigated
            expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
            // composed message detail will be URL like 'messages/42'
            // expect link array with the route path and message id
            // first argument to router.navigate is link array
            var navArgs = page.navSpy.calls.first().args[0];
            expect(navArgs[0]).toContain('message', 'nav to message detail URL');
            expect(navArgs[0]).toContain(expectedMessage.id, 'expected message.id');
            expect(navArgs[0]).toContain('chat-room', 'URL should contain chat-room');
            expect(navArgs[0]).toContain(expectedChatRoom.id, 'expected chatRoom.id');
        }));
        it('should do nothing in save whithout message body', testing_1.fakeAsync(function () {
            comp.response = 0;
            comp.messageForm.value.body = '';
            comp.save();
            testing_1.tick();
            expect(comp.response).toBe(0, 'comp.response is initial value 0');
        }));
        it('should save message', testing_1.fakeAsync(function () {
            var messages = fake_message_service_1.MESSAGES;
            comp.response = 0;
            comp.messageForm.value.body = 'test message';
            comp.user = firstUser;
            comp.save();
            testing_1.tick();
            expect(comp.response).toBe(1, 'comp.response is 1');
            expect(comp.messages.length).toBe(messages.length + 1, 'messages should increase in 1');
        }));
    });
    describe('when navigate to non-existant chat room id', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { chat_room_id: 99999 };
            createComponent();
        }));
        it('should display an error message', testing_1.fakeAsync(function () {
            testing_1.tick();
            expect(comp.response).toBe(-1, 'comp.response is -1');
        }));
    });
    /////////// Helpers /////
    // Create the component and set the `page` test variables 
    function createComponent() {
        fixture = testing_1.TestBed.createComponent(message_component_1.MessageComponent);
        comp = fixture.componentInstance;
        // change detection triggers ngOnInit which gets a message
        fixture.detectChanges();
        return fixture.whenStable().then(function () {
            // got the messages and updated component
            // change detection updates the view
            fixture.detectChanges();
            page = new Page();
        });
    }
    var Page = (function () {
        function Page() {
            this.messagesRows = fixture.debugElement.queryAll(platform_browser_1.By.css('.messages')).map(function (de) { return de.nativeElement; });
            // Get the component's injected router and spy on it
            var router = fixture.debugElement.injector.get(testing_2.Router);
            this.navSpy = spyOn(router, 'navigate');
            this.pageName = fixture.debugElement.query(platform_browser_1.By.css('.admin-message')).nativeElement;
            this.addMessageBtn = fixture.debugElement.query(platform_browser_1.By.css('#add-message')).nativeElement;
        }
        ;
        return Page;
    }());
});
//# sourceMappingURL=message.component.spec.js.map