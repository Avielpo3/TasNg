webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    {{title}}!\n  </h1>\n  <br>\n\n  <app-wait-for-results *ngIf=\"!_isAngularStarted\">\n\n  </app-wait-for-results>\n\n  <div class=\"container\" id=\"rootContainer\" *ngIf=\"_isAngularStarted\">\n    <div class=\"row\">\n      <div class=\"col-xs-3\">\n        <app-filters>\n          //Content of filters\n        </app-filters>\n      </div>\n      <div class=\"col-xs-9\">\n        <app-result-area>\n          //Result list\n        </app-result-area>\n      </div>\n    </div>\n    <div class=\"row\">\n      <button class=\"btn btn-primary\" (click)=\"getRequestId($event)\">Get request id</button>\n      <hr>\n      <button class=\"btn btn-primary\" (click)=\"getFlightResults()\">Get flight segemtns</button>\n\n      <hr>\n      <button class=\"btn btn-primary\" (click)=\"getMockFlightResults()\">Get mock flight segemtns</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logger_service__ = __webpack_require__("../../../../../src/app/services/logger.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(_apiService, _logger) {
        this._apiService = _apiService;
        this._logger = _logger;
        this.title = 'Tas Onlnine Booking';
        this._isAngularStarted = false;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.getRequestId = function (event) {
        var _this = this;
        this._apiService.getRequestId()
            .subscribe(function (requestId) {
            _this.requestId = requestId;
            console.log(requestId);
        }, function (error) {
            _this._logger.onHttpError('getRequestId()', error);
        });
        event.preventDefault();
        return false;
    };
    AppComponent.prototype.getFlightResults = function () {
        var _this = this;
        try {
            this._apiService.getFlightResults()
                .subscribe(function (flightResults) {
            }, function (error) {
                _this._logger.onHttpError(' getFlightResults()', error);
            });
        }
        catch (error) {
            this._logger.onError(error);
        }
    };
    AppComponent.prototype.getMockFlightResults = function () {
        var _this = this;
        try {
            this._apiService.getMockFlightResults()
                .subscribe(function (flightResults) {
            }, function (error) {
                _this._logger.onHttpError(' getFlightResults()', error);
            });
        }
        catch (error) {
            this._logger.onError(error);
        }
    };
    //  Listen to window global property from outside angular.
    //  'isAngularStarted' - the property name, 'event.detail' - the new value.
    AppComponent.prototype.testListener = function (event) {
        this._isAngularStarted = event.detail;
        this._logger.logInfo('Ng started!');
    };
    return AppComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('window:isAngularStarted', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "testListener", null);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_logger_service__["a" /* LoggerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_logger_service__["a" /* LoggerService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__results_result_area_results_list_results_list_component__ = __webpack_require__("../../../../../src/app/results/result-area/results-list/results-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__results_result_area_results_list_flight_result_flight_result_component__ = __webpack_require__("../../../../../src/app/results/result-area/results-list/flight-result/flight-result.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__results_result_area_results_list_flight_result_flight_result_leg_flight_result_leg_component__ = __webpack_require__("../../../../../src/app/results/result-area/results-list/flight-result/flight-result-leg/flight-result-leg.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wait_for_results_wait_for_results_component__ = __webpack_require__("../../../../../src/app/wait-for-results/wait-for-results.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_logger_service__ = __webpack_require__("../../../../../src/app/services/logger.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__filters_filters_component__ = __webpack_require__("../../../../../src/app/filters/filters.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__filters_filter_filter_component__ = __webpack_require__("../../../../../src/app/filters/filter/filter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__results_result_area_result_area_component__ = __webpack_require__("../../../../../src/app/results/result-area/result-area.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__results_result_area_results_list_results_list_component__["a" /* ResultsListComponent */],
            __WEBPACK_IMPORTED_MODULE_4__results_result_area_results_list_flight_result_flight_result_component__["a" /* ResultComponent */],
            __WEBPACK_IMPORTED_MODULE_5__results_result_area_results_list_flight_result_flight_result_leg_flight_result_leg_component__["a" /* ResultDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_6__wait_for_results_wait_for_results_component__["a" /* WaitForResultsComponent */],
            __WEBPACK_IMPORTED_MODULE_10__filters_filters_component__["a" /* FiltersComponent */],
            __WEBPACK_IMPORTED_MODULE_11__filters_filter_filter_component__["a" /* FilterComponent */],
            __WEBPACK_IMPORTED_MODULE_12__results_result_area_result_area_component__["a" /* ResultAreaComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_http__["c" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__services_api_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_9__services_logger_service__["a" /* LoggerService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/filters/filter/filter.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/filters/filter/filter.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  filter works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/filters/filter/filter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterComponent = (function () {
    function FilterComponent() {
    }
    FilterComponent.prototype.ngOnInit = function () {
    };
    return FilterComponent;
}());
FilterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-filter',
        template: __webpack_require__("../../../../../src/app/filters/filter/filter.component.html"),
        styles: [__webpack_require__("../../../../../src/app/filters/filter/filter.component.css")]
    }),
    __metadata("design:paramtypes", [])
], FilterComponent);

//# sourceMappingURL=filter.component.js.map

/***/ }),

/***/ "../../../../../src/app/filters/filters.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/filters/filters.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  filters works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/filters/filters.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FiltersComponent = (function () {
    function FiltersComponent() {
    }
    FiltersComponent.prototype.ngOnInit = function () {
    };
    return FiltersComponent;
}());
FiltersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-filters',
        template: __webpack_require__("../../../../../src/app/filters/filters.component.html"),
        styles: [__webpack_require__("../../../../../src/app/filters/filters.component.css")]
    }),
    __metadata("design:paramtypes", [])
], FiltersComponent);

//# sourceMappingURL=filters.component.js.map

/***/ }),

/***/ "../../../../../src/app/results/result-area/result-area.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container{\r\n    border: 1px solid red;\r\n    border-radius: 10px;\r\n    padding: 10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/results/result-area/result-area.component.html":
/***/ (function(module, exports) {

module.exports = "  <div class=\"container\">\n    <h1>Flight Results</h1>\n    <app-results-list *ngFor=\"let resultList of _flightResultArray;let i = index\"\n                     [_flightResultsArray]=\"resultList\"\n                     [_index]=\"i\" >\n\n    </app-results-list>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/results/result-area/result-area.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultAreaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResultAreaComponent = (function () {
    function ResultAreaComponent(_apiService) {
        this._apiService = _apiService;
        this._isFirstJson = true;
    }
    ResultAreaComponent.prototype.ngOnInit = function () {
        this.subscribeToFlightResults();
    };
    ResultAreaComponent.prototype.subscribeToFlightResults = function () {
        var _this = this;
        this._apiService.onGetFlightResultsJson.subscribe(function (flightResultArray) {
            if (_this._isFirstJson) {
                _this._flightResultArray = flightResultArray;
            }
            // else{
            // }
        });
    };
    return ResultAreaComponent;
}());
ResultAreaComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-result-area',
        template: __webpack_require__("../../../../../src/app/results/result-area/result-area.component.html"),
        styles: [__webpack_require__("../../../../../src/app/results/result-area/result-area.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object])
], ResultAreaComponent);

var _a;
//# sourceMappingURL=result-area.component.js.map

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/flight-result/flight-result-leg/flight-result-leg.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/flight-result/flight-result-leg/flight-result-leg.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  result-detail works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/flight-result/flight-result-leg/flight-result-leg.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResultDetailComponent = (function () {
    function ResultDetailComponent() {
    }
    ResultDetailComponent.prototype.ngOnInit = function () {
    };
    return ResultDetailComponent;
}());
ResultDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-flight-result-leg',
        template: __webpack_require__("../../../../../src/app/results/result-area/results-list/flight-result/flight-result-leg/flight-result-leg.component.html"),
        styles: [__webpack_require__("../../../../../src/app/results/result-area/results-list/flight-result/flight-result-leg/flight-result-leg.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ResultDetailComponent);

//# sourceMappingURL=flight-result-leg.component.js.map

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/flight-result/flight-result.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container{\r\n    border: 1px solid gray;\r\n    border-radius: 5px;\r\n    margin: 10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/flight-result/flight-result.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-xs-2\">\n      <p>Prop Num.<b> {{flightIndex + 1}}</b></p>\n    </div>\n    <div class=\"col-xs-2\" *ngIf=\"flightResult.PricedItinerary[0].AirItinerary.LastDayToPurchase != null\">\n        {{flightResult.PricedItinerary[0].AirItinerary.LastDayToPurchase}}\n    </div>\n    <div class=\"col-xs-2\" *ngIf=\"flightResult.PricedItinerary[0].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].ArrivalAirport != null\">\n        Arrival Airport: <b>{{flightResult.PricedItinerary[0].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].ArrivalAirport}}</b>\n    </div>\n    <img [src]=\"getAirlineLogo()\" alt=\"No img\">\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/flight-result/flight-result.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResultComponent = (function () {
    function ResultComponent() {
    }
    ResultComponent.prototype.ngOnInit = function () {
        // tslint:disable-next-line:no-unused-expression
        // this.flightResults = ;
    };
    ResultComponent.prototype.getAirlineLogo = function () {
        return './assets/airlines-logos/2j.gif';
    };
    return ResultComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], ResultComponent.prototype, "flightResults", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], ResultComponent.prototype, "flightIndex", void 0);
ResultComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-flight-result',
        template: __webpack_require__("../../../../../src/app/results/result-area/results-list/flight-result/flight-result.component.html"),
        styles: [__webpack_require__("../../../../../src/app/results/result-area/results-list/flight-result/flight-result.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ResultComponent);

//# sourceMappingURL=flight-result.component.js.map

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/results-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container{\r\n    border: 1px solid blue;\r\n    position: relative;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/results-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <app-flight-result *ngFor=\"let flightResult of _flightResultsArray; let i = index\"\n                             [flightResults]=\"flightResult\"\n                             [flightIndex]=\"i\" >\n\n  </app-flight-result>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/results/result-area/results-list/results-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__ = __webpack_require__("../../../../../src/app/services/api/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResultsListComponent = (function () {
    function ResultsListComponent(_apiService) {
        this._apiService = _apiService;
    }
    ResultsListComponent.prototype.ngOnInit = function () {
        // this._flightResultsArray
    };
    return ResultsListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Array)
], ResultsListComponent.prototype, "_flightResultsArray", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number)
], ResultsListComponent.prototype, "_index", void 0);
ResultsListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-results-list',
        template: __webpack_require__("../../../../../src/app/results/result-area/results-list/results-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/results/result-area/results-list/results-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_api_api_service__["a" /* ApiService */]) === "function" && _a || Object])
], ResultsListComponent);

var _a;
//# sourceMappingURL=results-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/results/result-parser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultParser; });
// This class resposible for all the json parsing.
// All the parsing logic should be here.
var ResultParser = (function () {
    function ResultParser() {
    }
    ResultParser.prototype.getDirectionsArray = function (flightJson) {
        var destinationList = flightJson.Answer.DestinationList;
        return destinationList;
    };
    return ResultParser;
}());

//# sourceMappingURL=result-parser.js.map

/***/ }),

/***/ "../../../../../src/app/services/api/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger_service__ = __webpack_require__("../../../../../src/app/services/logger.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__results_result_parser__ = __webpack_require__("../../../../../src/app/results/result-parser.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ApiService = (function () {
    function ApiService(_http, _logger) {
        this._http = _http;
        this._logger = _logger;
        this.FlightResultUrl = '/assets/flight-result.json';
        this.onGetFlightResultsJson = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
        this.requestOptions.headers = headers;
    }
    ApiService.prototype.getRequestId = function () {
        var _this = this;
        var url = 'TasAngular.aspx/GetRequestId';
        return this._http.post(url, {}, this.requestOptions)
            .map(function (response) {
            try {
                var responseRequestIdJson = response.json();
                var requestId = JSON.parse(responseRequestIdJson.d);
                _this._logger.logInfo(requestId);
                // Success
                return requestId;
            }
            catch (error) {
                // Error while parsing.
                _this._logger.onException(error);
                throw new Error('Error while parsing the Request id');
            }
        }).catch(
        // Http Request error.
        function (err) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw('Http Error while try to get Request Id'); });
    };
    ApiService.prototype.getFlightResults = function () {
        var _this = this;
        return this._http.post('TasAngular.aspx/GetFlightResults', {})
            .map(function (flightResponse) {
            try {
                var responseFlightResultsJson = flightResponse.json();
                var flightsReults = JSON.parse(responseFlightResultsJson.d);
                _this._logger.logInfo(flightsReults);
                return flightsReults;
            }
            catch (error) {
                _this._logger.onException(error);
                throw new Error('Error while parsing the flights results');
            }
        }).catch(
        // Http Request error.
        function (err) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(err); });
    };
    ApiService.prototype.getMockFlightResults = function () {
        var _this = this;
        return this._http.get(this.FlightResultUrl)
            .map(function (resposnse) {
            try {
                var flightResultsFullJson = resposnse.json();
                var resultParser = new __WEBPACK_IMPORTED_MODULE_6__results_result_parser__["a" /* ResultParser */]();
                var directionsArray = resultParser.getDirectionsArray(flightResultsFullJson);
                _this.onGetFlightResultsJson.next(directionsArray);
            }
            catch (error) {
                _this._logger.onException(error);
            }
        });
    };
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__logger_service__["a" /* LoggerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__logger_service__["a" /* LoggerService */]) === "function" && _b || Object])
], ApiService);

var _a, _b;
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/logger.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoggerService = (function () {
    function LoggerService() {
    }
    LoggerService.prototype.onError = function (errorMessage) {
        console.log('Error has accured : ' + errorMessage);
    };
    LoggerService.prototype.onException = function (ex) {
        console.log('Exception has accured : ' + ex.name + ' ' + ex.message);
        console.log('Exception Stack trace : ' + ex.stack);
    };
    LoggerService.prototype.logInfo = function (data) {
        console.log('Info : ' + data);
    };
    LoggerService.prototype.onHttpError = function (methodName, httpResponse) {
        console.log('Http Error at method: ' + methodName + ' ' + httpResponse);
        if (httpResponse._body) {
            try {
                var errorJson = JSON.parse(httpResponse._body);
                console.log(errorJson.Message);
            }
            catch (error) {
                console.log('End of error details');
            }
        }
    };
    return LoggerService;
}());
LoggerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], LoggerService);

//# sourceMappingURL=logger.service.js.map

/***/ }),

/***/ "../../../../../src/app/wait-for-results/wait-for-results.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/wait-for-results/wait-for-results.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  \n  <img src=\"https://media.giphy.com/media/PWfHC8ogZpWcE/giphy.gif\" alt=\"\">\n  <button class=\"btn btn-primary\" (click)=\"startAngular()\" >\n      Click to start angular\n  </button>\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/wait-for-results/wait-for-results.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaitForResultsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WaitForResultsComponent = (function () {
    function WaitForResultsComponent() {
    }
    WaitForResultsComponent.prototype.ngOnInit = function () {
    };
    WaitForResultsComponent.prototype.startAngular = function () {
        window.dispatchEvent(new CustomEvent('isAngularStarted', { detail: true }));
    };
    return WaitForResultsComponent;
}());
WaitForResultsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-wait-for-results',
        template: __webpack_require__("../../../../../src/app/wait-for-results/wait-for-results.component.html"),
        styles: [__webpack_require__("../../../../../src/app/wait-for-results/wait-for-results.component.css")]
    }),
    __metadata("design:paramtypes", [])
], WaitForResultsComponent);

//# sourceMappingURL=wait-for-results.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map