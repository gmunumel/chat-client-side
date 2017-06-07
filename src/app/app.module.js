"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var about_component_1 = require("./components/about/about.component");
var app_component_1 = require("./components/app/app.component");
var chat_room_component_1 = require("./components/admin/chat-room/chat-room.component");
var chat_room_detail_component_1 = require("./components/admin/chat-room/chat-room-detail.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var message_component_1 = require("./components/admin/message/message.component");
var message_detail_component_1 = require("./components/admin/message/message-detail.component");
var sign_in_component_1 = require("./components/sign-in/sign-in.component");
var sign_up_component_1 = require("./components/sign-up/sign-up.component");
var user_component_1 = require("./components/admin/user/user.component");
var user_detail_component_1 = require("./components/admin/user/user-detail.component");
var user_service_1 = require("./services/user.service");
var chat_room_service_1 = require("./services/chat-room.service");
var message_service_1 = require("./services/message.service");
var socket_service_1 = require("./services/socket.service");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            about_component_1.AboutComponent,
            app_component_1.AppComponent,
            chat_room_component_1.ChatRoomComponent,
            chat_room_detail_component_1.ChatRoomDetailComponent,
            dashboard_component_1.DashboardComponent,
            message_component_1.MessageComponent,
            message_detail_component_1.MessageDetailComponent,
            sign_in_component_1.SignInComponent,
            sign_up_component_1.SignUpComponent,
            user_component_1.UserComponent,
            user_detail_component_1.UserDetailComponent,
        ],
        providers: [user_service_1.UserService, chat_room_service_1.ChatRoomService, message_service_1.MessageService, socket_service_1.SocketService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map