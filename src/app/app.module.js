"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require('./app-routing.module');
var md2_1 = require('md2');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var material_1 = require('@angular/material');
require('hammerjs');
var app_component_1 = require('./app.component');
var prestige_feed_component_1 = require('./prestige/prestige-feed/prestige-feed.component');
var employee_detail_component_1 = require('./employee/employee-detail/employee-detail.component');
var search_component_1 = require('./shared/search/search.component');
var employee_ranking_component_1 = require('./employee/employee-ranking/employee-ranking.component');
var prestige_detail_component_1 = require("./prestige/prestige-detail/prestige-detail.component");
var employee_service_1 = require('./providers/employee.service');
var angularfire2_1 = require('angularfire2');
var firebase_config_1 = require('./firebase.config');
var account_detail_component_1 = require('./account/account-detail/account-detail.component');
var account_service_1 = require("./providers/account.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                employee_detail_component_1.EmployeeDetailComponent,
                employee_ranking_component_1.EmployeeRankingComponent,
                prestige_detail_component_1.PrestigeDetailComponent,
                prestige_feed_component_1.PrestigeFeedComponent,
                search_component_1.SearchComponent,
                account_detail_component_1.AccountDetailComponent
            ],
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                material_1.MaterialModule.forRoot(),
                md2_1.Md2Module.forRoot(),
                ng_bootstrap_1.NgbModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                angularfire2_1.AngularFireModule.initializeApp(firebase_config_1.firebaseConfig)
            ],
            providers: [
                employee_service_1.EmployeeService,
                account_service_1.AccountService
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [account_detail_component_1.AccountDetailComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
