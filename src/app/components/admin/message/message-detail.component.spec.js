"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("../../../../testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var message_detail_component_1 = require("./message-detail.component");
var message_service_1 = require("../../../services/message.service");
var fake_message_service_1 = require("../../../../testing/services/fake-message.service");
var fake_chat_room_service_1 = require("../../../../testing/services/fake-chat-room.service");
var firstMessage = fake_message_service_1.MESSAGES[0];
var firstChatRoom = fake_chat_room_service_1.CHATROOMS[0];
describe('MessageDetailComponent', function () {
    var activatedRoute;
    var comp;
    var fixture;
    var page;
    beforeEach(testing_1.async(function () {
        activatedRoute = new testing_2.ActivatedRouteStub();
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, http_1.HttpModule],
            declarations: [message_detail_component_1.MessageDetailComponent],
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .overrideComponent(message_detail_component_1.MessageDetailComponent, {
            set: {
                providers: [
                    { provide: message_service_1.MessageService, useClass: fake_message_service_1.FakeMessageService },
                ]
            }
        })
            .compileComponents();
    }));
    describe('when navigate to existing message', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: firstMessage.id, chat_room_id: firstChatRoom.id };
            createComponent();
        }));
        it('should create component', function () { return expect(comp).toBeDefined(); });
        it('should have expected <h1> text', function () {
            expect(page.pageName.textContent).toMatch(/admin message detail/i, '<h1> should say something about "Admin Message Detail"');
        });
        it('user should update from form changes', testing_1.fakeAsync(function () {
            comp.messageDetailForm.patchValue(firstMessage);
            expect(comp.messageDetailForm.value.body).toEqual(firstMessage.body);
            expect(comp.messageDetailForm.value.user_id).toEqual(1);
            expect(comp.messageDetailForm.value.chat_room_id).toEqual(0);
        }));
        it('should be false when form is invalid', testing_1.fakeAsync(function () {
            var invalidTestMessage = {
                body: '',
                user_id: 1,
                chat_room_id: 1
            };
            comp.messageDetailForm.patchValue(invalidTestMessage);
            expect(comp.messageDetailForm.valid).toBeFalsy();
        }));
        it('should update model on submit', testing_1.fakeAsync(function () {
            comp.chatRoomId = firstChatRoom.id;
            comp.messageDetailForm.patchValue(firstMessage);
            comp.update();
            testing_1.tick();
            expect(comp.response).toBe(1);
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
        it('should navigate to go back when delete message on click', testing_1.fakeAsync(function () {
            var btn = page.deleteBtn;
            btn.dispatchEvent(testing_2.newEvent('click'));
            testing_1.tick();
            expect(page.goBackSpy.calls.any()).toBe(true, 'comp.goBack called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
        it('should navigate to go back when go back click', testing_1.fakeAsync(function () {
            var btn = page.goBackBtn;
            btn.dispatchEvent(testing_2.newEvent('click'));
            testing_1.tick();
            expect(page.goBackSpy.calls.any()).toBe(true, 'comp.goBack called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    describe('when navigate to non-existant message id', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: 99999, chat_room_id: firstChatRoom.id };
            createComponent();
        }));
        it('should try to navigate back to message list', testing_1.fakeAsync(function () {
            testing_1.tick();
            expect(page.goBackSpy.calls.any()).toBe(true, 'comp.goBack called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    describe('when navigate to non-existant message id and chat room id', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: 99999, chat_room_id: 99999 };
            createComponent();
        }));
        it('should try to navigate back to message list', testing_1.fakeAsync(function () {
            testing_1.tick();
            expect(page.goBackSpy.calls.any()).toBe(true, 'comp.goBack called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    describe('when navigate to existant message id and not existant chat room id', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: firstMessage.id, chat_room_id: 99999 };
            createComponent();
        }));
        it('should try to navigate back to message list', testing_1.fakeAsync(function () {
            testing_1.tick();
            expect(page.goBackSpy.calls.any()).toBe(true, 'comp.goBack called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
    });
    /////////// Helpers /////
    // Create the MessageDetailComponent, initialize it, set test variables  
    function createComponent() {
        fixture = testing_1.TestBed.createComponent(message_detail_component_1.MessageDetailComponent);
        comp = fixture.componentInstance;
        page = new Page();
        // 1st change detection triggers ngOnInit which gets a message
        fixture.detectChanges();
        return fixture.whenStable().then(function () {
            // 2nd change detection displays the async-fetched message
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
        // Add page elements after message arrives 
        Page.prototype.addPageElements = function () {
            if (comp.messageDetailForm) {
                // have a form group element so these elements are now in the DOM
                this.goBackBtn = fixture.debugElement.query(platform_browser_1.By.css('#message-detail-back')).nativeElement;
                this.deleteBtn = fixture.debugElement.query(platform_browser_1.By.css('#message-detail-delete')).nativeElement;
                this.pageName = fixture.debugElement.query(platform_browser_1.By.css('.admin-message-detail')).nativeElement;
                this.nameDisplay = fixture.debugElement.query(platform_browser_1.By.css('#body')).nativeElement;
            }
        };
        return Page;
    }());
});
//# sourceMappingURL=message-detail.component.spec.js.map