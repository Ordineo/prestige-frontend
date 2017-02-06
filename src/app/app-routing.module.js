"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var employee_detail_component_1 = require('./employee/employee-detail/employee-detail.component');
var employee_ranking_component_1 = require('./employee/employee-ranking/employee-ranking.component');
var prestige_detail_component_1 = require("./prestige/prestige-detail/prestige-detail.component");
var prestige_feed_component_1 = require('./prestige/prestige-feed/prestige-feed.component');
var appRoutes = [
    {
        path: 'employee-detail/:id',
        component: employee_detail_component_1.EmployeeDetailComponent
    },
    {
        path: 'employee-ranking',
        component: employee_ranking_component_1.EmployeeRankingComponent
    },
    {
        path: 'prestige-detail',
        component: prestige_detail_component_1.PrestigeDetailComponent
    },
    {
        path: 'prestige-feed',
        component: prestige_feed_component_1.PrestigeFeedComponent
    },
    {
        path: '',
        redirectTo: '/prestige-feed',
        pathMatch: 'full'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
