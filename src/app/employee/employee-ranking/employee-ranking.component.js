"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/merge');
var EmployeeRankingComponent = (function () {
    function EmployeeRankingComponent(employeeService) {
        this.employeeService = employeeService;
        this.totalPrestige = 1;
    }
    EmployeeRankingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employeeService.getEmployees()
            .subscribe(function (result) {
            _this.employees = result;
        });
    };
    EmployeeRankingComponent = __decorate([
        core_1.Component({
            selector: 'app-employee-ranking',
            templateUrl: './employee-ranking.component.html',
            styleUrls: ['./employee-ranking.component.scss']
        })
    ], EmployeeRankingComponent);
    return EmployeeRankingComponent;
}());
exports.EmployeeRankingComponent = EmployeeRankingComponent;
