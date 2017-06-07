"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("../../../../testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var chat_room_detail_component_1 = require("./chat-room-detail.component");
var chat_room_service_1 = require("../../../services/chat-room.service");
var fake_chat_room_service_1 = require("../../../../testing/services/fake-chat-room.service");
var firstChatRoom = fake_chat_room_service_1.CHATROOMS[0];
describe('ChatRoomDetailComponent', function () {
    var activatedRoute;
    var comp;
    var fixture;
    var page;
    beforeEach(testing_1.async(function () {
        activatedRoute = new testing_2.ActivatedRouteStub();
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, http_1.HttpModule],
            declarations: [chat_room_detail_component_1.ChatRoomDetailComponent],
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .overrideComponent(chat_room_detail_component_1.ChatRoomDetailComponent, {
            set: {
                providers: [
                    { provide: chat_room_service_1.ChatRoomService, useClass: fake_chat_room_service_1.FakeChatRoomService },
                ]
            }
        })
            .compileComponents();
    }));
    describe('when navigate to existing chat room', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: firstChatRoom.id };
            createComponent();
        }));
        it('should create component', function () { return expect(comp).toBeDefined(); });
        it('should have expected <h1> text', function () {
            expect(page.pageName.textContent).toMatch(/admin chat room detail/i, '<h1> should say something about "Admin Chat Room Detail"');
        });
        it('chat room should update from form changes', testing_1.fakeAsync(function () {
            comp.chatRoomDetailForm.patchValue(firstChatRoom);
            expect(comp.chatRoomDetailForm.value.title).toEqual(firstChatRoom.title);
            expect(comp.chatRoomDetailForm.value.created_id).toEqual(1);
        }));
        it('should be false when form is invalid', testing_1.fakeAsync(function () {
            var invalidTestChatRoom = {
                title: '',
                created_id: 1,
            };
            comp.chatRoomDetailForm.patchValue(invalidTestChatRoom);
            expect(comp.chatRoomDetailForm.valid).toBeFalsy();
        }));
        it('should update model on submit', testing_1.fakeAsync(function () {
            comp.chatRoomDetailForm.patchValue(firstChatRoom);
            comp.save();
            testing_1.tick();
            expect(comp.response).toBe(1);
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    describe('when navigate with chat room id -1', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: -1 };
            createComponent();
        }));
        it('should have chatRoom.id === -1', function () {
            expect(comp.chatRoomDetailForm.value.id).toBe(-1);
        });
        it('should display empty chat room title', function () {
            expect(page.nameDisplay.textContent).toBe('');
        });
        it('should have chatRoom.created_id === 1', function () {
            expect(comp.chatRoomDetailForm.value.created_id).toBe(1);
        });
        it('should have chatRoom.sender_id === 1', function () {
            expect(comp.chatRoomDetailForm.value.sender_id).toBe(1);
        });
        it('should have chatRoom.recipient_id === 1', function () {
            expect(comp.chatRoomDetailForm.value.recipient_id).toBe(1);
        });
    });
    describe('when navigate to non-existant chat room id', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: 99999 };
            createComponent();
        }));
        it('should try to navigate back to chat room list', testing_1.fakeAsync(function () {
            testing_1.tick();
            expect(page.goBackSpy.calls.any()).toBe(true, 'comp.goBack called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    /////////// Helpers /////
    // Create the ChatRoomDetailComponent, initialize it, set test variables  
    function createComponent() {
        fixture = testing_1.TestBed.createComponent(chat_room_detail_component_1.ChatRoomDetailComponent);
        comp = fixture.componentInstance;
        page = new Page();
        // 1st change detection triggers ngOnInit which gets a chat room
        fixture.detectChanges();
        return fixture.whenStable().then(function () {
            // 2nd change detection displays the async-fetched chat room
            fixture.detectChanges();
            page.addPageElements();
        });
    }
    var Page = (function () {
        function Page() {
            var router = testing_1.TestBed.get(testing_2.Router); // get router from root injector
            this.goBackSpy = spyOn(comp, 'goBack').and.callThrough();
            this.navSpy = spyOn(router, 'navigate');
        }
        // Add page elements after chat room arrives 
        Page.prototype.addPageElements = function () {
            if (comp.chatRoomDetailForm) {
                // have a form group element so these elements are now in the DOM
                var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
                this.cancelBtn = buttons[0];
                this.saveBtn = buttons[1];
                this.pageName = fixture.debugElement.query(platform_browser_1.By.css('.admin-chat-room-detail')).nativeElement;
                this.nameDisplay = fixture.debugElement.query(platform_browser_1.By.css('#title')).nativeElement;
            }
        };
        return Page;
    }());
});
//# sourceMappingURL=chat-room-detail.component.spec.js.map