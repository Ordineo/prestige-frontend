"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var material_1 = require("@angular/material");
var account_detail_component_1 = require("./account/account-detail/account-detail.component");
var AppComponent = (function () {
    function AppComponent(router, dialog, viewContainerRef) {
        this.router = router;
        this.dialog = dialog;
        this.viewContainerRef = viewContainerRef;
    }
    // todo check status for tabs and routing
    // https://github.com/angular/material2/issues/524#issuecomment-257209955
    AppComponent.prototype.changeTab = function (at) {
        switch (at.index) {
            case 0:
                this.router.navigateByUrl('/prestige-feed');
                break;
            // change this with ID of loggedin user
            case 1:
                this.router.navigateByUrl('/employee-detail/0');
                break;
            case 2:
                this.router.navigateByUrl('/employee-ranking');
                break;
            default:
                console.debug('activeTab is: ', at, 'activeTab.index is: ', at.index);
                break;
        }
    };
    AppComponent.prototype.openAccountDetail = function () {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        config.width = '80%';
        this.dialogRef = this.dialog.open(account_detail_component_1.AccountDetailComponent, config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.dialogRef = null;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
