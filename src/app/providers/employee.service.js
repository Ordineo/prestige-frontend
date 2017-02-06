"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var EmployeeService = (function () {
    function EmployeeService(af) {
        this.af = af;
    }
    EmployeeService.prototype.getEmployees = function () {
        return this.af.database.object('/employees/')
            .map(function (result) { return (result); })
            .do(function (result) { return (result); });
    };
    EmployeeService.prototype.getEmployeeById = function (id) {
        return this.af.database.object('/employees/' + id)
            .map(function (result) { return (result); })
            .share();
    };
    EmployeeService = __decorate([
        core_1.Injectable()
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
