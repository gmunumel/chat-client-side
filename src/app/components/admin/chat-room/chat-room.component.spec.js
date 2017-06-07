"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("../../../../testing");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var chat_room_component_1 = require("./chat-room.component");
var chat_room_service_1 = require("../../../services/chat-room.service");
var fake_chat_room_service_1 = require("../../../../testing/services/fake-chat-room.service");
describe('ChatRoomComponent', function () {
    var comp;
    var fixture;
    var page;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            declarations: [chat_room_component_1.ChatRoomComponent],
            providers: [
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .overrideComponent(chat_room_component_1.ChatRoomComponent, {
            set: {
                providers: [
                    { provide: chat_room_service_1.ChatRoomService, useClass: fake_chat_room_service_1.FakeChatRoomService },
                ]
            }
        })
            .compileComponents()
            .then(createComponent);
    }));
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('should have expected <h1> text', function () {
        expect(page.pageName.textContent).toMatch(/admin chat room/i, '<h1> should say something about "Admin Chat Room"');
    });
    it('should display chat rooms', function () {
        var allChatRooms = fake_chat_room_service_1.CHATROOMS;
        var displayChatRooms = page.chatRoomRows;
        expect(page.chatRoomRows.length).toBeGreaterThan(0);
        expect(allChatRooms.length).toBe(displayChatRooms.length);
    });
    it('1st chat room should match 1st chat room', function () {
        var expectedChatRoom = fake_chat_room_service_1.CHATROOMS[0];
        var actualChatRoom = page.chatRoomRows[0].value;
        expect(actualChatRoom).toContain(expectedChatRoom.title, 'chatRoom.title');
    });
    it('should navigate to selected chat room detail on click', testing_1.fakeAsync(function () {
        var expectedChatRoom = fake_chat_room_service_1.CHATROOMS[1];
        var input = page.chatRoomRows[1];
        input.dispatchEvent(testing_2.newEvent('click'));
        testing_1.tick();
        // should have navigated
        expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
        // composed chat room detail will be URL like 'chat-rooms/42'
        // expect link array with the route path and chat room id
        // first argument to router.navigate is link array
        var navArgs = page.navSpy.calls.first().args[0];
        expect(navArgs[0]).toContain('chat-room', 'nav to chat room detail URL');
        expect(navArgs[1]).toBe(expectedChatRoom.id, 'expected chatRoom.id');
    }));
    it('should navigate to add chat room on click', testing_1.fakeAsync(function () {
        var btn = page.addChatRoomBtn;
        btn.dispatchEvent(testing_2.newEvent('click'));
        testing_1.tick();
        // should have navigated
        expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
        // composed chat room detail will be URL like 'chat-rooms/42'
        // expect link array with the route path and chat room id
        // first argument to router.navigate is link array
        var navArgs = page.navSpy.calls.first().args[0];
        expect(navArgs[0]).toContain('chat-room', 'nav to chat room detail URL');
        expect(navArgs[1]).toBe(-1, 'expected to be -1');
    }));
    it('should delete a chat room', testing_1.fakeAsync(function () {
        var deletedChatRoom = fake_chat_room_service_1.CHATROOMS[1];
        var oldChatRoomsLength = page.chatRoomRows.length;
        comp.delete(deletedChatRoom);
        testing_1.tick();
        expect(comp.response).toBe(1);
        // wait for ui to be complete updated
        fixture.whenStable().then(function () {
            fixture.detectChanges();
            var newChatRooms = fixture.debugElement.queryAll(platform_browser_1.By.css('.chat-rooms')).map(function (de) { return de.nativeElement; });
            var newChatRoomsLength = newChatRooms.length;
            expect(newChatRoomsLength).toBe(oldChatRoomsLength - 1, 'no of chat rooms must be minus one');
            expect(newChatRooms.some(function (chatRoomTitle) { return chatRoomTitle === deletedChatRoom.title; }))
                .toBe(false, 'chat room does not exists');
        });
    }));
    /////////// Helpers /////
    // Create the component and set the `page` test variables 
    function createComponent() {
        fixture = testing_1.TestBed.createComponent(chat_room_component_1.ChatRoomComponent);
        comp = fixture.componentInstance;
        // change detection triggers ngOnInit which gets an chat room
        fixture.detectChanges();
        return fixture.whenStable().then(function () {
            // got the chat rooms and updated component
            // change detection updates the view
            fixture.detectChanges();
            page = new Page();
        });
    }
    var Page = (function () {
        function Page() {
            this.chatRoomRows = fixture.debugElement.queryAll(platform_browser_1.By.css('.chat-rooms')).map(function (de) { return de.nativeElement; });
            // Get the component's injected router and spy on it
            var router = fixture.debugElement.injector.get(testing_2.Router);
            this.navSpy = spyOn(router, 'navigate');
            this.pageName = fixture.debugElement.query(platform_browser_1.By.css('.admin-chat-room')).nativeElement;
            this.addChatRoomBtn = fixture.debugElement.query(platform_browser_1.By.css('#add-chat-room')).nativeElement;
        }
        ;
        return Page;
    }());
});
//# sourceMappingURL=chat-room.component.spec.js.map