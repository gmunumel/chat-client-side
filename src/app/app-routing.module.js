"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var about_component_1 = require("./components/about/about.component");
var chat_room_component_1 = require("./components/admin/chat-room/chat-room.component");
var chat_room_detail_component_1 = require("./components/admin/chat-room/chat-room-detail.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var message_component_1 = require("./components/admin/message/message.component");
var message_detail_component_1 = require("./components/admin/message/message-detail.component");
var sign_in_component_1 = require("./components/sign-in/sign-in.component");
var sign_up_component_1 = require("./components/sign-up/sign-up.component");
var user_component_1 = require("./components/admin/user/user.component");
var user_detail_component_1 = require("./components/admin/user/user-detail.component");
var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'signin', component: sign_in_component_1.SignInComponent },
    { path: 'signup', component: sign_up_component_1.SignUpComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'admin/user', component: user_component_1.UserComponent },
    { path: 'admin/user/detail/:id', component: user_detail_component_1.UserDetailComponent },
    { path: 'admin/chat-room', component: chat_room_component_1.ChatRoomComponent },
    { path: 'admin/chat-room/detail/:id', component: chat_room_detail_component_1.ChatRoomDetailComponent },
    { path: 'admin/chat-room/:chat_room_id/message', component: message_component_1.MessageComponent },
    { path: 'admin/chat-room/:chat_room_id/message/detail/:id', component: message_detail_component_1.MessageDetailComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map