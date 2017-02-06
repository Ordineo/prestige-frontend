"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AccountDetailComponent = (function () {
    function AccountDetailComponent(accountService, dialogRef) {
        this.accountService = accountService;
        this.dialogRef = dialogRef;
    }
    AccountDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccountById(0).subscribe(function (account) {
            _this.account = {
                id: account.id,
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                phone: account.phone,
                unit: account.unit,
                gender: account.gender
            };
        });
    };
    AccountDetailComponent.prototype.saveAccount = function () {
        this.accountService.updateAccount(this.account);
        this.dialogRef.close();
    };
    AccountDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-account-detail',
            templateUrl: './account-detail.component.html',
            styleUrls: ['./account-detail.component.scss']
        })
    ], AccountDetailComponent);
    return AccountDetailComponent;
}());
exports.AccountDetailComponent = AccountDetailComponent;
