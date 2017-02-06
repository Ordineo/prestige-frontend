"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PrestigeFeedComponent = (function () {
    function PrestigeFeedComponent(af) {
        var _this = this;
        af.database.object('/feed').subscribe(function (res) {
            console.log(res);
            _this.feed = res;
        });
    }
    PrestigeFeedComponent.prototype.ngOnInit = function () {
    };
    PrestigeFeedComponent = __decorate([
        core_1.Component({
            selector: 'prestige-feed',
            templateUrl: './prestige-feed.component.html',
            styleUrls: ['./prestige-feed.component.scss']
        })
    ], PrestigeFeedComponent);
    return PrestigeFeedComponent;
}());
exports.PrestigeFeedComponent = PrestigeFeedComponent;
