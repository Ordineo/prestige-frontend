"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var EmployeeDetailComponent = (function () {
    // EmployeeId = this.route.snapshot.params['id'];
    function EmployeeDetailComponent(route, employeeService) {
        this.route = route;
        this.employeeService = employeeService;
    }
    EmployeeDetailComponent.prototype.getUser = function () {
        var _this = this;
        console.log(this.route.snapshot.params['id'], "id => user?");
        this.employeeService.getEmployeeById(this.route.snapshot.params['id']).subscribe(function (result) {
            _this.employee = result;
        });
    };
    EmployeeDetailComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    EmployeeDetailComponent = __decorate([
        core_1.Component({
            selector: 'employee-detail',
            templateUrl: './employee-detail.component.html',
            styleUrls: ['./employee-detail.component.scss']
        })
    ], EmployeeDetailComponent);
    return EmployeeDetailComponent;
}());
exports.EmployeeDetailComponent = EmployeeDetailComponent;
