(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page-content\">\n  <router-outlet></router-outlet>\n  <div class=\"fullpage-loading-spinner\" [hidden]=\"!loading()\">\n      <mat-spinner></mat-spinner>\n      <button mat-button (click)=\"hideLoading()\">\n          <mat-icon>close</mat-icon>\n      </button>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/analytics/analytics-frame/analytics-frame.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/analytics/analytics-frame/analytics-frame.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header-bar #appHeader [title]=\"'Chatbots.mnAnalytics'\" [skipAuth]=\"false\" [logoutNavigation]=\"'/'\"></app-header-bar>\n<iframe [src]=\"iframeUrl\" #analyticsFrame scrolling=\"yes\" class=\"intelligo-analytics-iframe\"></iframe>Ï");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.html ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header-bar #appHeader [title]=\"'SDK Configuration'\" [skipAuth]=\"true\" [logoutNavigation]=\"\"></app-header-bar>\n<div class=\"app-content\">\n    <div class=\"center-block center-content\">\n        <div class=\"row\">\n            <div class=\"col-md-3\">\n                <h4 class=\"left-header\">\n                    Customizations\n                </h4>\n                <mat-form-field>\n                    <input matInput type=\"url\" placeholder=\"Web SDK URL\" [(ngModel)]=\"webOptions.websdkUrl\"\n                        name=\"websdkUrl\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"url\" placeholder=\"Web sockets URL\" [(ngModel)]=\"webOptions.webSocketsUrl\"\n                        name=\"webSocketsUrl\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"url\" placeholder=\"Logo URL\" [(ngModel)]=\"webOptions.logoUrl\"\n                        name=\"webLogoUrl\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Color\" [(ngModel)]=\"webOptions.accentColor\"\n                        name=\"webColor\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Title\" [(ngModel)]=\"webOptions.title\" name=\"webTitle\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Description\" [(ngModel)]=\"webOptions.desc\" name=\"webDesc\">\n                </mat-form-field>\n                <section class=\"control radio-grp\">\n                    <label>Chat window placement</label>\n                    <mat-radio-group [(ngModel)]=\"webOptions.isFullPage\">\n                        <mat-radio-button [value]=\"true\">Center - full page</mat-radio-button>\n                        <mat-radio-button [value]=\"false\">Right bottom - minimized</mat-radio-button>\n                    </mat-radio-group>\n                </section>\n\n                <section class=\"control\" [hidden]=\"webOptions.isFullPage\">\n                    <mat-slide-toggle #webAutoOpenCheck [(ngModel)]=\"enableAutoOpen\" name=\"webAutoOpenCheck\">Auto open\n                    </mat-slide-toggle>\n                </section>\n\n                <mat-form-field *ngIf=\"enableAutoOpen && !webOptions.isFullPage\">\n                    <input matInput type=\"text\" placeholder=\"Auto open\" [(ngModel)]=\"webOptions.autoOpenSecs\"\n                        name=\"webAutoOpenSecs\">\n                    <mat-hint> in seconds </mat-hint>\n                </mat-form-field>\n\n                <section class=\"control\">\n                    <mat-slide-toggle name=\"webAllowChatReset\" [(ngModel)]=\"webOptions.allowChatReset\">Allow chat reset\n                    </mat-slide-toggle>\n                </section>\n                <section class=\"control\">\n                    <mat-slide-toggle name=\"webHtmlMessages\" [(ngModel)]=\"webOptions.enableHtmlMessages\">Enable HTML in\n                        messages</mat-slide-toggle>\n                </section>\n                <section class=\"control\">\n                    <mat-slide-toggle name=\"webShowAnaBranding\" [(ngModel)]=\"webOptions.showPoweredByAna\">Show 'powered\n                        by ana'</mat-slide-toggle>\n                </section>\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Height\" [(ngModel)]=\"webOptions.height\" name=\"webHeight\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Width\" [(ngModel)]=\"webOptions.width\" name=\"webWidth\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Foreground color\" [(ngModel)]=\"webOptions.foregroundColor\"\n                        name=\"webForegroundColor\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Secondary color\" [(ngModel)]=\"webOptions.foregroundColor\"\n                        name=\"webForegroundColor\">\n                </mat-form-field>\n            </div>\n            <div class=\"col-md-9\">\n                <mat-tab-group>\n                    <mat-tab label=\"Web\">\n                        <div class=\"table-body\">\n                            <p>\n                                Please use the following HTML code snippet to enable Chatbots.mn web chat on your web\n                                page:\n                            </p>\n                            <div highlight-js-content=\".highlight\" class=\"highlight-container\">\n                                <div class=\"html highlight\" [innerText]=\"webSnippet\"></div>\n                            </div>\n                            <button mat-raised-button color=\"primary\" ngxClipboard [cbContent]=\"webSnippet\"\n                                (cbOnSuccess)=\"copied()\"> Copy </button>\n                            <button mat-raised-button (click)=\"preview()\"> Preview </button>\n                        </div>\n                    </mat-tab>\n                    <mat-tab label=\"Android\" class=\"table-body\">\n                        <div class=\"table-body\">\n                            Please follow the instructions for configuring Chatbots.mn Android SDK <a\n                                href=\"javascript:;\"\n                                (click)=\"open('https://github.com/Kitsune-tools/ANAChat-Android')\">here</a>\n                        </div>\n                    </mat-tab>\n                    <mat-tab label=\"iOS\">\n                        <div class=\"table-body\">\n                            Please follow the instructions for configuring Chatbots.mniOS SDK <a href=\"javascript:;\"\n                                (click)=\"open('https://github.com/Kitsune-tools/ANAChat-iOS')\">here</a>\n                        </div>\n                    </mat-tab>\n                </mat-tab-group>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/home/home.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/home/home.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header-bar [skipAuth]=\"true\" [title]=\"'Chatbots.mn'\" [hideBackButton]=\"true\" #appHeader></app-header-bar>\n\n<div class=\"container\">\n    <div class=\"button-row\">\n        <button mat-raised-button (click)=\"studio()\" color=\"primary\" class=\"feature-button btn-studio\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 391.758 391.758\">\n                <path fill=\"white\"\n                    d=\"M269.333 367.273h-15.052c-8.974 0-16.068-9.769-18.113-15.346-1.114-3.042-2.167-10.082-2.834-15.26h-74.911c-.667 5.179-1.72 12.218-2.834 15.26-2.044 5.576-9.139 15.346-18.113 15.346h-15.052c-3.379 0-6.121 2.742-6.121 6.121s2.742 6.121 6.121 6.121h146.909a6.123 6.123 0 0 0 6.121-6.121 6.123 6.123 0 0 0-6.121-6.121zm110.182-97.94c0 6.764-5.478 12.242-12.242 12.242H24.485c-6.764 0-12.242-5.478-12.242-12.242V36.727c0-6.764 5.478-12.242 12.242-12.242h342.788c6.764 0 12.242 5.478 12.242 12.242v232.606zm-183.636 42.849c-3.379 0-6.121-2.742-6.121-6.121s2.742-6.121 6.121-6.121 6.121 2.742 6.121 6.121-2.742 6.121-6.121 6.121zm171.394-299.94H24.485C10.963 12.242 0 23.206 0 36.727V306.06c0 13.522 10.963 24.485 24.485 24.485h342.788c13.522 0 24.485-10.963 24.485-24.485V36.727c0-13.521-10.964-24.485-24.485-24.485zm-299.94 48.97h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v18.364h-48.97v6.121h48.97v12.242h6.121V67.333h299.939v-6.121H67.333zm217.303 55.091H254.03a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zm85.697 24.485h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zm-42.848 0h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.063 3.063 0 0 0-3.061-3.061zm-42.849 0H254.03a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zm-39.788 15.303v-12.242a3.062 3.062 0 0 0-3.061-3.061h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061zm3.061 82.636h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zm-42.848 0h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.063 3.063 0 0 0-3.061-3.061zm-42.849 0h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zM202 156.091v-12.242a3.062 3.062 0 0 0-3.061-3.061h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061zm-42.848 0v-12.242a3.062 3.062 0 0 0-3.061-3.061h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.063 3.063 0 0 0 3.061-3.061zm-45.91-15.303H82.636a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zm97.94-6.121h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061zm-45.909-3.061a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242zm205.06 58.152h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zm-42.848 0h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.063 3.063 0 0 0-3.061-3.061zm-42.849 0H254.03a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061v-12.242a3.062 3.062 0 0 0-3.061-3.061zm-116.303-79.576h30.606a3.062 3.062 0 0 0 3.061-3.061V94.879a3.062 3.062 0 0 0-3.061-3.061h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.063 3.063 0 0 0 3.061 3.061zm-42.848 0h30.606a3.062 3.062 0 0 0 3.061-3.061V94.879a3.062 3.062 0 0 0-3.061-3.061h-30.606a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061zm-12.243-18.364H82.636a3.062 3.062 0 0 0-3.061 3.061v12.242a3.062 3.062 0 0 0 3.061 3.061h30.606a3.062 3.062 0 0 0 3.061-3.061V94.879a3.062 3.062 0 0 0-3.061-3.061z\" />\n                </svg>\n            <br /><span>Studio</span>\n        </button>\n        <button mat-raised-button (click)=\"userManagement()\" color=\"primary\" class=\"feature-button btn-user-management\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\">\n                <path fill=\"white\"\n                    d=\"M48.355 17.922c3.705 2.323 6.303 6.254 6.776 10.817a11.69 11.69 0 0 0 4.966 1.112c6.491 0 11.752-5.261 11.752-11.751 0-6.491-5.261-11.752-11.752-11.752-6.429.002-11.644 5.169-11.742 11.574zm-7.699 24.062c6.491 0 11.752-5.262 11.752-11.752s-5.262-11.751-11.752-11.751c-6.49 0-11.754 5.262-11.754 11.752s5.264 11.751 11.754 11.751zm4.985.801h-9.972c-8.297 0-15.047 6.751-15.047 15.048v12.195l.031.191.84.263c7.918 2.474 14.797 3.299 20.459 3.299 11.059 0 17.469-3.153 17.864-3.354l.785-.397h.084V57.833c.003-8.297-6.747-15.048-15.044-15.048zm19.443-12.132h-9.895a14.483 14.483 0 0 1-4.47 10.088c7.375 2.193 12.771 9.032 12.771 17.11v3.758c9.77-.358 15.4-3.127 15.771-3.313l.785-.398h.084V45.699c0-8.296-6.75-15.046-15.046-15.046zm-45.049-.8c2.299 0 4.438-.671 6.25-1.814a14.544 14.544 0 0 1 5.467-9.276c.012-.22.033-.438.033-.66 0-6.491-5.262-11.752-11.75-11.752-6.492 0-11.752 5.261-11.752 11.752 0 6.488 5.26 11.75 11.752 11.75zm10.554 10.888a14.492 14.492 0 0 1-4.467-10.032c-.367-.027-.73-.056-1.104-.056h-9.971C6.75 30.653 0 37.403 0 45.699v12.197l.031.188.84.265c6.352 1.983 12.021 2.897 16.945 3.185v-3.683c.002-8.078 5.396-14.915 12.773-17.11z\" />\n                </svg>\n            <br /><span>User Management</span>\n        </button>\n    </div>\n    <div class=\"button-row\">\n        <button mat-raised-button (click)=\"analytics()\" color=\"primary\" class=\"feature-button btn-analytics\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"84\" height=\"84\">\n                <path d=\"M82.25 80.5H1.75a1.75 1.75 0 0 0 0 3.5h80.5a1.75 1.75 0 0 0 0-3.5z\" fill=\"#fff\" />\n                <path\n                    d=\"M15.75 59.5H5.25a1.75 1.75 0 0 0-1.75 1.751v21c0 .966.784 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75v-21a1.75 1.75 0 0 0-1.75-1.75zM14 80.5H7V63h7v17.5zM36.75 42h-10.5a1.75 1.75 0 0 0-1.75 1.751v38.5c0 .966.784 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75v-38.5a1.75 1.75 0 0 0-1.75-1.75zM35 80.5h-7v-35h7v35zM57.75 49h-10.5a1.75 1.75 0 0 0-1.75 1.751v31.5c0 .966.784 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75v-31.5a1.75 1.75 0 0 0-1.75-1.75zM56 80.5h-7v-28h7v28zM78.75 28.001h-10.5a1.75 1.75 0 0 0-1.75 1.75v52.5c0 .966.784 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75v-52.5a1.75 1.75 0 0 0-1.75-1.75zM77 80.501h-7v-49h7v49zM10.5 31.5c-3.86 0-7 3.14-7 7.001 0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7zm0 10.5A3.503 3.503 0 0 1 7 38.502c0-1.929 1.568-3.5 3.5-3.5s3.5 1.572 3.5 3.5-1.568 3.5-3.5 3.5zM31.5 14c-3.86 0-7 3.14-7 7 0 3.861 3.14 7.001 7 7.001s7-3.14 7-7-3.14-7-7-7zm0 10.5A3.503 3.503 0 0 1 28 21c0-1.928 1.568-3.499 3.5-3.499s3.5 1.572 3.5 3.5-1.568 3.5-3.5 3.5zM52.5 21c-3.86 0-7 3.14-7 7.001 0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7zm0 10.5a3.503 3.503 0 0 1-3.5-3.499c0-1.929 1.568-3.5 3.5-3.5s3.5 1.572 3.5 3.5-1.568 3.5-3.5 3.5zM73.5.001c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 10.5a3.503 3.503 0 0 1-3.5-3.5c0-1.929 1.568-3.5 3.5-3.5s3.5 1.572 3.5 3.5-1.568 3.5-3.5 3.5z\"\n                    fill=\"#fff\" />\n                <path\n                    d=\"M71.029 9.472a1.751 1.751 0 0 0-2.475 0l-13.58 13.58a1.751 1.751 0 0 0 0 2.474c.344.34.791.511 1.24.511.444 0 .892-.168 1.235-.51l13.58-13.58a1.751 1.751 0 0 0 0-2.475zM48.268 23.962l-11.242-3.206a1.733 1.733 0 0 0-2.16 1.204 1.75 1.75 0 0 0 1.201 2.163L47.31 27.33a1.751 1.751 0 0 0 .96-3.367zM28.77 23.181a1.75 1.75 0 0 0-2.457-.28L13.118 33.422a1.749 1.749 0 0 0 1.092 3.119c.381 0 .766-.126 1.088-.378l13.195-10.521a1.749 1.749 0 0 0 .277-2.46z\"\n                    fill=\"#fff\" />\n            </svg>\n            <br /><span>Analytics</span>\n        </button>\n        <button mat-raised-button (click)=\"deploy()\" color=\"primary\" class=\"feature-button btn-user-management\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\">\n                <path\n                    d=\"M9.8 72.8c-5.403 0-9.8 4.397-9.8 9.8 0 .774.626 1.4 1.4 1.4h16.8c.774 0 1.4-.626 1.4-1.4 0-5.403-4.397-9.8-9.8-9.8zm-6.859 8.4A7.009 7.009 0 0 1 8.4 75.754V78.4h2.8v-2.646a7.01 7.01 0 0 1 5.459 5.446H2.94zM82.6 60.2h-2.456a14.695 14.695 0 0 0-.243-.582l1.737-1.738a1.398 1.398 0 0 0 0-1.98L75.7 49.963a1.377 1.377 0 0 0-1.051-.398c2.219-1.177 3.752-3.483 3.752-6.164V7c0-3.86-3.14-7-7-7H7C3.14 0 0 3.14 0 7v36.4c0 3.86 3.14 7 7 7h18.27l-5.29 9.8H17.5a4.905 4.905 0 0 0-4.9 4.9c0 2.702 2.198 4.9 4.9 4.9h30.1c0 .774.626 1.4 1.4 1.4h2.456c.077.195.156.388.243.582l-1.737 1.738a1.398 1.398 0 0 0 0 1.98l5.939 5.938a1.398 1.398 0 0 0 1.98 0l1.737-1.737c.194.087.387.166.582.243V82.6c0 .774.626 1.4 1.4 1.4H70c.774 0 1.4-.626 1.4-1.4v-2.456c.195-.077.388-.156.582-.243l1.738 1.737a1.398 1.398 0 0 0 1.98 0l5.938-5.939a1.398 1.398 0 0 0 0-1.98l-1.737-1.737c.087-.194.166-.387.243-.582H82.6c.774 0 1.4-.626 1.4-1.4v-8.4c0-.774-.626-1.4-1.4-1.4zM2.8 7c0-2.316 1.884-4.2 4.2-4.2h64.4c2.316 0 4.2 1.884 4.2 4.2v29.4H2.8V7zM7 47.6a4.205 4.205 0 0 1-4.2-4.2v-4.2h72.8v4.2c0 2.316-1.884 4.2-4.2 4.2H7zm66.702 2.38l-1.72 1.72a14.695 14.695 0 0 0-.582-.244V50.4c.81 0 1.576-.165 2.302-.42zM60.2 50.4v1.056c-.195.077-.388.156-.582.243l-1.3-1.299H60.2zm-4.739 0l-1.207 1.207-.822-1.207h2.029zM47.6 67.2H17.5c-1.158 0-2.1-.942-2.1-2.1 0-1.158.942-2.1 2.1-2.1h30.1v4.2zm-24.438-7.001l5.289-9.799h21.593l2.196 3.221-2.278 2.278a1.398 1.398 0 0 0 0 1.98l1.737 1.737c-.087.195-.166.388-.243.583H23.162zM81.2 68.6h-2.043a1.4 1.4 0 0 0-1.335.979c-.213.676-.5 1.365-.854 2.042a1.4 1.4 0 0 0 .252 1.638l1.45 1.45-3.959 3.96-1.45-1.45a1.403 1.403 0 0 0-1.638-.253c-.678.355-1.367.642-2.043.854-.584.187-.98.726-.98 1.337V81.2H63v-2.043a1.4 1.4 0 0 0-.979-1.335c-.676-.213-1.365-.5-2.042-.854a1.403 1.403 0 0 0-1.638.252l-1.45 1.45-3.96-3.959 1.45-1.45a1.4 1.4 0 0 0 .253-1.638 12.596 12.596 0 0 1-.854-2.043 1.403 1.403 0 0 0-1.337-.98H50.4V63h2.043a1.4 1.4 0 0 0 1.335-.979c.213-.676.5-1.365.854-2.042a1.4 1.4 0 0 0-.252-1.638l-1.45-1.45 3.959-3.96 1.45 1.45a1.398 1.398 0 0 0 1.638.253 12.596 12.596 0 0 1 2.043-.854c.584-.187.98-.726.98-1.337V50.4h5.6v2.043a1.4 1.4 0 0 0 .979 1.335c.676.213 1.365.5 2.042.854a1.399 1.399 0 0 0 1.638-.252l1.45-1.45 3.96 3.959-1.45 1.45a1.4 1.4 0 0 0-.253 1.638c.355.678.642 1.367.854 2.043.187.584.726.98 1.337.98H81.2v5.6z\" />\n                <path\n                    d=\"M65.8 57.4c-4.633 0-8.4 3.767-8.4 8.4 0 4.633 3.767 8.4 8.4 8.4 4.633 0 8.4-3.767 8.4-8.4 0-4.633-3.767-8.4-8.4-8.4zm0 14a5.606 5.606 0 0 1-5.6-5.6c0-3.088 2.512-5.6 5.6-5.6 3.088 0 5.6 2.512 5.6 5.6 0 3.088-2.512 5.6-5.6 5.6zM27.59 10.79l-1.98-1.98-9.8 9.8a1.398 1.398 0 0 0 0 1.98l9.8 9.8 1.98-1.98-8.81-8.81 8.81-8.81zM58.39 18.61l-9.8-9.8-1.98 1.98 8.81 8.81-8.81 8.81 1.98 1.98 9.8-9.8a1.398 1.398 0 0 0 0-1.98zM29.546 30.174L42.143 4.982l2.504 1.252L32.05 31.427zM54.6 28h2.8v2.8h-2.8zM60.2 28H63v2.8h-2.8zM65.8 28h2.8v2.8h-2.8z\" />\n                </svg>\n            <br /><span>SDK Configuration</span>\n        </button>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/manage-users/biz-accounts/biz-accounts.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/manage-users/biz-accounts/biz-accounts.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header-bar [title]=\"'User Management'\" #appHeader></app-header-bar>\n<div class=\"app-content\">\n    <div class=\"app-content-header\">\n        <h4 class=\"app-content-header-text\">Business Accounts</h4>\n        <div class=\"app-content-header-actions\">\n            <mat-form-field floatLabel=\"never\" class=\"search-text\">\n                <mat-label>Search</mat-label>\n                <input type=\"text\" matInput name=\"search\" [(ngModel)]=\"search\" (keyup.enter)=\"searchStart()\" />\n                <button mat-icon-button matSuffix (click)=\"searchStart()\">\n                    <mat-icon>search</mat-icon>\n                </button>\n            </mat-form-field>\n            <button mat-raised-button color=\"primary\" (click)=\"editBusinessAccount()\">Create new account</button>\n        </div>\n    </div>\n    <mat-card *ngIf=\"!accounts || accounts.length<=0\">\n        <mat-card-content>\n            Looks like there are no business accounts yet.\n        </mat-card-content>\n    </mat-card>\n    <div class=\"ana-pagination\" *ngIf=\"accounts && accounts.length>0\">\n        <div class=\"info\">\n            Page {{page+1}}/{{totalPages}}\n        </div>\n        <div class=\"buttons\">\n            <button mat-icon-button (click)=\"prevPage()\" [disabled]=\"page<=0\">\n                <mat-icon>navigate_before</mat-icon>\n            </button>\n            <button mat-icon-button (click)=\"nextPage()\" [disabled]=\"page>=totalPages-1\">\n                <mat-icon>navigate_next</mat-icon>\n            </button>\n        </div>\n    </div>\n    <mat-list *ngIf=\"accounts && accounts.length>0\">\n        <mat-list-item class=\"mat-elevation-z2 list-item\" *ngFor=\"let acc of accounts\">\n            <div class=\"list-item-text\">\n                {{acc.name}} <span class=\"list-item-hint\"> {{BusinessAccountStatus[acc.status].toLowerCase()}}</span>\n            </div>\n            <div class=\"list-item-buttons\">\n                <button matTooltip=\"Edit\" mat-icon-button (click)=\"editBusinessAccount(acc)\">\n                    <mat-icon>edit</mat-icon>\n                </button>\n                <button matTooltip=\"Manage Users\" mat-icon-button (click)=\"manageUsers(acc)\">\n                    <mat-icon>supervisor_account</mat-icon>\n                </button>\n                <button matTooltip=\"Deactivate\" *ngIf=\"acc.status==BusinessAccountStatus.ACTIVE\" mat-icon-button (click)=\"updateBusinessAccountStatus(acc, BusinessAccountStatus.INACTIVE)\">\n                    <mat-icon>close</mat-icon>\n                </button>\n                <button matTooltip=\"Activate\" *ngIf=\"acc.status==BusinessAccountStatus.INACTIVE\" mat-icon-button (click)=\"updateBusinessAccountStatus(acc, BusinessAccountStatus.ACTIVE)\">\n                    <mat-icon>check</mat-icon>\n                </button>\n            </div>\n        </mat-list-item>\n    </mat-list>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/manage-users/users/users.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/manage-users/users/users.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header-bar [title]=\"'User Management'\" #appHeader></app-header-bar>\n<div class=\"app-content\">\n    <div class=\"app-content-header\">\n        <h4 class=\"app-content-header-text\">{{businessAccount ? 'Users of ' + businessAccount.name : 'Users'}}</h4>\n        <div class=\"app-content-header-actions\">\n            <mat-form-field floatLabel=\"never\" class=\"search-text\">\n                <mat-label>Search</mat-label>\n                <input type=\"text\" matInput name=\"search\" [(ngModel)]=\"search\" (keyup.enter)=\"searchStart()\" />\n                <button mat-icon-button matSuffix (click)=\"searchStart()\">\n                    <mat-icon>search</mat-icon>\n                </button>\n            </mat-form-field>\n            <button mat-raised-button color=\"primary\" (click)=\"createUserDialog()\" [disabled]=\"!bizId\">Create new user</button>\n        </div>\n    </div>\n    <mat-card *ngIf=\"!users || users.length<=0\">\n        <mat-card-content>\n            Looks like there are no users yet.\n        </mat-card-content>\n    </mat-card>\n    <div class=\"ana-pagination\" *ngIf=\"users && users.length>0\">\n        <div class=\"info\">\n            Page {{page+1}}/{{totalPages}}\n        </div>\n        <div class=\"buttons\">\n            <button mat-icon-button (click)=\"prevPage()\" [disabled]=\"page<=0\">\n                <mat-icon>navigate_before</mat-icon>\n            </button>\n            <button mat-icon-button (click)=\"nextPage()\" [disabled]=\"page>=totalPages-1\">\n                <mat-icon>navigate_next</mat-icon>\n            </button>\n        </div>\n    </div>\n\n    <mat-list *ngIf=\"users && users.length>0\">\n        <mat-list-item class=\"mat-elevation-z2 list-item\" *ngFor=\"let user of users\">\n            <div class=\"list-item-text\">\n                {{user.name || user.userName }} <span class=\"list-item-hint\"> {{userRole(user)}}</span>\n            </div>\n            <button matTooltip=\"View Details\" mat-icon-button (click)=\"view(user)\">\n                <mat-icon>remove_red_eye</mat-icon>\n            </button>\n            <button matTooltip=\"Update Password\" mat-icon-button (click)=\"updateUserPassword(user)\">\n                <mat-icon>border_color</mat-icon>\n            </button>\n        </mat-list-item>\n    </mat-list>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{ 'cloud-signup.title' | translate }}</h2>\n<mat-dialog-content>\n    <form #f=\"ngForm\" (ngSubmit)=\"create()\">\n        <mat-form-field class=\"full-width\">\n            <input type=\"text\" matInput name=\"name\" [(ngModel)]=\"details.displayName\"\n                placeholder=\"{{ 'cloud-signup.display-name' | translate }}\" required maxlength=\"30\" />\n        </mat-form-field>\n        <mat-form-field class=\"full-width\">\n            <input type=\"email\" matInput name=\"email\" [(ngModel)]=\"details.email\"\n                pattern=\"^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\\.[a-z0-9-]+)*$\"\n                placeholder=\"{{ 'cloud-signup.email' | translate }}\" required #email=\"ngModel\" />\n            <mat-error align=\"start\" *ngIf=\"email.invalid && (email.dirty || email.touched)\">\n                {{ 'cloud-signup.invalid-email' | translate }}\n            </mat-error>\n        </mat-form-field>\n        <mat-form-field class=\"full-width\">\n            <input type=\"text\" matInput name=\"phone\" [(ngModel)]=\"details.phone\"\n                placeholder=\"{{ 'cloud-signup.phone' | translate }}\" required maxlength=\"16\" pattern=\"^\\+?\\d{6,15}$\"\n                #phone=\"ngModel\" />\n            <mat-error align=\"start\" *ngIf=\"phone.invalid && (phone.dirty || phone.touched)\">\n                {{ 'cloud-signup.invalid-phone' | translate }}\n            </mat-error>\n        </mat-form-field>\n        <mat-form-field class=\"full-width\">\n            <input type=\"text\" matInput name=\"companyName\" [(ngModel)]=\"details.companyName\"\n                placeholder=\"{{ 'cloud-signup.company' | translate }}\" required maxlength=\"50\" />\n        </mat-form-field>\n\n        <mat-form-field class=\"full-width\">\n            <input type=\"password\" matInput name=\"password\" [(ngModel)]=\"details.password\"\n                placeholder=\"{{ 'cloud-signup.password' | translate }}\" required pattern=\"^.{6,}$\" maxlength=\"50\"\n                #pwd=\"ngModel\" />\n            <mat-error align=\"start\" *ngIf=\"(pwd.invalid) && (pwd.dirty || pwd.touched)\">\n                {{ 'cloud-signup.invalid-password' | translate }}\n            </mat-error>\n        </mat-form-field>\n        <mat-form-field class=\"full-width\">\n            <input type=\"password\" matInput name=\"confirmPassword\" [(ngModel)]=\"details.confirmPassword\"\n                placeholder=\"{{ 'cloud-signup.confirm-password' | translate }}\" [pattern]=\"'^'+pwd.value+'$'\" required\n                maxlength=\"50\" #cpwd=\"ngModel\" />\n            <mat-error align=\"start\" *ngIf=\"(cpwd.invalid) && (cpwd.dirty || cpwd.touched)\">\n                {{ 'cloud-signup.invalid-confirm-password' | translate }}\n            </mat-error>\n        </mat-form-field>\n        <input type=\"submit\" name=\"submit\" style=\"display:none\" />\n    </form>\n    <mat-chip-list *ngIf=\"false\">\n        <mat-chip selectable=\"false\" class=\"danger-button\">\n            {{errorMessage}}\n        </mat-chip>\n    </mat-chip-list>\n</mat-dialog-content>\n<mat-dialog-actions class=\"actions\">\n    <button mat-raised-button (click)=\"create()\" color=\"primary\">{{ 'global.create' | translate }}</button>\n    <button mat-raised-button matDialogClose>{{ 'global.dismiss' | translate }}</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/app-header-bar/app-header-bar.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/app-header-bar/app-header-bar.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar class=\"mat-elevation-z2\" color=\"primary\">\n    <mat-toolbar-row>\n        <button mat-icon-button (click)=\"goBack()\" *ngIf=\"!hideBackButton\" class=\"back-button\">\n            <mat-icon>arrow_back</mat-icon>\n        </button>\n        <span>{{title}}</span>\n        <span class=\"toolbar-spacer\"></span>\n        <span class=\"user-info\" *ngIf=\"loggedInUser\">\n            <span class=\"user-name\">\n                {{loggedInUser.name | titlecase }}\n            </span>\n            <span class=\"user-role\">\n                {{roles()}}\n            </span>\n        </span>\n        <span class=\"user-info\" *ngIf=\"!loggedInUser\">\n            <span class=\"user-name\">\n                <button mat-raised-button (click)=\"loginDialog()\" color=\"primary\" class=\"inverse\">{{ 'home.login' | translate }}</button>\n            </span>\n        </span>\n        <button mat-icon-button [matMenuTriggerFor]=\"menu\" class=\"toolbar-icon\" *ngIf=\"loggedInUser\">\n            <mat-icon>more_vert</mat-icon>\n        </button>\n        <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item (click)=\"changePassword()\">\n                <mat-icon>lock_outline</mat-icon>\n                <span>{{ 'home.change-password' | translate }}</span>\n            </button>\n            <button mat-menu-item (click)=\"logout()\">\n                <mat-icon>exit_to_app</mat-icon>\n                <span>{{ 'home.logout' | translate }}</span>\n            </button>\n        </mat-menu>\n    </mat-toolbar-row>\n</mat-toolbar>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/business-picker/business-picker.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/business-picker/business-picker.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{ title }}</h2>\n<mat-dialog-content>\n    <mat-form-field class=\"full-width\" tabindex=\"-1\">\n        <input tabindex=\"-1\" type=\"text\" placeholder=\"Choose an account\" aria-label=\"Business Account\" matInput [(ngModel)]=\"bizFilter\" [matAutocomplete]=\"bizAuto\" name=\"bizAccount\" [disabled]=\"param.businessId\">\n        <mat-autocomplete tabindex=\"-1\" #bizAuto=\"matAutocomplete\" (optionSelected)=\"bizOptionSelected($event)\" [displayWith]=\"bizDisplayWith\">\n            <mat-option *ngFor=\"let option of bizFilteredOptions()\" [value]=\"option\">\n                {{ option.name }} <span class=\"desc\">Id: {{ option.id }}</span>\n            </mat-option>\n        </mat-autocomplete>\n    </mat-form-field>\n    <mat-form-field class=\"full-width\" tabindex=\"-1\" *ngIf=\"param.askFlowId && chatProjects && chatProjects.length > 0\">\n        <input tabindex=\"-1\" type=\"text\" placeholder=\"Choose a chat project\" aria-label=\"Chat project\" matInput [(ngModel)]=\"projFilter\" [matAutocomplete]=\"projAuto\" name=\"projAccount\" [disabled]=\"param.businessId && param.flowId\">\n        <mat-autocomplete tabindex=\"-1\" #projAuto=\"matAutocomplete\" (optionSelected)=\"projOptionSelected($event)\" [displayWith]=\"projDisplayWith\">\n            <mat-option *ngFor=\"let option of projFilteredOptions()\" [value]=\"option\">\n                {{ option.name }} <span class=\"desc\">Id: {{ option.id }}</span>\n            </mat-option>\n        </mat-autocomplete>\n    </mat-form-field>\n    <label class=\"desc\">You are logged into '{{chatConnName}}' Chatbots.mn chat server</label>\n</mat-dialog-content>\n<mat-dialog-actions class=\"actions\">\n    <button mat-raised-button (click)=\"submit()\" color=\"primary\" [disabled]=\"!valid()\">Submit</button>\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/change-password/change-password.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/change-password/change-password.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{ 'home.change-password' | translate }}</h2>\n<mat-dialog-content>\n    <div class=\"center-block center-content\">\n        <form (ngSubmit)=\"save()\" class=\"form\">\n            <mat-form-field>\n                <input type=\"password\" placeholder=\"Current Password\" name=\"password\" matInput [(ngModel)]=\"password\" required />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"password\" placeholder=\"New Password\" name=\"password\" matInput [(ngModel)]=\"newPassword\" required />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"password\" placeholder=\"Confirm Password\" name=\"confirmPassword\" matInput [(ngModel)]=\"confirmPassword\" required #pwd=\"ngModel\" />\n                <mat-hint align=\"start\" *ngIf=\"(newPassword!=confirmPassword) && (pwd.dirty || pwd.touched)\" style=\"color:red\">\n                    Passwords do not match\n                </mat-hint>\n            </mat-form-field>\n            <input type=\"submit\" name=\"submit\" hidden />\n        </form>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button matTooltip=\"Save\" color=\"primary\" mat-raised-button (click)=\"save()\">Reset Password</button>\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/chat-server-manager/chat-server-manager.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/chat-server-manager/chat-server-manager.component.html ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>Chatbots.mn chat server connections</h2>\n<mat-dialog-content>\n    <div class=\"center-block center-content\">\n        <mat-card [hidden]=\"savedConnections.length!=0\" class=\"text-center\">\n            <h4>Looks like you don't have any saved Chatbots.mn chat server connections. <br /> Start by adding one.</h4>\n        </mat-card>\n\n        <mat-accordion [hidden]=\"savedConnections.length==0\">\n            <mat-expansion-panel *ngFor=\"let conn of savedConnections; let i = index\">\n                <mat-expansion-panel-header>\n                    <mat-panel-title>\n                        <mat-icon>insert_link</mat-icon>&nbsp;\n                        {{connectionAlias(conn)}}\n                    </mat-panel-title>\n                </mat-expansion-panel-header>\n\n                <mat-form-field>\n                    <input matInput type=\"text\" placeholder=\"Name\" ngModel=\"conn.Name\" name=\"connName-{{i}}\">\n                </mat-form-field>\n\n                <mat-form-field>\n                    <input matInput type=\"url\" placeholder=\"Server Url\" ngModel=\"conn.ServerUrl\" name=\"connUrl-{{i}}\">\n                </mat-form-field>\n\n                <section>\n                    <h5 [hidden]=\"!conn.ChatProjects || conn.ChatProjects.length<=0\">Chat projects</h5>\n                    <mat-accordion>\n                        <mat-expansion-panel *ngFor=\"let proj of conn.ChatProjects; let i = index\">\n                            <mat-expansion-panel-header>\n                                <mat-panel-title>\n                                    <mat-icon>chat</mat-icon>&nbsp;\n                                    {{proj.Name}}\n                                </mat-panel-title>\n                            </mat-expansion-panel-header>\n                            <mat-form-field>\n                                <input matInput type=\"text\" placeholder=\"Chat Project Id\" ngModel=\"proj.Id\"\n                                    name=\"projId-{{i}}\">\n                            </mat-form-field>\n\n                            <mat-form-field>\n                                <input matInput type=\"text\" placeholder=\"Chat Project Name\" ngModel=\"proj.Name\"\n                                    name=\"projName-{{i}}\">\n                            </mat-form-field>\n\n                            <mat-action-row>\n                                <button mat-raised-button (click)=\"deleteProject(conn,proj)\"><span>Delete\n                                        Project</span></button>\n                            </mat-action-row>\n                        </mat-expansion-panel>\n                    </mat-accordion>\n                </section>\n                <mat-action-row>\n                    <!--<button mat-raised-button (click)=\"addChatProjectToConn(conn)\"><span>Add chat project</span></button>-->\n                    <button mat-raised-button (click)=\"deleteConnection(conn)\"><span>Delete server\n                            connection</span></button>\n                </mat-action-row>\n\n            </mat-expansion-panel>\n        </mat-accordion>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button matTooltip=\"Save Changes\" color=\"primary\" *ngIf=\"savedConnections.length!=0\" mat-raised-button\n        (click)=\"saveConnections(true)\">Save changes</button>\n    <button matTooltip=\"Add new connection\" [color]=\"savedConnections.length==0?'primary':''\" mat-raised-button\n        (click)=\"addConnection()\">Add new server connection</button>\n    <!--<button matTooltip=\"Get an Chatbots.mn chat server\" mat-raised-button (click)=\"getAnaChatServer()\">Get an Chatbots.mn chat server</button>-->\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/create-chatbot/create-chatbot.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/create-chatbot/create-chatbot.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>Add new chatbot project</h2>\n<mat-dialog-content>\n    <div class=\"center-block center-content\">\n        <form (ngSubmit)=\"create()\" class=\"form\">\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Id\" name=\"Id\" matInput [(ngModel)]=\"chatProject.id\" required />\n                <mat-hint>New chatbot project id</mat-hint>\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Name\" name=\"name\" matInput [(ngModel)]=\"chatProject.name\" required />\n                <mat-hint>New chatbot project name</mat-hint>\n            </mat-form-field>\n            <input type=\"submit\" name=\"submit\" hidden />\n        </form>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button matTooltip=\"Add\" color=\"primary\" mat-raised-button (click)=\"create()\">Create</button>\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/create-user/create-user.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/create-user/create-user.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{title}}</h2>\n<mat-dialog-content>\n    <div class=\"center-block center-content\">\n        <form (ngSubmit)=\"save()\" >\n            <fieldset class=\"form\" [disabled]=\"param.mode == UserDialogMode.View\">\n                <mat-form-field>\n                    <input type=\"text\" placeholder=\"Name\" name=\"name\" matInput [(ngModel)]=\"user.name\" required />\n                </mat-form-field>\n                <mat-form-field>\n                    <input type=\"email\" placeholder=\"Email\" name=\"email\" pattern=\"^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$\" matInput [(ngModel)]=\"user.email\" required #email=\"ngModel\" />\n                    <mat-error align=\"start\" *ngIf=\"email.invalid && (email.dirty || email.touched)\">\n                        Please enter a valid email address\n                    </mat-error>\n                </mat-form-field>\n                <mat-form-field>\n                    <input type=\"tel\" placeholder=\"Phone\" name=\"phone\" matInput [(ngModel)]=\"user.phone\" pattern=\"^\\+?\\d{6,15}$\" #phone=\"ngModel\" />\n                    <mat-error align=\"start\" *ngIf=\"phone.invalid && (phone.dirty || phone.touched)\">\n                        Please enter a valid phone number\n                    </mat-error>\n                </mat-form-field>\n                <mat-form-field [hidden]=\"param.mode == UserDialogMode.View\">\n                    <mat-select placeholder=\"Role\" [(ngModel)]=\"selectedRole\" name=\"selectedRole\">\n                        <mat-option *ngFor=\"let role of roles\" [value]=\"role\">\n                            {{ role.label }}\n                        </mat-option>\n                    </mat-select>\n                </mat-form-field>\n                <mat-form-field [hidden]=\"param.mode == UserDialogMode.Create\">\n                    <input type=\"text\" placeholder=\"Roles\" name=\"Roles\" matInput [value]=\"userRoleDisplay()\" required />\n                </mat-form-field>\n                <mat-form-field [hidden]=\"param.mode == UserDialogMode.View\">\n                    <input type=\"password\" placeholder=\"Password\" name=\"password\" matInput [(ngModel)]=\"user.password\" required />\n                </mat-form-field>\n                <mat-form-field [hidden]=\"param.mode == UserDialogMode.View\">\n                    <input type=\"password\" placeholder=\"Confirm Password\" name=\"confirmPassword\" matInput [(ngModel)]=\"confirmPassword\" required #pwd=\"ngModel\" />\n                    <mat-hint align=\"start\" *ngIf=\"(user.password!=confirmPassword) && (pwd.dirty || pwd.touched)\" style=\"color:red\">\n                        Passwords do not match\n                    </mat-hint>\n                </mat-form-field>\n                <input type=\"submit\" name=\"submit\" hidden />\n            </fieldset>\n        </form>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button matTooltip=\"Save\" color=\"primary\" mat-raised-button (click)=\"save()\" [hidden]=\"param.mode == UserDialogMode.View\">Save</button>\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/edit-business-account/edit-business-account.component.html":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/edit-business-account/edit-business-account.component.html ***!
  \************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{title}}</h2>\n<mat-dialog-content>\n    <div class=\"center-block center-content\">\n        <form (ngSubmit)=\"save()\" class=\"form\">\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Id\" name=\"Id\" matInput [(ngModel)]=\"account.id\" required [readonly]=\"!isCreate\"/>\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Name\" name=\"name\" matInput [(ngModel)]=\"account.name\" required />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"email\" placeholder=\"Business Email\" name=\"email\" pattern=\"^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$\" matInput [(ngModel)]=\"account.email\" required #email=\"ngModel\" />\n                <mat-error align=\"start\" *ngIf=\"email.invalid && (email.dirty || email.touched)\">\n                    Please enter a valid email address\n                </mat-error>\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"tel\" placeholder=\"Business Phone\" name=\"phone\" matInput [(ngModel)]=\"account.phone\" pattern=\"^\\+?\\d{6,15}$\" #phone=\"ngModel\"/>\n                <mat-error align=\"start\" *ngIf=\"phone.invalid && (phone.dirty || phone.touched)\">\n                    Please enter a valid phone number\n                </mat-error>\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"url\" placeholder=\"Logo Url\" name=\"logoUrl\" matInput [(ngModel)]=\"account.logoUrl\" />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Primary Background Color\" name=\"primaryBGColor\" matInput [(ngModel)]=\"primaryBGColor\" required />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Primary Text Color\" name=\"primaryFGColor\" matInput [(ngModel)]=\"primaryFGColor\" required />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Secondary Color\" name=\"secondaryColor\" matInput [(ngModel)]=\"secondaryColor\" />\n            </mat-form-field>\n            <input type=\"submit\" name=\"submit\" hidden />\n        </form>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button matTooltip=\"Save\" color=\"primary\" mat-raised-button (click)=\"save()\">Save</button>\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.html ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>Get Chatbots.mn chat server</h2>\n<mat-dialog-content>\n    <div class=\"button-row\">\n        <button mat-raised-button (click)=\"anaCloud()\" color=\"primary\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 77.109 77.109\" width=\"84\" height=\"84\">\n                <g fill=\"#fff\">\n                    <path d=\"M33.223 66.59V46.87c0-.68-.551-1.23-1.23-1.23h-8.204a1.23 1.23 0 1 0 0 2.46h6.973V66.59a5.34 5.34 0 0 0-4.102 5.187 5.338 5.338 0 0 0 5.332 5.332 5.338 5.338 0 0 0 5.332-5.332 5.34 5.34 0 0 0-4.101-5.187zm-1.23 8.058a2.874 2.874 0 0 1-2.872-2.87 2.874 2.874 0 0 1 2.871-2.872 2.874 2.874 0 0 1 2.871 2.871 2.874 2.874 0 0 1-2.87 2.871zM46.348 66.59V46.87c0-.68-.551-1.23-1.23-1.23h-8.204a1.23 1.23 0 1 0 0 2.46h6.973V66.59a5.34 5.34 0 0 0-4.102 5.187 5.338 5.338 0 0 0 5.332 5.332 5.338 5.338 0 0 0 5.332-5.332 5.34 5.34 0 0 0-4.101-5.187zm-1.23 8.058a2.874 2.874 0 0 1-2.872-2.87 2.874 2.874 0 0 1 2.871-2.872 2.874 2.874 0 0 1 2.871 2.871 2.874 2.874 0 0 1-2.87 2.871zM67.266 58.242a5.34 5.34 0 0 0-5.188 4.102h-2.605V46.869c0-.68-.551-1.23-1.23-1.23h-8.204a1.23 1.23 0 1 0 0 2.46h6.973v15.475c0 .68.55 1.23 1.23 1.23h3.836a5.34 5.34 0 0 0 5.188 4.102 5.338 5.338 0 0 0 5.332-5.332 5.338 5.338 0 0 0-5.332-5.332zm0 8.203a2.874 2.874 0 0 1-2.871-2.87 2.874 2.874 0 0 1 2.87-2.872 2.874 2.874 0 0 1 2.872 2.871 2.874 2.874 0 0 1-2.871 2.871z\" />\n                    <path d=\"M74.18 26.505a13.356 13.356 0 0 0-6.418-4.362c-.282-5.825-2.698-11.26-6.864-15.39A23.148 23.148 0 0 0 44.498 0a23.316 23.316 0 0 0-19.862 11.121 10.567 10.567 0 0 0-3.189-.487c-5.026 0-9.349 3.548-10.39 8.384C4.6 20.693 0 26.576 0 33.321 0 41.47 6.63 48.1 14.778 48.1h2.859v14.245H15.03a5.34 5.34 0 0 0-5.187-4.102 5.338 5.338 0 0 0-5.332 5.332 5.338 5.338 0 0 0 5.332 5.332 5.34 5.34 0 0 0 5.187-4.101h3.836c.68 0 1.23-.551 1.23-1.23V46.868c0-.68-.55-1.23-1.23-1.23h-4.09c-6.79 0-12.316-5.526-12.316-12.318 0-5.86 4.166-10.94 9.907-12.08a1.23 1.23 0 0 0 .98-1.046c.53-4.048 4.012-7.1 8.1-7.1 1.124 0 2.214.225 3.24.67a1.23 1.23 0 0 0 1.566-.535A20.856 20.856 0 0 1 44.498 2.46c11.383 0 20.728 9.26 20.83 20.642.005.569.4 1.06.953 1.188a10.76 10.76 0 0 1 8.368 10.533c0 5.963-4.852 10.815-10.815 10.815h-.67a1.23 1.23 0 1 0 0 2.461h.67c7.32 0 13.275-5.956 13.275-13.276 0-3.018-1.04-5.972-2.93-8.318zM9.843 66.445a2.874 2.874 0 0 1-2.871-2.87 2.874 2.874 0 0 1 2.87-2.872 2.874 2.874 0 0 1 2.872 2.871 2.874 2.874 0 0 1-2.871 2.871z\" />\n                    <path d=\"M59.996 24.38h.012a1.23 1.23 0 0 0 1.219-1.241 16.557 16.557 0 0 0-1.137-5.895 1.23 1.23 0 0 0-2.293.895c.627 1.605.953 3.295.969 5.022a1.23 1.23 0 0 0 1.23 1.22zM55.499 14.233a1.228 1.228 0 0 0 1.732.165 1.23 1.23 0 0 0 .165-1.732c-3.204-3.879-7.905-6.104-12.898-6.104a1.23 1.23 0 1 0 0 2.461c4.256 0 8.265 1.9 11 5.21z\" />\n                </g>\n            </svg>\n            <br /><span>Chatbots.mn signup</span>\n        </button>\n        <button mat-raised-button (click)=\"selfHost()\" color=\"primary\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 9.844 9.844\" width=\"84\" height=\"84\"><g transform=\"scale(.16406)\" fill=\"#fff\"><path d=\"M10.5 6.5A4.505 4.505 0 0 0 6 11c0 2.481 2.019 4.5 4.5 4.5S15 13.481 15 11s-2.019-4.5-4.5-4.5zm0 7A2.503 2.503 0 0 1 8 11c0-1.379 1.122-2.5 2.5-2.5S13 9.621 13 11s-1.122 2.5-2.5 2.5z\" /><circle cx=\"50\" cy=\"9.5\" r=\"1\" /><circle cx=\"46\" cy=\"9.5\" r=\"1\" /><circle cx=\"52\" cy=\"12.5\" r=\"1\" /><circle cx=\"48\" cy=\"12.5\" r=\"1\" /><circle cx=\"42\" cy=\"9.5\" r=\"1\" /><circle cx=\"44\" cy=\"12.5\" r=\"1\" /><circle cx=\"38\" cy=\"9.5\" r=\"1\" /><circle cx=\"40\" cy=\"12.5\" r=\"1\" /><circle cx=\"34\" cy=\"9.5\" r=\"1\" /><circle cx=\"36\" cy=\"12.5\" r=\"1\" /><path d=\"M60 16.892V5.108A4.613 4.613 0 0 0 55.392.5H4.608A4.613 4.613 0 0 0 0 5.108v11.783c0 1.469.703 2.764 1.777 3.608C.703 21.344 0 22.64 0 24.108v11.783c0 1.469.703 2.764 1.777 3.608C.703 40.344 0 41.64 0 43.108v11.783A4.613 4.613 0 0 0 4.608 59.5h50.783a4.613 4.613 0 0 0 4.608-4.608V43.108c0-1.469-.703-2.764-1.777-3.608C59.297 38.656 60 37.36 60 35.892V24.108c0-1.469-.703-2.764-1.777-3.608C59.297 19.656 60 18.36 60 16.892zm-2 26.216v11.783a2.611 2.611 0 0 1-2.608 2.608H4.608A2.61 2.61 0 0 1 2 54.892V43.108A2.611 2.611 0 0 1 4.608 40.5h50.783A2.611 2.611 0 0 1 58 43.108zm0-19v11.783a2.611 2.611 0 0 1-2.608 2.608H4.608A2.61 2.61 0 0 1 2 35.892V24.108A2.611 2.611 0 0 1 4.608 21.5h50.783A2.611 2.611 0 0 1 58 24.108zM4.608 19.5A2.611 2.611 0 0 1 2 16.892V5.108A2.611 2.611 0 0 1 4.608 2.5h50.783A2.611 2.611 0 0 1 58 5.108v11.783a2.611 2.611 0 0 1-2.608 2.608H4.608z\" /><path d=\"M10.5 34.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5A4.505 4.505 0 0 0 6 30c0 2.481 2.019 4.5 4.5 4.5zm0-7c1.378 0 2.5 1.121 2.5 2.5s-1.122 2.5-2.5 2.5A2.503 2.503 0 0 1 8 30c0-1.379 1.122-2.5 2.5-2.5z\" /><circle cx=\"50\" cy=\"28.5\" r=\"1\" /><circle cx=\"46\" cy=\"28.5\" r=\"1\" /><circle cx=\"52\" cy=\"31.5\" r=\"1\" /><circle cx=\"48\" cy=\"31.5\" r=\"1\" /><circle cx=\"42\" cy=\"28.5\" r=\"1\" /><circle cx=\"44\" cy=\"31.5\" r=\"1\" /><circle cx=\"38\" cy=\"28.5\" r=\"1\" /><circle cx=\"40\" cy=\"31.5\" r=\"1\" /><circle cx=\"34\" cy=\"28.5\" r=\"1\" /><circle cx=\"36\" cy=\"31.5\" r=\"1\" /><path d=\"M10.5 53.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5A4.505 4.505 0 0 0 6 49c0 2.481 2.019 4.5 4.5 4.5zm0-7c1.378 0 2.5 1.121 2.5 2.5s-1.122 2.5-2.5 2.5A2.503 2.503 0 0 1 8 49c0-1.379 1.122-2.5 2.5-2.5z\" /><circle cx=\"50\" cy=\"47.5\" r=\"1\" /><circle cx=\"46\" cy=\"47.5\" r=\"1\" /><circle cx=\"52\" cy=\"50.5\" r=\"1\" /><circle cx=\"48\" cy=\"50.5\" r=\"1\" /><circle cx=\"42\" cy=\"47.5\" r=\"1\" /><circle cx=\"44\" cy=\"50.5\" r=\"1\" /><circle cx=\"38\" cy=\"47.5\" r=\"1\" /><circle cx=\"40\" cy=\"50.5\" r=\"1\" /><circle cx=\"34\" cy=\"47.5\" r=\"1\" /><circle cx=\"36\" cy=\"50.5\" r=\"1\" /></g></svg>\n            <br /><span>Host it yourself</span>\n        </button>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions class=\"actions\">\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/info-dialog/info-dialog.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/info-dialog/info-dialog.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{options.title}}</h2>\n<mat-dialog-content>\n    <p>{{options.message}}</p>\n    <mat-form-field [hidden]=\"options.dialogType!=InfoDialogType.Prompt\">\n        <input type=\"text\" name=\"text\" matInput [(ngModel)]=\"inputText\" (keypress)=\"inputKeypress($event)\" />\n    </mat-form-field>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button mat-raised-button color=\"primary\" (click)=\"primaryClick()\" *ngIf=\"primaryButtonText\">{{primaryButtonText}}</button>\n    <button mat-raised-button [color]=\"options.dialogType==InfoDialogType.Alert?'primary':''\" [matDialogClose]=\"false\">{{secondaryButtonText}}</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/loading-indicator/loading-indicator.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/loading-indicator/loading-indicator.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"chatflow-loading\">\n    <div class=\"loading-content\">\n        <svg class=\"lds-message\" style=\"transform: translateY(-82px);\" xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\">\n            <g transform=\"translate(20 50)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#ffffff\" transform=\"scale(0.977039 0.977039)\">\n                    <animateTransform attributeName=\"transform\" type=\"scale\" begin=\"-0.375s\" calcMode=\"spline\"\n                        keySplines=\"0.3 0 0.7 1;0.3 0 0.7 1\" values=\"0;1;0\" keyTimes=\"0;0.5;1\" dur=\"1s\"\n                        repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"translate(40 50)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#ffffff\" transform=\"scale(0.730912 0.730912)\">\n                    <animateTransform attributeName=\"transform\" type=\"scale\" begin=\"-0.25s\" calcMode=\"spline\"\n                        keySplines=\"0.3 0 0.7 1;0.3 0 0.7 1\" values=\"0;1;0\" keyTimes=\"0;0.5;1\" dur=\"1s\"\n                        repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"translate(60 50)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#ffffff\" transform=\"scale(0.37591 0.37591)\">\n                    <animateTransform attributeName=\"transform\" type=\"scale\" begin=\"-0.125s\" calcMode=\"spline\"\n                        keySplines=\"0.3 0 0.7 1;0.3 0 0.7 1\" values=\"0;1;0\" keyTimes=\"0;0.5;1\" dur=\"1s\"\n                        repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"translate(80 50)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#ffffff\" transform=\"scale(0.0819473 0.0819473)\">\n                    <animateTransform attributeName=\"transform\" type=\"scale\" begin=\"0s\" calcMode=\"spline\"\n                        keySplines=\"0.3 0 0.7 1;0.3 0 0.7 1\" values=\"0;1;0\" keyTimes=\"0;0.5;1\" dur=\"1s\"\n                        repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n        </svg>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/loading-mask/loading-mask.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/loading-mask/loading-mask.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-spinner></mat-spinner>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/login/login.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/login/login.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{ 'home.login' | translate }} </h2>\n<mat-dialog-content>\n    <mat-card *ngIf=\"!savedConns || savedConns.length <= 0\" class=\"text-center\">\n        <h4>\n            Looks like you don't have any saved Chatbots.mn chat server connections.\n            <br />\n            <br />\n            <button mat-raised-button color=\"primary\" (click)=\"managePublishServers()\">Add Chatbots.mn chat server connection</button>\n        </h4>\n    </mat-card>\n\n    <mat-form-field *ngIf=\"savedConns && savedConns.length>0\">\n        <mat-select placeholder=\"Server\" [(ngModel)]=\"selectedServer\" name=\"PublishServer\">\n            <mat-option *ngFor=\"let conn of savedConns\" [value]=\"conn\">\n                {{ conn.Name }}\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n\n    <div *ngIf=\"selectedServer\">\n        <form (ngSubmit)=\"login()\">\n            <mat-form-field>\n                <input type=\"text\" name=\"username\" placeholder=\"Username\" [(ngModel)]=\"username\" matInput />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"password\" name=\"password\" placeholder=\"Password\" [(ngModel)]=\"password\" matInput />\n            </mat-form-field>\n            <input type=\"submit\" hidden />\n        </form>\n    </div>\n\n</mat-dialog-content>\n<mat-dialog-actions>\n    <div class=\"left\" *ngIf=\"savedConns && savedConns.length>0\">\n        <button mat-raised-button (click)=\"managePublishServers()\">Add/edit Chatbots.mn chat servers</button>\n    </div>\n    <div class=\"spacing\"></div>\n    <div class=\"right\">\n        <button mat-raised-button [disabled]=\"!selectedServer || !username || !password\" color=\"primary\" (click)=\"login()\">Login</button>\n        <button mat-raised-button (click)=\"dismiss()\">Dismiss</button>\n    </div>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/publish-chatbot/publish-chatbot.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/publish-chatbot/publish-chatbot.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>Publish chatbot</h2>\n<mat-dialog-content>\n    <mat-card *ngIf=\"!chatProjects || chatProjects.length <= 0\" class=\"text-center\">\n        <h4> Looks like you don't have any Chatbots.mn chatbot projects yet. </h4>\n    </mat-card>\n    <mat-form-field *ngIf=\"chatProjects && chatProjects.length>0\" #chatProjectFormField tabindex=\"-1\">\n        <input tabindex=\"-1\" type=\"text\" placeholder=\"Choose a chatbot project\" aria-label=\"Chatbot Project\" matInput [(ngModel)]=\"filter\" [matAutocomplete]=\"auto\" name=\"chatProject\">\n        <mat-autocomplete tabindex=\"-1\" #auto=\"matAutocomplete\" (optionSelected)=\"optionSelected($event)\" [displayWith]=\"displayWith\">\n            <mat-option *ngFor=\"let option of filteredOptions()\" [value]=\"option\">\n                {{ option.name }} <span class=\"desc\">Last updated at {{option.updatedAt | date:'hh:mm a on dd-MM-yyyy'}} -- Id: {{ option.id }}</span>\n            </mat-option>\n        </mat-autocomplete>\n        <!-- <mat-hint *ngIf=\"added\">\n            {{added}}\n        </mat-hint> -->\n    </mat-form-field>\n    <section *ngIf=\"chatProjects && chatProjects.length>0\" class=\"text-center\">\n        <h3>Or</h3>\n        <br />\n    </section>\n    <div>\n        <h5>Create new chatbot project</h5>\n        <form (ngSubmit)=\"createAndPublish()\" class=\"form\">\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Id\" name=\"Id\" matInput [(ngModel)]=\"newChatProject.id\" required />\n                <mat-hint>New chatbot project id</mat-hint>\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"text\" placeholder=\"Name\" name=\"name\" matInput [(ngModel)]=\"newChatProject.name\" required />\n                <mat-hint>New chatbot project name</mat-hint>\n            </mat-form-field>\n            <input type=\"submit\" name=\"submit\" hidden />\n        </form>\n    </div>\n\n    <label class=\"desc\">You are logged into '{{chatConnName}}' Chatbots.mn chat server</label>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button mat-raised-button [disabled]=\"!canPublish()\" color=\"primary\" (click)=\"doPublish()\">Publish</button>\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/publish-dialog/publish-dialog.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/publish-dialog/publish-dialog.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>Publish chatbot</h2>\n<mat-dialog-content>\n    <mat-card *ngIf=\"!savedConns || savedConns.length <= 0\" class=\"text-center\">\n        <h4>\n            Looks like you don't have any saved Chatbots.mn chat server connections.\n            <br />\n            <br />\n            <button mat-raised-button color=\"primary\" (click)=\"managePublishServers()\">Add Chatbots.mn chat server connection</button>\n        </h4>\n    </mat-card>\n\n    <mat-form-field *ngIf=\"savedConns && savedConns.length>0\">\n        <mat-select placeholder=\"Server\" [(ngModel)]=\"selectedServer\" name=\"PublishServer\">\n            <mat-option *ngFor=\"let conn of savedConns\" [value]=\"conn\">\n                {{ conn.Name }}\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n\n    <mat-form-field *ngIf=\"selectedServer\">\n        <mat-select placeholder=\"Chat Project\" [(ngModel)]=\"selectedProject\" name=\"Project\">\n            <mat-option *ngFor=\"let proj of selectedServer.ChatProjects\" [value]=\"proj\">\n                {{ proj.Name }}\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <div class=\"left\" *ngIf=\"savedConns && savedConns.length>0\">\n        <button mat-raised-button (click)=\"managePublishServers()\">Add/edit Chatbots.mn chat servers</button>\n    </div>\n    <div class=\"spacing\"></div>\n    <div class=\"right\">\n        <button mat-raised-button [disabled]=\"!selectedServer || !selectedProject\" color=\"primary\" (click)=\"publish()\">Publish</button>\n        <button mat-raised-button (click)=\"dismiss()\">Dismiss</button>\n    </div>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/update-password/update-password.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/update-password/update-password.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>Update Password</h2>\n<mat-dialog-content>\n    <div class=\"center-block center-content\">\n        <form (ngSubmit)=\"save()\" class=\"form\">\n            <mat-form-field>\n                <input type=\"password\" placeholder=\"New Password\" name=\"password\" matInput [(ngModel)]=\"password\"\n                    required />\n            </mat-form-field>\n            <mat-form-field>\n                <input type=\"password\" placeholder=\"Confirm Password\" name=\"confirmPassword\" matInput\n                    [(ngModel)]=\"confirmPassword\" required #pwd=\"ngModel\" />\n                <mat-hint align=\"start\" *ngIf=\"(password!=confirmPassword) && (pwd.dirty || pwd.touched)\"\n                    style=\"color:red\">\n                    Passwords do not match\n                </mat-hint>\n            </mat-form-field>\n            <input type=\"submit\" name=\"submit\" hidden />\n        </form>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button matTooltip=\"Save\" color=\"primary\" mat-raised-button (click)=\"save()\">Update Password</button>\n    <button mat-raised-button matDialogClose>Dismiss</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/chatflow/chatflow.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/chatflow/chatflow.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\n  <div [hidden]=\"layoutReady()\">\n    <app-loading-indicator></app-loading-indicator>\n  </div>\n  <div class=\"chatflow-designer-wrapper\">\n    <div class=\"left-sidebar\">\n      <div class=\"chatflow-actions\" [hidden]=\"!layoutReady()\">\n        <button matTooltip=\"{{ 'studio.add-description' | translate }}\" matTooltipPosition=\"right\" type=\"button\"\n          mat-button (click)=\"addNewNode()\">\n          <mat-icon class=\"fab-btn-icon\">add</mat-icon><br />\n          {{ 'studio.add' | translate }}\n        </button>\n        <button matTooltip=\"{{ 'studio.save-description' | translate }}\" type=\"button\" mat-button\n          matTooltipPosition=\"right\" (click)=\"saveChatFlow()\">\n          <mat-icon class=\"fab-btn-icon\">save</mat-icon><br />\n          {{ 'studio.save' | translate }}\n        </button>\n        <button matTooltip=\"{{ 'studio.export-description' | translate }}\" type=\"button\" mat-button\n          matTooltipPosition=\"right\" (click)=\"exportChatFlow()\">\n          <mat-icon class=\"fab-btn-icon\">file_download</mat-icon><br />\n          {{ 'studio.export' | translate }}\n        </button>\n        <button matTooltip=\"{{ 'studio.publish-description' | translate }}\" type=\"button\" mat-button\n          matTooltipPosition=\"right\" (click)=\"openPublishDialog()\">\n          <mat-icon class=\"fab-btn-icon\">publish</mat-icon><br />\n          {{ 'studio.publish' | translate }}\n        </button>\n        <button matTooltip=\"{{ 'studio.run-chatbot-description' | translate }}\" type=\"button\" mat-button\n          matTooltipPosition=\"right\" (click)=\"playChatFlow()\">\n          <mat-icon class=\"fab-btn-icon\">play_arrow</mat-icon><br />\n          {{ 'studio.run-chatbot' | translate }}\n        </button>\n        <button matTooltip=\"{{ 'studio.fit' | translate }}\" type=\"button\" mat-button matTooltipPosition=\"right\"\n          (click)=\"fitViewToAllNodes()\">\n          <mat-icon class=\"fab-btn-icon\">zoom_out_map</mat-icon><br />\n          {{ 'studio.fit' | translate }}\n        </button>\n        <button matTooltip=\"{{ 'studio.close-description' | translate }}\" type=\"button\" mat-button\n          matTooltipPosition=\"right\" (click)=\"gotoStartup()\">\n          <mat-icon class=\"fab-btn-icon\">close</mat-icon><br />\n          {{ 'studio.close' | translate }}\n        </button>\n      </div>\n    </div>\n    <div class=\"designer-panel\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" #chatflowRoot\n        [attr.visibility]=\"layoutReady() ? 'visible' : 'collapse'\" (mouseup)=\"mouseUp($event)\"\n        (mousemove)=\"mouseMove($event)\" (mousedown)=\"mouseDown($event)\" (mouseleave)=\"mouseLeave($event)\"\n        [attr.viewBox]=\"viewBox()\" (wheel)=\"designerWheel($event)\" class=\"chatflow-root-svg\">\n        <defs>\n          <linearGradient id=\"NodeBG\">\n            <stop offset=\"0\" stop-color=\"#CCC\" />\n          </linearGradient>\n          <linearGradient id=\"NodeFG\">\n            <stop offset=\"0\" stop-color=\"black\" />\n          </linearGradient>\n          <linearGradient id=\"NodeHeaderBG\">\n            <stop offset=\"0\" stop-color=\"gray\" />\n          </linearGradient>\n          <linearGradient id=\"NodeHeaderFG\">\n            <stop offset=\"0\" stop-color=\"white\" />\n          </linearGradient>\n          <marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"0\" refY=\"3\" orient=\"auto\"\n            markerUnits=\"strokeWidth\">\n            <path d=\"M0,0 L0,6 L9,3 z\" fill=\"darkgray\" opacity=\"0.5\" />\n          </marker>\n        </defs>\n\n        <g *ngFor=\"let chatNodeVM of chatFlowNetwork.chatNodeVMs\" transform=\"translate(20,20)\">\n          <foreignObject [attr.transform]=\"ngTr(chatNodeVM.x(), chatNodeVM.y())\"\n            (mousedown)=\"chatNodeVM.mouseDown($event)\" (mouseup)=\"chatNodeVM.mouseUp($event)\"\n            (mouseleave)=\"chatNodeVM.mouseLeave($event)\" (mouseenter)=\"chatNodeVM.mouseEnter($event)\"\n            fill=\"url(#NodeFG)\" class=\"node-section-title noselect\" x=\"0\" y=\"0\" [attr.width]=\"chatNodeVM.width() - 30\"\n            [attr.height]=\"chatNodeVM.height()\" height=\"0\" width=\"0\" (dblclick)=\"openEditor(chatNodeVM)\"\n            (click)=\"chatNodeVM.nodeClick()\">\n            <xhtml:div xmlns=\"http://www.w3.org/1999/xhtml\" [attr.node-id]=\"chatNodeVM.chatNode.Id\">\n              <xhtml:div onmousedown=\"return false;//to avoid text selection, creates issue with node drag\"\n                class=\"noselect chatnode\" [class.selected]=\"chatNodeVM.isSelected\"\n                [class.click-connect]=\"chatNodeVM.clickConnectionActive()\">\n                <xhtml:div [ngClass]=\"{ startnode: chatNodeVM.chatNode.IsStartNode }\" class=\"chatnode-header\">\n                  <xhtml:p>\n                    {{ MH.chatNodeAlias(chatNodeVM.chatNode) }}\n                  </xhtml:p>\n                </xhtml:div>\n                <xhtml:div class=\"chatnode-body\">\n                  <xhtml:div class=\"chatnode-sections\">\n                    <xhtml:table>\n                      <xhtml:tr *ngFor=\"let section of chatNodeVM.chatNode.Sections\"\n                        [attr.title]=\"MH.sectionAlias(section)\">\n                        <xhtml:td valign=\"middle\" class=\"section-icon\">\n                          <xhtml:i class=\"fa fa-file-text-o\"></xhtml:i>\n                        </xhtml:td>\n                        <xhtml:td valign=\"middle\" class=\"section-alias\">\n                          <xhtml:div>{{\n                            MH.sectionAlias(section) | ellipsis: 50\n                          }}</xhtml:div>\n                        </xhtml:td>\n                      </xhtml:tr>\n                    </xhtml:table>\n                  </xhtml:div>\n                  <xhtml:div class=\"chatnode-buttons\">\n                    <xhtml:table [attr.node-id]=\"chatNodeVM.chatNode.Id\">\n                      <xhtml:tr>\n                        <xhtml:td *ngFor=\"let chatButton of chatNodeVM.chatNode.Buttons\" valign=\"middle\">\n                          <xhtml:div [attr.title]=\"MH.chatButtonAlias(chatButton)\">\n                            <xhtml:i class=\"fa fa-link\"></xhtml:i>\n                            <br />\n                            <xhtml:div>{{\n                                MH.chatButtonAlias(chatButton) | ellipsis: 50\n                              }}\n                            </xhtml:div>\n                          </xhtml:div>\n                        </xhtml:td>\n                      </xhtml:tr>\n                    </xhtml:table>\n                  </xhtml:div>\n                  <xhtml:div *ngIf=\"chatNodeVM.isNodeEmpty()\" class=\"chatnode-empty\">\n                    <xhtml:span>\n                      {{ 'studio.double-click-edit-node' | translate }}\n                    </xhtml:span>\n                  </xhtml:div>\n                </xhtml:div>\n              </xhtml:div>\n            </xhtml:div>\n          </foreignObject>\n        </g>\n\n        <g *ngFor=\"let connection of chatFlowNetwork.chatNodeConnections\" transform=\"translate(15,20)\">\n          <path [attr.d]=\"connection.path()\" (mouseenter)=\"connection.mouseEnter($event)\" fill=\"transparent\"\n            stroke=\"darkgray\" stroke-opacity=\"0.5\" stroke-width=\"3\" d=\"M 0,0\" (click)=\"connection.remove($event)\"\n            class=\"not-allowed-cursor\" fill-rule=\"evenodd\"></path>\n        </g>\n\n        <g *ngFor=\"let chatNodeVM of chatFlowNetwork.chatNodeVMs\" transform=\"translate(20,20)\">\n          <g *ngFor=\"let connector of chatNodeVM.chatButtonConnectors()\" transform=\"translate(-7,0)\">\n            <circle r=\"0\" [attr.r]=\"connector.circleRadius - 3\" [attr.cx]=\"connector.x()\" [attr.cy]=\"connector.y()\"\n              [attr.fill]=\"connector.isConnected() ? 'darkgray' : '#F0F0F0'\" stroke=\"#F0F0F0\" stroke-width=\"3\"\n              (mousedown)=\"connector.mouseDown($event)\" (mouseup)=\"connector.startDirectConnection($event)\"\n              style=\"cursor: crosshair; padding: 20px\"></circle>\n          </g>\n          <circle r=\"0\" [attr.r]=\"chatNodeVM.circleRadius - 3\" [attr.cx]=\"chatNodeVM.nodeConnectorX()\"\n            [attr.cy]=\"chatNodeVM.nodeConnectorY()\" fill=\"darkgray\" stroke=\"#F0F0F0\" stroke-width=\"3\"\n            transform=\"translate(-7,0)\"></circle>\n        </g>\n\n        <g transform=\"translate(15,20)\" [attr.visibility]=\"\n            chatFlowNetwork.newChatNodeConnection.isHidden\n              ? 'collapse'\n              : 'visible'\n          \" class=\"pointer-events-none\">\n          <path [attr.d]=\"chatFlowNetwork.newChatNodeConnection.path()\" fill=\"transparent\" [attr.stroke]=\"\n              chatFlowNetwork.newChatNodeConnection.canConnect\n                ? 'darkgray'\n                : 'crimson'\n            \" stroke=\"crimson\" stroke-width=\"3\" d=\"M 0,0\" class=\"pointer-events-none\" fill-rule=\"evenodd\"></path>\n          <circle r=\"3\" [attr.cx]=\"chatFlowNetwork.newChatNodeConnection.destX\"\n            [attr.cy]=\"chatFlowNetwork.newChatNodeConnection.destY\" fill=\"darkgray\" [attr.fill]=\"\n              chatFlowNetwork.newChatNodeConnection.canConnect\n                ? 'darkgray'\n                : 'crimson'\n            \" class=\"pointer-events-none\"></circle>\n        </g>\n      </svg>\n    </div>\n  </div>\n</div>\n<app-simulator-frame #simulator> </app-simulator-frame>\n<hotkeys-cheatsheet title=\"Keyboard Shortcuts:\"></hotkeys-cheatsheet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/landing/landing.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/landing/landing.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header-bar #appHeader [title]=\"'Chatbots.mn Studio'\" [skipAuth]=\"true\" [logoutNavigation]=\"\"></app-header-bar>\n<div class=\"app-content\">\n  <div class=\"center-block center-content\">\n    <mat-card [hidden]=\"savedProjects.length != 0\" class=\"text-center\">\n      <mat-card-content>\n        {{ 'home.dont-have-projects' | translate }}\n      </mat-card-content>\n    </mat-card>\n    <mat-accordion [hidden]=\"savedProjects.length == 0\">\n      <div class=\"page-title\">\n        <h4 class=\"text\">{{ 'home.projects' | translate }}</h4>\n        <div class=\"search\">\n          <mat-form-field>\n            <input type=\"text\" name=\"search\" value=\"\" matInput [(ngModel)]=\"search\"\n              placeholder=\"{{ 'home.search' | translate }}\" />\n          </mat-form-field>\n        </div>\n        <div class=\"page-title-actions\">\n          <button matTooltip=\"{{ 'home.add-description' | translate }}\" color=\"primary\" mat-mini-fab\n            (click)=\"addProject()\">\n            <mat-icon>add</mat-icon>\n          </button>\n          <button matTooltip=\"{{ 'home.import-description' | translate }}\" mat-mini-fab (click)=\"fileInput.click()\">\n            <mat-icon>arrow_downward</mat-icon>\n          </button>\n        </div>\n      </div>\n      <mat-expansion-panel *ngFor=\"let projName of searchedProjects(); let i = index\">\n        <mat-expansion-panel-header>\n          <mat-panel-title>{{ projName }}</mat-panel-title>\n        </mat-expansion-panel-header>\n        <mat-action-row>\n          <button mat-raised-button color=\"primary\" (click)=\"openChatBotProject(projName)\">\n            <span>{{'home.open' | translate}}</span>\n          </button>\n          <button mat-raised-button (click)=\"renameChatBotProject(projName)\">\n            <span>{{'home.rename' | translate}}</span>\n          </button>\n          <button mat-raised-button (click)=\"downloadChatBotProject(projName)\">\n            <span>{{'home.download' | translate}}</span>\n          </button>\n          <button mat-raised-button (click)=\"deleteChatBotProject(projName)\">\n            <span>{{'home.delete' | translate}}</span>\n          </button>\n        </mat-action-row>\n      </mat-expansion-panel>\n    </mat-accordion>\n\n    <section class=\"bottom-actions\" *ngIf=\"savedProjects.length == 0\">\n      <button matTooltip=\"{{ 'home.add-description' | translate }}\" color=\"primary\" mat-raised-button\n        (click)=\"addProject()\">\n        {{ 'home.add' | translate }}\n      </button>\n      <button matTooltip=\"{{'home.import-description' | translate}}\" mat-raised-button (click)=\"fileInput.click()\">\n        {{ 'home.import' | translate }}\n      </button>\n    </section>\n  </div>\n</div>\n<input type=\"file\" name=\"f\" style=\"display:none\" #fileInput (change)=\"fileInputChange()\" />");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/nodeeditor/nodeeditor.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/nodeeditor/nodeeditor.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 mat-dialog-title>{{ 'studio.edit-chat-node-info' | translate }}</h2>\n<mat-dialog-content>\n  <mat-tab-group #tabGroup>\n    <mat-tab label=\"Node Info\" #nodeInfoTab>\n      <div class=\"node-details tab-content\">\n        <div class=\"node-basic-info\">\n          <mat-form-field>\n            <input\n              matInput\n              type=\"text\"\n              placeholder=\"{{ 'studio.node-name' | translate }}\"\n              [(ngModel)]=\"chatNode.Name\"\n              name=\"nodeName\"\n            />\n          </mat-form-field>\n          <mat-form-field>\n            <mat-select\n              placeholder=\"{{ 'studio.node-type' | translate }}\"\n              [(ngModel)]=\"chatNode.NodeType\"\n              name=\"nodeType\"\n            >\n              <mat-option *ngFor=\"let nType of MH.nodeTypes\" [value]=\"nType\">\n                {{ nType }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n          <section class=\"form-field\">\n            <mat-checkbox\n              [(ngModel)]=\"chatNode.IsStartNode\"\n              (click)=\"MH.resetOtherStartNodes(chatNode)\"\n              name=\"isStartNode\"\n              align=\"start\"\n              >{{ 'studio.mark-as-start-node' | translate }}</mat-checkbox\n            >\n          </section>\n          <section class=\"form-field\">\n            <mat-checkbox\n              [(ngModel)]=\"chatNode.IsGoalNode\"\n              name=\"isGoalNode\"\n              align=\"start\"\n              >{{ 'studio.mark-as-goal-node' }}</mat-checkbox\n            >\n          </section>\n          <mat-form-field>\n            <input\n              matInput\n              type=\"text\"\n              placeholder=\"Variable Name\"\n              [(ngModel)]=\"chatNode.VariableName\"\n              name=\"variableName\"\n            />\n          </mat-form-field>\n          <mat-form-field>\n            <input\n              matInput\n              type=\"text\"\n              disabled\n              readonly\n              placeholder=\"Node Id\"\n              [(ngModel)]=\"chatNode.Id\"\n              name=\"nodeId\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"node-condition\" [hidden]=\"chatNode.NodeType != 'Condition'\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">Condition Details</div>\n            <div class=\"panel-body\">\n              <div>\n                <mat-form-field>\n                  <input\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Fallback Next Node Id\"\n                    [(ngModel)]=\"chatNode.NextNodeId\"\n                    name=\"NextNodeId-Condition\"\n                  />\n                </mat-form-field>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"node-api-details\" [hidden]=\"chatNode.NodeType != 'ApiCall'\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">API Details</div>\n            <div class=\"panel-body\">\n              <div>\n                <mat-form-field>\n                  <mat-select\n                    placeholder=\"API Method\"\n                    [(ngModel)]=\"chatNode.ApiMethod\"\n                    name=\"ApiMethod\"\n                  >\n                    <mat-option\n                      *ngFor=\"let apiMethod of MH.apiMethods\"\n                      [value]=\"apiMethod\"\n                    >\n                      {{ apiMethod || \"None\" }}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n                <mat-form-field>\n                  <input\n                    matInput\n                    type=\"url\"\n                    placeholder=\"API Url\"\n                    [(ngModel)]=\"chatNode.ApiUrl\"\n                    name=\"ApiUrl\"\n                  />\n                </mat-form-field>\n                <mat-form-field class=\"contains-hint\">\n                  <textarea\n                    rows=\"3\"\n                    matInput\n                    placeholder=\"Headers\"\n                    [(ngModel)]=\"chatNode.Headers\"\n                    name=\"Headers\"\n                  ></textarea>\n                  <mat-hint\n                    >Enter one header per line. Separate Key and value with a\n                    colon. Eg: Content-Type:text/plain\n                  </mat-hint>\n                </mat-form-field>\n                <mat-form-field>\n                  <input\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Fallback Next Node Id\"\n                    [(ngModel)]=\"chatNode.NextNodeId\"\n                    name=\"NextNodeId\"\n                  />\n                </mat-form-field>\n                <mat-form-field\n                  [hidden]=\"\n                    !MH.chatNodeApiCallFieldVisible(\n                      chatNode,\n                      'RequiredVariables'\n                    )\n                  \"\n                >\n                  <input\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Required Variables\"\n                    [(ngModel)]=\"chatNode.RequiredVariables\"\n                    name=\"RequiredVariables\"\n                  />\n                </mat-form-field>\n                <mat-form-field\n                  [hidden]=\"\n                    !MH.chatNodeApiCallFieldVisible(chatNode, 'RequestBody')\n                  \"\n                >\n                  <textarea\n                    rows=\"6\"\n                    matInput\n                    placeholder=\"Request Body\"\n                    [(ngModel)]=\"chatNode.RequestBody\"\n                    name=\"RequestBody\"\n                  ></textarea>\n                </mat-form-field>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"node-card-details\" [hidden]=\"chatNode.NodeType != 'Card'\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">Card Details</div>\n            <div class=\"panel-body\">\n              <mat-form-field>\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Card Header\"\n                  [(ngModel)]=\"chatNode.CardHeader\"\n                  name=\"CardHeader\"\n                />\n              </mat-form-field>\n              <mat-form-field>\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Card Footer\"\n                  [(ngModel)]=\"chatNode.CardFooter\"\n                  name=\"CardFooter\"\n                />\n              </mat-form-field>\n              <mat-form-field>\n                <mat-select\n                  placeholder=\"Card Placement\"\n                  [(ngModel)]=\"chatNode.Placement\"\n                  name=\"Placement\"\n                >\n                  <mat-option\n                    *ngFor=\"let cardPlacement of MH.cardPlacements\"\n                    [value]=\"cardPlacement\"\n                  >\n                    {{ cardPlacement || \"None\" }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n            </div>\n          </div>\n        </div>\n        <div\n          class=\"node-jumptobot-details\"\n          [hidden]=\"chatNode.NodeType != 'JumpToBot'\"\n        >\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">Jump To Bot Details</div>\n            <div class=\"panel-body\">\n              <div>\n                <mat-form-field>\n                  <input\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Target Bot Id\"\n                    [(ngModel)]=\"chatNode.TargetBotId\"\n                    name=\"TargetBotId\"\n                  />\n                </mat-form-field>\n                <mat-form-field>\n                  <input\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Target Node Id\"\n                    [(ngModel)]=\"chatNode.TargetNodeId\"\n                    name=\"TargetNodeId\"\n                  />\n                </mat-form-field>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </mat-tab>\n    <mat-tab label=\"Content\" *ngIf=\"contentTabVisible()\" #contentTab>\n      <div class=\"node-section-details tab-content\">\n        <div\n          class=\"node-section\"\n          *ngFor=\"let section of chatNode.Sections; let i = index\"\n        >\n          <div [ngSwitch]=\"MH.editorTypeFromSectionType(section.SectionType)\">\n            <ng-container *ngSwitchCase=\"'Text'\">\n              <div class=\"node-text-section\">\n                <mat-form-field>\n                  <span matPrefix>\n                    <i class=\"fa fa-file-text-o text-section-icon\"></i>\n                    &nbsp;\n                  </span>\n                  <input\n                    [autofocus]\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Section text\"\n                    [(ngModel)]=\"section.Text\"\n                    name=\"sectionText-{{ i }}\"\n                  />\n                  <span matSuffix style=\"font-size: 24px\">\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionMoveUp(chatNode, section)\"\n                    >\n                      <mat-icon>arrow_upward</mat-icon>\n                    </button>\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionMoveDown(chatNode, section)\"\n                    >\n                      <mat-icon>arrow_downward</mat-icon>\n                    </button>\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionDelete(chatNode, section)\"\n                    >\n                      <mat-icon>delete</mat-icon>\n                    </button>\n                  </span>\n                </mat-form-field>\n              </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"'TitleCaptionUrl'\">\n              <div class=\"panel panel-default\">\n                <div class=\"panel-heading\">\n                  <i\n                    [matTooltip]=\"section.SectionType + ' Section'\"\n                    class=\"fa panel-header-icon\"\n                    [ngClass]=\"MH.sectionIcon(section)\"\n                  ></i>\n                  Section: {{ MH.sectionAlias(section) }}\n                  <div class=\"pull-right panel-heading-actions\">\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionMoveUp(chatNode, section)\"\n                    >\n                      <mat-icon>arrow_upward</mat-icon>\n                    </button>\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionMoveDown(chatNode, section)\"\n                    >\n                      <mat-icon>arrow_downward</mat-icon>\n                    </button>\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionDelete(chatNode, section)\"\n                    >\n                      <mat-icon>delete</mat-icon>\n                    </button>\n                  </div>\n                </div>\n                <div class=\"panel-body\">\n                  <mat-form-field>\n                    <input\n                      matInput\n                      type=\"text\"\n                      placeholder=\"Title\"\n                      [(ngModel)]=\"section.Title\"\n                      name=\"sectionTitle-{{ i }}\"\n                    />\n                  </mat-form-field>\n                  <mat-form-field>\n                    <input\n                      matInput\n                      type=\"url\"\n                      placeholder=\"Url\"\n                      [(ngModel)]=\"section.Url\"\n                      name=\"sectionUrl-{{ i }}\"\n                    />\n                  </mat-form-field>\n                  <mat-form-field>\n                    <input\n                      matInput\n                      type=\"text\"\n                      placeholder=\"Caption\"\n                      [(ngModel)]=\"section.Caption\"\n                      name=\"sectionCaption-{{ i }}\"\n                    />\n                  </mat-form-field>\n                </div>\n              </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"'Carousel'\">\n              <div class=\"panel panel-default\">\n                <div class=\"panel-heading\">\n                  <i\n                    [matTooltip]=\"section.SectionType + ' Section'\"\n                    class=\"fa panel-header-icon\"\n                    [ngClass]=\"MH.sectionIcon(section)\"\n                  ></i>\n                  Carousel\n                  <div class=\"pull-right panel-heading-actions\">\n                    <button\n                      matTooltip=\"Add Carousel Item\"\n                      mat-icon-button\n                      (click)=\"MH.carouselItemAdd(section)\"\n                    >\n                      <mat-icon>add</mat-icon>\n                    </button>\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionMoveUp(chatNode, section)\"\n                    >\n                      <mat-icon>arrow_upward</mat-icon>\n                    </button>\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionMoveDown(chatNode, section)\"\n                    >\n                      <mat-icon>arrow_downward</mat-icon>\n                    </button>\n                    <button\n                      mat-icon-button\n                      (click)=\"MH.sectionDelete(chatNode, section)\"\n                    >\n                      <mat-icon>delete</mat-icon>\n                    </button>\n                  </div>\n                </div>\n                <div class=\"panel-body\">\n                  <div class=\"carousel-container\">\n                    <span *ngIf=\"!section.Items || section.Items.length <= 0\"\n                      >Add a carousel item using the plus (+) button in this\n                      panel's header</span\n                    >\n                    <div\n                      class=\"carousel-item\"\n                      *ngFor=\"let carItem of section.Items\"\n                    >\n                      <div class=\"panel panel-default\">\n                        <div class=\"panel-heading\">\n                          <i\n                            matTooltip=\"Carousel Item\"\n                            class=\"fa panel-header-icon\"\n                            [ngClass]=\"MH.sectionIcon(section)\"\n                          ></i>\n                          Carousel Item: {{ carItem.Title }}\n                          <div class=\"pull-right panel-heading-actions\">\n                            <button\n                              mat-icon-button\n                              matTooltip=\"Add Carousel Button\"\n                              (click)=\"MH.carouselButtonAdd(carItem)\"\n                            >\n                              <mat-icon>add</mat-icon>\n                            </button>\n                            <button\n                              mat-icon-button\n                              (click)=\"MH.carouselItemMoveUp(section, carItem)\"\n                            >\n                              <mat-icon>arrow_upward</mat-icon>\n                            </button>\n                            <button\n                              mat-icon-button\n                              (click)=\"\n                                MH.carouselItemMoveDown(section, carItem)\n                              \"\n                            >\n                              <mat-icon>arrow_downward</mat-icon>\n                            </button>\n                            <button\n                              mat-icon-button\n                              (click)=\"MH.carouselItemDelete(section, carItem)\"\n                            >\n                              <mat-icon>delete</mat-icon>\n                            </button>\n                          </div>\n                        </div>\n                        <div class=\"panel-body\">\n                          <mat-form-field>\n                            <input\n                              matInput\n                              type=\"text\"\n                              placeholder=\"Title\"\n                              [(ngModel)]=\"carItem.Title\"\n                              name=\"carItemTitle-{{ i }}\"\n                            />\n                          </mat-form-field>\n                          <mat-form-field>\n                            <input\n                              matInput\n                              type=\"url\"\n                              placeholder=\"Image Url\"\n                              [(ngModel)]=\"carItem.ImageUrl\"\n                              name=\"carItemImageUrl-{{ i }}\"\n                            />\n                          </mat-form-field>\n                          <mat-form-field>\n                            <input\n                              matInput\n                              type=\"text\"\n                              placeholder=\"Caption\"\n                              [(ngModel)]=\"carItem.Caption\"\n                              name=\"carItemCaption-{{ i }}\"\n                            />\n                          </mat-form-field>\n                          <div\n                            class=\"carousel-buttons\"\n                            *ngFor=\"let carBtn of carItem.Buttons\"\n                          >\n                            <div class=\"panel panel-default\">\n                              <div class=\"panel-heading\">\n                                <i\n                                  matTooltip=\"Carousel Button\"\n                                  class=\"fa panel-header-icon\"\n                                  [ngClass]=\"MH.sectionIcon(section)\"\n                                ></i>\n                                Carousel Button: {{ carBtn.Text }}\n                                <div class=\"pull-right panel-heading-actions\">\n                                  <button\n                                    mat-icon-button\n                                    (click)=\"\n                                      MH.carouselButtonMoveUp(carItem, carBtn)\n                                    \"\n                                  >\n                                    <mat-icon>arrow_upward</mat-icon>\n                                  </button>\n                                  <button\n                                    mat-icon-button\n                                    (click)=\"\n                                      MH.carouselButtonMoveDown(carItem, carBtn)\n                                    \"\n                                  >\n                                    <mat-icon>arrow_downward</mat-icon>\n                                  </button>\n                                  <button\n                                    mat-icon-button\n                                    (click)=\"\n                                      MH.carouselButtonDelete(carItem, carBtn)\n                                    \"\n                                  >\n                                    <mat-icon>delete</mat-icon>\n                                  </button>\n                                </div>\n                              </div>\n                              <div class=\"panel-body\">\n                                <mat-form-field>\n                                  <input\n                                    matInput\n                                    type=\"text\"\n                                    placeholder=\"Text\"\n                                    [(ngModel)]=\"carBtn.Text\"\n                                    name=\"carBtnText-{{ i }}\"\n                                  />\n                                </mat-form-field>\n                                <mat-form-field>\n                                  <mat-select\n                                    placeholder=\"Type\"\n                                    [(ngModel)]=\"carBtn.Type\"\n                                    name=\"carBtnType\"\n                                  >\n                                    <mat-option\n                                      *ngFor=\"\n                                        let bType of MH.carouselButtonTypes\n                                      \"\n                                      [value]=\"bType\"\n                                    >\n                                      {{ bType || \"None\" }}\n                                    </mat-option>\n                                  </mat-select>\n                                </mat-form-field>\n                                <mat-form-field\n                                  *ngIf=\"\n                                    carBtn.Type ==\n                                      MH.CarouselButtonType.OpenUrl ||\n                                    carBtn.Type ==\n                                      MH.CarouselButtonType.DeepLink\n                                  \"\n                                >\n                                  <input\n                                    matInput\n                                    type=\"url\"\n                                    placeholder=\"Url\"\n                                    [(ngModel)]=\"carBtn.Url\"\n                                    name=\"carBtnUrl-{{ i }}\"\n                                  />\n                                </mat-form-field>\n                                <mat-form-field>\n                                  <input\n                                    matInput\n                                    type=\"text\"\n                                    placeholder=\"Next Node Id\"\n                                    [(ngModel)]=\"carBtn.NextNodeId\"\n                                    name=\"carBtnNextNodeId-{{ i }}\"\n                                  />\n                                </mat-form-field>\n                                <mat-form-field>\n                                  <input\n                                    matInput\n                                    type=\"text\"\n                                    placeholder=\"Variable Value\"\n                                    [(ngModel)]=\"carBtn.VariableValue\"\n                                    name=\"carBtnVariableValue-{{ i }}\"\n                                  />\n                                </mat-form-field>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n        <section class=\"text-center\">\n          <img\n            matTooltip=\"Add a text content\"\n            class=\"section-type-button text\"\n            (click)=\"MH.addSection(chatNode, SectionType.Text)\"\n          />\n          <img\n            matTooltip=\"Add an image content\"\n            class=\"section-type-button image\"\n            (click)=\"MH.addSection(chatNode, SectionType.Image)\"\n          />\n          <img\n            matTooltip=\"Add a gif content\"\n            class=\"section-type-button gif\"\n            (click)=\"MH.addSection(chatNode, SectionType.Gif)\"\n          />\n          <!--<img matTooltip=\"Add an audio content\" class=\"section-type-button audio\" (click)=\"MH.addSection(chatNode, SectionType.Audio)\" />-->\n          <img\n            matTooltip=\"Add a video content\"\n            class=\"section-type-button video\"\n            (click)=\"MH.addSection(chatNode, SectionType.Video)\"\n          />\n          <img\n            matTooltip=\"Add a carousel content\"\n            class=\"section-type-button carousel\"\n            (click)=\"MH.addSection(chatNode, SectionType.Carousel)\"\n          />\n          <!--<mat-menu #addSectionMenu=\"matMenu\">\n        <button mat-menu-item (click)=\"MH.addSection(chatNode, SectionType.Text)\">Text</button>\n        <button mat-menu-item (click)=\"MH.addSection(chatNode, SectionType.Image)\">Image</button>\n        <button mat-menu-item (click)=\"MH.addSection(chatNode, SectionType.Gif)\">Gif</button>\n        <button mat-menu-item (click)=\"MH.addSection(chatNode, SectionType.Audio)\">Audio</button>\n        <button mat-menu-item (click)=\"MH.addSection(chatNode, SectionType.Video)\">Video</button>\n        <button mat-menu-item (click)=\"MH.addSection(chatNode, SectionType.Carousel)\">Carousel</button>\n    </mat-menu>\n                    <button type=\"button\" matTooltip=\"Add Section\" [matMenuTriggerFor]=\"addSectionMenu\" mat-fab>\n                        <mat-icon class=\"fab-btn-icon\">add</mat-icon>\n                    </button>-->\n        </section>\n      </div>\n    </mat-tab>\n    <mat-tab label=\"Buttons\" #buttonsTab>\n      <div class=\"tab-content\">\n        <div\n          class=\"node-buttons\"\n          *ngFor=\"let btn of chatNode.Buttons; let i = index\"\n        >\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n              Button: {{ MH.chatButtonAlias(btn) }}\n              <div class=\"pull-right panel-heading-actions\">\n                <button\n                  mat-icon-button\n                  (click)=\"MH.buttonMoveUp(chatNode, btn)\"\n                >\n                  <mat-icon>arrow_upward</mat-icon>\n                </button>\n                <button\n                  mat-icon-button\n                  (click)=\"MH.buttonMoveDown(chatNode, btn)\"\n                >\n                  <mat-icon>arrow_downward</mat-icon>\n                </button>\n                <button\n                  mat-icon-button\n                  (click)=\"MH.buttonDelete(chatNode, btn)\"\n                >\n                  <mat-icon>delete</mat-icon>\n                </button>\n              </div>\n            </div>\n            <div class=\"panel-body\">\n              <mat-form-field\n                [hidden]=\"MH.chatButtonFieldHidden(chatNode, btn, 'ButtonType')\"\n              >\n                <mat-select\n                  placeholder=\"Type\"\n                  [(ngModel)]=\"btn.ButtonType\"\n                  name=\"btnType-{{ i }}\"\n                >\n                  <mat-option\n                    *ngFor=\"let bType of MH.buttonTypes\"\n                    [value]=\"bType\"\n                  >\n                    {{ bType }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n\n              <mat-form-field>\n                <input\n                  matInput\n                  [autofocus]\n                  type=\"text\"\n                  [placeholder]=\"\n                    ['ApiCall', 'Condition'].indexOf(chatNode.NodeType) == -1\n                      ? 'Text on button'\n                      : 'Button Name'\n                  \"\n                  [(ngModel)]=\"btn.ButtonName\"\n                  name=\"btnName-{{ i }}\"\n                />\n              </mat-form-field>\n              <!--<mat-form-field [hidden]=\"MH.chatButtonFieldHidden(chatNode, btn, 'ButtonText')\">\n                                <input matInput type=\"text\" placeholder=\"Text in chat\" [(ngModel)]=\"btn.ButtonText\" name=\"btnText-{ {i}}\">\n                            </mat-form-field>-->\n              <mat-form-field\n                [hidden]=\"\n                  MH.chatButtonFieldHidden(chatNode, btn, 'ConditionMatchKey')\n                \"\n              >\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Condition Match Key\"\n                  [(ngModel)]=\"btn.ConditionMatchKey\"\n                  name=\"btnConditionMatchKey-{{ i }}\"\n                />\n              </mat-form-field>\n              <mat-form-field\n                [hidden]=\"\n                  MH.chatButtonFieldHidden(chatNode, btn, 'ConditionOperator')\n                \"\n              >\n                <mat-select\n                  placeholder=\"Condition Operator\"\n                  [(ngModel)]=\"btn.ConditionOperator\"\n                  name=\"btnConditionOperator-{{ i }}\"\n                >\n                  <mat-option\n                    *ngFor=\"let CO of MH.conditionOperators\"\n                    [value]=\"CO\"\n                  >\n                    {{ CO }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n              <mat-form-field\n                [hidden]=\"\n                  MH.chatButtonFieldHidden(chatNode, btn, 'ConditionMatchValue')\n                \"\n              >\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Condition Match Value\"\n                  [(ngModel)]=\"btn.ConditionMatchValue\"\n                  name=\"btnConditionMatchValue-{{ i }}\"\n                />\n              </mat-form-field>\n              <mat-form-field\n                [hidden]=\"\n                  MH.chatButtonFieldHidden(chatNode, btn, 'PlaceholderText')\n                \"\n              >\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Placeholder\"\n                  [(ngModel)]=\"btn.PlaceholderText\"\n                  name=\"btnPlaceholderText-{{ i }}\"\n                />\n              </mat-form-field>\n              <mat-form-field\n                [hidden]=\"\n                  MH.chatButtonFieldHidden(chatNode, btn, 'DeepLinkUrl')\n                \"\n              >\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Deeplink Url\"\n                  [(ngModel)]=\"btn.DeepLinkUrl\"\n                  name=\"btnDeepLinkUrl-{{ i }}\"\n                />\n              </mat-form-field>\n              <mat-form-field\n                [hidden]=\"MH.chatButtonFieldHidden(chatNode, btn, 'Url')\"\n              >\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Url\"\n                  [(ngModel)]=\"btn.Url\"\n                  name=\"btnUrl-{{ i }}\"\n                />\n              </mat-form-field>\n              <mat-form-field\n                class=\"contains-hint\"\n                [hidden]=\"\n                  MH.chatButtonFieldHidden(chatNode, btn, 'ItemsSource')\n                \"\n                hintLabel=\"Format: 'Key1:Value1, Key2:Value2'  Eg: 'Car:1, Bike:2'\"\n              >\n                <textarea\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Items\"\n                  [(ngModel)]=\"btn.ItemsSource\"\n                  name=\"btnItemsSource-{{ i }}\"\n                ></textarea>\n              </mat-form-field>\n              <section\n                class=\"form-field\"\n                [hidden]=\"\n                  MH.chatButtonFieldHidden(chatNode, btn, 'AllowMultiple')\n                \"\n              >\n                <mat-checkbox\n                  [(ngModel)]=\"btn.AllowMultiple\"\n                  name=\"btnAllowMultiple-{{ i }}\"\n                  align=\"start\"\n                  >Allow Multiple</mat-checkbox\n                >\n              </section>\n              <mat-form-field\n                [hidden]=\"MH.chatButtonFieldHidden(chatNode, btn, 'NextNodeId')\"\n              >\n                <input\n                  matInput\n                  type=\"text\"\n                  placeholder=\"Next Node Id\"\n                  [(ngModel)]=\"btn.NextNodeId\"\n                  name=\"btnNextNodeId-{{ i }}\"\n                />\n              </mat-form-field>\n              <section class=\"form-field\">\n                <mat-checkbox\n                  [(ngModel)]=\"btn.AdvancedOptions\"\n                  name=\"btnAdvancedOptions-{{ i }}\"\n                  align=\"start\"\n                  >Advanced options</mat-checkbox\n                >\n              </section>\n              <div class=\"btn-advanced-options\" [hidden]=\"!btn.AdvancedOptions\">\n                <mat-form-field>\n                  <input\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Variable Value\"\n                    [(ngModel)]=\"btn.VariableValue\"\n                    name=\"btnVariableValue-{{ i }}\"\n                  />\n                </mat-form-field>\n\n                <!--<mat-form-field [hidden]=\"MH.chatButtonFieldHidden(chatNode, btn, 'PrefixText')\">\n                                    <input matInput type=\"text\" placeholder=\"Prefix\" [(ngModel)]=\"btn.PrefixText\" name=\"btnPrefixText-{ {i}}\">\n                                </mat-form-field>\n                                <mat-form-field [hidden]=\"MH.chatButtonFieldHidden(chatNode, btn, 'PostfixText')\">\n                                    <input matInput type=\"text\" placeholder=\"Postfix\" [(ngModel)]=\"btn.PostfixText\" name=\"btnPostfixText-{ {i}}\">\n                                </mat-form-field>-->\n                <mat-form-field\n                  [hidden]=\"\n                    MH.chatButtonFieldHidden(chatNode, btn, 'MinLength')\n                  \"\n                >\n                  <input\n                    matInput\n                    type=\"number\"\n                    placeholder=\"Minimum Length\"\n                    [(ngModel)]=\"btn.MinLength\"\n                    name=\"btnMinLength-{{ i }}\"\n                  />\n                </mat-form-field>\n                <mat-form-field\n                  [hidden]=\"\n                    MH.chatButtonFieldHidden(chatNode, btn, 'MaxLength')\n                  \"\n                >\n                  <input\n                    matInput\n                    type=\"number\"\n                    placeholder=\"Maximum Length\"\n                    [(ngModel)]=\"btn.MaxLength\"\n                    name=\"btnMaxLength-{{ i }}\"\n                  />\n                </mat-form-field>\n                <mat-form-field\n                  [hidden]=\"\n                    MH.chatButtonFieldHidden(chatNode, btn, 'DefaultText')\n                  \"\n                >\n                  <input\n                    matInput\n                    type=\"text\"\n                    placeholder=\"Default Text\"\n                    [(ngModel)]=\"btn.DefaultText\"\n                    name=\"btnDefaultText-{{ i }}\"\n                  />\n                </mat-form-field>\n                <section\n                  class=\"form-field\"\n                  [hidden]=\"\n                    MH.chatButtonFieldHidden(chatNode, btn, 'IsMultiLine')\n                  \"\n                >\n                  <mat-checkbox\n                    [(ngModel)]=\"btn.IsMultiLine\"\n                    name=\"btnIsMultiLine-{{ i }}\"\n                    align=\"start\"\n                    >Multiple line allowed</mat-checkbox\n                  >\n                </section>\n                <!--<section class=\"form-field\">\n                                    <mat-checkbox [(ngModel)]=\"btn.PostToChat\" name=\"btnPostToChat-{ {i}}\" align=\"start\">Post to chat</mat-checkbox>\n                                </section>-->\n              </div>\n              <!--<section class=\"form-field\">\n                                <mat-checkbox [(ngModel)]=\"btn.DoesRepeat\" name=\"btnDoesRepeat-{ {i}}\" align=\"start\">Does repeat</mat-checkbox>\n                            </section>\n                            <div class=\"btn-repeat-options\" [hidden]=\"!btn.DoesRepeat\">\n                                <mat-form-field>\n                                    <input matInput type=\"text\" placeholder=\"Repeat On\" [(ngModel)]=\"btn.RepeatOn\" name=\"btnRepeatOn-{ {i}}\">\n                                </mat-form-field>\n                                <mat-form-field>\n                                    <input matInput type=\"text\" placeholder=\"Repeat As\" [(ngModel)]=\"btn.RepeatAs\" name=\"btnRepeatAs-{ {i}}\">\n                                </mat-form-field>\n                                <mat-form-field>\n                                    <input matInput type=\"number\" placeholder=\"Start Position\" [(ngModel)]=\"btn.StartPosition\" name=\"btnStartPosition-{ {i}}\">\n                                </mat-form-field>\n                                <mat-form-field>\n                                    <input matInput type=\"number\" placeholder=\"Max Repeats\" [(ngModel)]=\"btn.MaxRepeats\" name=\"btnMaxRepeats-{ {i}}\">\n                                </mat-form-field>\n                            </div>-->\n            </div>\n          </div>\n        </div>\n        <section class=\"text-center\">\n          <button\n            matTooltip=\"Add Button\"\n            type=\"button\"\n            mat-fab\n            (click)=\"MH.addButton(chatNode)\"\n          >\n            <mat-icon class=\"fab-btn-icon\">add</mat-icon>\n          </button>\n        </section>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button type=\"button\" (click)=\"dismiss()\" mat-raised-button color=\"primary\">\n    Done\n  </button>\n  <span class=\"spacing\"></span>\n  <button\n    type=\"button\"\n    matTooltip=\"Delete Node\"\n    (click)=\"MH.nodeDelete(chatNode, this)\"\n    mat-raised-button\n  >\n    Delete Node\n  </button>\n</mat-dialog-actions>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/simulator-frame/simulator-frame.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/simulator-frame/simulator-frame.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div\n  class=\"intelligo-root\"\n  id=\"intelligo-root\"\n  #intelligoRoot\n  [ngClass]=\"{\n    'intelligo-min': !isOpen,\n    minimizeAnimation: !isOpen,\n    'intelligo-max': isOpen,\n    maximizeAnimation: isOpen\n  }\"\n>\n  <div class=\"intelligo-frame-container intelligo-full\">\n    <iframe\n      [src]=\"iframeUrl\"\n      #simulatorIFrame\n      class=\"intelligo-iframe\"\n      scrolling=\"no\"\n    ></iframe>\n  </div>\n  <div\n    class=\"intelligo-minmax-btn\"\n    [class.intelligo-max]=\"isOpen\"\n    (click)=\"minMaxBtnClick()\"\n  >\n    <div class=\"min-btn\">\n      <svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n        <path\n          fill=\"#fff\"\n          d=\"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z\"\n        />\n      </svg>\n    </div>\n  </div>\n  <div class=\"powered-by-intelligo\">\n    <div>\n      <a class=\"intelligo-link\" href=\"https://intelligo.systems\" target=\"_blank\"\n        >powered by Intelligo Systems</a\n      >\n    </div>\n  </div>\n</div>\n<div\n  class=\"intelligo-minmax-btn\"\n  [class.intelligo-max]=\"isOpen\"\n  (click)=\"minMaxBtnClick()\"\n>\n  <div class=\"max-btn\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n      <style>\n        .st0 {\n          fill: #fff;\n        }\n      </style>\n      <path\n        class=\"st0\"\n        d=\"M0 256c0 68.4 26.6 132.6 75 181 49.4 49.4 115 75 181.2 75 41.2 0 82.8-10 120.8-30.4 34.1 24.6 67.4 29.9 90.1 29.9 8.4 0 15.4-.8 20.2-1.5 10.4-1.6 18.4-9.7 20-20.1s-3.7-20.5-13.1-25.1c-19.6-9.6-32.8-28.9-41-45.5 83.9-101 77.4-250.7-16.1-344.2-48.4-48.4-112.6-75-181-75s-132.6 26.6-181 75S0 187.6 0 256zM95.9 95.7c88.3-88.4 232.2-88.4 320.6 0 84.6 84.6 88.8 221 9.5 310.6-2.1 2.4-3.2 5.3-3.6 8.2-.8 3-.5 6.3.8 9.4 8.1 18.5 22 42.3 43.9 58.3h-.1c-19.1 0-47.8-4.8-77.2-27.5-.3-.3-.8-.6-1.2-.9-4.7-4.7-11.9-5.7-17.8-2.3-89 52.3-202.1 37.8-275.2-35.3-88.2-88.3-88.2-232.1.3-320.5z\"\n      />\n      <circle class=\"st0\" cx=\"256.1\" cy=\"256\" r=\"18\" />\n      <circle class=\"st0\" cx=\"163.5\" cy=\"256\" r=\"18\" />\n      <circle class=\"st0\" cx=\"348.8\" cy=\"256\" r=\"18\" />\n    </svg>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@media (max-width: 767px) {\n  /* On small screens, the nav menu spans the full width of the screen. Leave a space for it. */\n  .body-content {\n    padding-top: 50px;\n  }\n}\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  supported by Chrome and Opera */\n}\n.top-nav {\n  background-color: white;\n  color: #5e72e4;\n}\n.page-content {\n  display: flex;\n  height: 100%;\n  min-height: 95vh !important;\n}\nmat-sidenav-container {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\nmat-sidenav {\n  width: 250px;\n  background-color: #5e72e4 !important;\n}\nli .glyphicon {\n  margin-right: 10px;\n}\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 0px;\n    border-width: 0px;\n  }\n\n  .navbar-header {\n    float: left;\n    width: auto;\n    margin: 0 10px;\n  }\n\n  .navbar-collapse {\n    padding: 0px;\n  }\n\n  .navbar ul {\n    float: none;\n  }\n\n  .navbar li {\n    float: none;\n    font-size: 15px;\n    transition: all 0.3s;\n  }\n\n  .navbar li a {\n    padding: 10px 16px;\n    color: white;\n    transition: all 0.3s;\n  }\n\n  .navbar a {\n    /* If a menu item's text is too long, truncate it */\n    width: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n.navbar-brand {\n  color: white;\n}\n.navbar-btn {\n  background-color: transparent;\n  color: white;\n  font-size: 24px;\n  padding: 0;\n  margin: 7px 0 10px 0;\n  float: left;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #5e72e4 !important;\n  color: white !important;\n}\n.nav-menu-wrapper {\n  position: fixed;\n  top: 50px;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  height: 100%;\n  padding: 0px;\n}\n.title-bar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  height: 50px;\n  padding: 0px;\n}\n.nav-menu-item-active a {\n  color: #5e72e4 !important;\n  background-color: white;\n}\n.nav-menu-item-active a :hover,\n.nav-menu-item-active a :active {\n  color: lightgray !important;\n}\n.body-wrapper {\n  position: fixed;\n  top: 50px;\n  right: 0;\n  z-index: 1;\n  height: 100%;\n  padding: 0px;\n  width: 100%;\n}\n.title-bar-header {\n  margin: 0 0 5px 10px;\n}\n.fullpage-loading-spinner {\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n  width: 100%;\n  top: 0;\n  left: 0;\n  height: 100%;\n}\n.fullpage-loading-spinner > mat-spinner {\n  text-align: center;\n  margin: auto;\n  height: 100%;\n}\n.fullpage-loading-spinner > button {\n  text-align: center;\n  margin: 40px;\n  height: 100%;\n  color: white;\n}\n.navbar-actions {\n  float: right;\n  padding: 9px 0;\n  margin-right: 10px;\n}\n.navbar-actions > button {\n  background-color: #5e72e4;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxhcHAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVFLDZGQUFBO0VBQ0E7SUFDRSxpQkFBQTtFQ0FGO0FBQ0Y7QURHQTtFQUNFLDJCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUVBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSwyQkFBQTtFQUNBLGlCQUFBO0VBQ0E7aUVBQUE7QUNBRjtBRElBO0VBQ0UsdUJBQUE7RUFDQSxjQUFBO0FDREY7QURJQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7QUNERjtBRElBO0VBQ0UsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDREY7QURJQTtFQUNFLFlBQUE7RUFDQSxvQ0FBQTtBQ0RGO0FESUE7RUFDRSxrQkFBQTtBQ0RGO0FES0E7RUFDRTtJQUNFLGtCQUFBO0lBQ0EsaUJBQUE7RUNGRjs7RURLQTtJQUNFLFdBQUE7SUFDQSxXQUFBO0lBQ0EsY0FBQTtFQ0ZGOztFREtBO0lBQ0UsWUFBQTtFQ0ZGOztFREtBO0lBQ0UsV0FBQTtFQ0ZGOztFREtBO0lBQ0UsV0FBQTtJQUNBLGVBQUE7SUFDQSxvQkFBQTtFQ0ZGOztFREtBO0lBQ0Usa0JBQUE7SUFDQSxZQUFBO0lBQ0Esb0JBQUE7RUNGRjs7RURLQTtJQUNFLG1EQUFBO0lBQ0EsV0FBQTtJQUNBLG1CQUFBO0lBQ0EsZ0JBQUE7SUFDQSx1QkFBQTtFQ0ZGO0FBQ0Y7QURLQTtFQUNFLFlBQUE7QUNIRjtBRE1BO0VBQ0UsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7QUNIRjtBRE1BOztFQUVFLHFCQUFBO0VBQ0Esb0NBQUE7RUFDQSx1QkFBQTtBQ0hGO0FETUE7RUFDRSxlQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDSEY7QURNQTtFQUNFLGVBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNIRjtBRE1BO0VBQ0UseUJBQUE7RUFDQSx1QkFBQTtBQ0hGO0FETUE7O0VBRUUsMkJBQUE7QUNIRjtBRE1BO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0hGO0FETUE7RUFDRSxvQkFBQTtBQ0hGO0FETUE7RUFDRSxlQUFBO0VBQ0Esb0NBQUE7RUFDQSxXQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxZQUFBO0FDSEY7QURNQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNIRjtBRE1BO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNIRjtBRE1BO0VBQ0UsWUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQ0hGO0FETUE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7QUNIRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuXG4gIC8qIE9uIHNtYWxsIHNjcmVlbnMsIHRoZSBuYXYgbWVudSBzcGFucyB0aGUgZnVsbCB3aWR0aCBvZiB0aGUgc2NyZWVuLiBMZWF2ZSBhIHNwYWNlIGZvciBpdC4gKi9cbiAgLmJvZHktY29udGVudCB7XG4gICAgcGFkZGluZy10b3A6IDUwcHg7XG4gIH1cbn1cblxuLm5vc2VsZWN0IHtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAvKiBpT1MgU2FmYXJpICovXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC8qIFNhZmFyaSAqL1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC8qIEtvbnF1ZXJvciBIVE1MICovXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC8qIEZpcmVmb3ggKi9cbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAvKiBJbnRlcm5ldCBFeHBsb3Jlci9FZGdlICovXG4gIHVzZXItc2VsZWN0OiBub25lO1xuICAvKiBOb24tcHJlZml4ZWQgdmVyc2lvbiwgY3VycmVudGx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkIGJ5IENocm9tZSBhbmQgT3BlcmEgKi9cbn1cblxuLnRvcC1uYXYge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6ICM1ZTcyZTQ7XG59XG5cbi5wYWdlLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDk1dmggIWltcG9ydGFudDtcbn1cblxubWF0LXNpZGVuYXYtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5tYXQtc2lkZW5hdiB7XG4gIHdpZHRoOiAyNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlNzJlNCAhaW1wb3J0YW50O1xufVxuXG5saSAuZ2x5cGhpY29uIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAubmF2YmFyIHtcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XG4gICAgYm9yZGVyLXdpZHRoOiAwcHg7XG4gIH1cblxuICAubmF2YmFyLWhlYWRlciB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgbWFyZ2luOiAwIDEwcHg7XG4gIH1cblxuICAubmF2YmFyLWNvbGxhcHNlIHtcbiAgICBwYWRkaW5nOiAwcHg7XG4gIH1cblxuICAubmF2YmFyIHVsIHtcbiAgICBmbG9hdDogbm9uZTtcbiAgfVxuXG4gIC5uYXZiYXIgbGkge1xuICAgIGZsb2F0OiBub25lO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjNzO1xuICB9XG5cbiAgLm5hdmJhciBsaSBhIHtcbiAgICBwYWRkaW5nOiAxMHB4IDE2cHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRyYW5zaXRpb246IGFsbCAuM3M7XG4gIH1cblxuICAubmF2YmFyIGEge1xuICAgIC8qIElmIGEgbWVudSBpdGVtJ3MgdGV4dCBpcyB0b28gbG9uZywgdHJ1bmNhdGUgaXQgKi9cbiAgICB3aWR0aDogMTAwJTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIH1cbn1cblxuLm5hdmJhci1icmFuZCB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm5hdmJhci1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDI0cHg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogN3B4IDAgMTBweCAwO1xuICBmbG9hdDogbGVmdDtcbn1cblxuLm5hdj5saT5hOmhvdmVyLFxuLm5hdj5saT5hOmZvY3VzIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWU3MmU0ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG4ubmF2LW1lbnUtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA1MHB4O1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgei1pbmRleDogMTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAwcHhcbn1cblxuLnRpdGxlLWJhciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgei1pbmRleDogMTtcbiAgaGVpZ2h0OiA1MHB4O1xuICBwYWRkaW5nOiAwcHhcbn1cblxuLm5hdi1tZW51LWl0ZW0tYWN0aXZlIGEge1xuICBjb2xvcjogIzVlNzJlNCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLm5hdi1tZW51LWl0ZW0tYWN0aXZlIGEgOmhvdmVyLFxuLm5hdi1tZW51LWl0ZW0tYWN0aXZlIGEgOmFjdGl2ZSB7XG4gIGNvbG9yOiBsaWdodGdyYXkgIWltcG9ydGFudDtcbn1cblxuLmJvZHktd3JhcHBlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA1MHB4O1xuICByaWdodDogMDtcbiAgei1pbmRleDogMTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4udGl0bGUtYmFyLWhlYWRlciB7XG4gIG1hcmdpbjogMCAwIDVweCAxMHB4XG59XG5cbi5mdWxscGFnZS1sb2FkaW5nLXNwaW5uZXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgd2lkdGg6IDEwMCU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZnVsbHBhZ2UtbG9hZGluZy1zcGlubmVyPm1hdC1zcGlubmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmZ1bGxwYWdlLWxvYWRpbmctc3Bpbm5lcj5idXR0b24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogNDBweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5uYXZiYXItYWN0aW9ucyB7XG4gIGZsb2F0OiByaWdodDtcbiAgcGFkZGluZzogOXB4IDA7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLm5hdmJhci1hY3Rpb25zPmJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZTcyZTQ7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbiIsIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAvKiBPbiBzbWFsbCBzY3JlZW5zLCB0aGUgbmF2IG1lbnUgc3BhbnMgdGhlIGZ1bGwgd2lkdGggb2YgdGhlIHNjcmVlbi4gTGVhdmUgYSBzcGFjZSBmb3IgaXQuICovXG4gIC5ib2R5LWNvbnRlbnQge1xuICAgIHBhZGRpbmctdG9wOiA1MHB4O1xuICB9XG59XG4ubm9zZWxlY3Qge1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC8qIGlPUyBTYWZhcmkgKi9cbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLyogU2FmYXJpICovXG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLyogS29ucXVlcm9yIEhUTUwgKi9cbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLyogRmlyZWZveCAqL1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC8qIEludGVybmV0IEV4cGxvcmVyL0VkZ2UgKi9cbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC8qIE5vbi1wcmVmaXhlZCB2ZXJzaW9uLCBjdXJyZW50bHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgYnkgQ2hyb21lIGFuZCBPcGVyYSAqL1xufVxuXG4udG9wLW5hdiB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogIzVlNzJlNDtcbn1cblxuLnBhZ2UtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTAwJTtcbiAgbWluLWhlaWdodDogOTV2aCAhaW1wb3J0YW50O1xufVxuXG5tYXQtc2lkZW5hdi1jb250YWluZXIge1xuICBtYXJnaW46IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbm1hdC1zaWRlbmF2IHtcbiAgd2lkdGg6IDI1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWU3MmU0ICFpbXBvcnRhbnQ7XG59XG5cbmxpIC5nbHlwaGljb24ge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAubmF2YmFyIHtcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XG4gICAgYm9yZGVyLXdpZHRoOiAwcHg7XG4gIH1cblxuICAubmF2YmFyLWhlYWRlciB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgbWFyZ2luOiAwIDEwcHg7XG4gIH1cblxuICAubmF2YmFyLWNvbGxhcHNlIHtcbiAgICBwYWRkaW5nOiAwcHg7XG4gIH1cblxuICAubmF2YmFyIHVsIHtcbiAgICBmbG9hdDogbm9uZTtcbiAgfVxuXG4gIC5uYXZiYXIgbGkge1xuICAgIGZsb2F0OiBub25lO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbiAgfVxuXG4gIC5uYXZiYXIgbGkgYSB7XG4gICAgcGFkZGluZzogMTBweCAxNnB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbiAgfVxuXG4gIC5uYXZiYXIgYSB7XG4gICAgLyogSWYgYSBtZW51IGl0ZW0ncyB0ZXh0IGlzIHRvbyBsb25nLCB0cnVuY2F0ZSBpdCAqL1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgfVxufVxuLm5hdmJhci1icmFuZCB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm5hdmJhci1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDI0cHg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogN3B4IDAgMTBweCAwO1xuICBmbG9hdDogbGVmdDtcbn1cblxuLm5hdiA+IGxpID4gYTpob3Zlcixcbi5uYXYgPiBsaSA+IGE6Zm9jdXMge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZTcyZTQgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbi5uYXYtbWVudS13cmFwcGVyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDUwcHg7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAxO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDBweDtcbn1cblxuLnRpdGxlLWJhciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgei1pbmRleDogMTtcbiAgaGVpZ2h0OiA1MHB4O1xuICBwYWRkaW5nOiAwcHg7XG59XG5cbi5uYXYtbWVudS1pdGVtLWFjdGl2ZSBhIHtcbiAgY29sb3I6ICM1ZTcyZTQgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5uYXYtbWVudS1pdGVtLWFjdGl2ZSBhIDpob3Zlcixcbi5uYXYtbWVudS1pdGVtLWFjdGl2ZSBhIDphY3RpdmUge1xuICBjb2xvcjogbGlnaHRncmF5ICFpbXBvcnRhbnQ7XG59XG5cbi5ib2R5LXdyYXBwZXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogNTBweDtcbiAgcmlnaHQ6IDA7XG4gIHotaW5kZXg6IDE7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnRpdGxlLWJhci1oZWFkZXIge1xuICBtYXJnaW46IDAgMCA1cHggMTBweDtcbn1cblxuLmZ1bGxwYWdlLWxvYWRpbmctc3Bpbm5lciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xuICB3aWR0aDogMTAwJTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5mdWxscGFnZS1sb2FkaW5nLXNwaW5uZXIgPiBtYXQtc3Bpbm5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5mdWxscGFnZS1sb2FkaW5nLXNwaW5uZXIgPiBidXR0b24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogNDBweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5uYXZiYXItYWN0aW9ucyB7XG4gIGZsb2F0OiByaWdodDtcbiAgcGFkZGluZzogOXB4IDA7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLm5hdmJhci1hY3Rpb25zID4gYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlNzJlNDtcbiAgY29sb3I6IHdoaXRlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/globals.service */ "./src/app/services/globals.service.ts");






let AppComponent = class AppComponent {
    constructor(translate, global, router, activatedRoute, dialog) {
        this.translate = translate;
        this.global = global;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.dialog = dialog;
        translate.addLangs(['mn', 'en']);
        translate.setDefaultLang('mn');
        translate.use('mn');
        const user = {
            token: this.activatedRoute.snapshot.queryParamMap.get('token'),
        };
        localStorage.setItem('currentUser', user);
    }
    loading() {
        return this.global.loading;
    }
    hideLoading() {
        this.global.loading = false;
    }
    goto(path) {
        this.router.navigateByUrl(path);
    }
};
AppComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_5__["GlobalsService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: HttpLoaderFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared.module */ "./src/app/shared.module.ts");
/* harmony import */ var _components_manage_users_manage_users_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/manage-users/manage-users.module */ "./src/app/components/manage-users/manage-users.module.ts");
/* harmony import */ var _components_studio_studio_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/studio/studio.module */ "./src/app/components/studio/studio.module.ts");
/* harmony import */ var _components_analytics_analytics_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/analytics/analytics.module */ "./src/app/components/analytics/analytics.module.ts");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular2-hotkeys */ "./node_modules/angular2-hotkeys/index.js");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(angular2_hotkeys__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_deploy_deploy_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/deploy/deploy.module */ "./src/app/components/deploy/deploy.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/fesm2015/ngx-translate-http-loader.js");
/* harmony import */ var _core_auth_guard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./core/auth.guard */ "./src/app/core/auth.guard.ts");
















function HttpLoaderFactory(httpClient) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_14__["TranslateHttpLoader"](httpClient);
}
const APP_ROUTES = [
    { path: '', children: _components_studio_studio_module__WEBPACK_IMPORTED_MODULE_7__["STUDIO_ROUTES"], canActivate: [_core_auth_guard__WEBPACK_IMPORTED_MODULE_15__["AuthGuard"]] },
    {
        path: 'manage-users',
        children: _components_manage_users_manage_users_module__WEBPACK_IMPORTED_MODULE_6__["MANAGE_USERS_ROUTES"],
    },
    {
        path: 'studio',
        children: _components_studio_studio_module__WEBPACK_IMPORTED_MODULE_7__["STUDIO_ROUTES"],
        canActivate: [_core_auth_guard__WEBPACK_IMPORTED_MODULE_15__["AuthGuard"]],
    },
    {
        path: 'deploy',
        children: _components_deploy_deploy_module__WEBPACK_IMPORTED_MODULE_10__["DEPLOY_ROUTES"],
    },
    {
        path: 'analytics',
        children: _components_analytics_analytics_module__WEBPACK_IMPORTED_MODULE_8__["ANALYTICS_ROUTES"],
    },
    // { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '' },
];
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"]],
        imports: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
            _shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
            _components_manage_users_manage_users_module__WEBPACK_IMPORTED_MODULE_6__["ManageUsersModule"],
            _components_studio_studio_module__WEBPACK_IMPORTED_MODULE_7__["StudioModule"],
            _components_analytics_analytics_module__WEBPACK_IMPORTED_MODULE_8__["AnalyticsModule"],
            _components_deploy_deploy_module__WEBPACK_IMPORTED_MODULE_10__["DeployModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(APP_ROUTES, {
                useHash: true,
            }),
            angular2_hotkeys__WEBPACK_IMPORTED_MODULE_9__["HotkeyModule"].forRoot({
                cheatSheetCloseEsc: true,
            }),
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateModule"].forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateLoader"],
                    useFactory: HttpLoaderFactory,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"]],
                },
            }),
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
    })
], AppModule);



/***/ }),

/***/ "./src/app/components/analytics/analytics-frame/analytics-frame.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/components/analytics/analytics-frame/analytics-frame.component.scss ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".intelligo-analytics-iframe {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  width: 100vw;\n  height: calc(100vh - 70px);\n  border: none;\n  top: 70px;\n}\n\n:host {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hbmFseXRpY3MvYW5hbHl0aWNzLWZyYW1lL0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcYW5hbHl0aWNzXFxhbmFseXRpY3MtZnJhbWVcXGFuYWx5dGljcy1mcmFtZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9hbmFseXRpY3MvYW5hbHl0aWNzLWZyYW1lL2FuYWx5dGljcy1mcmFtZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsMEJBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9hbmFseXRpY3MvYW5hbHl0aWNzLWZyYW1lL2FuYWx5dGljcy1mcmFtZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbnRlbGxpZ28tYW5hbHl0aWNzLWlmcmFtZSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA3MHB4KTtcbiAgYm9yZGVyOiBub25lO1xuICB0b3A6IDcwcHg7XG59XG5cbjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG4iLCIuaW50ZWxsaWdvLWFuYWx5dGljcy1pZnJhbWUge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNzBweCk7XG4gIGJvcmRlcjogbm9uZTtcbiAgdG9wOiA3MHB4O1xufVxuXG46aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/analytics/analytics-frame/analytics-frame.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/components/analytics/analytics-frame/analytics-frame.component.ts ***!
  \***********************************************************************************/
/*! exports provided: AnalyticsFrameComponent, CanActivateAnalyticsFrameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsFrameComponent", function() { return AnalyticsFrameComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanActivateAnalyticsFrameComponent", function() { return CanActivateAnalyticsFrameComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _shared_app_header_bar_app_header_bar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/app-header-bar/app-header-bar.component */ "./src/app/components/shared/app-header-bar/app-header-bar.component.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");









let AnalyticsFrameComponent = class AnalyticsFrameComponent {
    constructor(sanitizer, globals, router, infoDialog, route) {
        this.sanitizer = sanitizer;
        this.globals = globals;
        this.router = router;
        this.infoDialog = infoDialog;
        this.route = route;
        this.iframeUrl = "";
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
        console.log('AnalyticsFrameComponent');
        this.route.queryParams.subscribe(x => {
            console.log('Params of analytics frame');
            console.log(x);
            if (x['apiBase'] && x['businessId'] && x['businessName'] && x['chatFlowId']) {
                let initialUrl = `/index.html#/?apiBase=${encodeURIComponent(x['apiBase'])}&businessId=${x['businessId']}&businessName=${encodeURIComponent(x['businessName'])}&chatFlowId=${x['chatFlowId']}`;
                let url = "analytics-dashboard" + initialUrl;
                if (_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].local)
                    url = "http://localhost:4202" + initialUrl;
                console.log('Analytics Frame Url');
                console.log(url);
                this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
        });
    }
    ngAfterViewInit() {
        if (this.appHeader) {
            this.appHeader.goBack = () => {
                this.infoDialog.confirm('Go back to home page?', 'Are you sure you want to exit from analytics and go back to home page?', (ok) => {
                    if (ok) {
                        this.router.navigateByUrl('');
                    }
                });
            };
        }
    }
    ngOnInit() {
    }
};
AnalyticsFrameComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_3__["GlobalsService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_8__["InfoDialogService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_app_header_bar_app_header_bar_component__WEBPACK_IMPORTED_MODULE_7__["AppHeaderBarComponent"], { static: false })
], AnalyticsFrameComponent.prototype, "appHeader", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('analyticsFrame', { static: false })
], AnalyticsFrameComponent.prototype, "analyticsFrame", void 0);
AnalyticsFrameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-analytics-frame',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./analytics-frame.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/analytics/analytics-frame/analytics-frame.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./analytics-frame.component.scss */ "./src/app/components/analytics/analytics-frame/analytics-frame.component.scss")).default]
    })
], AnalyticsFrameComponent);

let CanActivateAnalyticsFrameComponent = class CanActivateAnalyticsFrameComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    canActivate(route, state) {
        return true; //this.dataService.isSuperAdmin()
    }
};
CanActivateAnalyticsFrameComponent.ctorParameters = () => [
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] }
];
CanActivateAnalyticsFrameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], CanActivateAnalyticsFrameComponent);



/***/ }),

/***/ "./src/app/components/analytics/analytics.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/analytics/analytics.module.ts ***!
  \**********************************************************/
/*! exports provided: ANALYTICS_ROUTES, AnalyticsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANALYTICS_ROUTES", function() { return ANALYTICS_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsModule", function() { return AnalyticsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");
/* harmony import */ var _analytics_frame_analytics_frame_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./analytics-frame/analytics-frame.component */ "./src/app/components/analytics/analytics-frame/analytics-frame.component.ts");




const ANALYTICS_ROUTES = [
    {
        path: "",
        component: _analytics_frame_analytics_frame_component__WEBPACK_IMPORTED_MODULE_3__["AnalyticsFrameComponent"]
    }
];
let AnalyticsModule = class AnalyticsModule {
};
AnalyticsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _analytics_frame_analytics_frame_component__WEBPACK_IMPORTED_MODULE_3__["AnalyticsFrameComponent"]
        ],
        imports: [
            _shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]
        ]
    })
], AnalyticsModule);



/***/ }),

/***/ "./src/app/components/deploy/deploy.module.ts":
/*!****************************************************!*\
  !*** ./src/app/components/deploy/deploy.module.ts ***!
  \****************************************************/
/*! exports provided: DEPLOY_ROUTES, DeployModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEPLOY_ROUTES", function() { return DEPLOY_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeployModule", function() { return DeployModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");
/* harmony import */ var _landing_deploy_landing_deploy_landing_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./landing/deploy-landing/deploy-landing.component */ "./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.ts");




const DEPLOY_ROUTES = [
    {
        path: "",
        component: _landing_deploy_landing_deploy_landing_component__WEBPACK_IMPORTED_MODULE_3__["DeployLandingComponent"]
    }
];
let DeployModule = class DeployModule {
};
DeployModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _landing_deploy_landing_deploy_landing_component__WEBPACK_IMPORTED_MODULE_3__["DeployLandingComponent"]
        ],
        entryComponents: [],
        imports: [
            _shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]
        ],
        schemas: [],
    })
], DeployModule);



/***/ }),

/***/ "./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.scss ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n}\n\nmat-form-field,\nmat-select {\n  width: 100%;\n}\n\n.bottom-actions > button {\n  margin: 20px 10px;\n}\n\nbutton[color=primary] {\n  color: white;\n}\n\nmat-action-row > button {\n  margin: 10px;\n}\n\n.bottom-actions {\n  display: block;\n  text-align: center;\n}\n\n.list-action-btn {\n  float: right;\n}\n\n.list-item {\n  width: 100%;\n}\n\n.mat-expansion-panel-body {\n  display: none !important;\n}\n\n.app-content {\n  width: 80%;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 0;\n  padding-bottom: 40px;\n}\n\n.page-title {\n  display: flex;\n  flex-direction: row;\n}\n\n.page-title .text {\n  flex-grow: 1;\n}\n\n.page-title-actions button:first-child {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n.table-body {\n  padding: 10px 0;\n}\n\nsection.control {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n\n.radio-grp {\n  margin-top: 0 !important;\n  margin-bottom: 20px !important;\n}\n\n.left-header {\n  margin-bottom: 19px;\n  margin-top: 19px;\n  margin-left: -2px;\n}\n\nlabel {\n  font-weight: normal;\n  font-size: small;\n  opacity: 0.9;\n}\n\n.highlight-container {\n  margin-bottom: 10px;\n}\n\n.highlight {\n  border-radius: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9kZXBsb3kvbGFuZGluZy9kZXBsb3ktbGFuZGluZy9EOlxcbGVhcm5pbmctcHJvamVjdHNcXGNoYXRib3RzLm1uXFxzdHVkaW8vc3JjXFxhcHBcXGNvbXBvbmVudHNcXGRlcGxveVxcbGFuZGluZ1xcZGVwbG95LWxhbmRpbmdcXGRlcGxveS1sYW5kaW5nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2RlcGxveS9sYW5kaW5nL2RlcGxveS1sYW5kaW5nL2RlcGxveS1sYW5kaW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtBQ0NGOztBREVBOztFQUVFLFdBQUE7QUNDRjs7QURFQTtFQUNFLGlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7QUNDRjs7QURFQTtFQUNFLHdCQUFBO0FDQ0Y7O0FERUE7RUFDRSxVQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtBQ0NGOztBREVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FERUE7RUFDRSx3QkFBQTtFQUNBLDhCQUFBO0FDQ0Y7O0FERUE7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUNDRjs7QURFQTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxtQkFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGVwbG95L2xhbmRpbmcvZGVwbG95LWxhbmRpbmcvZGVwbG95LWxhbmRpbmcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5tYXQtZm9ybS1maWVsZCxcbm1hdC1zZWxlY3Qge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmJvdHRvbS1hY3Rpb25zPmJ1dHRvbiB7XG4gIG1hcmdpbjogMjBweCAxMHB4O1xufVxuXG5idXR0b25bY29sb3I9XCJwcmltYXJ5XCJdIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5tYXQtYWN0aW9uLXJvdz5idXR0b24ge1xuICBtYXJnaW46IDEwcHg7XG59XG5cbi5ib3R0b20tYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5saXN0LWFjdGlvbi1idG4ge1xuICBmbG9hdDogcmlnaHQ7XG59XG5cbi5saXN0LWl0ZW0ge1xuICB3aWR0aDogMTAwJVxufVxuXG4ubWF0LWV4cGFuc2lvbi1wYW5lbC1ib2R5IHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uYXBwLWNvbnRlbnQge1xuICB3aWR0aDogODAlO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiAwO1xuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcbn1cblxuLnBhZ2UtdGl0bGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4ucGFnZS10aXRsZSAudGV4dCB7XG4gIGZsZXgtZ3JvdzogMTtcbn1cblxuLnBhZ2UtdGl0bGUtYWN0aW9ucyBidXR0b246Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4udGFibGUtYm9keSB7XG4gIHBhZGRpbmc6IDEwcHggMDtcbn1cblxuc2VjdGlvbi5jb250cm9sIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuLnJhZGlvLWdycCB7XG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ubGVmdC1oZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiAxOXB4O1xuICBtYXJnaW4tdG9wOiAxOXB4O1xuICBtYXJnaW4tbGVmdDogLTJweDtcbn1cblxubGFiZWwge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IHNtYWxsO1xuICBvcGFjaXR5OiAwLjk7XG59XG5cbi5oaWdobGlnaHQtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmhpZ2hsaWdodCB7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1hdC1mb3JtLWZpZWxkLFxubWF0LXNlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYm90dG9tLWFjdGlvbnMgPiBidXR0b24ge1xuICBtYXJnaW46IDIwcHggMTBweDtcbn1cblxuYnV0dG9uW2NvbG9yPXByaW1hcnldIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5tYXQtYWN0aW9uLXJvdyA+IGJ1dHRvbiB7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmJvdHRvbS1hY3Rpb25zIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmxpc3QtYWN0aW9uLWJ0biB7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmxpc3QtaXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ubWF0LWV4cGFuc2lvbi1wYW5lbC1ib2R5IHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uYXBwLWNvbnRlbnQge1xuICB3aWR0aDogODAlO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiAwO1xuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcbn1cblxuLnBhZ2UtdGl0bGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4ucGFnZS10aXRsZSAudGV4dCB7XG4gIGZsZXgtZ3JvdzogMTtcbn1cblxuLnBhZ2UtdGl0bGUtYWN0aW9ucyBidXR0b246Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4udGFibGUtYm9keSB7XG4gIHBhZGRpbmc6IDEwcHggMDtcbn1cblxuc2VjdGlvbi5jb250cm9sIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuLnJhZGlvLWdycCB7XG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ubGVmdC1oZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiAxOXB4O1xuICBtYXJnaW4tdG9wOiAxOXB4O1xuICBtYXJnaW4tbGVmdDogLTJweDtcbn1cblxubGFiZWwge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IHNtYWxsO1xuICBvcGFjaXR5OiAwLjk7XG59XG5cbi5oaWdobGlnaHQtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmhpZ2hsaWdodCB7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.ts ***!
  \**************************************************************************************/
/*! exports provided: DeployLandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeployLandingComponent", function() { return DeployLandingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ts-md5/dist/md5 */ "./node_modules/ts-md5/dist/md5.js");
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/data.service */ "./src/app/services/data.service.ts");






let DeployLandingComponent = class DeployLandingComponent {
    constructor(el, snakbar, route, dataService) {
        this.el = el;
        this.snakbar = snakbar;
        this.route = route;
        this.dataService = dataService;
        this.webOptions = {
            accentColor: 'red',
            allowChatReset: true,
            autoOpenSecs: 0,
            businessId: '',
            flowId: '',
            desc: '',
            enableHtmlMessages: true,
            foregroundColor: 'white',
            secondaryColor: 'black',
            gmapsKey: '',
            height: '70%',
            width: '360px',
            isFullPage: false,
            logoUrl: 'https://www.chatbots.mn/favicon.ico',
            showPoweredByAna: false,
            title: 'Chatbots.mn chatbot',
            websdkUrl: '',
            webSocketsUrl: '',
        };
        this.count = 0;
        this.route.queryParams.subscribe(x => {
            if (x && x['businessId']) {
                this.webOptions.businessId = x['businessId'];
            }
            if (x && x['chatFlowId']) {
                this.webOptions.flowId = x['chatFlowId'];
            }
            if (this.webOptions.businessId && this.webOptions.flowId) {
                this.loadSavedOptions();
            }
        });
    }
    ngOnInit() {
    }
    open(url) {
        // if (this.electron.isElectronApp) {
        // 	this.electron.shell.openExternal(url);
        // } else {
        // 	window.open(url, '_blank');
        // }
    }
    // openElectronWindow(url: string) {
    // 	if (!this.electron.isElectronApp) {
    // 		window.open(url);
    // 		return;
    // 	}
    // 	let win = new this.electron.remote.BrowserWindow();
    // 	win.on('closed', () => {
    // 		win = null
    // 	});
    // 	win.loadURL(url);
    // }
    copied() {
        this.snakbar.open("Code copied", "dismiss", {
            duration: 1500
        });
    }
    loadSavedOptions() {
        let key = ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_4__["Md5"].hashStr(`${JSON.stringify(this.dataService.chatServer.ServerUrl)}|${this.webOptions.businessId}|${this.webOptions.flowId}`);
        let savedVal = localStorage.getItem(key);
        if (savedVal) {
            this.webOptions = JSON.parse(savedVal);
        }
    }
    saveOptions() {
        let key = ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_4__["Md5"].hashStr(`${JSON.stringify(this.dataService.chatServer.ServerUrl)}|${this.webOptions.businessId}|${this.webOptions.flowId}`);
        localStorage.setItem(key, JSON.stringify(this.webOptions));
    }
    n(v) {
        return (v ? v : '');
    }
    preview() {
        let src = `<!DOCTYPE html>
<html>
<head>
	<title>Chatbots.mn web chat preview</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${this.webSnippet}
</body>
</html>`;
        var url = "data:text/html;base64," + btoa(src);
        // this.openElectronWindow(url);
    }
    get webSnippet() {
        try {
            let newVal = JSON.stringify(this.webOptions);
            if (!this._oldVal || this._oldVal != newVal) {
                setTimeout(() => {
                    this.saveOptions();
                }, 0);
                this._oldVal = newVal;
            }
        }
        catch (e) { }
        return `<script type="text/javascript" id="ana-web-chat-script"

src="${this.n(this.webOptions.websdkUrl)}assets/embed/ana-web-chat-plugin.js" 
ana-api-endpoint="${this.n(this.dataService.chatServer).ServerUrl}"
ana-endpoint="${this.n(this.webOptions.webSocketsUrl)}/wscustomers/chatcustomers-websocket"
ana-iframe-src="${this.n(this.webOptions.websdkUrl)}index.html"
ana-businessid="${this.n(this.webOptions.businessId)}"
ana-flowid="${this.n(this.webOptions.flowId)}"

ana-logo-url="${this.n(this.webOptions.logoUrl)}"
ana-primary-bg="${this.n(this.webOptions.accentColor)}"
ana-agent-name="${this.n(this.webOptions.title)}"
ana-agent-desc="${this.n(this.webOptions.desc)}"
ana-frame-height="${this.n(this.webOptions.height)}"
ana-frame-width="${this.n(this.webOptions.width)}"

ana-primary-fg="${this.n(this.webOptions.foregroundColor)}"
ana-secondary-bg="${this.n(this.webOptions.secondaryColor)}"
ana-gmaps-key="${this.n(this.webOptions.gmapsKey)}"

${this.webOptions.isFullPage ? '\nana-fullpage="true"' : ''} ${this.webOptions.allowChatReset ? '\nana-allow-chat-reset="true"' : ''} ${this.webOptions.enableHtmlMessages ? '\nana-html-messages="true"' : ''} ${this.webOptions.showPoweredByAna ? '\nana-show-branding="true"' : ''} ${this.webOptions.autoOpenSecs ? '\nana-auto-open="' + this.webOptions.autoOpenSecs + '"' : ''}>
</script>`;
    }
};
DeployLandingComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] }
];
DeployLandingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-deploy-landing',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./deploy-landing.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./deploy-landing.component.scss */ "./src/app/components/deploy/landing/deploy-landing/deploy-landing.component.scss")).default]
    })
], DeployLandingComponent);



/***/ }),

/***/ "./src/app/components/home/home.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/components/home/home.component.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".button-row {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n}\n\n.container {\n  padding: 30px;\n  width: 100vw;\n}\n\n.button-row > .mat-raised-button {\n  margin-left: 10px;\n  margin-right: 10px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  height: 180px;\n  width: 200px;\n  font-size: 18px;\n}\n\n.btn-studio svg {\n  width: 84px;\n  height: 84px;\n  margin-left: 4px;\n}\n\n.btn-user-management svg {\n  width: 84px;\n  height: 84px;\n  margin-left: 4px;\n}\n\n.feature-button {\n  color: #5e72e4 !important;\n  background-color: white !important;\n}\n\n.feature-button svg path {\n  fill: #5e72e4 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcaG9tZVxcaG9tZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UseUJBQUE7RUFDQSxrQ0FBQTtBQ0NGOztBREVBO0VBQ0Usd0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ1dHRvbi1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jb250YWluZXIge1xuICBwYWRkaW5nOiAzMHB4O1xuICB3aWR0aDogMTAwdnc7XG59XG5cbi5idXR0b24tcm93Pi5tYXQtcmFpc2VkLWJ1dHRvbiB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGhlaWdodDogMTgwcHg7XG4gIHdpZHRoOiAyMDBweDtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4uYnRuLXN0dWRpbyBzdmcge1xuICB3aWR0aDogODRweDtcbiAgaGVpZ2h0OiA4NHB4O1xuICBtYXJnaW4tbGVmdDogNHB4O1xufVxuXG4uYnRuLXVzZXItbWFuYWdlbWVudCBzdmcge1xuICB3aWR0aDogODRweDtcbiAgaGVpZ2h0OiA4NHB4O1xuICBtYXJnaW4tbGVmdDogNHB4O1xufVxuXG4uZmVhdHVyZS1idXR0b24ge1xuICBjb2xvcjogIzVlNzJlNCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG4uZmVhdHVyZS1idXR0b24gc3ZnIHBhdGgge1xuICBmaWxsOiAjNWU3MmU0ICFpbXBvcnRhbnQ7XG59XG4iLCIuYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIHdpZHRoOiAxMDB2dztcbn1cblxuLmJ1dHRvbi1yb3cgPiAubWF0LXJhaXNlZC1idXR0b24ge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBoZWlnaHQ6IDE4MHB4O1xuICB3aWR0aDogMjAwcHg7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmJ0bi1zdHVkaW8gc3ZnIHtcbiAgd2lkdGg6IDg0cHg7XG4gIGhlaWdodDogODRweDtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbn1cblxuLmJ0bi11c2VyLW1hbmFnZW1lbnQgc3ZnIHtcbiAgd2lkdGg6IDg0cHg7XG4gIGhlaWdodDogODRweDtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbn1cblxuLmZlYXR1cmUtYnV0dG9uIHtcbiAgY29sb3I6ICM1ZTcyZTQgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLmZlYXR1cmUtYnV0dG9uIHN2ZyBwYXRoIHtcbiAgZmlsbDogIzVlNzJlNCAhaW1wb3J0YW50O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/login.service */ "./src/app/services/login.service.ts");
/* harmony import */ var _shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/business-picker/business-picker.component */ "./src/app/components/shared/business-picker/business-picker.component.ts");








let HomeComponent = class HomeComponent {
    constructor(router, loginService, infoDialog, dialog, dataService) {
        this.router = router;
        this.loginService = loginService;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.dataService = dataService;
    }
    studio() {
        this.router.navigateByUrl('/studio');
    }
    userManagement() {
        this.loginService.performLogin(true, "/", true, (done) => {
            if (!done) {
                this.infoDialog.alert("Login Required", "You must be logged in to your Chatbots.mn chat server to manage users");
                return;
            }
            if (this.dataService.loggedInUser) {
                if (this.dataService.isSuperAdmin()) {
                    this.router.navigateByUrl('/manage-users');
                }
                else if (this.dataService.isBizAdmin() && this.dataService.loggedInUser.businessId) {
                    this.router.navigateByUrl('/manage-users/users?bizId=' + this.dataService.loggedInUser.businessId);
                }
                else {
                    this.infoDialog.alert("Unauthorized!", "Only a super admin or a business admin can login into user management");
                }
            }
        });
    }
    analytics() {
        this.loginService.performLogin(true, null, true, (done) => {
            if (!done) {
                this.infoDialog.alert("Login Required", "You must be logged in to your Chatbots.mn chat server to view analytics");
                return;
            }
            if (this.dataService.loggedInUser) {
                if (this.dataService.isSuperAdmin()) {
                    this.openAnalyticsPicker({ askFlowId: true });
                }
                else if ((this.dataService.isBizAdmin() || this.dataService.isFlowManager()) && this.dataService.loggedInUser.businessId) {
                    this.openAnalyticsPicker({
                        askFlowId: true,
                        businessId: this.dataService.loggedInUser.businessId
                    });
                }
                else {
                    this.infoDialog.alert("Unauthorized!", "Only a super admin, a business admin or a flow manager can login into user management");
                }
            }
        });
    }
    deploy() {
        this.loginService.performLogin(true, null, true, (done) => {
            if (!done) {
                this.infoDialog.alert("Login Required", "You must be logged in to your Chatbots.mn chat server to deploy your chatbot");
                return;
            }
            if (this.dataService.loggedInUser) {
                if (this.dataService.isSuperAdmin()) {
                    this.openDeployPage({ askFlowId: true });
                }
                else if ((this.dataService.isBizAdmin() || this.dataService.isFlowManager()) && this.dataService.loggedInUser.businessId) {
                    this.openDeployPage({
                        askFlowId: true,
                        businessId: this.dataService.loggedInUser.businessId
                    });
                }
                else {
                    this.infoDialog.alert("Unauthorized!", "Only a super admin, a business admin or a flow manager can login into user management");
                }
            }
        });
    }
    openAnalyticsPicker(params) {
        let d = this.dialog.open(_shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_7__["BusinessPickerComponent"], {
            width: '30%',
            data: params
        });
        d.afterClosed().subscribe((x) => {
            if (x && x.bizAccount && x.chatProj) {
                this.infoDialog.prompt("Analytics Server Url", "Please enter the analytics server url", (result) => {
                    if (result) {
                        localStorage.setItem('analyticsApiBase', result);
                        let url = `/analytics?apiBase=${result}&businessId=${x.bizAccount.id}&businessName=${x.bizAccount.name}&chatFlowId=${x.chatProj.id}`;
                        this.router.navigateByUrl(url);
                    }
                }, localStorage.getItem('analyticsApiBase'));
            }
        });
    }
    openDeployPage(params) {
        let d = this.dialog.open(_shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_7__["BusinessPickerComponent"], {
            width: '30%',
            data: params
        });
        d.afterClosed().subscribe((x) => {
            if (x && x.bizAccount && x.chatProj) {
                let url = `/deploy?businessId=${x.bizAccount.id}&chatFlowId=${x.chatProj.id}`;
                this.router.navigateByUrl(url);
            }
        });
    }
};
HomeComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _services_login_service__WEBPACK_IMPORTED_MODULE_6__["LoginService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"] }
];
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/home/home.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.component.scss */ "./src/app/components/home/home.component.scss")).default]
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/components/manage-users/biz-accounts/biz-accounts.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/components/manage-users/biz-accounts/biz-accounts.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".ana-pagination {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n}\n\n.ana-pagination .info {\n  flex-grow: 1;\n  line-height: 40px;\n}\n\n:host {\n  width: 100%;\n}\n\n.app-content {\n  padding-left: 15px;\n  padding-right: 15px;\n  width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.list-item {\n  background-color: white;\n}\n\n.list-item-text {\n  width: 100%;\n}\n\n.list-item-buttons {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.app-content-header {\n  display: flex;\n  flex-direction: row;\n  margin: 11px 0;\n}\n\n.app-content-header-text {\n  flex-grow: 1;\n  margin-top: 14px;\n}\n\n.list-item-hint {\n  font-size: 13px;\n  opacity: 0.5;\n  font-style: italic;\n}\n\nmat-list-item {\n  margin-bottom: 10px;\n}\n\n.search-text {\n  margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9tYW5hZ2UtdXNlcnMvYml6LWFjY291bnRzL0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcbWFuYWdlLXVzZXJzXFxiaXotYWNjb3VudHNcXGJpei1hY2NvdW50cy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9tYW5hZ2UtdXNlcnMvYml6LWFjY291bnRzL2Jpei1hY2NvdW50cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFSTtFQUNJLFlBQUE7RUFDQSxpQkFBQTtBQ0NSOztBREVBO0VBQ0ksV0FBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSx1QkFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUdBLG1CQUFBO0VBQ0EsOEJBQUE7QUNDSjs7QURFQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL21hbmFnZS11c2Vycy9iaXotYWNjb3VudHMvYml6LWFjY291bnRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFuYS1wYWdpbmF0aW9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbiAgICAuYW5hLXBhZ2luYXRpb24gLmluZm8ge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICAgIH1cblxuOmhvc3Qge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4uYXBwLWNvbnRlbnQge1xuICAgIHBhZGRpbmctbGVmdDogMTVweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICAgIHdpZHRoOiA2MDBweDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG59XG5cbi5saXN0LWl0ZW0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4ubGlzdC1pdGVtLXRleHQge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4ubGlzdC1pdGVtLWJ1dHRvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uYXBwLWNvbnRlbnQtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgbWFyZ2luOiAxMXB4IDA7XG59XG5cbi5hcHAtY29udGVudC1oZWFkZXItdGV4dCB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIG1hcmdpbi10b3A6IDE0cHg7XG59XG5cbi5saXN0LWl0ZW0taGludCB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWNcbn1cblxubWF0LWxpc3QtaXRlbSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnNlYXJjaC10ZXh0IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG4iLCIuYW5hLXBhZ2luYXRpb24ge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cblxuLmFuYS1wYWdpbmF0aW9uIC5pbmZvIHtcbiAgZmxleC1ncm93OiAxO1xuICBsaW5lLWhlaWdodDogNDBweDtcbn1cblxuOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmFwcC1jb250ZW50IHtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICB3aWR0aDogNjAwcHg7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG59XG5cbi5saXN0LWl0ZW0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLmxpc3QtaXRlbS10ZXh0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5saXN0LWl0ZW0tYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLmFwcC1jb250ZW50LWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG1hcmdpbjogMTFweCAwO1xufVxuXG4uYXBwLWNvbnRlbnQtaGVhZGVyLXRleHQge1xuICBmbGV4LWdyb3c6IDE7XG4gIG1hcmdpbi10b3A6IDE0cHg7XG59XG5cbi5saXN0LWl0ZW0taGludCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgb3BhY2l0eTogMC41O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbm1hdC1saXN0LWl0ZW0ge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uc2VhcmNoLXRleHQge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/components/manage-users/biz-accounts/biz-accounts.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/manage-users/biz-accounts/biz-accounts.component.ts ***!
  \********************************************************************************/
/*! exports provided: BizAccountsComponent, CanActivateBizAccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BizAccountsComponent", function() { return BizAccountsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanActivateBizAccountComponent", function() { return CanActivateBizAccountComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _models_data_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../models/data.models */ "./src/app/models/data.models.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _shared_edit_business_account_edit_business_account_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/edit-business-account/edit-business-account.component */ "./src/app/components/shared/edit-business-account/edit-business-account.component.ts");








let BizAccountsComponent = class BizAccountsComponent {
    constructor(dataService, dialog, router, infoDialog) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.router = router;
        this.infoDialog = infoDialog;
        this.page = 0;
        this.totalPages = 0;
        this.search = "";
        this.BusinessAccountStatus = _models_data_models__WEBPACK_IMPORTED_MODULE_4__["BusinessAccountStatus"];
    }
    ngAfterViewInit() {
        this.appHeader.afterInit = () => {
            this.loadAccounts();
        };
    }
    prevPage() {
        if (this.page > 0) {
            this.page--;
            this.loadAccounts();
        }
    }
    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
            this.loadAccounts();
        }
    }
    searchStart() {
        this.page = 0;
        this.loadAccounts();
    }
    loadAccounts() {
        this.infoDialog.showSpinner();
        this.dataService.getBusinessAccounts(this.search, this.page).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.accounts = x.data.content;
                this.totalPages = x.data.totalPages;
            }
            else
                this.dataService.handleTypedError(x.error, "Unable to load business accounts", "Something went wrong while loading business accounts. Please try again.");
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to load business accounts", "Something went wrong while loading business accounts. Please try again.");
        });
    }
    manageUsers(account) {
        this.router.navigateByUrl(`/manage-users/users?bizId=${account.id}`);
    }
    editBusinessAccount(data) {
        let d = this.dialog.open(_shared_edit_business_account_edit_business_account_component__WEBPACK_IMPORTED_MODULE_7__["EditBusinessAccountComponent"], {
            width: '40%',
            data: data
        });
        d.afterClosed().subscribe(x => {
            if (x == true) {
                this.loadAccounts();
            }
        });
    }
    updateBusinessAccountStatus(account, status) {
        let work = (status == _models_data_models__WEBPACK_IMPORTED_MODULE_4__["BusinessAccountStatus"].ACTIVE ? "activate" : "deactivate");
        this.infoDialog.confirm("Confirmation", `Are you sure you want to ${work} the business account?`, (ok) => {
            if (ok) {
                this.infoDialog.showSpinner();
                this.dataService.updateBusinessAccountStatus(account, status).subscribe(x => {
                    this.infoDialog.hideSpinner();
                    if (x.success) {
                        this.infoDialog.alert("Done", "Business account status updated");
                        this.loadAccounts();
                    }
                    else {
                        this.dataService.handleTypedError(x.error, "Unable to update business account status", "Something went wrong while updating the business account. Please try again.");
                    }
                }, err => {
                    this.infoDialog.hideSpinner();
                    this.dataService.handleError(err, "Unable to update business account status", "Something went wrong while updating the business account. Please try again.");
                });
            }
        });
    }
};
BizAccountsComponent.ctorParameters = () => [
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_6__["InfoDialogService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('appHeader', { static: false })
], BizAccountsComponent.prototype, "appHeader", void 0);
BizAccountsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-biz-accounts',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./biz-accounts.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/manage-users/biz-accounts/biz-accounts.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./biz-accounts.component.scss */ "./src/app/components/manage-users/biz-accounts/biz-accounts.component.scss")).default]
    })
], BizAccountsComponent);

let CanActivateBizAccountComponent = class CanActivateBizAccountComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    canActivate(route, state) {
        return this.dataService.isSuperAdmin();
    }
};
CanActivateBizAccountComponent.ctorParameters = () => [
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] }
];
CanActivateBizAccountComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], CanActivateBizAccountComponent);



/***/ }),

/***/ "./src/app/components/manage-users/manage-users.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/components/manage-users/manage-users.module.ts ***!
  \****************************************************************/
/*! exports provided: MANAGE_USERS_ROUTES, ManageUsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MANAGE_USERS_ROUTES", function() { return MANAGE_USERS_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageUsersModule", function() { return ManageUsersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");
/* harmony import */ var _biz_accounts_biz_accounts_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./biz-accounts/biz-accounts.component */ "./src/app/components/manage-users/biz-accounts/biz-accounts.component.ts");
/* harmony import */ var _users_users_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users/users.component */ "./src/app/components/manage-users/users/users.component.ts");





const MANAGE_USERS_ROUTES = [
    {
        path: "",
        component: _biz_accounts_biz_accounts_component__WEBPACK_IMPORTED_MODULE_3__["BizAccountsComponent"],
        canActivate: [_biz_accounts_biz_accounts_component__WEBPACK_IMPORTED_MODULE_3__["CanActivateBizAccountComponent"]]
    },
    {
        path: "users",
        component: _users_users_component__WEBPACK_IMPORTED_MODULE_4__["UsersComponent"]
    }
];
let ManageUsersModule = class ManageUsersModule {
};
ManageUsersModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _biz_accounts_biz_accounts_component__WEBPACK_IMPORTED_MODULE_3__["BizAccountsComponent"],
            _users_users_component__WEBPACK_IMPORTED_MODULE_4__["UsersComponent"]
        ],
        imports: [
            _shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]
        ],
        providers: [
            _biz_accounts_biz_accounts_component__WEBPACK_IMPORTED_MODULE_3__["CanActivateBizAccountComponent"]
        ]
    })
], ManageUsersModule);



/***/ }),

/***/ "./src/app/components/manage-users/users/users.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/components/manage-users/users/users.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".ana-pagination {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n}\n\n.ana-pagination .info {\n  flex-grow: 1;\n  line-height: 40px;\n}\n\n:host {\n  width: 100%;\n}\n\n.app-content {\n  padding-left: 15px;\n  padding-right: 15px;\n  width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.list-item {\n  background-color: white;\n}\n\n.list-item-text {\n  width: 100%;\n}\n\n.app-content-header {\n  display: flex;\n  flex-direction: row;\n  margin: 11px 0;\n}\n\n.app-content-header-text {\n  flex-grow: 1;\n  margin-top: 14px;\n}\n\n.list-item-hint {\n  font-size: 13px;\n  opacity: 0.5;\n  font-style: italic;\n}\n\nmat-list-item {\n  margin-bottom: 10px;\n}\n\n.search-text {\n  margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9tYW5hZ2UtdXNlcnMvdXNlcnMvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxtYW5hZ2UtdXNlcnNcXHVzZXJzXFx1c2Vycy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9tYW5hZ2UtdXNlcnMvdXNlcnMvdXNlcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FDQ0o7O0FERUk7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7QUNDUjs7QURFQTtFQUNJLFdBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksdUJBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7QUNDSjs7QURFQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL21hbmFnZS11c2Vycy91c2Vycy91c2Vycy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hbmEtcGFnaW5hdGlvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4gICAgLmFuYS1wYWdpbmF0aW9uIC5pbmZvIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcbiAgICB9XG5cbjpob3N0IHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmFwcC1jb250ZW50IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gICAgcGFkZGluZy1yaWdodDogMTVweDtcbiAgICB3aWR0aDogNjAwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xufVxuXG4ubGlzdC1pdGVtIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLmxpc3QtaXRlbS10ZXh0IHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmFwcC1jb250ZW50LWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIG1hcmdpbjogMTFweCAwO1xufVxuXG4uYXBwLWNvbnRlbnQtaGVhZGVyLXRleHQge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBtYXJnaW4tdG9wOiAxNHB4O1xufVxuXG4ubGlzdC1pdGVtLWhpbnQge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgZm9udC1zdHlsZTogaXRhbGljXG59XG5cbm1hdC1saXN0LWl0ZW0ge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG4uc2VhcmNoLXRleHQge1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbn0iLCIuYW5hLXBhZ2luYXRpb24ge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cblxuLmFuYS1wYWdpbmF0aW9uIC5pbmZvIHtcbiAgZmxleC1ncm93OiAxO1xuICBsaW5lLWhlaWdodDogNDBweDtcbn1cblxuOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmFwcC1jb250ZW50IHtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICB3aWR0aDogNjAwcHg7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG59XG5cbi5saXN0LWl0ZW0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLmxpc3QtaXRlbS10ZXh0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5hcHAtY29udGVudC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBtYXJnaW46IDExcHggMDtcbn1cblxuLmFwcC1jb250ZW50LWhlYWRlci10ZXh0IHtcbiAgZmxleC1ncm93OiAxO1xuICBtYXJnaW4tdG9wOiAxNHB4O1xufVxuXG4ubGlzdC1pdGVtLWhpbnQge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG9wYWNpdHk6IDAuNTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuXG5tYXQtbGlzdC1pdGVtIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnNlYXJjaC10ZXh0IHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/manage-users/users/users.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/components/manage-users/users/users.component.ts ***!
  \******************************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _shared_app_header_bar_app_header_bar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/app-header-bar/app-header-bar.component */ "./src/app/components/shared/app-header-bar/app-header-bar.component.ts");
/* harmony import */ var _shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/create-user/create-user.component */ "./src/app/components/shared/create-user/create-user.component.ts");
/* harmony import */ var _shared_update_password_update_password_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/update-password/update-password.component */ "./src/app/components/shared/update-password/update-password.component.ts");









let UsersComponent = class UsersComponent {
    constructor(route, router, infoDialog, dialog, dataService) {
        this.route = route;
        this.router = router;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.dataService = dataService;
        this.search = "";
        this.users = [];
        this.page = 0;
        this.totalPages = 0;
    }
    ngAfterViewInit() {
        this.appHeader.afterInit = () => {
            this.route.queryParamMap.subscribe(x => {
                let bizId = x.get('bizId');
                if (bizId) {
                    this.bizId = bizId;
                    this.loadUsers();
                    this.loadBusinessDetails();
                }
            });
        };
        this.appHeader.goBack = () => {
            if (this.dataService.isSuperAdmin()) {
                this.router.navigateByUrl('/manage-users');
            }
            else {
                this.router.navigateByUrl('/');
            }
        };
    }
    ngOnInit() {
    }
    searchStart() {
        this.page = 0;
        this.loadUsers();
    }
    loadBusinessDetails() {
        this.infoDialog.showSpinner();
        this.dataService.getBusinessDetails(this.bizId).subscribe(x => {
            this.infoDialog.hideSpinner();
            this.businessAccount = x.data;
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to load business details", "Something went wrong while trying to load business account details. Please try again.");
        });
    }
    createUserDialog() {
        let d = this.dialog.open(_shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_7__["CreateUserComponent"], {
            width: '60%',
            data: {
                bizId: this.bizId,
                mode: _shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_7__["UserDialogMode"].Create,
            }
        });
        d.afterClosed().subscribe(x => {
            if (x == true)
                this.loadUsers();
        });
    }
    prevPage() {
        if (this.page > 0) {
            this.page--;
            this.loadUsers();
        }
    }
    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
            this.loadUsers();
        }
    }
    view(user) {
        this.dialog.open(_shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_7__["CreateUserComponent"], {
            width: '60%',
            data: {
                mode: _shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_7__["UserDialogMode"].View,
                user: user
            }
        });
    }
    loadUsers() {
        if (this.bizId) {
            this.infoDialog.showSpinner();
            this.dataService.getUsers(this.bizId, this.search, this.page).subscribe(x => {
                this.infoDialog.hideSpinner();
                //if (x.success) {
                this.users = x.content; //.filter(x => x.roles && x.roles.length > 0);
                this.totalPages = x.totalPages;
                //} else {
                //	debugger;
                //	this.dataService.handleTypedError(x.error, "Unable to load users", "Something went wrong while loading the users. Please try again.");
                //}
            }, err => {
                this.infoDialog.hideSpinner();
                this.dataService.handleError(err, "Unable to load users", "Something went wrong while loading the users. Please try again.");
            });
        }
    }
    updateUserPassword(user) {
        this.dialog.open(_shared_update_password_update_password_component__WEBPACK_IMPORTED_MODULE_8__["UpdatePasswordComponent"], {
            width: '40%',
            data: user
        });
    }
    userRole(user) {
        if (user.roles) {
            return user.roles.map(x => x.label).join(', ');
        }
        return "";
    }
};
UsersComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_shared_app_header_bar_app_header_bar_component__WEBPACK_IMPORTED_MODULE_6__["AppHeaderBarComponent"], { static: false })
], UsersComponent.prototype, "appHeader", void 0);
UsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-users',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./users.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/manage-users/users/users.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./users.component.scss */ "./src/app/components/manage-users/users/users.component.scss")).default]
    })
], UsersComponent);



/***/ }),

/***/ "./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("form {\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvYW5hLWNsb3VkLXNpZ251cC9EOlxcbGVhcm5pbmctcHJvamVjdHNcXGNoYXRib3RzLm1uXFxzdHVkaW8vc3JjXFxhcHBcXGNvbXBvbmVudHNcXHNoYXJlZFxcYW5hLWNsb3VkLXNpZ251cFxcYW5hLWNsb3VkLXNpZ251cC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvYW5hLWNsb3VkLXNpZ251cC9hbmEtY2xvdWQtc2lnbnVwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NoYXJlZC9hbmEtY2xvdWQtc2lnbnVwL2FuYS1jbG91ZC1zaWdudXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJmb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4iLCJmb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.ts ***!
  \**********************************************************************************/
/*! exports provided: AnaCloudSignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnaCloudSignupComponent", function() { return AnaCloudSignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");






let AnaCloudSignupComponent = class AnaCloudSignupComponent {
    constructor(global, data, infoDialog, translate) {
        this.global = global;
        this.data = data;
        this.infoDialog = infoDialog;
        this.translate = translate;
        this.details = {
            companyName: "",
            confirmPassword: "",
            displayName: "",
            email: "",
            password: "",
            phone: ""
        };
    }
    allValid() {
        let d = this.details;
        if (!d || !d.companyName || !d.displayName) {
            this.errorMessage = this.translate.instant('cloud-signup.please-fill');
            return false;
        }
        if (!d.email || !this.global.emailValid(d.email)) {
            this.errorMessage = "Please enter a valid email address. Verification email will be sent to it.";
            return false;
        }
        if (!d.phone || !this.global.phoneValid(d.phone)) {
            this.errorMessage = "Please enter a valid phone number.";
            return false;
        }
        if (!d.password || d.password.length < 6) {
            this.errorMessage = "Minimum length of the password is 6 characters.";
            return false;
        }
        if (d.password != d.confirmPassword) {
            this.errorMessage = "Password and confirm password do not match.";
            return false;
        }
        this.errorMessage = null;
        return true;
    }
    ngOnInit() {
    }
    create() {
        if (this.allValid()) {
            this.infoDialog.showSpinner();
            this.data.getRoles().subscribe(x => {
                let roles = x.data.filter(x => ["BUSINESS_ADMIN"].indexOf(x.role) != -1);
                if (roles && roles.length > 0) {
                    let roleId = roles[0].id;
                    this.data.registerOnAnaCloud({
                        business: {
                            email: this.details.email,
                            phone: this.details.phone,
                            name: this.details.companyName + " - " + this.details.displayName,
                        },
                        user: {
                            email: this.details.email,
                            phone: this.details.phone,
                            name: this.details.displayName,
                            password: this.details.password,
                            roleIds: [roleId]
                        }
                    }).subscribe(x => {
                        this.infoDialog.hideSpinner();
                        if (x.data) {
                        }
                        else {
                            this.data.handleTypedError(x.error, "Unable to register", "Something went wrong while trying to register. Please try again.");
                        }
                    }, err => {
                        this.infoDialog.hideSpinner();
                        this.data.handleError(err, "Unable to register", "Something went wrong while trying to register. Please try again.");
                    });
                }
            }, err => {
                this.infoDialog.hideSpinner();
                this.data.handleError(err, "Unable to register", "Something went wrong while trying to register. Please try again.");
            });
        }
        else {
            this.infoDialog.alert("Invalid Details", this.errorMessage);
        }
    }
};
AnaCloudSignupComponent.ctorParameters = () => [
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_3__["GlobalsService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_4__["InfoDialogService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] }
];
AnaCloudSignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-ana-cloud-signup',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./ana-cloud-signup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./ana-cloud-signup.component.scss */ "./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.scss")).default]
    })
], AnaCloudSignupComponent);



/***/ }),

/***/ "./src/app/components/shared/app-header-bar/app-header-bar.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/components/shared/app-header-bar/app-header-bar.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-header-bar {\n  width: 100%;\n}\n\napp-header-bar > .user-info {\n  float: right;\n}\n\n.back-button {\n  margin-right: 10px;\n}\n\n.toolbar-icon {\n  padding: 0 14px;\n}\n\n.toolbar-spacer {\n  flex: 1 1 auto;\n}\n\n.user-info {\n  display: flex;\n  flex-direction: column;\n}\n\n.user-role {\n  font-size: 13px;\n  opacity: 0.7;\n  margin-top: -10px;\n  align-self: flex-end;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvYXBwLWhlYWRlci1iYXIvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzaGFyZWRcXGFwcC1oZWFkZXItYmFyXFxhcHAtaGVhZGVyLWJhci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvYXBwLWhlYWRlci1iYXIvYXBwLWhlYWRlci1iYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FDQ0o7O0FERUk7RUFDSSxZQUFBO0FDQ1I7O0FERUE7RUFDSSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hhcmVkL2FwcC1oZWFkZXItYmFyL2FwcC1oZWFkZXItYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWhlYWRlci1iYXIge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4gICAgYXBwLWhlYWRlci1iYXIgPiAudXNlci1pbmZvIHtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgIH1cblxuLmJhY2stYnV0dG9uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi50b29sYmFyLWljb24ge1xuICAgIHBhZGRpbmc6IDAgMTRweDtcbn1cblxuLnRvb2xiYXItc3BhY2VyIHtcbiAgICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLnVzZXItaW5mbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4udXNlci1yb2xlIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgb3BhY2l0eTogLjc7XG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG59XG5cbiIsImFwcC1oZWFkZXItYmFyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmFwcC1oZWFkZXItYmFyID4gLnVzZXItaW5mbyB7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmJhY2stYnV0dG9uIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4udG9vbGJhci1pY29uIHtcbiAgcGFkZGluZzogMCAxNHB4O1xufVxuXG4udG9vbGJhci1zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLnVzZXItaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi51c2VyLXJvbGUge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG9wYWNpdHk6IDAuNztcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/app-header-bar/app-header-bar.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/components/shared/app-header-bar/app-header-bar.component.ts ***!
  \******************************************************************************/
/*! exports provided: AppHeaderBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppHeaderBarComponent", function() { return AppHeaderBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/login.service */ "./src/app/services/login.service.ts");
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../change-password/change-password.component */ "./src/app/components/shared/change-password/change-password.component.ts");








let AppHeaderBarComponent = class AppHeaderBarComponent {
    constructor(dataService, dialog, router, infoDialog, loginService) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.router = router;
        this.infoDialog = infoDialog;
        this.loginService = loginService;
        this.goBack = () => {
            this.router.navigateByUrl('/');
        };
        this.logoutNavigation = '/';
        this.skipAuth = false;
        this.hideBackButton = false;
        this.title = "";
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.checkAndUpdate();
    }
    checkAndUpdate() {
        Promise.resolve(true).then(() => {
            this.loginService.performLogin(this.skipAuth, "/", true, (done) => {
                if (done) {
                    this.loggedInUser = this.dataService.loggedInUser;
                    if (this.afterInit)
                        this.afterInit();
                }
            });
        });
    }
    loginDialog() {
        this.loginService.performLogin(false, null, true, (done) => {
            if (this.dataService.loggedInUser) {
                this.loggedInUser = this.dataService.loggedInUser;
            }
        });
    }
    logout() {
        this.dataService.logout();
        this.loggedInUser = null;
        if (this.logoutNavigation) {
            this.router.navigateByUrl(this.logoutNavigation);
        }
    }
    changePassword() {
        this.dialog.open(_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_7__["ChangePasswordComponent"], {
            width: '60%',
        });
    }
    roles() {
        if (this.loggedInUser && this.loggedInUser.roles)
            return this.loggedInUser.roles.map(x => x.label).join(', ');
        return "";
    }
};
AppHeaderBarComponent.ctorParameters = () => [
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__["InfoDialogService"] },
    { type: _services_login_service__WEBPACK_IMPORTED_MODULE_6__["LoginService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('goBack')
], AppHeaderBarComponent.prototype, "goBack", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('logoutNavigation')
], AppHeaderBarComponent.prototype, "logoutNavigation", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('skipAuth')
], AppHeaderBarComponent.prototype, "skipAuth", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('hideBackButton')
], AppHeaderBarComponent.prototype, "hideBackButton", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('title')
], AppHeaderBarComponent.prototype, "title", void 0);
AppHeaderBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header-bar',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app-header-bar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/app-header-bar/app-header-bar.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app-header-bar.component.scss */ "./src/app/components/shared/app-header-bar/app-header-bar.component.scss")).default]
    })
], AppHeaderBarComponent);



/***/ }),

/***/ "./src/app/components/shared/business-picker/business-picker.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/components/shared/business-picker/business-picker.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".full-width {\n  width: 100%;\n}\n\n.desc {\n  font-size: 11px;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvYnVzaW5lc3MtcGlja2VyL0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcc2hhcmVkXFxidXNpbmVzcy1waWNrZXJcXGJ1c2luZXNzLXBpY2tlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvYnVzaW5lc3MtcGlja2VyL2J1c2luZXNzLXBpY2tlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NoYXJlZC9idXNpbmVzcy1waWNrZXIvYnVzaW5lc3MtcGlja2VyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGwtd2lkdGgge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4uZGVzYyB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIG9wYWNpdHk6IDAuNjtcbn0iLCIuZnVsbC13aWR0aCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZGVzYyB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgb3BhY2l0eTogMC42O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/business-picker/business-picker.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/shared/business-picker/business-picker.component.ts ***!
  \********************************************************************************/
/*! exports provided: BusinessPickerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessPickerComponent", function() { return BusinessPickerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_analytics_window_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/analytics-window.service */ "./src/app/services/analytics-window.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");







let BusinessPickerComponent = class BusinessPickerComponent {
    constructor(dataService, infoDialog, router, analyticsWindow, dialogRef, param) {
        this.dataService = dataService;
        this.infoDialog = infoDialog;
        this.router = router;
        this.analyticsWindow = analyticsWindow;
        this.dialogRef = dialogRef;
        this.param = param;
        this.title = "";
        this.businessAccounts = [];
        this.bizFilter = "";
        this.chatProjects = [];
        this.projFilter = "";
        if (this.param.askFlowId) {
            this.title = "Choose business account and chat project";
        }
        else {
            this.title = "Choose business account";
        }
    }
    ngOnInit() {
        Promise.resolve(null).then(() => {
            this.init();
        });
    }
    init() {
        this.infoDialog.showSpinner();
        this.dataService.getBusinessAccounts("", 0, 10000).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.businessAccounts = x.data.content;
                if (this.param && this.param.businessId && this.businessAccounts) {
                    let x = this.businessAccounts.filter(x => x.id == this.param.businessId);
                    if (x && x.length > 0) {
                        this.selectedBusinessAccount = x[0];
                        this.bizFilter = this.selectedBusinessAccount;
                        this.loadChatProjects();
                    }
                }
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to load business accounts", "Something went wrong while loading business account. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to load business accounts", "Something went wrong while loading business account. Please try again.");
        });
    }
    bizOptionSelected(event) {
        if (event.option && event.option.value) {
            this.selectedBusinessAccount = event.option.value;
            if (this.selectedBusinessAccount) {
                this.loadChatProjects();
            }
        }
    }
    bizDisplayWith(value) {
        return value ? value.name : null;
    }
    bizFilteredOptions() {
        if (typeof this.bizFilter === 'string') {
            let list = this.businessAccounts;
            if (this.bizFilter) {
                list = this.businessAccounts.filter(x => (x.name.toLowerCase().indexOf(this.bizFilter.toLowerCase()) != -1) || x.id.toLowerCase().indexOf(this.bizFilter.toLowerCase()) != -1);
            }
            return list.sort((x, y) => ((x.name && y.name) ? x.name.localeCompare(y.name) : 1));
        }
    }
    projOptionSelected(event) {
        if (event.option && event.option.value) {
            this.selectedChatProject = event.option.value;
        }
    }
    projDisplayWith(value) {
        return value ? value.name : null;
    }
    projFilteredOptions() {
        if (typeof this.projFilter === 'string') {
            let list = this.chatProjects;
            if (this.projFilter) {
                list = this.chatProjects.filter(x => (x.name.toLowerCase().indexOf(this.projFilter.toLowerCase()) != -1) || x.id.toLowerCase().indexOf(this.projFilter.toLowerCase()) != -1);
            }
            return list.sort((x, y) => ((x.name && y.name) ? x.name.localeCompare(y.name) : 1));
        }
    }
    loadChatProjects() {
        if (!this.param.askFlowId)
            return false;
        if (!this.selectedBusinessAccount)
            return false;
        this.infoDialog.showSpinner();
        this.dataService.getChatProjects(this.selectedBusinessAccount.id, 0, 10000).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.chatProjects = x.data.content;
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
        });
    }
    submit() {
        this.dialogRef.close({
            bizAccount: this.selectedBusinessAccount,
            chatProj: this.selectedChatProject
        });
    }
    valid() {
        if (this.param.askFlowId) {
            return this.selectedBusinessAccount && this.selectedChatProject;
        }
        else {
            return this.selectedBusinessAccount;
        }
    }
    get chatConnName() {
        return this.dataService.chatServer.Name;
    }
};
BusinessPickerComponent.ctorParameters = () => [
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__["InfoDialogService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: _services_analytics_window_service__WEBPACK_IMPORTED_MODULE_5__["AnalyticsWindowService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
];
BusinessPickerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-business-picker',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./business-picker.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/business-picker/business-picker.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./business-picker.component.scss */ "./src/app/components/shared/business-picker/business-picker.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"]))
], BusinessPickerComponent);



/***/ }),

/***/ "./src/app/components/shared/change-password/change-password.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/components/shared/change-password/change-password.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form {\n  display: flex;\n  flex-direction: column;\n}\n\nmat-dialog-actions button {\n  margin-left: 0 !important;\n  margin-right: 8px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY2hhbmdlLXBhc3N3b3JkL0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcc2hhcmVkXFxjaGFuZ2UtcGFzc3dvcmRcXGNoYW5nZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY2hhbmdlLXBhc3N3b3JkL2NoYW5nZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFHQSxzQkFBQTtBQ0NKOztBREVBO0VBQ0kseUJBQUE7RUFDQSw0QkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY2hhbmdlLXBhc3N3b3JkL2NoYW5nZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5tYXQtZGlhbG9nLWFjdGlvbnMgYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1yaWdodDogOHB4ICFpbXBvcnRhbnQ7XG59XG4iLCIuZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbm1hdC1kaWFsb2ctYWN0aW9ucyBidXR0b24ge1xuICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDhweCAhaW1wb3J0YW50O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/change-password/change-password.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/shared/change-password/change-password.component.ts ***!
  \********************************************************************************/
/*! exports provided: ChangePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function() { return ChangePasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");






let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(global, infoDialog, dataService, dialogRef) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
    }
    ngOnInit() {
    }
    save() {
        if (!this.global.pwdMatch(this.newPassword, this.confirmPassword)) {
            this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
            return;
        }
        this.infoDialog.showSpinner();
        this.dataService.changeCurrentUserPassword(this.password, this.newPassword).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("Password changed", "Password has been changed successfully", () => {
                    this.dialogRef.close();
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to change password", "Something went wrong while trying to change the password.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to change password", "Something went wrong while trying to change the password.");
        });
    }
};
ChangePasswordComponent.ctorParameters = () => [
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_2__["GlobalsService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__["InfoDialogService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }
];
ChangePasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-change-password',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./change-password.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/change-password/change-password.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./change-password.component.scss */ "./src/app/components/shared/change-password/change-password.component.scss")).default]
    })
], ChangePasswordComponent);



/***/ }),

/***/ "./src/app/components/shared/chat-server-manager/chat-server-manager.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/components/shared/chat-server-manager/chat-server-manager.component.scss ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field, mat-select {\n  width: 100%;\n}\n\n.bottom-actions > button {\n  margin: 20px 10px;\n}\n\nmat-action-row > button {\n  margin: 10px;\n}\n\n/*mat-action-row {\n  margin: 0 -10px;\n  display: block;\n}*/\n\n.bottom-actions {\n  display: block;\n  text-align: center;\n}\n\n/*.mat-dialog-actions {\n    margin-left: -8px;\n    margin-right: -8px;\n}*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY2hhdC1zZXJ2ZXItbWFuYWdlci9EOlxcbGVhcm5pbmctcHJvamVjdHNcXGNoYXRib3RzLm1uXFxzdHVkaW8vc3JjXFxhcHBcXGNvbXBvbmVudHNcXHNoYXJlZFxcY2hhdC1zZXJ2ZXItbWFuYWdlclxcY2hhdC1zZXJ2ZXItbWFuYWdlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY2hhdC1zZXJ2ZXItbWFuYWdlci9jaGF0LXNlcnZlci1tYW5hZ2VyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURFQTs7O0VBQUE7O0FBSUE7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTs7O0VBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NoYXJlZC9jaGF0LXNlcnZlci1tYW5hZ2VyL2NoYXQtc2VydmVyLW1hbmFnZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtZm9ybS1maWVsZCwgbWF0LXNlbGVjdCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbi5ib3R0b20tYWN0aW9ucyA+IGJ1dHRvbiB7XG4gICAgbWFyZ2luOiAyMHB4IDEwcHg7XG59XG5cbm1hdC1hY3Rpb24tcm93ID4gYnV0dG9uIHtcbiAgICBtYXJnaW46IDEwcHg7XG59XG5cbi8qbWF0LWFjdGlvbi1yb3cge1xuICBtYXJnaW46IDAgLTEwcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xufSovXG4uYm90dG9tLWFjdGlvbnMge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLyoubWF0LWRpYWxvZy1hY3Rpb25zIHtcbiAgICBtYXJnaW4tbGVmdDogLThweDtcbiAgICBtYXJnaW4tcmlnaHQ6IC04cHg7XG59Ki9cbiIsIm1hdC1mb3JtLWZpZWxkLCBtYXQtc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5ib3R0b20tYWN0aW9ucyA+IGJ1dHRvbiB7XG4gIG1hcmdpbjogMjBweCAxMHB4O1xufVxuXG5tYXQtYWN0aW9uLXJvdyA+IGJ1dHRvbiB7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLyptYXQtYWN0aW9uLXJvdyB7XG4gIG1hcmdpbjogMCAtMTBweDtcbiAgZGlzcGxheTogYmxvY2s7XG59Ki9cbi5ib3R0b20tYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi8qLm1hdC1kaWFsb2ctYWN0aW9ucyB7XG4gICAgbWFyZ2luLWxlZnQ6IC04cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAtOHB4O1xufSovIl19 */");

/***/ }),

/***/ "./src/app/components/shared/chat-server-manager/chat-server-manager.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/components/shared/chat-server-manager/chat-server-manager.component.ts ***!
  \****************************************************************************************/
/*! exports provided: ChatServerManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatServerManagerComponent", function() { return ChatServerManagerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/settings.service */ "./src/app/services/settings.service.ts");
/* harmony import */ var _services_chatflow_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/chatflow.service */ "./src/app/services/chatflow.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _get_ana_chat_server_get_ana_chat_server_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../get-ana-chat-server/get-ana-chat-server.component */ "./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.ts");









let ChatServerManagerComponent = class ChatServerManagerComponent {
    constructor(settings, chatFlowService, snakbar, infoDialog, dialog, router, dialogRef) {
        this.settings = settings;
        this.chatFlowService = chatFlowService;
        this.snakbar = snakbar;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.router = router;
        this.dialogRef = dialogRef;
        this.savedConnections = [];
        this.savedConnections = this.settings.loadSavedConnections();
    }
    ngOnInit() {
    }
    connectionAlias(conn) {
        return conn.Name || conn.ServerUrl || 'New Chatbots.mn chat server';
    }
    deleteConnection(conn) {
        var current = this.savedConnections.indexOf(conn);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete chat server connection '${this.connectionAlias(conn)}'`, (ok) => {
                if (ok) {
                    this.savedConnections.splice(current, 1);
                    this.saveConnections(false);
                }
            });
        }
    }
    addChatProjectToConn(conn) {
        if (!conn.ChatProjects)
            conn.ChatProjects = [];
        conn.ChatProjects.push({
            CreatedOn: new Date(),
            Id: 'new-chat-project',
            Name: 'New Chat Project',
            UpdatedOn: new Date()
        });
    }
    deleteProject(conn, proj) {
        var current = conn.ChatProjects.indexOf(proj);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete chat project '${proj.Name}'`, (ok) => {
                if (ok) {
                    conn.ChatProjects.splice(current, 1);
                    this.saveConnections(false);
                }
            });
        }
    }
    saveConnections(close) {
        if (this.savedConnections && this.savedConnections.length > 0) {
            let invalidPublishServers = this.savedConnections.filter(x => !x.ServerUrl || !x.Name);
            if (invalidPublishServers.length > 0) {
                this.infoDialog.alert('Incomplete Details', `One or more of your Chatbots.mn chat servers have Server Url or Name. Please fill them and try again.`);
                return;
            }
            try {
                let emptyChatProjects = this.savedConnections.filter(x => !x.ChatProjects || x.ChatProjects.length <= 0);
                if (emptyChatProjects.length != this.savedConnections.length) {
                    let invalidChatProjects = this.savedConnections.filter(x => x.ChatProjects && x.ChatProjects.length > 0).map(x => x.ChatProjects).reduce((a, b) => a.concat(b)).filter(x => !x.Id || !x.Name);
                    if ((emptyChatProjects.length > 0 && invalidChatProjects.length > 0)) {
                        this.infoDialog.alert('Incomplete Details', `One or more of the chat projects in your chat server connections is incomplete. Please fill them and try again.`);
                        return;
                    }
                }
            }
            catch (e) {
                console.log(e);
                this.infoDialog.alert('Incomplete Details', `One or more of the chat projects in your chat server connections is incomplete. Please fill them and try again.`);
                return;
            }
        }
        this.settings.saveSavedConnections(this.savedConnections);
        this.snakbar.open('Chatbots.mn chat servers saved!', 'Dismiss', {
            duration: 3000
        });
        if (close) {
            this.dialogRef.close();
        }
    }
    addConnection() {
        let newConn = {
            APIKey: '',
            APISecret: '',
            IsDefault: false,
            Name: '',
            ServerUrl: '',
            ChatProjects: []
        };
        this.savedConnections.push(newConn);
    }
    getAnaChatServer() {
        this.dialog.open(_get_ana_chat_server_get_ana_chat_server_component__WEBPACK_IMPORTED_MODULE_7__["GetAnaChatServerComponent"], {
            width: 'auto',
            disableClose: true
        });
    }
};
ChatServerManagerComponent.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_4__["SettingsService"] },
    { type: _services_chatflow_service__WEBPACK_IMPORTED_MODULE_5__["ChatFlowService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_6__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] }
];
ChatServerManagerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-chat-server-manager',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chat-server-manager.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/chat-server-manager/chat-server-manager.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chat-server-manager.component.scss */ "./src/app/components/shared/chat-server-manager/chat-server-manager.component.scss")).default]
    })
], ChatServerManagerComponent);



/***/ }),

/***/ "./src/app/components/shared/create-chatbot/create-chatbot.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/components/shared/create-chatbot/create-chatbot.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form {\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY3JlYXRlLWNoYXRib3QvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzaGFyZWRcXGNyZWF0ZS1jaGF0Ym90XFxjcmVhdGUtY2hhdGJvdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY3JlYXRlLWNoYXRib3QvY3JlYXRlLWNoYXRib3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBR0Esc0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hhcmVkL2NyZWF0ZS1jaGF0Ym90L2NyZWF0ZS1jaGF0Ym90LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4iLCIuZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59Il19 */");

/***/ }),

/***/ "./src/app/components/shared/create-chatbot/create-chatbot.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/components/shared/create-chatbot/create-chatbot.component.ts ***!
  \******************************************************************************/
/*! exports provided: CreateChatbotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateChatbotComponent", function() { return CreateChatbotComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/login.service */ "./src/app/services/login.service.ts");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/settings.service */ "./src/app/services/settings.service.ts");








let CreateChatbotComponent = class CreateChatbotComponent {
    constructor(settings, globals, dataService, loginService, dialog, infoDialog, dialogRef, bizDetails) {
        this.settings = settings;
        this.globals = globals;
        this.dataService = dataService;
        this.loginService = loginService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.bizDetails = bizDetails;
        this.chatProject = {
            businessId: "",
            //businessName: "",
            id: "",
            name: ""
        };
        if (bizDetails) {
            this.chatProject.businessId = bizDetails.id;
            //this.chatProject.businessName = bizDetails.name;
        }
    }
    ngOnInit() {
    }
    create() {
        this.infoDialog.showSpinner();
        this.dataService.createChatProject(this.chatProject).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.dialogRef.close(this.chatProject);
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
                this.dialogRef.close();
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
            this.dialogRef.close();
        });
    }
};
CreateChatbotComponent.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_7__["SettingsService"] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_4__["GlobalsService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"] },
    { type: _services_login_service__WEBPACK_IMPORTED_MODULE_6__["LoginService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
CreateChatbotComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-chatbot',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./create-chatbot.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/create-chatbot/create-chatbot.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./create-chatbot.component.scss */ "./src/app/components/shared/create-chatbot/create-chatbot.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](7, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
], CreateChatbotComponent);



/***/ }),

/***/ "./src/app/components/shared/create-user/create-user.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/components/shared/create-user/create-user.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form {\n  display: flex;\n  flex-direction: column;\n}\n\nmat-dialog-actions button {\n  margin-left: 0 !important;\n  margin-right: 8px !important;\n}\n\n.mat-input-element:disabled {\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY3JlYXRlLXVzZXIvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzaGFyZWRcXGNyZWF0ZS11c2VyXFxjcmVhdGUtdXNlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvY3JlYXRlLXVzZXIvY3JlYXRlLXVzZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBR0Esc0JBQUE7QUNDSjs7QURFQTtFQUNJLHlCQUFBO0VBQ0EsNEJBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hhcmVkL2NyZWF0ZS11c2VyL2NyZWF0ZS11c2VyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbm1hdC1kaWFsb2ctYWN0aW9ucyBidXR0b24ge1xuICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHggIWltcG9ydGFudDtcbn1cblxuLm1hdC1pbnB1dC1lbGVtZW50OmRpc2FibGVkIHtcbiAgICBjb2xvcjogYmxhY2s7XG59XG4iLCIuZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbm1hdC1kaWFsb2ctYWN0aW9ucyBidXR0b24ge1xuICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDhweCAhaW1wb3J0YW50O1xufVxuXG4ubWF0LWlucHV0LWVsZW1lbnQ6ZGlzYWJsZWQge1xuICBjb2xvcjogYmxhY2s7XG59Il19 */");

/***/ }),

/***/ "./src/app/components/shared/create-user/create-user.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/components/shared/create-user/create-user.component.ts ***!
  \************************************************************************/
/*! exports provided: CreateUserComponent, UserDialogMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateUserComponent", function() { return CreateUserComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDialogMode", function() { return UserDialogMode; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");






let CreateUserComponent = class CreateUserComponent {
    constructor(global, infoDialog, dataService, dialogRef, param) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
        this.param = param;
        this.title = "";
        this.UserDialogMode = UserDialogMode;
        if (param.mode == UserDialogMode.Create) {
            this.title = "Create User";
            this.user = {
                businessId: param.bizId,
                email: "",
                name: "",
                phone: "",
                password: "",
                roleIds: []
            };
        }
        else if (param.mode == UserDialogMode.View) {
            this.title = "User Details";
            this.user = {
                businessId: param.bizId,
                email: param.user.email || param.user.userName,
                name: param.user.name || param.user.userName,
                phone: param.user.phone,
                password: "",
                roleIds: []
            };
        }
        this.loadRoles();
    }
    ngOnInit() {
    }
    userRoleDisplay() {
        if (this.param.user && this.param.user.roles) {
            return this.param.user.roles.map(x => x.label).join(', ');
        }
        return "";
    }
    loadRoles() {
        this.dataService.getRoles().subscribe(x => {
            this.roles = x.data.filter(x => ["SUPER_ADMIN", "END_USER"].indexOf(x.role) == -1);
        });
    }
    save() {
        if (!this.global.emailValid(this.user.email)) {
            this.infoDialog.alert("Invalid Email", "Please enter a valid email address");
            return;
        }
        if (!this.global.phoneValid(this.user.phone)) {
            this.infoDialog.alert("Invalid Phone Number", "Please enter a valid phone number");
            return;
        }
        if (!this.global.pwdMatch(this.user.password, this.confirmPassword)) {
            this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
            return;
        }
        if (!this.selectedRole) {
            this.infoDialog.alert("Role not selected", "Please select a role for the user");
            return;
        }
        this.user.roleIds = [this.selectedRole.id];
        this.infoDialog.showSpinner();
        debugger;
        this.dataService.createUser(this.user).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("User created", "The user has been created successfully", () => {
                    this.dialogRef.close(true);
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to create the user", "Something went wrong while trying to create the user. Please try again in some time.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to create the user", "Something went wrong while trying to create the user. Please try again in some time.");
        });
    }
};
CreateUserComponent.ctorParameters = () => [
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_2__["GlobalsService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__["InfoDialogService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"],] }] }
];
CreateUserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-user',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./create-user.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/create-user/create-user.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./create-user.component.scss */ "./src/app/components/shared/create-user/create-user.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"]))
], CreateUserComponent);

var UserDialogMode;
(function (UserDialogMode) {
    UserDialogMode[UserDialogMode["View"] = 0] = "View";
    UserDialogMode[UserDialogMode["Create"] = 1] = "Create";
})(UserDialogMode || (UserDialogMode = {}));


/***/ }),

/***/ "./src/app/components/shared/edit-business-account/edit-business-account.component.scss":
/*!**********************************************************************************************!*\
  !*** ./src/app/components/shared/edit-business-account/edit-business-account.component.scss ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form {\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZWRpdC1idXNpbmVzcy1hY2NvdW50L0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcc2hhcmVkXFxlZGl0LWJ1c2luZXNzLWFjY291bnRcXGVkaXQtYnVzaW5lc3MtYWNjb3VudC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZWRpdC1idXNpbmVzcy1hY2NvdW50L2VkaXQtYnVzaW5lc3MtYWNjb3VudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFHQSxzQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZWRpdC1idXNpbmVzcy1hY2NvdW50L2VkaXQtYnVzaW5lc3MtYWNjb3VudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuIiwiLmZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/edit-business-account/edit-business-account.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/components/shared/edit-business-account/edit-business-account.component.ts ***!
  \********************************************************************************************/
/*! exports provided: EditBusinessAccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditBusinessAccountComponent", function() { return EditBusinessAccountComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");






let EditBusinessAccountComponent = class EditBusinessAccountComponent {
    constructor(global, infoDialog, dataService, dialogRef, data) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = "Create business account";
        this.isCreate = false;
        this.account = {
            colors: [],
            email: "",
            logoUrl: "",
            name: "",
            phone: "",
        };
        this.primaryBGColor = "#5e72e4";
        this.primaryFGColor = "white";
        this.secondaryColor = "#3c3c3c";
        this.dialogRef.disableClose = true;
        if (data) {
            this.account = data;
            this.title = "Edit business account";
        }
        if (!this.account.id) {
            this.account.id = this.global.uuidv4();
            this.isCreate = true;
        }
    }
    ngOnInit() {
    }
    emailValid(val) {
        let r = this.global.emailValid(val);
        return r;
    }
    phoneValid(val) {
        return this.global.phoneValid(val);
    }
    pwdMatch(p1, p2) {
        return this.global.pwdMatch(p1, p2);
    }
    save() {
        if (this.account.email) {
            if (!this.global.emailValid(this.account.email)) {
                this.infoDialog.alert("Invalid email address", "Please enter a valid email address");
                return;
            }
        }
        if (this.account.phone) {
            if (!this.global.phoneValid(this.account.phone)) {
                this.infoDialog.alert("Invalid phone number", "Please enter a valid phone number");
                return;
            }
        }
        this.account.colors = [
            {
                name: "PRIMARY_BG",
                value: this.primaryBGColor
            },
            {
                name: "PRIMARY_FG",
                value: this.primaryFGColor
            },
            {
                name: "SECONDARY",
                value: this.secondaryColor
            }
        ];
        this.infoDialog.showSpinner();
        this.dataService.saveBusinessAccount(this.account, this.isCreate).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("Done", "Business account has been saved successfully", () => {
                    this.dialogRef.close(true);
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to save business account", "Something went wrong while trying to save business account details");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to save business account", "Something went wrong while trying to save business account details");
        });
    }
};
EditBusinessAccountComponent.ctorParameters = () => [
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_5__["GlobalsService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__["InfoDialogService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
EditBusinessAccountComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-edit-business-account',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./edit-business-account.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/edit-business-account/edit-business-account.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./edit-business-account.component.scss */ "./src/app/components/shared/edit-business-account/edit-business-account.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
], EditBusinessAccountComponent);



/***/ }),

/***/ "./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.scss ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".button-row {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n}\n\n.button-row > .mat-raised-button {\n  margin-left: 10px;\n  margin-right: 10px;\n  height: 180px;\n  width: 200px;\n  font-size: 18px;\n}\n\n.button-row > .mat-raised-button:first-child {\n  margin-left: 0;\n}\n\n.button-row > .mat-raised-button:last-child {\n  margin-right: 0;\n}\n\nmat-raised-button svg {\n  width: 84px;\n  height: 84px;\n  margin-left: 4px;\n}\n\n.actions {\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZ2V0LWFuYS1jaGF0LXNlcnZlci9EOlxcbGVhcm5pbmctcHJvamVjdHNcXGNoYXRib3RzLm1uXFxzdHVkaW8vc3JjXFxhcHBcXGNvbXBvbmVudHNcXHNoYXJlZFxcZ2V0LWFuYS1jaGF0LXNlcnZlclxcZ2V0LWFuYS1jaGF0LXNlcnZlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZ2V0LWFuYS1jaGF0LXNlcnZlci9nZXQtYW5hLWNoYXQtc2VydmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUk7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDQ1I7O0FERVE7RUFDSSxjQUFBO0FDQ1o7O0FERVE7RUFDSSxlQUFBO0FDQ1o7O0FERUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FERUE7RUFDSSx5QkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvZ2V0LWFuYS1jaGF0LXNlcnZlci9nZXQtYW5hLWNoYXQtc2VydmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ1dHRvbi1yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuICAgIC5idXR0b24tcm93ID4gLm1hdC1yYWlzZWQtYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAxODBweDtcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuXG4gICAgICAgIC5idXR0b24tcm93ID4gLm1hdC1yYWlzZWQtYnV0dG9uOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLmJ1dHRvbi1yb3cgPiAubWF0LXJhaXNlZC1idXR0b246bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgIH1cblxubWF0LXJhaXNlZC1idXR0b24gc3ZnIHtcbiAgICB3aWR0aDogODRweDtcbiAgICBoZWlnaHQ6IDg0cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDRweDtcbn1cblxuLmFjdGlvbnMge1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG4iLCIuYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmJ1dHRvbi1yb3cgPiAubWF0LXJhaXNlZC1idXR0b24ge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBoZWlnaHQ6IDE4MHB4O1xuICB3aWR0aDogMjAwcHg7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmJ1dHRvbi1yb3cgPiAubWF0LXJhaXNlZC1idXR0b246Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tbGVmdDogMDtcbn1cblxuLmJ1dHRvbi1yb3cgPiAubWF0LXJhaXNlZC1idXR0b246bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cblxubWF0LXJhaXNlZC1idXR0b24gc3ZnIHtcbiAgd2lkdGg6IDg0cHg7XG4gIGhlaWdodDogODRweDtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbn1cblxuLmFjdGlvbnMge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.ts ***!
  \****************************************************************************************/
/*! exports provided: GetAnaChatServerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAnaChatServerComponent", function() { return GetAnaChatServerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _ana_cloud_signup_ana_cloud_signup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ana-cloud-signup/ana-cloud-signup.component */ "./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.ts");




let GetAnaChatServerComponent = class GetAnaChatServerComponent {
    constructor(dialog) {
        this.dialog = dialog;
    }
    ngOnInit() {
    }
    selfHost() {
        // this.electron.shell.openExternal('https://www.ana.chat/self-h・osting.html?r=' + Math.random());
    }
    anaCloud() {
        let d = this.dialog.open(_ana_cloud_signup_ana_cloud_signup_component__WEBPACK_IMPORTED_MODULE_3__["AnaCloudSignupComponent"], {
            width: 'auto'
        });
    }
};
GetAnaChatServerComponent.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
GetAnaChatServerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-get-ana-chat-server',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./get-ana-chat-server.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./get-ana-chat-server.component.scss */ "./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.scss")).default]
    })
], GetAnaChatServerComponent);



/***/ }),

/***/ "./src/app/components/shared/info-dialog/info-dialog.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/components/shared/info-dialog/info-dialog.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-dialog-actions {\n  justify-content: center;\n}\n\nmat-form-field {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvaW5mby1kaWFsb2cvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzaGFyZWRcXGluZm8tZGlhbG9nXFxpbmZvLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvaW5mby1kaWFsb2cvaW5mby1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx1QkFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvaW5mby1kaWFsb2cvaW5mby1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtZGlhbG9nLWFjdGlvbnMge1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5tYXQtZm9ybS1maWVsZCB7XG4gICAgd2lkdGg6IDEwMCVcbn1cbiIsIm1hdC1kaWFsb2ctYWN0aW9ucyB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5tYXQtZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/info-dialog/info-dialog.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/components/shared/info-dialog/info-dialog.component.ts ***!
  \************************************************************************/
/*! exports provided: InfoDialogComponent, InfoDialogType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoDialogComponent", function() { return InfoDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoDialogType", function() { return InfoDialogType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");



let InfoDialogComponent = class InfoDialogComponent {
    constructor(dialogRef, options) {
        this.dialogRef = dialogRef;
        this.options = options;
        this.InfoDialogType = InfoDialogType;
        this.dialogRef.disableClose = true;
        if (!options) {
            options = {
                dialogType: InfoDialogType.Alert,
                title: 'Title',
                message: 'Message'
            };
        }
        switch (options.dialogType) {
            case InfoDialogType.Confirm:
                {
                    this.primaryButtonText = "OK";
                    this.secondaryButtonText = "Cancel";
                }
                break;
            case InfoDialogType.Prompt:
                {
                    this.inputText = options.defaultInputText;
                    this.primaryButtonText = "Done";
                    this.secondaryButtonText = "Cancel";
                }
                break;
            case InfoDialogType.Alert:
            default:
                {
                    this.secondaryButtonText = "Close";
                }
                break;
        }
    }
    ngOnInit() {
    }
    inputKeypress(event) {
        if (event.keyCode == 13) {
            this.primaryClick();
        }
    }
    primaryClick() {
        switch (this.options.dialogType) {
            case InfoDialogType.Confirm:
                this.dialogRef.close(true);
                break;
            case InfoDialogType.Prompt:
                this.dialogRef.close(this.inputText);
                break;
            case InfoDialogType.Alert:
            default:
                this.dialogRef.close();
                break;
        }
    }
};
InfoDialogComponent.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
InfoDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-info-dialog',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./info-dialog.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/info-dialog/info-dialog.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./info-dialog.component.scss */ "./src/app/components/shared/info-dialog/info-dialog.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
], InfoDialogComponent);

var InfoDialogType;
(function (InfoDialogType) {
    InfoDialogType[InfoDialogType["Prompt"] = 0] = "Prompt";
    InfoDialogType[InfoDialogType["Alert"] = 1] = "Alert";
    InfoDialogType[InfoDialogType["Confirm"] = 2] = "Confirm";
})(InfoDialogType || (InfoDialogType = {}));


/***/ }),

/***/ "./src/app/components/shared/loading-indicator/loading-indicator.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/components/shared/loading-indicator/loading-indicator.component.scss ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".chatflow-loading {\n  z-index: 20;\n  padding: 10px 50px;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #5e72e4;\n}\n\n.chatflow-loading > .loading-content {\n  width: 200px;\n  height: 200px;\n  position: fixed;\n  top: 40%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvbG9hZGluZy1pbmRpY2F0b3IvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzaGFyZWRcXGxvYWRpbmctaW5kaWNhdG9yXFxsb2FkaW5nLWluZGljYXRvci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvbG9hZGluZy1pbmRpY2F0b3IvbG9hZGluZy1pbmRpY2F0b3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLHlCQUFBO0FDQ0o7O0FERUk7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUtBLGdDQUFBO0FDQ1IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NoYXJlZC9sb2FkaW5nLWluZGljYXRvci9sb2FkaW5nLWluZGljYXRvci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGF0Zmxvdy1sb2FkaW5nIHtcbiAgICB6LWluZGV4OiAyMDtcbiAgICBwYWRkaW5nOiAxMHB4IDUwcHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWU3MmU0O1xufVxuXG4gICAgLmNoYXRmbG93LWxvYWRpbmcgPiAubG9hZGluZy1jb250ZW50IHtcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIHRvcDogNDAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwtNTAlKTtcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XG4gICAgICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwtNTAlKTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwtNTAlKTtcbiAgICB9XG4iLCIuY2hhdGZsb3ctbG9hZGluZyB7XG4gIHotaW5kZXg6IDIwO1xuICBwYWRkaW5nOiAxMHB4IDUwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWU3MmU0O1xufVxuXG4uY2hhdGZsb3ctbG9hZGluZyA+IC5sb2FkaW5nLWNvbnRlbnQge1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA0MCU7XG4gIGxlZnQ6IDUwJTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59Il19 */");

/***/ }),

/***/ "./src/app/components/shared/loading-indicator/loading-indicator.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/components/shared/loading-indicator/loading-indicator.component.ts ***!
  \************************************************************************************/
/*! exports provided: LoadingIndicatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingIndicatorComponent", function() { return LoadingIndicatorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let LoadingIndicatorComponent = class LoadingIndicatorComponent {
    constructor() { }
    ngOnInit() {
    }
};
LoadingIndicatorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-loading-indicator',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./loading-indicator.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/loading-indicator/loading-indicator.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./loading-indicator.component.scss */ "./src/app/components/shared/loading-indicator/loading-indicator.component.scss")).default]
    })
], LoadingIndicatorComponent);



/***/ }),

/***/ "./src/app/components/shared/loading-mask/loading-mask.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/components/shared/loading-mask/loading-mask.component.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hhcmVkL2xvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/components/shared/loading-mask/loading-mask.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/components/shared/loading-mask/loading-mask.component.ts ***!
  \**************************************************************************/
/*! exports provided: LoadingMaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingMaskComponent", function() { return LoadingMaskComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let LoadingMaskComponent = class LoadingMaskComponent {
    constructor() { }
    ngOnInit() {
    }
};
LoadingMaskComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-loading-mask',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./loading-mask.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/loading-mask/loading-mask.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./loading-mask.component.scss */ "./src/app/components/shared/loading-mask/loading-mask.component.scss")).default]
    })
], LoadingMaskComponent);



/***/ }),

/***/ "./src/app/components/shared/login/login.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/components/shared/login/login.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field {\n  width: 100%;\n}\n\nmat-dialog-actions > .spacing {\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvbG9naW4vRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzaGFyZWRcXGxvZ2luXFxsb2dpbi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NoYXJlZC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1mb3JtLWZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxubWF0LWRpYWxvZy1hY3Rpb25zID4gLnNwYWNpbmcge1xuICAgIGZsZXgtZ3JvdzogMTtcbn1cbiIsIm1hdC1mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1hdC1kaWFsb2ctYWN0aW9ucyA+IC5zcGFjaW5nIHtcbiAgZmxleC1ncm93OiAxO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/login/login.component.ts":
/*!************************************************************!*\
  !*** ./src/app/components/shared/login/login.component.ts ***!
  \************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/settings.service */ "./src/app/services/settings.service.ts");
/* harmony import */ var _services_chatflow_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/chatflow.service */ "./src/app/services/chatflow.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../chat-server-manager/chat-server-manager.component */ "./src/app/components/shared/chat-server-manager/chat-server-manager.component.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");









let LoginComponent = class LoginComponent {
    constructor(settings, chatFlowService, dialog, infoDialog, dataService, router, dialogRef) {
        this.settings = settings;
        this.chatFlowService = chatFlowService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.router = router;
        this.dialogRef = dialogRef;
        this.savedConns = [];
        this.dialogRef.disableClose = true;
        this.loadSavedConns();
        //this.dialogRef.afterClosed().subscribe(x => {
        //	if (!this.dataService.loggedInUser)
        //		this.router.navigateByUrl('/');
        //});
    }
    loadSavedConns() {
        this.savedConns = this.settings.loadSavedConnections();
        if (this.savedConns.length == 1)
            this.selectedServer = this.savedConns[0];
        else
            this.selectedServer = null;
    }
    ngOnInit() {
    }
    dismiss() {
        this.dialogRef.close();
    }
    login() {
        this.dataService.loggedInUser = null;
        this.dataService.setConnection(this.selectedServer);
        this.infoDialog.showSpinner();
        this.dataService.login(this.username, this.password).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.dataService.loggedInUser = x.data;
                localStorage.setItem("user", JSON.stringify(x.data));
                this.dialogRef.close(true);
            }
            else
                this.dataService.handleTypedError(x.error, "Oops! Unable to login.", "Something went wrong while trying to login. Please try again.");
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Oops! Unable to login.", "Something went wrong while trying to login. Please try again.");
        });
    }
    managePublishServers() {
        let dialogRef = this.dialog.open(_chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_6__["ChatServerManagerComponent"], {
            width: '60%',
        });
        dialogRef.afterClosed().subscribe(x => {
            this.loadSavedConns();
        });
    }
};
LoginComponent.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_3__["SettingsService"] },
    { type: _services_chatflow_service__WEBPACK_IMPORTED_MODULE_4__["ChatFlowService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__["InfoDialogService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_7__["DataService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/login/login.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.scss */ "./src/app/components/shared/login/login.component.scss")).default]
    })
], LoginComponent);



/***/ }),

/***/ "./src/app/components/shared/publish-chatbot/publish-chatbot.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/components/shared/publish-chatbot/publish-chatbot.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field {\n  width: 100%;\n}\n\nmat-dialog-actions > .spacing {\n  flex-grow: 1;\n}\n\n.desc {\n  font-size: 11px;\n  opacity: 0.6;\n}\n\nlabel.desc {\n  margin-top: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvcHVibGlzaC1jaGF0Ym90L0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcc2hhcmVkXFxwdWJsaXNoLWNoYXRib3RcXHB1Ymxpc2gtY2hhdGJvdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvcHVibGlzaC1jaGF0Ym90L3B1Ymxpc2gtY2hhdGJvdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvcHVibGlzaC1jaGF0Ym90L3B1Ymxpc2gtY2hhdGJvdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1mb3JtLWZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxubWF0LWRpYWxvZy1hY3Rpb25zID4gLnNwYWNpbmcge1xuICAgIGZsZXgtZ3JvdzogMTtcbn1cblxuLmRlc2Mge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICBvcGFjaXR5OiAwLjY7XG59XG5cbmxhYmVsLmRlc2Mge1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG59IiwibWF0LWZvcm0tZmllbGQge1xuICB3aWR0aDogMTAwJTtcbn1cblxubWF0LWRpYWxvZy1hY3Rpb25zID4gLnNwYWNpbmcge1xuICBmbGV4LWdyb3c6IDE7XG59XG5cbi5kZXNjIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBvcGFjaXR5OiAwLjY7XG59XG5cbmxhYmVsLmRlc2Mge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/publish-chatbot/publish-chatbot.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/shared/publish-chatbot/publish-chatbot.component.ts ***!
  \********************************************************************************/
/*! exports provided: PublishChatbotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublishChatbotComponent", function() { return PublishChatbotComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/login.service */ "./src/app/services/login.service.ts");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/settings.service */ "./src/app/services/settings.service.ts");








let PublishChatbotComponent = class PublishChatbotComponent {
    constructor(settings, globals, dataService, loginService, dialog, infoDialog, dialogRef, params) {
        this.settings = settings;
        this.globals = globals;
        this.dataService = dataService;
        this.loginService = loginService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.params = params;
        this.chatProjects = [];
        this.newChatProject = {
            businessId: "",
            id: null,
            name: null
        };
        this.filter = "";
        this.pack = params.pack;
        this.businessId = params.bizId;
        this.loadChatProjects();
    }
    ngOnInit() {
    }
    canPublish() {
        if (this.selectedProject) {
            return true;
        }
        if (this.newChatProject && this.newChatProject.id && this.newChatProject.name) {
            return true;
        }
        return false;
    }
    createAndPublish() {
        if (!this.newChatProject || !this.newChatProject.id || !this.newChatProject.name) {
            return;
        }
        this.infoDialog.showSpinner();
        this.newChatProject.businessId = this.businessId;
        this.dataService.createChatProject(this.newChatProject).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.selectedProject = this.newChatProject;
                this.doPublish();
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
        });
    }
    /*
    added = "";
    createNewChatProject() {
        let d = this.dialog.open(CreateChatbotComponent, {
            width: 'auto',
            disableClose: true,
            data: <BusinessDetails>{
                id: this.businessId
            }
        });
        d.afterClosed().subscribe(x => {
            if (x) {
                this.added = "New chat bot project created";
                setTimeout(() => this.added = null, 3000);
                this.loadChatProjects();
            }
        });
    }
    */
    loadChatProjects() {
        let bizId = this.businessId;
        this.infoDialog.showSpinner();
        this.dataService.getChatProjects(bizId, 0, 10000).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.chatProjects = x.data.content;
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
        });
    }
    doPublish() {
        if (!this.selectedProject) {
            if (this.newChatProject.id && this.newChatProject.name) {
                this.createAndPublish();
            }
            return;
        }
        this.infoDialog.confirm(`Publish chatbot to '${this.selectedProject.name}'?`, `Are you sure you want to publish this chatbot to ${this.selectedProject.name}?`, (ok) => {
            if (ok) {
                this.infoDialog.showSpinner();
                this.selectedProject.source = this.pack;
                this.selectedProject.flow = this.globals.normalizeChatNodes(this.pack.ChatNodes);
                this.dataService.saveChatProject(this.selectedProject).subscribe(x => {
                    this.infoDialog.hideSpinner();
                    if (x.success) {
                        this.infoDialog.alert('Done', 'Chatbot published successfully', () => this.dismiss());
                    }
                    else {
                        this.dataService.handleTypedError(x.error, "Oops!", "Something went wrong while publishing the chat project! Please try again.");
                    }
                }, err => {
                    this.infoDialog.hideSpinner();
                    this.dataService.handleError(err, "Oops!", "Something went wrong while publishing the chat project! Please try again.");
                });
            }
        });
    }
    dismiss() {
        this.dialogRef.close();
    }
    optionSelected(event) {
        if (event.option && event.option.value) {
            this.selectedProject = event.option.value;
        }
    }
    displayWith(value) {
        return value ? value.name : null;
    }
    filteredOptions() {
        if (typeof this.filter === 'string') {
            if (this.filter) {
                return this.chatProjects.filter(x => x.name.toLowerCase().indexOf(this.filter.toLowerCase()) != -1);
            }
            return this.chatProjects;
        }
    }
    get chatConnName() {
        return this.dataService.chatServer.Name;
    }
};
PublishChatbotComponent.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_7__["SettingsService"] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_4__["GlobalsService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"] },
    { type: _services_login_service__WEBPACK_IMPORTED_MODULE_6__["LoginService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("chatProjectFormField", { static: false })
], PublishChatbotComponent.prototype, "chatProjectFormField", void 0);
PublishChatbotComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-publish-chatbot',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./publish-chatbot.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/publish-chatbot/publish-chatbot.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./publish-chatbot.component.scss */ "./src/app/components/shared/publish-chatbot/publish-chatbot.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](7, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
], PublishChatbotComponent);



/***/ }),

/***/ "./src/app/components/shared/publish-dialog/publish-dialog.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/components/shared/publish-dialog/publish-dialog.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field {\n  width: 100%;\n}\n\nmat-dialog-actions > .spacing {\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvcHVibGlzaC1kaWFsb2cvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzaGFyZWRcXHB1Ymxpc2gtZGlhbG9nXFxwdWJsaXNoLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvcHVibGlzaC1kaWFsb2cvcHVibGlzaC1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NoYXJlZC9wdWJsaXNoLWRpYWxvZy9wdWJsaXNoLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1mb3JtLWZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxubWF0LWRpYWxvZy1hY3Rpb25zID4gLnNwYWNpbmcge1xuICAgIGZsZXgtZ3JvdzogMTtcbn1cbiIsIm1hdC1mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1hdC1kaWFsb2ctYWN0aW9ucyA+IC5zcGFjaW5nIHtcbiAgZmxleC1ncm93OiAxO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/shared/publish-dialog/publish-dialog.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/components/shared/publish-dialog/publish-dialog.component.ts ***!
  \******************************************************************************/
/*! exports provided: PublishDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublishDialogComponent", function() { return PublishDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/settings.service */ "./src/app/services/settings.service.ts");
/* harmony import */ var _services_chatflow_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/chatflow.service */ "./src/app/services/chatflow.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../chat-server-manager/chat-server-manager.component */ "./src/app/components/shared/chat-server-manager/chat-server-manager.component.ts");







let PublishDialogComponent = class PublishDialogComponent {
    constructor(settings, chatFlowService, dialog, infoDialog, dialogRef, pack) {
        this.settings = settings;
        this.chatFlowService = chatFlowService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.pack = pack;
        this.savedConns = [];
        this.chatProjects = [];
        this.loadSavedConns();
    }
    loadSavedConns() {
        this.savedConns = this.settings.loadSavedConnections();
        this.selectedServer = null;
        this.selectedProject = null;
    }
    ngOnInit() {
    }
    publish() {
        this.infoDialog.showSpinner();
        this.chatFlowService.chatProjectExists(this.selectedServer, this.selectedProject).subscribe(x => {
            this.infoDialog.hideSpinner();
            this.infoDialog.confirm("Sure?", `Chat project with id '${this.selectedProject.Id}' already exists. Publishing this will overwrite it. Do you want to proceed?`, (ok) => {
                if (ok)
                    this.doPublish();
            });
        }, err => {
            this.infoDialog.hideSpinner();
            this.doPublish();
        });
    }
    doPublish() {
        this.infoDialog.showSpinner();
        this.chatFlowService.publishProject(this.selectedServer, this.selectedProject, this.pack).subscribe(x => {
            this.infoDialog.hideSpinner();
            this.infoDialog.alert('Done', 'Chatbot published successfully', () => this.dismiss());
        }, err => {
            this.infoDialog.hideSpinner();
            this.infoDialog.alert('Done', 'Oops! Something went wrong while publishing the chat project! Please try again.');
        });
    }
    managePublishServers() {
        let dialogRef = this.dialog.open(_chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_6__["ChatServerManagerComponent"], {
            width: '60%',
        });
        dialogRef.afterClosed().subscribe(x => {
            this.loadSavedConns();
        });
    }
    dismiss() {
        this.dialogRef.close();
    }
};
PublishDialogComponent.ctorParameters = () => [
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_3__["SettingsService"] },
    { type: _services_chatflow_service__WEBPACK_IMPORTED_MODULE_4__["ChatFlowService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_5__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
PublishDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-publish-dialog',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./publish-dialog.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/publish-dialog/publish-dialog.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./publish-dialog.component.scss */ "./src/app/components/shared/publish-dialog/publish-dialog.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
], PublishDialogComponent);



/***/ }),

/***/ "./src/app/components/shared/update-password/update-password.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/components/shared/update-password/update-password.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form {\n  display: flex;\n  flex-direction: column;\n}\n\nmat-dialog-actions button {\n  margin-left: 0 !important;\n  margin-right: 8px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvdXBkYXRlLXBhc3N3b3JkL0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcc2hhcmVkXFx1cGRhdGUtcGFzc3dvcmRcXHVwZGF0ZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvdXBkYXRlLXBhc3N3b3JkL3VwZGF0ZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFHQSxzQkFBQTtBQ0NKOztBREVBO0VBQ0kseUJBQUE7RUFDQSw0QkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zaGFyZWQvdXBkYXRlLXBhc3N3b3JkL3VwZGF0ZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5tYXQtZGlhbG9nLWFjdGlvbnMgYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1yaWdodDogOHB4ICFpbXBvcnRhbnQ7XG59IiwiLmZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5tYXQtZGlhbG9nLWFjdGlvbnMgYnV0dG9uIHtcbiAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OiA4cHggIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/shared/update-password/update-password.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/shared/update-password/update-password.component.ts ***!
  \********************************************************************************/
/*! exports provided: UpdatePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatePasswordComponent", function() { return UpdatePasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");






let UpdatePasswordComponent = class UpdatePasswordComponent {
    constructor(global, infoDialog, dataService, dialogRef, user) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
        this.user = user;
    }
    ngOnInit() {
    }
    save() {
        if (!this.global.pwdMatch(this.password, this.confirmPassword)) {
            this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
            return;
        }
        this.infoDialog.showSpinner();
        this.dataService.updatePassword(this.user.id, this.password).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("Password updated", "Password has been updated successfully", () => {
                    this.dialogRef.close();
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to update password", "Something went wrong while trying to update the password.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to update password", "Something went wrong while trying to update the password.");
        });
    }
};
UpdatePasswordComponent.ctorParameters = () => [
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_2__["GlobalsService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_3__["InfoDialogService"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
];
UpdatePasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-update-password',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./update-password.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/shared/update-password/update-password.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./update-password.component.scss */ "./src/app/components/shared/update-password/update-password.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"]))
], UpdatePasswordComponent);



/***/ }),

/***/ "./src/app/components/studio/chatflow/chatflow.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/components/studio/chatflow/chatflow.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/** {\n    position: static !important;\n    top: auto !important;\n}*/\n.pointer-events-none {\n  pointer-events: none;\n}\n.pointer-cursor {\n  cursor: pointer;\n}\n.not-allowed-cursor {\n  cursor: not-allowed;\n}\n.moving-cursor {\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.section-icon {\n  width: 23px;\n}\n.chatflow-actions {\n  margin: 15px 0;\n  z-index: 10;\n  display: flex;\n  flex-direction: column;\n}\n.chatflow-actions > button {\n  margin: 8px 0;\n  font-size: 12px;\n}\n.chatflow-actions .fab-btn-icon {\n  margin-bottom: -13px !important;\n}\n.chatflow-root-svg {\n  overflow: hidden;\n  width: calc(99vw - 88px);\n  height: 99vh;\n}\n.chatflow-designer-wrapper {\n  overflow: hidden;\n  display: flex;\n  flex-direction: row;\n}\n.chatflow-designer-wrapper .left-sidebar {\n  height: 100vh;\n  background-color: #5e72e4;\n  color: white;\n}\n.chatflow-designer-wrapper .chatflow-root-svg {\n  flex-grow: 1;\n}\n.chatnode {\n  background: none;\n  cursor: move;\n  border: 2px solid transparent;\n  border-radius: 12px;\n}\n.chatnode:hover {\n  border: 2px solid rgba(140, 200, 60, 0.5);\n}\n.chatnode.selected {\n  border: 2px solid #5e72e4;\n}\n.chatnode.click-connect {\n  cursor: alias;\n}\n.chatnode-header {\n  height: 30px;\n  border-radius: 10px 10px 0 0;\n  background-color: #666666;\n}\n.chatnode-header.startnode {\n  background-color: #5e72e4;\n}\n.chatnode-header > p {\n  padding: 5px;\n  text-align: center;\n  color: white;\n}\n.chatnode-body {\n  background-color: white;\n  color: #666666;\n  border-radius: 0 0 10px 10px;\n}\n.chatnode-sections {\n  height: 100%;\n  padding: 0 5px;\n}\n.chatnode-sections > table {\n  width: 100%;\n}\n.chatnode-sections > table > tr {\n  border-bottom: 1px dashed #f0f0f0;\n}\n.chatnode-sections > table > tr > td {\n  padding-left: 5px;\n}\n.section-icon > fa {\n  font-size: 20px;\n}\n.section-alias {\n  padding-right: 5px;\n}\n.section-alias > div {\n  margin: 10px 0px 10px 5px;\n}\n.chatnode-buttons {\n  height: 100%;\n  text-align: center;\n  width: 100%;\n  margin-top: 10px;\n}\n.chatnode-buttons > table {\n  width: 100%;\n  table-layout: fixed;\n}\n.chatnode-buttons > table > tr > td {\n  width: 80px;\n  padding: 10px;\n}\n.chatnode-buttons > table > tr > td > div {\n  text-align: center;\n}\n.chatnode-buttons > table > tr > td > div > .fa {\n  font-size: 20px;\n}\n.chatnode-empty {\n  text-align: center;\n  width: 100%;\n  padding: 5px 0 10px 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vY2hhdGZsb3cvRDpcXGxlYXJuaW5nLXByb2plY3RzXFxjaGF0Ym90cy5tblxcc3R1ZGlvL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzdHVkaW9cXGNoYXRmbG93XFxjaGF0Zmxvdy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vY2hhdGZsb3cvY2hhdGZsb3cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztFQUFBO0FBSUE7RUFDRSxvQkFBQTtBQ0NGO0FERUE7RUFDRSxlQUFBO0FDQ0Y7QURFQTtFQUNFLG1CQUFBO0FDQ0Y7QURFQTtFQUNFLG9CQUFBO0VBQUEsWUFBQTtBQ0NGO0FERUE7RUFDRSxXQUFBO0FDQ0Y7QURFQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FDQ0Y7QURFQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FDQ0Y7QURFQTtFQUNFLCtCQUFBO0FDQ0Y7QURFQTtFQUNFLGdCQUFBO0VBQ0Esd0JBQUE7RUFDQSxZQUFBO0FDQ0Y7QURFQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUdBLG1CQUFBO0FDQ0Y7QURFQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7QUNDRjtBREVBO0VBQ0UsWUFBQTtBQ0NGO0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLG1CQUFBO0FDQ0Y7QURFQTtFQUNFLHlDQUFBO0FDQ0Y7QURFQTtFQUNFLHlCQUFBO0FDQ0Y7QURFQTtFQUNFLGFBQUE7QUNDRjtBREVBO0VBQ0UsWUFBQTtFQUNBLDRCQUFBO0VBQ0EseUJBQUE7QUNDRjtBREVBO0VBQ0UseUJBQUE7QUNDRjtBREVBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0NGO0FERUE7RUFDRSx1QkFBQTtFQUNBLGNBQUE7RUFDQSw0QkFBQTtBQ0NGO0FERUE7RUFDRSxZQUFBO0VBQ0EsY0FBQTtBQ0NGO0FERUE7RUFDRSxXQUFBO0FDQ0Y7QURFQTtFQUNFLGlDQUFBO0FDQ0Y7QURFQTtFQUNFLGlCQUFBO0FDQ0Y7QURFQTtFQUNFLGVBQUE7QUNDRjtBREVBO0VBQ0Usa0JBQUE7QUNDRjtBREVBO0VBQ0UseUJBQUE7QUNDRjtBREVBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FDQ0Y7QURFQTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtBQ0NGO0FERUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtBQ0NGO0FERUE7RUFDRSxrQkFBQTtBQ0NGO0FERUE7RUFDRSxlQUFBO0FDQ0Y7QURFQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLHFCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3N0dWRpby9jaGF0Zmxvdy9jaGF0Zmxvdy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiB7XG4gICAgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50O1xuICAgIHRvcDogYXV0byAhaW1wb3J0YW50O1xufSovXG4ucG9pbnRlci1ldmVudHMtbm9uZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4ucG9pbnRlci1jdXJzb3Ige1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5ub3QtYWxsb3dlZC1jdXJzb3Ige1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4ubW92aW5nLWN1cnNvciB7XG4gIGN1cnNvcjogZ3JhYjtcbn1cblxuLnNlY3Rpb24taWNvbiB7XG4gIHdpZHRoOiAyM3B4O1xufVxuXG4uY2hhdGZsb3ctYWN0aW9ucyB7XG4gIG1hcmdpbjogMTVweCAwO1xuICB6LWluZGV4OiAxMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNoYXRmbG93LWFjdGlvbnMgPiBidXR0b24ge1xuICBtYXJnaW46IDhweCAwO1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5jaGF0Zmxvdy1hY3Rpb25zIC5mYWItYnRuLWljb24ge1xuICBtYXJnaW4tYm90dG9tOiAtMTNweCAhaW1wb3J0YW50O1xufVxuXG4uY2hhdGZsb3ctcm9vdC1zdmcge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aWR0aDogY2FsYyg5OXZ3IC0gODhweCk7XG4gIGhlaWdodDogOTl2aDtcbn1cblxuLmNoYXRmbG93LWRlc2lnbmVyLXdyYXBwZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBmbGV4O1xuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4uY2hhdGZsb3ctZGVzaWduZXItd3JhcHBlciAubGVmdC1zaWRlYmFyIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlNzJlNDtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uY2hhdGZsb3ctZGVzaWduZXItd3JhcHBlciAuY2hhdGZsb3ctcm9vdC1zdmcge1xuICBmbGV4LWdyb3c6IDE7XG59XG5cbi5jaGF0bm9kZSB7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGN1cnNvcjogbW92ZTtcbiAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG59XG5cbi5jaGF0bm9kZTpob3ZlciB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMTQwLCAyMDAsIDYwLCAwLjUpO1xufVxuXG4uY2hhdG5vZGUuc2VsZWN0ZWQge1xuICBib3JkZXI6IDJweCBzb2xpZCAjNWU3MmU0O1xufVxuXG4uY2hhdG5vZGUuY2xpY2stY29ubmVjdCB7XG4gIGN1cnNvcjogYWxpYXM7XG59XG5cbi5jaGF0bm9kZS1oZWFkZXIge1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwIDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2NjY2NjY7XG59XG5cbi5jaGF0bm9kZS1oZWFkZXIuc3RhcnRub2RlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlNzJlNDtcbn1cblxuLmNoYXRub2RlLWhlYWRlciA+IHAge1xuICBwYWRkaW5nOiA1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uY2hhdG5vZGUtYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcbn1cblxuLmNoYXRub2RlLXNlY3Rpb25zIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAwIDVweDtcbn1cblxuLmNoYXRub2RlLXNlY3Rpb25zID4gdGFibGUge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNoYXRub2RlLXNlY3Rpb25zID4gdGFibGUgPiB0ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgI2YwZjBmMDtcbn1cblxuLmNoYXRub2RlLXNlY3Rpb25zID4gdGFibGUgPiB0ciA+IHRkIHtcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XG59XG5cbi5zZWN0aW9uLWljb24gPiBmYSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLnNlY3Rpb24tYWxpYXMge1xuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG59XG5cbi5zZWN0aW9uLWFsaWFzID4gZGl2IHtcbiAgbWFyZ2luOiAxMHB4IDBweCAxMHB4IDVweDtcbn1cblxuLmNoYXRub2RlLWJ1dHRvbnMge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5jaGF0bm9kZS1idXR0b25zID4gdGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbn1cblxuLmNoYXRub2RlLWJ1dHRvbnMgPiB0YWJsZSA+IHRyID4gdGQge1xuICB3aWR0aDogODBweDtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuLmNoYXRub2RlLWJ1dHRvbnMgPiB0YWJsZSA+IHRyID4gdGQgPiBkaXYge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jaGF0bm9kZS1idXR0b25zID4gdGFibGUgPiB0ciA+IHRkID4gZGl2ID4gLmZhIHtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4uY2hhdG5vZGUtZW1wdHkge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA1cHggMCAxMHB4IDA7XG59XG4iLCIvKioge1xuICAgIHBvc2l0aW9uOiBzdGF0aWMgIWltcG9ydGFudDtcbiAgICB0b3A6IGF1dG8gIWltcG9ydGFudDtcbn0qL1xuLnBvaW50ZXItZXZlbnRzLW5vbmUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnBvaW50ZXItY3Vyc29yIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubm90LWFsbG93ZWQtY3Vyc29yIHtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLm1vdmluZy1jdXJzb3Ige1xuICBjdXJzb3I6IGdyYWI7XG59XG5cbi5zZWN0aW9uLWljb24ge1xuICB3aWR0aDogMjNweDtcbn1cblxuLmNoYXRmbG93LWFjdGlvbnMge1xuICBtYXJnaW46IDE1cHggMDtcbiAgei1pbmRleDogMTA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5jaGF0Zmxvdy1hY3Rpb25zID4gYnV0dG9uIHtcbiAgbWFyZ2luOiA4cHggMDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG4uY2hhdGZsb3ctYWN0aW9ucyAuZmFiLWJ0bi1pY29uIHtcbiAgbWFyZ2luLWJvdHRvbTogLTEzcHggIWltcG9ydGFudDtcbn1cblxuLmNoYXRmbG93LXJvb3Qtc3ZnIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IGNhbGMoOTl2dyAtIDg4cHgpO1xuICBoZWlnaHQ6IDk5dmg7XG59XG5cbi5jaGF0Zmxvdy1kZXNpZ25lci13cmFwcGVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogZmxleDtcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cblxuLmNoYXRmbG93LWRlc2lnbmVyLXdyYXBwZXIgLmxlZnQtc2lkZWJhciB7XG4gIGhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZTcyZTQ7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmNoYXRmbG93LWRlc2lnbmVyLXdyYXBwZXIgLmNoYXRmbG93LXJvb3Qtc3ZnIHtcbiAgZmxleC1ncm93OiAxO1xufVxuXG4uY2hhdG5vZGUge1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBjdXJzb3I6IG1vdmU7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4uY2hhdG5vZGU6aG92ZXIge1xuICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDE0MCwgMjAwLCA2MCwgMC41KTtcbn1cblxuLmNoYXRub2RlLnNlbGVjdGVkIHtcbiAgYm9yZGVyOiAycHggc29saWQgIzVlNzJlNDtcbn1cblxuLmNoYXRub2RlLmNsaWNrLWNvbm5lY3Qge1xuICBjdXJzb3I6IGFsaWFzO1xufVxuXG4uY2hhdG5vZGUtaGVhZGVyIHtcbiAgaGVpZ2h0OiAzMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMCAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjY2NjY2O1xufVxuXG4uY2hhdG5vZGUtaGVhZGVyLnN0YXJ0bm9kZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZTcyZTQ7XG59XG5cbi5jaGF0bm9kZS1oZWFkZXIgPiBwIHtcbiAgcGFkZGluZzogNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmNoYXRub2RlLWJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XG59XG5cbi5jaGF0bm9kZS1zZWN0aW9ucyB7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMCA1cHg7XG59XG5cbi5jaGF0bm9kZS1zZWN0aW9ucyA+IHRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jaGF0bm9kZS1zZWN0aW9ucyA+IHRhYmxlID4gdHIge1xuICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICNmMGYwZjA7XG59XG5cbi5jaGF0bm9kZS1zZWN0aW9ucyA+IHRhYmxlID4gdHIgPiB0ZCB7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xufVxuXG4uc2VjdGlvbi1pY29uID4gZmEge1xuICBmb250LXNpemU6IDIwcHg7XG59XG5cbi5zZWN0aW9uLWFsaWFzIHtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuXG4uc2VjdGlvbi1hbGlhcyA+IGRpdiB7XG4gIG1hcmdpbjogMTBweCAwcHggMTBweCA1cHg7XG59XG5cbi5jaGF0bm9kZS1idXR0b25zIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uY2hhdG5vZGUtYnV0dG9ucyA+IHRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG59XG5cbi5jaGF0bm9kZS1idXR0b25zID4gdGFibGUgPiB0ciA+IHRkIHtcbiAgd2lkdGg6IDgwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5jaGF0bm9kZS1idXR0b25zID4gdGFibGUgPiB0ciA+IHRkID4gZGl2IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2hhdG5vZGUtYnV0dG9ucyA+IHRhYmxlID4gdHIgPiB0ZCA+IGRpdiA+IC5mYSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmNoYXRub2RlLWVtcHR5IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogNXB4IDAgMTBweCAwO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/studio/chatflow/chatflow.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/components/studio/chatflow/chatflow.component.ts ***!
  \******************************************************************/
/*! exports provided: ChatFlowComponent, ChatNodeVM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatFlowComponent", function() { return ChatFlowComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatNodeVM", function() { return ChatNodeVM; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular2-hotkeys */ "./node_modules/angular2-hotkeys/index.js");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bson */ "./node_modules/bson/dist/bson.browser.esm.js");
/* harmony import */ var _models_chatflow_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../models/chatflow.models */ "./src/app/models/chatflow.models.ts");
/* harmony import */ var _services_chatflow_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/chatflow.service */ "./src/app/services/chatflow.service.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/login.service */ "./src/app/services/login.service.ts");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/settings.service */ "./src/app/services/settings.service.ts");
/* harmony import */ var _services_simulator_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/simulator.service */ "./src/app/services/simulator.service.ts");
/* harmony import */ var _shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/business-picker/business-picker.component */ "./src/app/components/shared/business-picker/business-picker.component.ts");
/* harmony import */ var _shared_publish_chatbot_publish_chatbot_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../shared/publish-chatbot/publish-chatbot.component */ "./src/app/components/shared/publish-chatbot/publish-chatbot.component.ts");
/* harmony import */ var _nodeeditor_nodeeditor_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../nodeeditor/nodeeditor.component */ "./src/app/components/studio/nodeeditor/nodeeditor.component.ts");

















let ChatFlowComponent = class ChatFlowComponent {
    constructor(chatFlowService, dialog, infoDialog, route, router, dataService, loginService, snakbar, hotkeys, globalsService, simulatorService, settings) {
        this.chatFlowService = chatFlowService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.loginService = loginService;
        this.snakbar = snakbar;
        this.hotkeys = hotkeys;
        this.globalsService = globalsService;
        this.simulatorService = simulatorService;
        this.settings = settings;
        this.projName = "";
        this.keymapOnDesigner = [
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"](["command+s", "ctrl+s"], (e, s) => {
                this.saveChatFlow();
                return false;
            }, [], "Save the chat flow"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"](["command+r", "ctrl+r"], (e, s) => {
                this.playChatFlow();
                return false;
            }, [], "Run the chat"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"]("n", (e, s) => {
                this.addNewNode();
                return false;
            }, [], "Add a new node"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"]("c", (e, s) => {
                this.cloneSelectedNodes();
                return false;
            }, [], "Clone selected nodes"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"]("esc", (e, s) => {
                this.clearSelection();
                return false;
            }, [], "Clear selection"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"]("del", (e, s) => {
                this.deleteSelectedNodes();
                return false;
            }, [], "Delete selected nodes"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"]("alt+f", (e, s) => {
                this.fitViewToAllNodes();
                return false;
            }, [], "Fit to screen"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["Hotkey"]("alt+w", (e, s) => {
                this.gotoStartup();
                return false;
            }, [], "Close the designer")
        ];
        this._isMouseDown = false;
        this.animationFrameId = 0;
        this.chatFlowNetwork = new ChatFlowNetwork(this, this.infoDialog, this.snakbar);
        this.chatFlowNetwork.newChatNodeConnection.isHidden = true;
        this._viewBoxX = 0;
        this._viewBoxY = 0;
        this._viewBoxWidth = Config.defaultDesignerWidth;
        this._viewBoxHeight = Config.defaultDesignerHeight;
        globalsService.chatFlowComponent = this;
        this.MH = new _models_chatflow_models__WEBPACK_IMPORTED_MODULE_6__["ModelHelpers"](globalsService, infoDialog);
    }
    ngOnInit() {
        this.route.queryParamMap.subscribe(x => {
            this.projName = x.get("proj");
            if (this.projName) {
                this.globalsService.setPageTitle(this.projName);
                let proj = this.settings.getChatProject(this.projName);
                if (proj)
                    this.loadChatFlowPack(proj);
                else
                    this.router.navigateByUrl("/studio");
            }
        });
        this.bindDesignerShortcuts();
    }
    ngOnDestroy() {
        this.unbindDesignerShortcuts();
    }
    chatFlowRootSVG() {
        return this.chatflowRoot.nativeElement;
    }
    documentKeyDown(event) {
        if (event.keyCode == 17) {
            this.ctrlDown = true;
        }
    }
    documentKeyUp(event) {
        if (event.keyCode == 17) {
            this.ctrlDown = false;
        }
    }
    bindDesignerShortcuts() {
        this.unbindDesignerShortcuts();
        this.keymapOnDesigner.forEach(x => this.hotkeys.add(x));
    }
    unbindDesignerShortcuts() {
        this.keymapOnDesigner.forEach(x => this.hotkeys.remove(x));
    }
    deleteSelectedNodes() {
        let selectedNodes = this.chatFlowNetwork.selectedNodes();
        if (!selectedNodes || selectedNodes.length <= 0) {
            return;
        }
        let title = `Delete ${selectedNodes.length} nodes?`;
        let message = `Are you sure, you want to delete ${selectedNodes.length} selected nodes?`;
        if (selectedNodes.length == 1) {
            let selectedNode = selectedNodes[0];
            let name = this.MH.chatNodeAlias(selectedNode.chatNode);
            title = `Delete '${name}' node?`;
            message = `Are you sure, you want to delete ${name} nodes?`;
        }
        this.infoDialog.confirm(title, message, ok => {
            if (ok) {
                this.deleteMultipleNodes(selectedNodes);
            }
        });
    }
    clearSelection() {
        this.chatFlowNetwork.chatNodeVMs.forEach(x => {
            x.isSelected = false;
        });
    }
    cloneSelectedNodes() {
        let selectedNodes = this.chatFlowNetwork.selectedNodes();
        if (!selectedNodes || selectedNodes.length <= 0) {
            return;
        }
        selectedNodes.forEach(node => {
            let cloneNode = this.globalsService.cloneNode(node.chatNode);
            if (!cloneNode)
                return;
            let newNodeVM = new ChatNodeVM(this.chatFlowNetwork, cloneNode, this.snakbar);
            newNodeVM._x = node._x + 100;
            newNodeVM._y = node._y + 100;
            newNodeVM._layoutUpdated = true; //To skip the loading indicator
        });
        this.chatFlowNetwork.updateChatNodeConnections();
        this.updateLayout();
    }
    deleteMultipleNodes(nodesVMs) {
        for (let i = 0; i < nodesVMs.length; i++) {
            let nodeVM = nodesVMs[i];
            var elementIdxToDel = this.chatFlowNetwork.chatNodeVMs.findIndex(x => x.chatNode.Id == nodeVM.chatNode.Id);
            this.chatFlowNetwork.chatNodeVMs.splice(elementIdxToDel, 1);
        }
        this.chatFlowNetwork.updateChatNodeConnections();
        this.chatFlowNetwork.parent.updateLayout();
    }
    updateLayout() {
        if (this.chatFlowNetwork &&
            this.chatFlowNetwork.chatNodeVMs &&
            this.chatFlowNetwork.chatNodeVMs.length > 0 &&
            this.chatflowRoot) {
            let ele = this.chatFlowRootSVG();
            if (ele.querySelector) {
                //Initialization issues, proceed only if querySelector is available.
                for (let i = 0; i < this.chatFlowNetwork.chatNodeVMs.length; i++) {
                    let chatNode = this.chatFlowNetwork.chatNodeVMs[i];
                    let _updateNodeLayoutInit = this.updateNodeLayout(chatNode);
                    if (!_updateNodeLayoutInit || !chatNode._layoutUpdated) {
                        window.requestAnimationFrame(() => this.updateLayout());
                        break;
                    }
                }
            }
        }
    }
    updateNodeLayout(chatNodeVM) {
        let btnsTable = this.chatFlowRootSVG().querySelector(`table[node-id='${chatNodeVM.chatNode.Id}']`);
        if (btnsTable) {
            if (!chatNodeVM._layoutUpdated)
                //If this is not done, when new section is added to the node, node's width is also increasing abnormally!
                chatNodeVM._btnTableWidth = btnsTable.getBoundingClientRect().width;
            else
                chatNodeVM._btnTableWidth = btnsTable.clientWidth;
            chatNodeVM._width =
                chatNodeVM._width > chatNodeVM._btnTableWidth
                    ? chatNodeVM._width
                    : chatNodeVM._btnTableWidth;
            window.requestAnimationFrame(() => {
                let nodeRoot = this.chatFlowRootSVG().querySelector(`div[node-id='${chatNodeVM.chatNode.Id}']`);
                chatNodeVM._height = nodeRoot.clientHeight;
                chatNodeVM._layoutUpdated = true;
            });
            return true;
        }
        return false;
    }
    ngTr(x, y) {
        return `translate(${x},${y})`;
    }
    mouseMove(event) {
        if (!this.chatFlowNetwork.newChatNodeConnection.isHidden) {
            let targetXY = this.transformCoordinates(event.pageX, event.pageY, event);
            this.chatFlowNetwork.newChatNodeConnection.destX = targetXY.x - 30;
            this.chatFlowNetwork.newChatNodeConnection.destY = targetXY.y - 30;
        }
        if (this.chatFlowNetwork.draggingChatNode) {
            try {
                let targetXY = this.transformCoordinates(event.pageX, event.pageY, event);
                let offset = this.chatFlowNetwork.draggingChatNodeOffset;
                this.chatFlowNetwork.draggingChatNode._x = targetXY.x - offset.x;
                this.chatFlowNetwork.draggingChatNode._y = targetXY.y - offset.y;
                let selectedNodes = this.chatFlowNetwork.selectedNodes();
                if (selectedNodes && selectedNodes.length > 0) {
                    for (var i = 0; i < selectedNodes.length; i++) {
                        let thisNode = selectedNodes[i];
                        let thisOffset = this.chatFlowNetwork.selectedNodeOffsets[thisNode.chatNode.Id];
                        if (thisOffset) {
                            thisNode._x = targetXY.x - thisOffset.x;
                            thisNode._y = targetXY.y - thisOffset.y;
                        }
                    }
                }
            }
            catch (e) {
                this.chatFlowNetwork.draggingChatNode._x += event.movementX;
                this.chatFlowNetwork.draggingChatNode._y += event.movementY;
            }
        }
        if (this._isMouseDown) {
            this._viewBoxX -= event.movementX;
            this._viewBoxY -= event.movementY;
        }
    }
    transformCoordinates(x, y, event) {
        let svg_elem = this.chatFlowRootSVG();
        let matrix = svg_elem.getScreenCTM();
        let point = svg_elem.createSVGPoint();
        point.x = x - event.view.pageXOffset;
        point.y = y - event.view.pageYOffset;
        return point.matrixTransform(matrix.inverse());
    }
    mouseDown(event) {
        //cancel any ongoing animation as user might have interrupted it by doing the mouse down.
        this.zoomCancel();
        //Check if mouse is captured by others
        if (this.chatFlowNetwork.newChatNodeConnection.isHidden &&
            !this.chatFlowNetwork.draggingChatNode)
            this._isMouseDown = true;
        else
            this._isMouseDown = false;
    }
    mouseUp(event) {
        this.resetDraggingState();
    }
    mouseLeave(event) {
        this.resetDraggingState();
    }
    viewBox() {
        //0 0 1000 500
        return `${this._viewBoxX} ${this._viewBoxY} ${this._viewBoxWidth} ${this._viewBoxHeight}`;
    }
    zoomToRect(x, y, width, height) {
        this._viewBoxX = x;
        this._viewBoxY = y;
        this._viewBoxWidth = width;
        this._viewBoxHeight = height;
    }
    zoomToRectWithAnimation(x, y, width, height) {
        this.zoomToRectAnimIntermediate(this._viewBoxX, this._viewBoxY, this._viewBoxWidth, this._viewBoxHeight, x, y, width, height);
    }
    zoomCancel() {
        if (this.animationFrameId)
            cancelAnimationFrame(this.animationFrameId);
    }
    zoomToRectAnimIntermediate(x1, y1, width1, height1, x2, y2, width2, height2) {
        let step = Config.viewBoxAnimStep *
            ((Math.abs(x1 - x2) +
                Math.abs(y1 - y2) +
                Math.abs(width1 - width2) +
                Math.abs(height1 - height2)) /
                100);
        this._viewBoxX = this.tendValue(x1, x2, step);
        this._viewBoxY = this.tendValue(y1, y2, step);
        this._viewBoxWidth = this.tendValue(width1, width2, step);
        this._viewBoxHeight = this.tendValue(height1, height2, step);
        if (!this.approxEquals(this._viewBoxX, x2, step) ||
            !this.approxEquals(this._viewBoxY, y2, step) ||
            !this.approxEquals(this._viewBoxWidth, width2, step) ||
            !this.approxEquals(this._viewBoxHeight, height2, step))
            this.animationFrameId = requestAnimationFrame(() => {
                this.zoomToRectAnimIntermediate(this._viewBoxX, this._viewBoxY, this._viewBoxWidth, this._viewBoxHeight, x2, y2, width2, height2);
            });
        else
            this.animationFrameId = 0;
    }
    tendValue(value, tendsTo, step) {
        return Math.abs(value - tendsTo) > step
            ? value > tendsTo
                ? value - step
                : value + step
            : value;
    }
    approxEquals(a, b, approx) {
        return Math.abs(Math.round(b) - Math.round(a)) <= Math.round(approx);
    }
    fitViewToAllNodes() {
        this.fitViewToNodes(this.chatFlowNetwork.chatNodeVMs);
    }
    fitViewToNodes(chatNodeVMs) {
        var Xs = chatNodeVMs.map(x => x._x);
        var Ys = chatNodeVMs.map(x => x._y);
        var XsWithWidth = chatNodeVMs.map(x => x._x + x._width);
        var YsWithHeight = chatNodeVMs.map(x => x._y + x._height);
        var minX = Math.min(...Xs);
        var minY = Math.min(...Ys);
        var maxX = Math.max(...XsWithWidth);
        var maxY = Math.max(...YsWithHeight);
        var width = maxX - minX;
        var height = maxY - minY;
        if (width < Config.maxZoomWidth)
            width = Config.maxZoomWidth;
        if (height < Config.maxZoomHeight)
            height = Config.maxZoomHeight;
        this.zoomToRectWithAnimation(minX, minY, width, height);
    }
    designerWheel(event) {
        event.preventDefault();
        //cancel any ongoing animation as user might have interrupted it by doing the mouse down.
        this.zoomCancel();
        let change = Config.zoomCoefficient * event.deltaY;
        if (this._viewBoxWidth - change > 0)
            this._viewBoxWidth -= change;
        if (this._viewBoxHeight - change > 0)
            this._viewBoxHeight -= change;
        if (this._viewBoxWidth < Config.maxZoomWidth)
            this._viewBoxWidth = Config.maxZoomWidth;
        if (this._viewBoxHeight < Config.maxZoomHeight)
            this._viewBoxHeight = Config.maxZoomHeight;
    }
    openEditor(chatNodeVM) {
        let dialogRef = this.dialog.open(_nodeeditor_nodeeditor_component__WEBPACK_IMPORTED_MODULE_16__["NodeEditorComponent"], {
            width: "60%",
            backdropClass: "dark-overlay",
            data: chatNodeVM.chatNode
        });
        dialogRef.afterOpen().subscribe(x => {
            this.unbindDesignerShortcuts();
        });
        dialogRef.afterClosed().subscribe(x => {
            this.bindDesignerShortcuts();
        });
    }
    addNewNode() {
        var newNodeVM = new ChatNodeVM(this.chatFlowNetwork, {
            Name: "New Node",
            Id: new bson__WEBPACK_IMPORTED_MODULE_5__["ObjectID"]().toHexString(),
            Buttons: [],
            Sections: [],
            NodeType: _models_chatflow_models__WEBPACK_IMPORTED_MODULE_6__["NodeType"].Combination
        }, this.snakbar);
        newNodeVM._x = this._viewBoxX + this._viewBoxWidth / 2 + Math.random() * 50;
        newNodeVM._y =
            this._viewBoxY + this._viewBoxHeight / 2 + Math.random() * 50;
        newNodeVM._layoutUpdated = true; //To skip the loading indicator
        this.chatFlowNetwork.updateChatNodeConnections();
        this.updateLayout();
    }
    resetDraggingState() {
        if (!this.chatFlowNetwork.newChatNodeConnection.isHidden)
            this.chatFlowNetwork.newChatNodeConnection.isHidden = true;
        if (this.chatFlowNetwork.draggingChatNode)
            delete this.chatFlowNetwork.draggingChatNode;
        this._isMouseDown = false;
    }
    loadChatFlowPack(pack) {
        if (pack.ChatNodes) {
            this.chatFlowNetwork.chatFlowPack = pack;
            this.chatFlowNetwork.chatNodeVMs = [];
            pack.ChatNodes.forEach(cn => {
                new ChatNodeVM(this.chatFlowNetwork, cn, this.snakbar);
                cn.Buttons.forEach(btn => {
                    btn.AdvancedOptions =
                        btn.VariableValue ||
                            btn.ConditionMatchKey ||
                            btn.ConditionMatchValue ||
                            btn.ConditionOperator
                            ? true
                            : false;
                });
            });
            this.chatFlowNetwork.chatNodeVMs.forEach(vm => {
                var locs = pack.NodeLocations;
                if (locs) {
                    var loc = locs[vm.chatNode.Id];
                    vm._x = loc.X;
                    vm._y = loc.Y;
                }
            });
            this.chatFlowNetwork.updateChatNodeConnections();
            this.updateLayout();
            this.initialZoom();
        }
    }
    layoutReady() {
        if (!this.chatFlowNetwork.chatNodeVMs)
            return true;
        else
            return (this.chatFlowNetwork.chatNodeVMs.filter(x => x._layoutUpdated).length ==
                this.chatFlowNetwork.chatNodeVMs.length);
    }
    initialZoom() {
        if (this.layoutReady())
            this.fitViewToAllNodes();
        else
            setTimeout(() => this.initialZoom(), 500);
    }
    saveChatFlow() {
        var nodeLocs = {};
        for (let i = 0; i < this.chatFlowNetwork.chatNodeVMs.length; i++) {
            let item = this.chatFlowNetwork.chatNodeVMs[i];
            nodeLocs[item.chatNode.Id] = {
                X: item._x,
                Y: item._y
            };
        }
        let pack = {
            ProjectId: this.chatFlowNetwork.chatFlowPack.ProjectId,
            ChatNodes: this.chatFlowNetwork.chatNodeVMs.map(x => x.chatNode),
            NodeLocations: nodeLocs,
            _id: this.chatFlowNetwork.chatFlowPack._id,
            CreatedOn: this.chatFlowNetwork.chatFlowPack.CreatedOn,
            UpdatedOn: this.chatFlowNetwork.chatFlowPack.UpdatedOn
        };
        this.settings.saveChatProject(this.projName, pack, true);
        this.snakbar.open(`Chatbot project '${this.projName}' saved`, "Dismiss", {
            duration: 2000
        });
        return pack;
    }
    exportChatFlow() {
        let pack = this.saveChatFlow();
        this.globalsService.downloadTextAsFile(this.projName + ".intelligo", JSON.stringify(pack));
    }
    playChatFlow() {
        //this.infoDialog.alert('Alert', 'Coming soon');
        let pack = this.saveChatFlow();
        if (pack.ChatNodes.filter(x => x.IsStartNode).length <= 0) {
            this.infoDialog.alert("Start node not set!", `Tick 'Mark as start node' for the initial node of your chatbot.`);
            return;
        }
        let chatNodes = this.chatFlowService.normalizeChatNodes(pack.ChatNodes);
        this.simulatorService.init(chatNodes, this.simulator);
        this.simulator.isOpen = true;
    }
    openPublishDialog() {
        this.infoDialog.showSpinner();
        this.loginService.performLogin(false, null, true, done => {
            this.infoDialog.hideSpinner();
            if (this.dataService.loggedInUser) {
                if (this.dataService.isBizAdmin() || this.dataService.isFlowManager()) {
                    this.dialog.open(_shared_publish_chatbot_publish_chatbot_component__WEBPACK_IMPORTED_MODULE_15__["PublishChatbotComponent"], {
                        width: "auto",
                        data: {
                            pack: this.saveChatFlow(),
                            bizId: this.dataService.loggedInUser.businessId
                        }
                    });
                }
                else {
                    let d = this.dialog.open(_shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_14__["BusinessPickerComponent"], {
                        width: "30%",
                        data: {
                            askFlowId: false
                        }
                    });
                    d.afterClosed().subscribe((x) => {
                        if (x && x.bizAccount) {
                            let ba = x.bizAccount;
                            this.dialog.open(_shared_publish_chatbot_publish_chatbot_component__WEBPACK_IMPORTED_MODULE_15__["PublishChatbotComponent"], {
                                width: "auto",
                                data: {
                                    pack: this.saveChatFlow(),
                                    bizId: ba.id
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    gotoStartup() {
        this.infoDialog.confirm("Save?", "Do you want to save any unsaved changes before you close?", ok => {
            if (ok)
                this.saveChatFlow();
            this.router.navigateByUrl("/studio");
        });
    }
};
ChatFlowComponent.ctorParameters = () => [
    { type: _services_chatflow_service__WEBPACK_IMPORTED_MODULE_7__["ChatFlowService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_10__["InfoDialogService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _services_data_service__WEBPACK_IMPORTED_MODULE_8__["DataService"] },
    { type: _services_login_service__WEBPACK_IMPORTED_MODULE_11__["LoginService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"] },
    { type: angular2_hotkeys__WEBPACK_IMPORTED_MODULE_4__["HotkeysService"] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_9__["GlobalsService"] },
    { type: _services_simulator_service__WEBPACK_IMPORTED_MODULE_13__["SimulatorService"] },
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_12__["SettingsService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("chatflowRoot", { static: true })
], ChatFlowComponent.prototype, "chatflowRoot", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("simulator", { static: true })
], ChatFlowComponent.prototype, "simulator", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])("document:keydown", ["$event"])
], ChatFlowComponent.prototype, "documentKeyDown", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])("document:keyup", ["$event"])
], ChatFlowComponent.prototype, "documentKeyUp", null);
ChatFlowComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-chatflow",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chatflow.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/chatflow/chatflow.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chatflow.component.scss */ "./src/app/components/studio/chatflow/chatflow.component.scss")).default]
    })
], ChatFlowComponent);

class ChatFlowNetwork {
    constructor(parent, infoDialog, snackbar) {
        this.parent = parent;
        this.infoDialog = infoDialog;
        this.snackbar = snackbar;
        this.chatNodeConnections = [];
        this.chatNodeVMs = [];
        this.newChatNodeConnection = new ChatNodeNewConnection();
        this.selectedNodeOffsets = {};
    }
    updateChatNodeConnections() {
        this.chatNodeConnections = [];
        this.chatNodeVMs.forEach(chatNodeVM => {
            chatNodeVM.chatNode.Buttons.forEach(srcBtn => {
                if (srcBtn.NextNodeId != null || srcBtn.NextNodeId != "") {
                    let destNode = this.chatNodeVMs.filter(x => x.chatNode.Id == srcBtn.NextNodeId);
                    if (destNode && destNode.length > 0)
                        this.chatNodeConnections.push(new ChatNodeConnection(new ChatButtonConnector(chatNodeVM, srcBtn, this.snackbar), destNode[0], this.infoDialog));
                }
            });
        });
    }
    selectedNodes() {
        return this.chatNodeVMs.filter(x => x.isSelected);
    }
}
class ChatNodeConnection {
    constructor(srcButtonConnector, destChatNodeVM, infoDialog) {
        this.srcButtonConnector = srcButtonConnector;
        this.destChatNodeVM = destChatNodeVM;
        this.infoDialog = infoDialog;
        this.closeButtonVisible = false;
        this.closeButtonPointX = 0;
        this.closeButtonPointY = 0;
        this.circleRadius = Config.buttonCircleRadius;
        this.pathWidth = Config.connectionPathWidth;
    }
    srcConnectorX() {
        return this.srcButtonConnector.x() - this.pathWidth / 2;
    }
    srcConnectorY() {
        return this.srcButtonConnector.y();
    }
    destConnectorX() {
        return this.destChatNodeVM.nodeConnectorX() - this.pathWidth / 2;
    }
    destConnectorY() {
        return this.destChatNodeVM.nodeConnectorY();
    }
    calcTangentOffset(pt1X, pt2X) {
        return (pt2X - pt1X) / 2;
    }
    calcSrcTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destConnectorX();
        return pt1X + this.calcTangentOffset(pt1X, pt2X);
    }
    calcSrcTangentY() {
        return this.srcConnectorY();
    }
    calcDestTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destConnectorX();
        return pt2X - this.calcTangentOffset(pt1X, pt2X);
    }
    calcDestTangentY() {
        return this.destConnectorY();
    }
    path() {
        return `M${this.srcConnectorX()},${this.srcConnectorY()} 
                C${this.calcSrcTangentX()},${this.calcSrcTangentY()} 
                  ${this.calcDestTangentX()},${this.calcDestTangentY()} 
                ${this.destConnectorX()},${this.destConnectorY()} M${this.srcConnectorX()},${this.srcConnectorY()} 
                C${this.calcSrcTangentX()},${this.calcSrcTangentY()} 
                  ${this.calcDestTangentX()},${this.calcDestTangentY()} 
                ${this.destConnectorX()},${this.destConnectorY()}`; //double path to render connections with hollow shapes
    }
    mouseEnter(event) {
        let xy = this.destChatNodeVM.network.parent.transformCoordinates(event.pageX, event.pageY, event);
        this.closeButtonPointX = xy.x; //some offset from the cursor
        this.closeButtonPointY = xy.y; //some offset from the cursor
        this.closeButtonVisible = true;
        setTimeout(() => {
            this.closeButtonVisible = false;
        }, 50000); //Hide the close button after 5secs
    }
    remove(event) {
        this.infoDialog.confirm("Delete connection?", `This will delete the connection between the button '${this
            .srcButtonConnector.button.ButtonName ||
            "Unnamed Button"}' and node '${this.destChatNodeVM.chatNode.Name ||
            "Unnamed Node"}'. Are you sure?`, ok => {
            if (ok) {
                this.srcButtonConnector.setButtonNextNodeId(null);
                this.destChatNodeVM.network.updateChatNodeConnections();
            }
        });
    }
}
class ChatNodeNewConnection {
    constructor() {
        this.isHidden = false;
        this.canConnect = false;
        this.circleRadius = Config.buttonCircleRadius;
    }
    srcConnectorX() {
        if (this.srcButtonConnector)
            return this.srcButtonConnector.x();
        return 0;
    }
    srcConnectorY() {
        if (this.srcButtonConnector)
            return this.srcButtonConnector.y();
        return 0;
    }
    calcTangentOffset(pt1X, pt2X) {
        return (pt2X - pt1X) / 2;
    }
    calcSrcTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destX;
        return pt1X + this.calcTangentOffset(pt1X, pt2X);
    }
    calcSrcTangentY() {
        return this.srcConnectorY();
    }
    calcDestTangentX() {
        let pt1X = this.srcConnectorX();
        let pt2X = this.destX;
        return pt2X - this.calcTangentOffset(pt1X, pt2X);
    }
    calcDestTangentY() {
        return this.destY;
    }
    path() {
        if (this.isHidden)
            return "M 0,0";
        return `M${this.srcConnectorX()},${this.srcConnectorY()} 
                C${this.calcSrcTangentX()},${this.calcSrcTangentY()} 
                  ${this.calcDestTangentX()},${this.calcDestTangentY()} 
                ${this.destX},${this.destY}`;
    }
}
class ChatButtonConnector {
    constructor(chatNodeVM, button, snackbar) {
        this.chatNodeVM = chatNodeVM;
        this.button = button;
        this.snackbar = snackbar;
        this.circleRadius = Config.buttonCircleRadius;
    }
    x() {
        let btns = this.chatNodeVM.chatNode.Buttons;
        let btnsCount = btns.length;
        let eachPart = this.chatNodeVM.width() / btnsCount;
        let _x = this.chatNodeVM.x() +
            eachPart * (this.btnIndex() + 1) -
            eachPart / 2 -
            this.chatNodeVM.circleRadius;
        return _x;
    }
    y() {
        var _y = this.chatNodeVM.y() + this.chatNodeVM.height();
        //console.log("YY- " + this.chatNodeVM.chatNode.Name + ": " + this.chatNodeVM.height());
        return _y;
    }
    mouseDown(event) {
        let nw = this.chatNodeVM.network;
        if (nw.newChatNodeConnection.isHidden)
            nw.newChatNodeConnection.isHidden = false;
        nw.newChatNodeConnection.srcButtonConnector = this;
        nw.newChatNodeConnection.destX = this.x();
        nw.newChatNodeConnection.destY = this.y();
    }
    btnIndex() {
        let btns = this.chatNodeVM.chatNode.Buttons;
        return btns.indexOf(this.button);
    }
    setButtonNextNodeId(nextNodeId) {
        this.button.NextNodeId = nextNodeId;
        this.chatNodeVM.network.updateChatNodeConnections();
    }
    startDirectConnection(event) {
        this.chatNodeVM.network.clickConnectionStartButton = this;
        if (this.chatNodeVM.network.clickConnectionStartSnackbar) {
            this.chatNodeVM.network.clickConnectionStartSnackbar.dismiss();
            this.chatNodeVM.network.clickConnectionStartSnackbar = null;
        }
        this.chatNodeVM.network.clickConnectionStartSnackbar = this.snackbar.open(`Connection started at button '${this.button.ButtonName}' of node '${this.chatNodeVM.chatNode.Name}'. Click on the target node to connect.`, "Abort");
        this.chatNodeVM.network.clickConnectionStartSnackbar
            .onAction()
            .subscribe(() => {
            this.chatNodeVM.network.clickConnectionStartButton = null;
        });
    }
    isConnected() {
        return (this.button.NextNodeId &&
            this.chatNodeVM.network.chatNodeVMs.filter(x => x.chatNode.Id == this.button.NextNodeId).length > 0);
    }
}
class ChatNodeVM {
    constructor(network, chatNode, snackbar) {
        this.network = network;
        this.chatNode = chatNode;
        this.snackbar = snackbar;
        this._layoutUpdated = false;
        this._x = 0;
        this._y = 0;
        this._btnTableWidth = Config.defaultNodeWidth;
        this._width = Config.defaultNodeWidth;
        this._height = Config.defaultNodeHeight;
        this.cornerRadius = Config.defaultNodeCornerRadius;
        this.headerHeight = Config.defaultNodeHeaderHeight;
        this.circleRadius = Config.buttonCircleRadius;
        this.isSelected = false;
        this.network.chatNodeVMs.push(this);
        this._x = this.network.chatNodeVMs.indexOf(this) * Config.defaultNodeWidth;
    }
    width() {
        return this._width;
    }
    height() {
        return this._height;
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
    }
    mouseDown(event) {
        if (!this.network.parent.ctrlDown &&
            this.network.selectedNodes().length <= 1) {
            this.network.parent.clearSelection();
        }
        this.toggleSelection();
        this.network.draggingChatNode = this;
        let targetXY = this.network.parent.transformCoordinates(event.pageX, event.pageY, event);
        let mouseOffsetX = targetXY.x - this._x;
        let mouseOffsetY = targetXY.y - this._y;
        this.network.draggingChatNodeOffset = new Point(mouseOffsetX, mouseOffsetY);
        this.network.selectedNodeOffsets = {}; //clearing
        let selectedNodes = this.network.selectedNodes();
        if (selectedNodes && selectedNodes.length > 0) {
            selectedNodes.forEach(n => {
                let mouseOffset = {
                    x: targetXY.x - n._x,
                    y: targetXY.y - n._y
                };
                this.network.selectedNodeOffsets[n.chatNode.Id] = new Point(mouseOffset.x, mouseOffset.y);
            });
        }
    }
    mouseUp(event) {
        let nw = this.network;
        if (!nw.newChatNodeConnection.isHidden) {
            nw.newChatNodeConnection.srcButtonConnector.setButtonNextNodeId(this.chatNode.Id);
        }
    }
    mouseEnter(event) {
        let nw = this.network;
        if (!nw.newChatNodeConnection.isHidden) {
            nw.newChatNodeConnection.canConnect = true;
        }
    }
    mouseLeave(event) {
        let nw = this.network;
        if (!nw.newChatNodeConnection.isHidden) {
            nw.newChatNodeConnection.canConnect = false;
        }
    }
    chatButtonConnectors() {
        return this.chatNode.Buttons.map(btn => new ChatButtonConnector(this, btn, this.snackbar));
    }
    nodeConnectorY() {
        return this.y();
    }
    nodeConnectorX() {
        return this.x() + this.width() / 2 - this.circleRadius;
    }
    clickConnectionActive() {
        return this.network.clickConnectionStartButton;
    }
    nodeClick() {
        if (this.clickConnectionActive()) {
            this.network.clickConnectionStartButton.setButtonNextNodeId(this.chatNode.Id);
            this.network.clickConnectionStartButton = null;
            this.network.clickConnectionStartSnackbar.dismiss();
        }
        else {
            if (!this.network.parent.ctrlDown &&
                this.network.selectedNodes().length > 1) {
                this.network.parent.clearSelection();
            }
        }
    }
    toggleSelection() {
        this.isSelected = !this.isSelected;
    }
    isNodeEmpty() {
        if ((!this.chatNode.Sections || this.chatNode.Sections.length <= 0) &&
            (!this.chatNode.Buttons || this.chatNode.Buttons.length <= 0)) {
            return true;
        }
        else {
            return false;
        }
    }
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Config {
}
Config.defaultNodeWidth = 300;
Config.defaultNodeHeight = 200;
Config.defaultNodeHeaderHeight = 30;
Config.defaultNodeCornerRadius = 20;
Config.defaultSectionWidth = 30;
Config.defaultSectionHeight = 30;
Config.defaultDesignerWidth = 1366;
Config.defaultDesignerHeight = 700;
Config.buttonCircleRadius = 8;
Config.designerMargin = 40;
Config.connectionPathWidth = 3;
Config.zoomCoefficient = 0.3;
Config.viewBoxAnimStep = 10;
Config.maxZoomHeight = 600;
Config.maxZoomWidth = 900;


/***/ }),

/***/ "./src/app/components/studio/landing/landing.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/components/studio/landing/landing.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n}\n\nmat-form-field,\nmat-select {\n  width: 100%;\n}\n\n.bottom-actions > button {\n  margin: 20px 10px;\n}\n\nbutton[color=primary] {\n  color: white;\n}\n\nmat-action-row > button {\n  margin: 10px;\n}\n\n.bottom-actions {\n  display: block;\n  text-align: center;\n}\n\n.list-action-btn {\n  float: right;\n}\n\n.list-item {\n  width: 100%;\n}\n\n.mat-expansion-panel-body {\n  display: none !important;\n}\n\n.app-content {\n  width: 700px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 40px;\n  padding-bottom: 40px;\n}\n\n.page-title {\n  display: flex;\n  flex-direction: row;\n}\n\n.page-title .text {\n  flex-grow: 1;\n}\n\n.page-title-actions button:first-child {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vbGFuZGluZy9EOlxcbGVhcm5pbmctcHJvamVjdHNcXGNoYXRib3RzLm1uXFxzdHVkaW8vc3JjXFxhcHBcXGNvbXBvbmVudHNcXHN0dWRpb1xcbGFuZGluZ1xcbGFuZGluZy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtBQ0NGOztBREVBOztFQUVFLFdBQUE7QUNDRjs7QURFQTtFQUNFLGlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7QUNDRjs7QURFQTtFQUNFLHdCQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbn1cblxubWF0LWZvcm0tZmllbGQsXG5tYXQtc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5ib3R0b20tYWN0aW9ucyA+IGJ1dHRvbiB7XG4gIG1hcmdpbjogMjBweCAxMHB4O1xufVxuXG5idXR0b25bY29sb3I9XCJwcmltYXJ5XCJdIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5tYXQtYWN0aW9uLXJvdyA+IGJ1dHRvbiB7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmJvdHRvbS1hY3Rpb25zIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmxpc3QtYWN0aW9uLWJ0biB7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmxpc3QtaXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ubWF0LWV4cGFuc2lvbi1wYW5lbC1ib2R5IHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uYXBwLWNvbnRlbnQge1xuICB3aWR0aDogNzAwcHg7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIG1hcmdpbi10b3A6IDQwcHg7XG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xufVxuXG4ucGFnZS10aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbi5wYWdlLXRpdGxlIC50ZXh0IHtcbiAgZmxleC1ncm93OiAxO1xufVxuXG4ucGFnZS10aXRsZS1hY3Rpb25zIGJ1dHRvbjpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG4iLCI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5tYXQtZm9ybS1maWVsZCxcbm1hdC1zZWxlY3Qge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmJvdHRvbS1hY3Rpb25zID4gYnV0dG9uIHtcbiAgbWFyZ2luOiAyMHB4IDEwcHg7XG59XG5cbmJ1dHRvbltjb2xvcj1wcmltYXJ5XSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxubWF0LWFjdGlvbi1yb3cgPiBidXR0b24ge1xuICBtYXJnaW46IDEwcHg7XG59XG5cbi5ib3R0b20tYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5saXN0LWFjdGlvbi1idG4ge1xuICBmbG9hdDogcmlnaHQ7XG59XG5cbi5saXN0LWl0ZW0ge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLm1hdC1leHBhbnNpb24tcGFuZWwtYm9keSB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuLmFwcC1jb250ZW50IHtcbiAgd2lkdGg6IDcwMHB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiA0MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcbn1cblxuLnBhZ2UtdGl0bGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4ucGFnZS10aXRsZSAudGV4dCB7XG4gIGZsZXgtZ3JvdzogMTtcbn1cblxuLnBhZ2UtdGl0bGUtYWN0aW9ucyBidXR0b246Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/studio/landing/landing.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/components/studio/landing/landing.component.ts ***!
  \****************************************************************/
/*! exports provided: LandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingComponent", function() { return LandingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bson */ "./node_modules/bson/dist/bson.browser.esm.js");
/* harmony import */ var _models_chatflow_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../models/chatflow.models */ "./src/app/models/chatflow.models.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/settings.service */ "./src/app/services/settings.service.ts");









let LandingComponent = class LandingComponent {
    constructor(router, globals, infoDialog, settings, translate) {
        this.router = router;
        this.globals = globals;
        this.infoDialog = infoDialog;
        this.settings = settings;
        this.translate = translate;
        this.savedProjects = [];
        this.globals.setPageTitle();
        this.loadSavedProjects();
    }
    loadSavedProjects() {
        this.savedProjects = this.settings.listSavedChatProjectNames();
    }
    ngOnInit() { }
    fileInputChange() {
        let fileInput = this.fileInput.nativeElement;
        if (fileInput.files && fileInput.files[0]) {
            let selectedFile = fileInput.files[0];
            fileInput.value = '';
            if (selectedFile.name.endsWith('.intelligo')) {
                let reader = new FileReader();
                reader.onload = evt => {
                    let pack = JSON.parse(reader.result.toString());
                    let projName = selectedFile.name.replace(new RegExp('.intelligo$'), '');
                    this.settings.saveChatProject(projName, pack, false, () => {
                        this.openChatBotProject(projName);
                    });
                };
                reader.onerror = () => {
                    this.infoDialog.alert(this.translate.instant('home.oops'), this.translate.instant('home.unable-load'));
                };
                reader.readAsText(selectedFile, 'UTF-8');
            }
            else
                this.infoDialog.alert(this.translate.instant('home.oops'), this.translate.instant('home.invalid-project-file'));
        }
    }
    searchedProjects() {
        if (this.search && this.search.length > 0)
            return this.savedProjects.filter(x => x.toLowerCase().indexOf(this.search.toLowerCase()) != -1);
        return this.savedProjects;
    }
    addProject() {
        this.infoDialog.prompt(this.translate.instant('home.project-name'), this.translate.instant('home.project-name-description'), name => {
            if (!name)
                return;
            let firstNode = {
                Name: 'New Node',
                Id: new bson__WEBPACK_IMPORTED_MODULE_4__["ObjectID"]().toHexString(),
                Buttons: [],
                Sections: [],
                NodeType: _models_chatflow_models__WEBPACK_IMPORTED_MODULE_5__["NodeType"].Combination,
                TimeoutInMs: 0,
            };
            let _id = new bson__WEBPACK_IMPORTED_MODULE_4__["ObjectID"]().toHexString();
            let defaultFlow = {
                ChatNodes: [firstNode],
                CreatedOn: new Date(),
                UpdatedOn: new Date(),
                NodeLocations: {},
                ProjectId: _id,
                _id: _id,
            };
            defaultFlow.NodeLocations[firstNode.Id] = { X: 500, Y: 500 };
            this.settings.saveChatProject(name, defaultFlow, false, () => {
                this.openChatBotProject(name);
            });
        });
    }
    isExpanded(proj) {
        return this.savedProjects.indexOf(proj) == this.savedProjects.length - 1;
    }
    openChatBotProject(name) {
        this.router.navigateByUrl('/studio/designer?proj=' + encodeURIComponent(name));
    }
    renameChatBotProject(name) {
        this.infoDialog.prompt(this.translate.instant('home.rename'), this.translate.instant('home.enter-new-name'), newName => {
            if (newName && name != newName) {
                this.settings.renameChatProject(name, newName);
                this.loadSavedProjects();
            }
        }, name);
    }
    deleteChatBotProject(name) {
        this.infoDialog.confirm(this.translate.instant('home.delete'), this.translate.instant('home.delete-description') + ' ' + name, ok => {
            if (ok) {
                this.settings.deleteChatProject(name);
                this.loadSavedProjects();
            }
        });
    }
    downloadChatBotProject(name) {
        let pack = this.settings.getChatProject(name);
        this.globals.downloadTextAsFile(name + '.intelligo', JSON.stringify(pack));
    }
};
LandingComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_6__["GlobalsService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_7__["InfoDialogService"] },
    { type: _services_settings_service__WEBPACK_IMPORTED_MODULE_8__["SettingsService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('fileInput', { static: false })
], LandingComponent.prototype, "fileInput", void 0);
LandingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-studio-landing',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./landing.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/landing/landing.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./landing.component.scss */ "./src/app/components/studio/landing/landing.component.scss")).default]
    })
], LandingComponent);



/***/ }),

/***/ "./src/app/components/studio/nodeeditor/nodeeditor.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/components/studio/nodeeditor/nodeeditor.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field,\nmat-select {\n  width: 100%;\n}\n\n.text-section-icon {\n  font-size: 20px;\n}\n\n.tab-content {\n  margin: 20px;\n}\n\n.col-centered {\n  float: none;\n  margin: 0 auto;\n}\n\n.panel-header-icon {\n  margin-top: 2px;\n  margin-right: 5px;\n}\n\n.spacing {\n  width: 20px;\n  display: inline-block;\n}\n\n.dialog-actions {\n  margin: 10px;\n}\n\nmat-dialog-actions {\n  justify-content: center;\n}\n\n.section-type-button {\n  width: 110px;\n  height: 110px;\n  padding: 11px;\n  cursor: pointer;\n}\n\n.section-type-button.text {\n  content: url('text.png');\n}\n\n.section-type-button.text:hover {\n  content: url('text-hover.png');\n  padding: 0;\n}\n\n.section-type-button.image {\n  content: url('image.png');\n}\n\n.section-type-button.image:hover {\n  content: url('image-hover.png');\n  padding: 0;\n}\n\n.section-type-button.video {\n  content: url('video.png');\n}\n\n.section-type-button.video:hover {\n  content: url('video-hover.png');\n  padding: 0;\n}\n\n.section-type-button.gif {\n  content: url('gif.png');\n}\n\n.section-type-button.gif:hover {\n  content: url('gif-hover.png');\n  padding: 0;\n}\n\n.section-type-button.carousel {\n  content: url('carousel.png');\n}\n\n.section-type-button.carousel:hover {\n  content: url('carousel-hover.png');\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vbm9kZWVkaXRvci9EOlxcbGVhcm5pbmctcHJvamVjdHNcXGNoYXRib3RzLm1uXFxzdHVkaW8vc3JjXFxhcHBcXGNvbXBvbmVudHNcXHN0dWRpb1xcbm9kZWVkaXRvclxcbm9kZWVkaXRvci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vbm9kZWVkaXRvci9ub2RlZWRpdG9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVFLFdBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7RUFDQSxjQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7RUFDQSxxQkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0UsdUJBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUNDRjs7QURFQTtFQUNFLHdCQUFBO0FDQ0Y7O0FERUE7RUFDRSw4QkFBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLHlCQUFBO0FDQ0Y7O0FERUE7RUFDRSwrQkFBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLHlCQUFBO0FDQ0Y7O0FERUE7RUFDRSwrQkFBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLHVCQUFBO0FDQ0Y7O0FERUE7RUFDRSw2QkFBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLDRCQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQ0FBQTtFQUNBLFVBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc3R1ZGlvL25vZGVlZGl0b3Ivbm9kZWVkaXRvci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1mb3JtLWZpZWxkLFxubWF0LXNlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4udGV4dC1zZWN0aW9uLWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG59XG5cbi50YWItY29udGVudCB7XG4gIG1hcmdpbjogMjBweDtcbn1cblxuLmNvbC1jZW50ZXJlZCB7XG4gIGZsb2F0OiBub25lO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLnBhbmVsLWhlYWRlci1pY29uIHtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuLnNwYWNpbmcge1xuICB3aWR0aDogMjBweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4uZGlhbG9nLWFjdGlvbnMge1xuICBtYXJnaW46IDEwcHg7XG59XG5cbm1hdC1kaWFsb2ctYWN0aW9ucyB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uc2VjdGlvbi10eXBlLWJ1dHRvbiB7XG4gIHdpZHRoOiAxMTBweDtcbiAgaGVpZ2h0OiAxMTBweDtcbiAgcGFkZGluZzogMTFweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc2VjdGlvbi10eXBlLWJ1dHRvbi50ZXh0IHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci90ZXh0LnBuZ1wiKTtcbn1cblxuLnNlY3Rpb24tdHlwZS1idXR0b24udGV4dDpob3ZlciB7XG4gIGNvbnRlbnQ6IHVybChcIi4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvbm9kZS1lZGl0b3IvdGV4dC1ob3Zlci5wbmdcIik7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLmltYWdlIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci9pbWFnZS5wbmdcIik7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLmltYWdlOmhvdmVyIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci9pbWFnZS1ob3Zlci5wbmdcIik7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLnZpZGVvIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci92aWRlby5wbmdcIik7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLnZpZGVvOmhvdmVyIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci92aWRlby1ob3Zlci5wbmdcIik7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLmdpZiB7XG4gIGNvbnRlbnQ6IHVybChcIi4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvbm9kZS1lZGl0b3IvZ2lmLnBuZ1wiKTtcbn1cblxuLnNlY3Rpb24tdHlwZS1idXR0b24uZ2lmOmhvdmVyIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci9naWYtaG92ZXIucG5nXCIpO1xuICBwYWRkaW5nOiAwO1xufVxuXG4uc2VjdGlvbi10eXBlLWJ1dHRvbi5jYXJvdXNlbCB7XG4gIGNvbnRlbnQ6IHVybChcIi4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvbm9kZS1lZGl0b3IvY2Fyb3VzZWwucG5nXCIpO1xufVxuXG4uc2VjdGlvbi10eXBlLWJ1dHRvbi5jYXJvdXNlbDpob3ZlciB7XG4gIGNvbnRlbnQ6IHVybChcIi4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvbm9kZS1lZGl0b3IvY2Fyb3VzZWwtaG92ZXIucG5nXCIpO1xuICBwYWRkaW5nOiAwO1xufVxuIiwibWF0LWZvcm0tZmllbGQsXG5tYXQtc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi50ZXh0LXNlY3Rpb24taWNvbiB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLnRhYi1jb250ZW50IHtcbiAgbWFyZ2luOiAyMHB4O1xufVxuXG4uY29sLWNlbnRlcmVkIHtcbiAgZmxvYXQ6IG5vbmU7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ucGFuZWwtaGVhZGVyLWljb24ge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG4uc3BhY2luZyB7XG4gIHdpZHRoOiAyMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5kaWFsb2ctYWN0aW9ucyB7XG4gIG1hcmdpbjogMTBweDtcbn1cblxubWF0LWRpYWxvZy1hY3Rpb25zIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uIHtcbiAgd2lkdGg6IDExMHB4O1xuICBoZWlnaHQ6IDExMHB4O1xuICBwYWRkaW5nOiAxMXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLnRleHQge1xuICBjb250ZW50OiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1nL25vZGUtZWRpdG9yL3RleHQucG5nXCIpO1xufVxuXG4uc2VjdGlvbi10eXBlLWJ1dHRvbi50ZXh0OmhvdmVyIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci90ZXh0LWhvdmVyLnBuZ1wiKTtcbiAgcGFkZGluZzogMDtcbn1cblxuLnNlY3Rpb24tdHlwZS1idXR0b24uaW1hZ2Uge1xuICBjb250ZW50OiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1nL25vZGUtZWRpdG9yL2ltYWdlLnBuZ1wiKTtcbn1cblxuLnNlY3Rpb24tdHlwZS1idXR0b24uaW1hZ2U6aG92ZXIge1xuICBjb250ZW50OiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1nL25vZGUtZWRpdG9yL2ltYWdlLWhvdmVyLnBuZ1wiKTtcbiAgcGFkZGluZzogMDtcbn1cblxuLnNlY3Rpb24tdHlwZS1idXR0b24udmlkZW8ge1xuICBjb250ZW50OiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1nL25vZGUtZWRpdG9yL3ZpZGVvLnBuZ1wiKTtcbn1cblxuLnNlY3Rpb24tdHlwZS1idXR0b24udmlkZW86aG92ZXIge1xuICBjb250ZW50OiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1nL25vZGUtZWRpdG9yL3ZpZGVvLWhvdmVyLnBuZ1wiKTtcbiAgcGFkZGluZzogMDtcbn1cblxuLnNlY3Rpb24tdHlwZS1idXR0b24uZ2lmIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci9naWYucG5nXCIpO1xufVxuXG4uc2VjdGlvbi10eXBlLWJ1dHRvbi5naWY6aG92ZXIge1xuICBjb250ZW50OiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1nL25vZGUtZWRpdG9yL2dpZi1ob3Zlci5wbmdcIik7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLmNhcm91c2VsIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci9jYXJvdXNlbC5wbmdcIik7XG59XG5cbi5zZWN0aW9uLXR5cGUtYnV0dG9uLmNhcm91c2VsOmhvdmVyIHtcbiAgY29udGVudDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9ub2RlLWVkaXRvci9jYXJvdXNlbC1ob3Zlci5wbmdcIik7XG4gIHBhZGRpbmc6IDA7XG59Il19 */");

/***/ }),

/***/ "./src/app/components/studio/nodeeditor/nodeeditor.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/components/studio/nodeeditor/nodeeditor.component.ts ***!
  \**********************************************************************/
/*! exports provided: NodeEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeEditorComponent", function() { return NodeEditorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-hotkeys */ "./node_modules/angular2-hotkeys/index.js");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_hotkeys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../models/chatflow.models */ "./src/app/models/chatflow.models.ts");
/* harmony import */ var _services_chatflow_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/chatflow.service */ "./src/app/services/chatflow.service.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");








let NodeEditorComponent = class NodeEditorComponent {
    constructor(chatFlowService, hotkeys, infoDialog, dialogRef, chatNode, globalsService) {
        this.chatFlowService = chatFlowService;
        this.hotkeys = hotkeys;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.chatNode = chatNode;
        this.globalsService = globalsService;
        this.contentTabIndex = 1;
        this.keymapOnNodeEditor = [
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_3__["Hotkey"](["t", "alt+t"], (e, s) => {
                this.addNewSectionText();
                return false;
            }, [], "Add a new text content (if applicable)"),
            new angular2_hotkeys__WEBPACK_IMPORTED_MODULE_3__["Hotkey"](["b", "alt+b"], (e, s) => {
                this.addNewButton();
                return false;
            }, [], "Add a new button")
        ];
        this.SectionType = _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"];
        this.MH = new _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ModelHelpers"](globalsService, infoDialog);
    }
    bindNodeEditorShortcuts() {
        this.unbindNodeEditorShortcuts();
        this.keymapOnNodeEditor.forEach(x => this.hotkeys.add(x));
    }
    unbindNodeEditorShortcuts() {
        this.keymapOnNodeEditor.forEach(x => this.hotkeys.remove(x));
    }
    ngOnDestroy() {
        this.unbindNodeEditorShortcuts();
    }
    ngOnInit() {
        this.bindNodeEditorShortcuts();
        if (this.chatNode &&
            this.contentTabVisible() &&
            this.chatNode.Sections.length > 0) {
            this.tabGroup.selectedIndex = this.contentTabIndex;
        }
    }
    contentTabVisible() {
        return ["Card", "Combination"].indexOf(this.chatNode.NodeType) != -1;
    }
    addNewSectionText() {
        if (this.contentTab) {
            let newIndex = this.tabGroup._tabs
                .toArray()
                .findIndex(x => x.textLabel == this.contentTab.textLabel);
            if (this.tabGroup.selectedIndex == newIndex) {
                this.MH.addSection(this.chatNode, _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Text);
            }
            else {
                this.tabGroup.selectedIndex = newIndex;
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        this.MH.addSection(this.chatNode, _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Text);
                    });
                }, 500);
            }
        }
    }
    addNewButton() {
        if (this.buttonsTab) {
            let newIndex = this.tabGroup._tabs
                .toArray()
                .findIndex(x => x.textLabel == this.buttonsTab.textLabel);
            if (this.tabGroup.selectedIndex == newIndex) {
                this.MH.addButton(this.chatNode);
            }
            else {
                this.tabGroup.selectedIndex = newIndex;
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        this.MH.addButton(this.chatNode);
                    });
                }, 500);
            }
        }
    }
    dismiss() {
        this.dialogRef.close();
    }
};
NodeEditorComponent.ctorParameters = () => [
    { type: _services_chatflow_service__WEBPACK_IMPORTED_MODULE_5__["ChatFlowService"] },
    { type: angular2_hotkeys__WEBPACK_IMPORTED_MODULE_3__["HotkeysService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_7__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_6__["GlobalsService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("nodeInfoTab", { static: false })
], NodeEditorComponent.prototype, "nodeInfoTab", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("contentTab", { static: false })
], NodeEditorComponent.prototype, "contentTab", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("buttonsTab", { static: false })
], NodeEditorComponent.prototype, "buttonsTab", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("tabGroup", { static: false })
], NodeEditorComponent.prototype, "tabGroup", void 0);
NodeEditorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-nodeeditor",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./nodeeditor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/nodeeditor/nodeeditor.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./nodeeditor.component.scss */ "./src/app/components/studio/nodeeditor/nodeeditor.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
], NodeEditorComponent);



/***/ }),

/***/ "./src/app/components/studio/simulator-frame/simulator-frame.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/components/studio/simulator-frame/simulator-frame.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".intelligo-full {\n  width: 100%;\n  height: 100%;\n}\n\n.intelligo-root {\n  z-index: 10;\n  position: fixed;\n  bottom: 35px;\n  right: 20px;\n  background-color: transparent;\n  font-family: \"Open Sans\";\n  display: block;\n}\n\n.intelligo-frame-container {\n  box-shadow: 0px 6px 40px 1px rgba(0, 0, 0, 0.36);\n  border-radius: 10px !important;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  background-color: #f5f5f5;\n}\n\n.intelligo-full-screen {\n  background-color: rgba(0, 0, 0, 0.84);\n}\n\n.intelligo-iframe {\n  border: none;\n  width: 100%;\n  flex-grow: 1;\n  border-radius: inherit;\n}\n\n.intelligo-content {\n  display: inline;\n}\n\n.intelligo-content > .title {\n  font-weight: bold;\n  font-size: 18px;\n  position: relative;\n}\n\n.intelligo-content > .subtitle {\n  font-size: 11px;\n}\n\n.intelligo-online-dot {\n  border-radius: 5px;\n  height: 5px;\n  width: 5px;\n  background-color: #00df50;\n  border: 1px solid white;\n  position: absolute;\n  bottom: 4px;\n  transform: translate(4px, -0.5px);\n}\n\n.intelligo-actions > img {\n  width: 50px;\n}\n\n.intelligo-minmax-btn {\n  z-index: 15;\n  position: fixed;\n  right: 20px;\n  bottom: 20px;\n  background-color: #5e72e4;\n  height: 60px;\n  width: 60px;\n  border-radius: 60px !important;\n  cursor: pointer;\n  box-shadow: 0px 6px 40px 1px rgba(0, 0, 0, 0.36);\n}\n\n.intelligo-minmax-btn:hover {\n  box-shadow: 0px 6px 40px 4px rgba(0, 0, 0, 0.36);\n}\n\n.intelligo-minmax-btn > img,\n.intelligo-minmax-btn > .max-btn {\n  width: 36px;\n  height: 36px;\n  margin: 12px;\n}\n\n.intelligo-min.intelligo-root {\n  /*display: none;*/\n}\n\n@-webkit-keyframes maximizeAnimation {\n  0% {\n    opacity: 0;\n    width: 0px;\n    height: 0px;\n  }\n  100% {\n    opacity: 1;\n    width: 360px;\n    height: 70vh;\n  }\n}\n\n@keyframes maximizeAnimation {\n  0% {\n    opacity: 0;\n    width: 0px;\n    height: 0px;\n  }\n  100% {\n    opacity: 1;\n    width: 360px;\n    height: 70vh;\n  }\n}\n\n.maximizeAnimation {\n  -webkit-animation-name: maximizeAnimation;\n  animation-name: maximizeAnimation;\n  -webkit-animation-duration: 0.3s;\n  animation-duration: 0.3s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n@-webkit-keyframes minimizeAnimation {\n  0% {\n    opacity: 1;\n    width: 360px;\n    height: 70vh;\n  }\n  100% {\n    opacity: 0;\n    display: none;\n    width: 0px;\n    height: 0px;\n  }\n}\n\n@keyframes minimizeAnimation {\n  0% {\n    opacity: 1;\n    width: 360px;\n    height: 70vh;\n  }\n  100% {\n    opacity: 0;\n    display: block;\n    width: 0px;\n    height: 0px;\n  }\n}\n\n.minimizeAnimation {\n  -webkit-animation-name: minimizeAnimation;\n  animation-name: minimizeAnimation;\n  -webkit-animation-duration: 0.3s;\n  animation-duration: 0.3s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.intelligo-hidden {\n  display: none;\n}\n\n.intelligo-max.intelligo-minmax-btn {\n  border-radius: 3px !important;\n  height: 24px;\n  width: 24px;\n  box-shadow: none;\n  background-color: transparent;\n  position: absolute;\n  top: 15px;\n  right: 10px;\n}\n\n.intelligo-max.intelligo-minmax-btn > .max-btn {\n  display: none;\n}\n\n.intelligo-max.intelligo-minmax-btn > .min-btn {\n  display: block;\n  opacity: 0.6;\n}\n\n.powered-by-intelligo {\n  font-size: 11px;\n  text-align: right;\n  z-index: 20;\n  position: absolute;\n  bottom: -22px;\n  width: 100%;\n  display: none;\n}\n\n.powered-by-intelligo > div {\n  display: inline;\n  /*background-color: #F5F5F5;*/\n  border-radius: 0 0 10px 10px;\n  padding: 6px 24px;\n  /*box-shadow: 0px 20px 40px 1px rgba(0,0,0,0.36)*/\n}\n\n.intelligo-link {\n  color: #3c3c3c;\n  text-decoration: none;\n}\n\n.intelligo-link:hover {\n  text-decoration: underline;\n}\n\n/* Smartphones (portrait and landscape) ----------- */\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .intelligo-root {\n    position: fixed;\n    bottom: 0;\n    right: 0;\n    border: 0;\n    height: 100%;\n    width: 100vw;\n    color: #3c3c3c;\n  }\n\n  .powered-by-intelligo {\n    display: none;\n  }\n\n  @-webkit-keyframes maximizeAnimation {\n    0% {\n      opacity: 0;\n      width: 0px;\n      height: 0px;\n    }\n    100% {\n      opacity: 1;\n      width: 100vw;\n      height: 100%;\n    }\n  }\n  @keyframes maximizeAnimation {\n    0% {\n      opacity: 0;\n      width: 0px;\n      height: 0px;\n    }\n    100% {\n      opacity: 1;\n      width: 100vw;\n      height: 100%;\n    }\n  }\n  @-webkit-keyframes minimizeAnimation {\n    0% {\n      opacity: 1;\n      width: 100vw;\n      height: 100%;\n    }\n    100% {\n      opacity: 0;\n      display: none;\n      width: 0px;\n      height: 0px;\n    }\n  }\n  @keyframes minimizeAnimation {\n    0% {\n      opacity: 1;\n      width: 100vw;\n      height: 100%;\n    }\n    100% {\n      opacity: 0;\n      display: block;\n      width: 0px;\n      height: 0px;\n    }\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vc2ltdWxhdG9yLWZyYW1lL0Q6XFxsZWFybmluZy1wcm9qZWN0c1xcY2hhdGJvdHMubW5cXHN0dWRpby9zcmNcXGFwcFxcY29tcG9uZW50c1xcc3R1ZGlvXFxzaW11bGF0b3ItZnJhbWVcXHNpbXVsYXRvci1mcmFtZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zdHVkaW8vc2ltdWxhdG9yLWZyYW1lL3NpbXVsYXRvci1mcmFtZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsNkJBQUE7RUFDQSx3QkFBQTtFQUNBLGNBQUE7QUNDRjs7QURFQTtFQUNFLGdEQUFBO0VBQ0EsOEJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxxQ0FBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7QUNDRjs7QURLQTtFQUNFLGVBQUE7QUNGRjs7QURLQTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDRkY7O0FES0E7RUFDRSxlQUFBO0FDRkY7O0FES0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGlDQUFBO0FDRkY7O0FES0E7RUFDRSxXQUFBO0FDRkY7O0FES0E7RUFDRSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGdEQUFBO0FDRkY7O0FES0E7RUFDRSxnREFBQTtBQ0ZGOztBREtBOztFQUVFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQ0ZGOztBREtBO0VBQ0UsaUJBQUE7QUNGRjs7QURLQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLFVBQUE7SUFDQSxXQUFBO0VDRkY7RURLQTtJQUNFLFVBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQ0hGO0FBQ0Y7O0FETUE7RUFDRTtJQUNFLFVBQUE7SUFDQSxVQUFBO0lBQ0EsV0FBQTtFQ0pGO0VET0E7SUFDRSxVQUFBO0lBQ0EsWUFBQTtJQUNBLFlBQUE7RUNMRjtBQUNGOztBRFFBO0VBQ0UseUNBQUE7RUFDQSxpQ0FBQTtFQUNBLGdDQUFBO0VBQ0Esd0JBQUE7RUFDQSxpQ0FBQTtFQUNBLHlCQUFBO0FDTkY7O0FEU0E7RUFDRTtJQUNFLFVBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQ05GO0VEU0E7SUFDRSxVQUFBO0lBQ0EsYUFBQTtJQUNBLFVBQUE7SUFDQSxXQUFBO0VDUEY7QUFDRjs7QURVQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLFlBQUE7SUFDQSxZQUFBO0VDUkY7RURXQTtJQUNFLFVBQUE7SUFDQSxjQUFBO0lBQ0EsVUFBQTtJQUNBLFdBQUE7RUNURjtBQUNGOztBRFlBO0VBQ0UseUNBQUE7RUFDQSxpQ0FBQTtFQUNBLGdDQUFBO0VBQ0Esd0JBQUE7RUFDQSxpQ0FBQTtFQUNBLHlCQUFBO0FDVkY7O0FEYUE7RUFDRSxhQUFBO0FDVkY7O0FEYUE7RUFDRSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7QUNWRjs7QURhQTtFQUNFLGFBQUE7QUNWRjs7QURhQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FDVkY7O0FEYUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7QUNWRjs7QURhQTtFQUNFLGVBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpREFBQTtBQ1ZGOztBRGFBO0VBQ0UsY0FBQTtFQUNBLHFCQUFBO0FDVkY7O0FEYUE7RUFDRSwwQkFBQTtBQ1ZGOztBRFlBLHFEQUFBOztBQUNBO0VBQ0U7SUFDRSxlQUFBO0lBQ0EsU0FBQTtJQUNBLFFBQUE7SUFDQSxTQUFBO0lBQ0EsWUFBQTtJQUNBLFlBQUE7SUFDQSxjQUFBO0VDVEY7O0VEWUE7SUFDRSxhQUFBO0VDVEY7O0VEWUE7SUFDRTtNQUNFLFVBQUE7TUFDQSxVQUFBO01BQ0EsV0FBQTtJQ1RGO0lEWUE7TUFDRSxVQUFBO01BQ0EsWUFBQTtNQUNBLFlBQUE7SUNWRjtFQUNGO0VEYUE7SUFDRTtNQUNFLFVBQUE7TUFDQSxVQUFBO01BQ0EsV0FBQTtJQ1hGO0lEY0E7TUFDRSxVQUFBO01BQ0EsWUFBQTtNQUNBLFlBQUE7SUNaRjtFQUNGO0VEZUE7SUFDRTtNQUNFLFVBQUE7TUFDQSxZQUFBO01BQ0EsWUFBQTtJQ2JGO0lEZ0JBO01BQ0UsVUFBQTtNQUNBLGFBQUE7TUFDQSxVQUFBO01BQ0EsV0FBQTtJQ2RGO0VBQ0Y7RURpQkE7SUFDRTtNQUNFLFVBQUE7TUFDQSxZQUFBO01BQ0EsWUFBQTtJQ2ZGO0lEa0JBO01BQ0UsVUFBQTtNQUNBLGNBQUE7TUFDQSxVQUFBO01BQ0EsV0FBQTtJQ2hCRjtFQUNGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3N0dWRpby9zaW11bGF0b3ItZnJhbWUvc2ltdWxhdG9yLWZyYW1lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmludGVsbGlnby1mdWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmludGVsbGlnby1yb290IHtcbiAgei1pbmRleDogMTA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAzNXB4O1xuICByaWdodDogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtZmFtaWx5OiBcIk9wZW4gU2Fuc1wiO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmludGVsbGlnby1mcmFtZS1jb250YWluZXIge1xuICBib3gtc2hhZG93OiAwcHggNnB4IDQwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4zNik7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggIWltcG9ydGFudDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xufVxuXG4uaW50ZWxsaWdvLWZ1bGwtc2NyZWVuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg0KTtcbn1cblxuLmludGVsbGlnby1pZnJhbWUge1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiAxMDAlO1xuICBmbGV4LWdyb3c6IDE7XG4gIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG59XG5cbi5pbnRlbGxpZ28tdGl0bGUge1xufVxuXG4uaW50ZWxsaWdvLWNvbnRlbnQge1xuICBkaXNwbGF5OiBpbmxpbmU7XG59XG5cbi5pbnRlbGxpZ28tY29udGVudCA+IC50aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDE4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmludGVsbGlnby1jb250ZW50ID4gLnN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxMXB4O1xufVxuXG4uaW50ZWxsaWdvLW9ubGluZS1kb3Qge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGhlaWdodDogNXB4O1xuICB3aWR0aDogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkZjUwO1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDRweDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNHB4LCAtMC41cHgpO1xufVxuXG4uaW50ZWxsaWdvLWFjdGlvbnMgPiBpbWcge1xuICB3aWR0aDogNTBweDtcbn1cblxuLmludGVsbGlnby1taW5tYXgtYnRuIHtcbiAgei1pbmRleDogMTU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDIwcHg7XG4gIGJvdHRvbTogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlNzJlNDtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogNjBweDtcbiAgYm9yZGVyLXJhZGl1czogNjBweCAhaW1wb3J0YW50O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggNDBweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM2KTtcbn1cblxuLmludGVsbGlnby1taW5tYXgtYnRuOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogMHB4IDZweCA0MHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMzYpO1xufVxuXG4uaW50ZWxsaWdvLW1pbm1heC1idG4gPiBpbWcsXG4uaW50ZWxsaWdvLW1pbm1heC1idG4gPiAubWF4LWJ0biB7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDM2cHg7XG4gIG1hcmdpbjogMTJweDtcbn1cblxuLmludGVsbGlnby1taW4uaW50ZWxsaWdvLXJvb3Qge1xuICAvKmRpc3BsYXk6IG5vbmU7Ki9cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIG1heGltaXplQW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgd2lkdGg6IDBweDtcbiAgICBoZWlnaHQ6IDBweDtcbiAgfVxuXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgd2lkdGg6IDM2MHB4O1xuICAgIGhlaWdodDogNzB2aDtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIG1heGltaXplQW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgd2lkdGg6IDBweDtcbiAgICBoZWlnaHQ6IDBweDtcbiAgfVxuXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgd2lkdGg6IDM2MHB4O1xuICAgIGhlaWdodDogNzB2aDtcbiAgfVxufVxuXG4ubWF4aW1pemVBbmltYXRpb24ge1xuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBtYXhpbWl6ZUFuaW1hdGlvbjtcbiAgYW5pbWF0aW9uLW5hbWU6IG1heGltaXplQW5pbWF0aW9uO1xuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMC4zcztcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjNzO1xuICAtd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBtaW5pbWl6ZUFuaW1hdGlvbiB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHdpZHRoOiAzNjBweDtcbiAgICBoZWlnaHQ6IDcwdmg7XG4gIH1cblxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgd2lkdGg6IDBweDtcbiAgICBoZWlnaHQ6IDBweDtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIG1pbmltaXplQW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgd2lkdGg6IDM2MHB4O1xuICAgIGhlaWdodDogNzB2aDtcbiAgfVxuXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDBweDtcbiAgICBoZWlnaHQ6IDBweDtcbiAgfVxufVxuXG4ubWluaW1pemVBbmltYXRpb24ge1xuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBtaW5pbWl6ZUFuaW1hdGlvbjtcbiAgYW5pbWF0aW9uLW5hbWU6IG1pbmltaXplQW5pbWF0aW9uO1xuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMC4zcztcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjNzO1xuICAtd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG59XG5cbi5pbnRlbGxpZ28taGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmludGVsbGlnby1tYXguaW50ZWxsaWdvLW1pbm1heC1idG4ge1xuICBib3JkZXItcmFkaXVzOiAzcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAyNHB4O1xuICB3aWR0aDogMjRweDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNXB4O1xuICByaWdodDogMTBweDtcbn1cblxuLmludGVsbGlnby1tYXguaW50ZWxsaWdvLW1pbm1heC1idG4gPiAubWF4LWJ0biB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5pbnRlbGxpZ28tbWF4LmludGVsbGlnby1taW5tYXgtYnRuID4gLm1pbi1idG4ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3BhY2l0eTogMC42O1xufVxuXG4ucG93ZXJlZC1ieS1pbnRlbGxpZ28ge1xuICBmb250LXNpemU6IDExcHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICB6LWluZGV4OiAyMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0yMnB4O1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnBvd2VyZWQtYnktaW50ZWxsaWdvID4gZGl2IHtcbiAgZGlzcGxheTogaW5saW5lO1xuICAvKmJhY2tncm91bmQtY29sb3I6ICNGNUY1RjU7Ki9cbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcbiAgcGFkZGluZzogNnB4IDI0cHg7XG4gIC8qYm94LXNoYWRvdzogMHB4IDIwcHggNDBweCAxcHggcmdiYSgwLDAsMCwwLjM2KSovXG59XG5cbi5pbnRlbGxpZ28tbGluayB7XG4gIGNvbG9yOiAjM2MzYzNjO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5pbnRlbGxpZ28tbGluazpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuLyogU21hcnRwaG9uZXMgKHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUpIC0tLS0tLS0tLS0tICovXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoOiA0ODBweCkge1xuICAuaW50ZWxsaWdvLXJvb3Qge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm9yZGVyOiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgY29sb3I6ICMzYzNjM2M7XG4gIH1cblxuICAucG93ZXJlZC1ieS1pbnRlbGxpZ28ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICBALXdlYmtpdC1rZXlmcmFtZXMgbWF4aW1pemVBbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB3aWR0aDogMHB4O1xuICAgICAgaGVpZ2h0OiAwcHg7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgbWF4aW1pemVBbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB3aWR0aDogMHB4O1xuICAgICAgaGVpZ2h0OiAwcHg7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgfVxuXG4gIEAtd2Via2l0LWtleWZyYW1lcyBtaW5pbWl6ZUFuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgd2lkdGg6IDBweDtcbiAgICAgIGhlaWdodDogMHB4O1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgbWluaW1pemVBbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogMHB4O1xuICAgICAgaGVpZ2h0OiAwcHg7XG4gICAgfVxuICB9XG59XG4iLCIuaW50ZWxsaWdvLWZ1bGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uaW50ZWxsaWdvLXJvb3Qge1xuICB6LWluZGV4OiAxMDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDM1cHg7XG4gIHJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgZm9udC1mYW1pbHk6IFwiT3BlbiBTYW5zXCI7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uaW50ZWxsaWdvLWZyYW1lLWNvbnRhaW5lciB7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggNDBweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM2KTtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG59XG5cbi5pbnRlbGxpZ28tZnVsbC1zY3JlZW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODQpO1xufVxuXG4uaW50ZWxsaWdvLWlmcmFtZSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsZXgtZ3JvdzogMTtcbiAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbn1cblxuLmludGVsbGlnby1jb250ZW50IHtcbiAgZGlzcGxheTogaW5saW5lO1xufVxuXG4uaW50ZWxsaWdvLWNvbnRlbnQgPiAudGl0bGUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5pbnRlbGxpZ28tY29udGVudCA+IC5zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbn1cblxuLmludGVsbGlnby1vbmxpbmUtZG90IHtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBoZWlnaHQ6IDVweDtcbiAgd2lkdGg6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwZGY1MDtcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiA0cHg7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDRweCwgLTAuNXB4KTtcbn1cblxuLmludGVsbGlnby1hY3Rpb25zID4gaW1nIHtcbiAgd2lkdGg6IDUwcHg7XG59XG5cbi5pbnRlbGxpZ28tbWlubWF4LWJ0biB7XG4gIHotaW5kZXg6IDE1O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAyMHB4O1xuICBib3R0b206IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZTcyZTQ7XG4gIGhlaWdodDogNjBweDtcbiAgd2lkdGg6IDYwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDYwcHggIWltcG9ydGFudDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3gtc2hhZG93OiAwcHggNnB4IDQwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4zNik7XG59XG5cbi5pbnRlbGxpZ28tbWlubWF4LWJ0bjpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggNDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjM2KTtcbn1cblxuLmludGVsbGlnby1taW5tYXgtYnRuID4gaW1nLFxuLmludGVsbGlnby1taW5tYXgtYnRuID4gLm1heC1idG4ge1xuICB3aWR0aDogMzZweDtcbiAgaGVpZ2h0OiAzNnB4O1xuICBtYXJnaW46IDEycHg7XG59XG5cbi5pbnRlbGxpZ28tbWluLmludGVsbGlnby1yb290IHtcbiAgLypkaXNwbGF5OiBub25lOyovXG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBtYXhpbWl6ZUFuaW1hdGlvbiB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHdpZHRoOiAwcHg7XG4gICAgaGVpZ2h0OiAwcHg7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB3aWR0aDogMzYwcHg7XG4gICAgaGVpZ2h0OiA3MHZoO1xuICB9XG59XG5Aa2V5ZnJhbWVzIG1heGltaXplQW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgd2lkdGg6IDBweDtcbiAgICBoZWlnaHQ6IDBweDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHdpZHRoOiAzNjBweDtcbiAgICBoZWlnaHQ6IDcwdmg7XG4gIH1cbn1cbi5tYXhpbWl6ZUFuaW1hdGlvbiB7XG4gIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IG1heGltaXplQW5pbWF0aW9uO1xuICBhbmltYXRpb24tbmFtZTogbWF4aW1pemVBbmltYXRpb247XG4gIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjNzO1xuICBhbmltYXRpb24tZHVyYXRpb246IDAuM3M7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIG1pbmltaXplQW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgd2lkdGg6IDM2MHB4O1xuICAgIGhlaWdodDogNzB2aDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgd2lkdGg6IDBweDtcbiAgICBoZWlnaHQ6IDBweDtcbiAgfVxufVxuQGtleWZyYW1lcyBtaW5pbWl6ZUFuaW1hdGlvbiB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHdpZHRoOiAzNjBweDtcbiAgICBoZWlnaHQ6IDcwdmg7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMHB4O1xuICAgIGhlaWdodDogMHB4O1xuICB9XG59XG4ubWluaW1pemVBbmltYXRpb24ge1xuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBtaW5pbWl6ZUFuaW1hdGlvbjtcbiAgYW5pbWF0aW9uLW5hbWU6IG1pbmltaXplQW5pbWF0aW9uO1xuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMC4zcztcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjNzO1xuICAtd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG59XG5cbi5pbnRlbGxpZ28taGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmludGVsbGlnby1tYXguaW50ZWxsaWdvLW1pbm1heC1idG4ge1xuICBib3JkZXItcmFkaXVzOiAzcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAyNHB4O1xuICB3aWR0aDogMjRweDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNXB4O1xuICByaWdodDogMTBweDtcbn1cblxuLmludGVsbGlnby1tYXguaW50ZWxsaWdvLW1pbm1heC1idG4gPiAubWF4LWJ0biB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5pbnRlbGxpZ28tbWF4LmludGVsbGlnby1taW5tYXgtYnRuID4gLm1pbi1idG4ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3BhY2l0eTogMC42O1xufVxuXG4ucG93ZXJlZC1ieS1pbnRlbGxpZ28ge1xuICBmb250LXNpemU6IDExcHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICB6LWluZGV4OiAyMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0yMnB4O1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnBvd2VyZWQtYnktaW50ZWxsaWdvID4gZGl2IHtcbiAgZGlzcGxheTogaW5saW5lO1xuICAvKmJhY2tncm91bmQtY29sb3I6ICNGNUY1RjU7Ki9cbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcbiAgcGFkZGluZzogNnB4IDI0cHg7XG4gIC8qYm94LXNoYWRvdzogMHB4IDIwcHggNDBweCAxcHggcmdiYSgwLDAsMCwwLjM2KSovXG59XG5cbi5pbnRlbGxpZ28tbGluayB7XG4gIGNvbG9yOiAjM2MzYzNjO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5pbnRlbGxpZ28tbGluazpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4vKiBTbWFydHBob25lcyAocG9ydHJhaXQgYW5kIGxhbmRzY2FwZSkgLS0tLS0tLS0tLS0gKi9cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGg6IDMyMHB4KSBhbmQgKG1heC1kZXZpY2Utd2lkdGg6IDQ4MHB4KSB7XG4gIC5pbnRlbGxpZ28tcm9vdCB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICBib3JkZXI6IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBjb2xvcjogIzNjM2MzYztcbiAgfVxuXG4gIC5wb3dlcmVkLWJ5LWludGVsbGlnbyB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIEAtd2Via2l0LWtleWZyYW1lcyBtYXhpbWl6ZUFuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHdpZHRoOiAwcHg7XG4gICAgICBoZWlnaHQ6IDBweDtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgfVxuICBAa2V5ZnJhbWVzIG1heGltaXplQW5pbWF0aW9uIHtcbiAgICAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgd2lkdGg6IDBweDtcbiAgICAgIGhlaWdodDogMHB4O1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBtaW5pbWl6ZUFuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIHdpZHRoOiAwcHg7XG4gICAgICBoZWlnaHQ6IDBweDtcbiAgICB9XG4gIH1cbiAgQGtleWZyYW1lcyBtaW5pbWl6ZUFuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogMHB4O1xuICAgICAgaGVpZ2h0OiAwcHg7XG4gICAgfVxuICB9XG59Il19 */");

/***/ }),

/***/ "./src/app/components/studio/simulator-frame/simulator-frame.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/studio/simulator-frame/simulator-frame.component.ts ***!
  \********************************************************************************/
/*! exports provided: SimulatorFrameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorFrameComponent", function() { return SimulatorFrameComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");




let SimulatorFrameComponent = class SimulatorFrameComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.isOpen = false;
        let param = {
            brandingConfig: {
                primaryBackgroundColor: "#5e72e4",
                primaryForegroundColor: "white",
                secondaryBackgroundColor: "#3c3c3c",
                logoUrl: `favicon.ico`,
                agentName: "Chatbots.mn",
                frameHeight: "100%",
                frameWidth: "360px"
            },
            simulatorMode: true,
            appConfig: {
                htmlMessages: true
            }
        };
        let url = `https://simulator.chatbots.mn/?s=${btoa(JSON.stringify(param))}`;
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].local)
            url = `http://localhost:4200/index.html?s=${btoa(JSON.stringify(param))}`;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    ngOnInit() { }
    frame() {
        return this.simulatorIFrame.nativeElement
            .contentWindow;
    }
    minMaxBtnClick() {
        this.isOpen = !this.isOpen;
        if (this.intelligoRoot && this.intelligoRoot.nativeElement)
            this.intelligoRoot.nativeElement.classList.remove("intelligo-hidden");
    }
};
SimulatorFrameComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("intelligoRoot", { static: false })
], SimulatorFrameComponent.prototype, "intelligoRoot", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("simulatorIFrame", { static: false })
], SimulatorFrameComponent.prototype, "simulatorIFrame", void 0);
SimulatorFrameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-simulator-frame",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./simulator-frame.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/studio/simulator-frame/simulator-frame.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./simulator-frame.component.scss */ "./src/app/components/studio/simulator-frame/simulator-frame.component.scss")).default]
    })
], SimulatorFrameComponent);



/***/ }),

/***/ "./src/app/components/studio/studio.module.ts":
/*!****************************************************!*\
  !*** ./src/app/components/studio/studio.module.ts ***!
  \****************************************************/
/*! exports provided: STUDIO_ROUTES, StudioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STUDIO_ROUTES", function() { return STUDIO_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudioModule", function() { return StudioModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _chatflow_chatflow_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chatflow/chatflow.component */ "./src/app/components/studio/chatflow/chatflow.component.ts");
/* harmony import */ var _nodeeditor_nodeeditor_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nodeeditor/nodeeditor.component */ "./src/app/components/studio/nodeeditor/nodeeditor.component.ts");
/* harmony import */ var _simulator_frame_simulator_frame_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simulator-frame/simulator-frame.component */ "./src/app/components/studio/simulator-frame/simulator-frame.component.ts");
/* harmony import */ var _landing_landing_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./landing/landing.component */ "./src/app/components/studio/landing/landing.component.ts");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");







const STUDIO_ROUTES = [
    {
        path: "",
        component: _landing_landing_component__WEBPACK_IMPORTED_MODULE_5__["LandingComponent"]
    },
    {
        path: "designer",
        component: _chatflow_chatflow_component__WEBPACK_IMPORTED_MODULE_2__["ChatFlowComponent"]
    }
];
let StudioModule = class StudioModule {
};
StudioModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _chatflow_chatflow_component__WEBPACK_IMPORTED_MODULE_2__["ChatFlowComponent"],
            _nodeeditor_nodeeditor_component__WEBPACK_IMPORTED_MODULE_3__["NodeEditorComponent"],
            _simulator_frame_simulator_frame_component__WEBPACK_IMPORTED_MODULE_4__["SimulatorFrameComponent"],
            _landing_landing_component__WEBPACK_IMPORTED_MODULE_5__["LandingComponent"],
        ],
        entryComponents: [
            _nodeeditor_nodeeditor_component__WEBPACK_IMPORTED_MODULE_3__["NodeEditorComponent"]
        ],
        imports: [
            _shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"]
        ],
        schemas: [
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NO_ERRORS_SCHEMA"]
        ]
    })
], StudioModule);



/***/ }),

/***/ "./src/app/core/auth.guard.ts":
/*!************************************!*\
  !*** ./src/app/core/auth.guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/authentication.service */ "./src/app/services/authentication.service.ts");




let AuthGuard = class AuthGuard {
    constructor(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    canActivate(route, state) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        window.location.href = 'https://chatbots.mn';
        return false;
    }
};
AuthGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' })
], AuthGuard);



/***/ }),

/***/ "./src/app/directives/autofocus.directive.ts":
/*!***************************************************!*\
  !*** ./src/app/directives/autofocus.directive.ts ***!
  \***************************************************/
/*! exports provided: AutofocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutofocusDirective", function() { return AutofocusDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AutofocusDirective = class AutofocusDirective {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        if (this._autofocus || typeof this._autofocus === "undefined")
            this.el.nativeElement.focus();
    }
    set autofocus(condition) {
        this._autofocus = condition != false;
    }
};
AutofocusDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AutofocusDirective.prototype, "autofocus", null);
AutofocusDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: "[autofocus]"
    })
], AutofocusDirective);



/***/ }),

/***/ "./src/app/models/chatflow.models.ts":
/*!*******************************************!*\
  !*** ./src/app/models/chatflow.models.ts ***!
  \*******************************************/
/*! exports provided: SectionType, CarouselButtonType, NodeType, APIMethod, CardPlacement, ConditionOperator, ButtonType, EditorType, ModelHelpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionType", function() { return SectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselButtonType", function() { return CarouselButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeType", function() { return NodeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIMethod", function() { return APIMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardPlacement", function() { return CardPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConditionOperator", function() { return ConditionOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonType", function() { return ButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorType", function() { return EditorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelHelpers", function() { return ModelHelpers; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bson */ "./node_modules/bson/dist/bson.browser.esm.js");


//Enum Start
var SectionType;
(function (SectionType) {
    SectionType["Image"] = "Image";
    SectionType["Text"] = "Text";
    SectionType["Graph"] = "Graph";
    SectionType["Gif"] = "Gif";
    SectionType["Audio"] = "Audio";
    SectionType["Video"] = "Video";
    SectionType["Link"] = "Link";
    SectionType["EmbeddedHtml"] = "EmbeddedHtml";
    SectionType["Carousel"] = "Carousel";
    SectionType["PrintOTP"] = "PrintOTP";
})(SectionType || (SectionType = {}));
var CarouselButtonType;
(function (CarouselButtonType) {
    CarouselButtonType["NextNode"] = "NextNode";
    CarouselButtonType["DeepLink"] = "DeepLink";
    CarouselButtonType["OpenUrl"] = "OpenUrl";
})(CarouselButtonType || (CarouselButtonType = {}));
var NodeType;
(function (NodeType) {
    NodeType["ApiCall"] = "ApiCall";
    NodeType["Combination"] = "Combination";
    NodeType["Card"] = "Card";
    NodeType["JumpToBot"] = "JumpToBot";
    NodeType["Condition"] = "Condition";
    NodeType["HandoffToAgent"] = "HandoffToAgent";
})(NodeType || (NodeType = {}));
var APIMethod;
(function (APIMethod) {
    APIMethod["GET"] = "GET";
    APIMethod["POST"] = "POST";
    APIMethod["PUT"] = "PUT";
    APIMethod["DELETE"] = "DELETE";
    APIMethod["HEAD"] = "HEAD";
    APIMethod["OPTIONS"] = "OPTIONS";
    APIMethod["CONNECT"] = "CONNECT";
})(APIMethod || (APIMethod = {}));
var CardPlacement;
(function (CardPlacement) {
    CardPlacement["Incoming"] = "Incoming";
    CardPlacement["Outgoing"] = "Outgoing";
    CardPlacement["Center"] = "Center";
})(CardPlacement || (CardPlacement = {}));
// Sections - End
var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator["EqualTo"] = "EqualTo";
    ConditionOperator["NotEqualTo"] = "NotEqualTo";
    ConditionOperator["GreaterThan"] = "GreaterThan";
    ConditionOperator["LessThan"] = "LessThan";
    ConditionOperator["GreaterThanOrEqualTo"] = "GreaterThanOrEqualTo";
    ConditionOperator["LessThanOrEqualTo"] = "LessThanOrEqualTo";
    ConditionOperator["Mod"] = "Mod";
    ConditionOperator["In"] = "In";
    ConditionOperator["NotIn"] = "NotIn";
    ConditionOperator["StartsWith"] = "StartsWith";
    ConditionOperator["EndsWith"] = "EndsWith";
    ConditionOperator["Contains"] = "Contains";
    ConditionOperator["Between"] = "Between";
    ConditionOperator["IsNull"] = "IsNull";
})(ConditionOperator || (ConditionOperator = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType["OpenUrl"] = "OpenUrl";
    ButtonType["GetText"] = "GetText";
    ButtonType["GetNumber"] = "GetNumber";
    ButtonType["GetAddress"] = "GetAddress";
    ButtonType["GetEmail"] = "GetEmail";
    ButtonType["GetPhoneNumber"] = "GetPhoneNumber";
    ButtonType["GetItemFromSource"] = "GetItemFromSource";
    ButtonType["GetImage"] = "GetImage";
    ButtonType["GetAudio"] = "GetAudio";
    ButtonType["GetVideo"] = "GetVideo";
    ButtonType["NextNode"] = "NextNode";
    ButtonType["DeepLink"] = "DeepLink";
    ButtonType["GetAgent"] = "GetAgent";
    ButtonType["GetFile"] = "GetFile";
    ButtonType["ShowConfirmation"] = "ShowConfirmation";
    ButtonType["FetchChatFlow"] = "FetchChatFlow";
    /// Format: yyyy-MM-dd
    ButtonType["GetDate"] = "GetDate";
    /// Format: HH:mm:ss
    ButtonType["GetTime"] = "GetTime";
    /// Format: yyyy-MM-ddTHH:mm:ss
    ButtonType["GetDateTime"] = "GetDateTime";
    /// Format: [Latitude],[Longitude]
    ButtonType["GetLocation"] = "GetLocation";
})(ButtonType || (ButtonType = {}));
var EditorType;
(function (EditorType) {
    EditorType["Text"] = "Text";
    EditorType["TitleCaptionUrl"] = "TitleCaptionUrl";
    EditorType["Carousel"] = "Carousel";
})(EditorType || (EditorType = {}));
class ModelHelpers {
    constructor(globalsService, infoDialog) {
        this.globalsService = globalsService;
        this.infoDialog = infoDialog;
        this.CarouselButtonType = CarouselButtonType;
        this.carouselButtonTypes = [
            CarouselButtonType.NextNode,
            CarouselButtonType.OpenUrl,
            CarouselButtonType.DeepLink
        ];
        this.nodeTypes = [
            NodeType.ApiCall,
            NodeType.Combination,
            //NodeType.Card,
            NodeType.Condition,
            NodeType.HandoffToAgent,
            NodeType.JumpToBot
        ];
        this.apiMethods = [
            APIMethod.GET,
            APIMethod.POST,
            APIMethod.PUT,
            APIMethod.HEAD,
            APIMethod.OPTIONS,
            APIMethod.DELETE,
            APIMethod.CONNECT
        ];
        this.cardPlacements = [
            CardPlacement.Center,
            CardPlacement.Incoming,
            CardPlacement.Outgoing
        ];
        this.buttonTypes = [
            ButtonType.DeepLink,
            //ButtonType.FetchChatFlow,
            ButtonType.GetAddress,
            //ButtonType.GetAgent,
            ButtonType.GetAudio,
            ButtonType.GetDate,
            //ButtonType.GetDateTime,
            ButtonType.GetEmail,
            ButtonType.GetImage,
            ButtonType.GetItemFromSource,
            ButtonType.GetLocation,
            ButtonType.GetNumber,
            ButtonType.GetPhoneNumber,
            ButtonType.GetText,
            ButtonType.GetTime,
            ButtonType.GetVideo,
            ButtonType.GetFile,
            ButtonType.NextNode,
            ButtonType.OpenUrl
            //ButtonType.ShowConfirmation
        ];
        this.conditionOperators = [
            ConditionOperator.EqualTo,
            ConditionOperator.NotEqualTo,
            ConditionOperator.GreaterThan,
            ConditionOperator.LessThan,
            ConditionOperator.GreaterThanOrEqualTo,
            ConditionOperator.LessThanOrEqualTo,
            ConditionOperator.Mod,
            ConditionOperator.In,
            ConditionOperator.NotIn,
            ConditionOperator.StartsWith,
            ConditionOperator.EndsWith,
            ConditionOperator.Contains,
            ConditionOperator.Between,
            ConditionOperator.IsNull
        ];
    }
    sectionAlias(section) {
        switch (section.SectionType) {
            case SectionType.Text: {
                let ts = section;
                return ts.Text || ts.SectionType;
            }
            case SectionType.Image:
            case SectionType.Audio:
            case SectionType.Video:
            case SectionType.EmbeddedHtml:
            case SectionType.Gif:
            case SectionType.Graph:
            case SectionType.Carousel: {
                let tcs = section;
                return tcs.Title || tcs.Caption || tcs.SectionType;
            }
            default:
                return section.SectionType;
        }
    }
    chatNodeAlias(chatNode) {
        return chatNode.Name || chatNode.NodeType;
    }
    chatButtonAlias(btn) {
        return btn.ButtonName || btn.ButtonText || btn.ButtonType;
    }
    editorTypeFromSectionType(secType) {
        switch (secType) {
            case SectionType.Text:
                return EditorType.Text;
            case SectionType.Image:
            case SectionType.Audio:
            case SectionType.Video:
            case SectionType.Gif:
            case SectionType.PrintOTP:
            case SectionType.EmbeddedHtml:
                return EditorType.TitleCaptionUrl;
            case SectionType.Carousel:
                return EditorType.Carousel;
            default:
                return EditorType.Text;
        }
    }
    chatButtonFieldHidden(chatNode, btn, fieldName) {
        const HIDDEN = true;
        if (["ConditionMatchKey", "ConditionOperator", "ConditionMatchValue"].indexOf(fieldName) != -1)
            return [NodeType.ApiCall, NodeType.Condition].indexOf(chatNode.NodeType) != -1
                ? !HIDDEN
                : HIDDEN;
        if (fieldName == "ButtonType" || fieldName == "ButtonText")
            return [NodeType.ApiCall, NodeType.Condition].indexOf(chatNode.NodeType) != -1
                ? HIDDEN
                : !HIDDEN;
        //Following fields must only be visible for 'GetText' Buttons
        if (["MinLength", "MaxLength", "IsMultiLine", "DefaultText"].indexOf(fieldName) != -1)
            return btn.ButtonType == ButtonType.GetText ? false : true;
        //Following fields must only be visible for 'GetItemFromSource ' Buttons
        if (["AllowMultiple", "ItemsSource"].indexOf(fieldName) != -1)
            return btn.ButtonType == ButtonType.GetItemFromSource ? !HIDDEN : HIDDEN;
        var hidden = false;
        switch (btn.ButtonType) {
            case ButtonType.OpenUrl:
                hidden = !(["Url"].indexOf(fieldName) != -1); //Show only Url field
                break;
            case ButtonType.GetText:
            case ButtonType.GetNumber:
            case ButtonType.GetAddress:
            case ButtonType.GetEmail:
            case ButtonType.GetPhoneNumber:
                //if the passed button property is present in the list, that field should not be visible. here placeholder text should not be visible if button type is input(Get[X]) type
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "Url",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetTime:
            case ButtonType.GetDate:
            case ButtonType.GetDateTime:
            case ButtonType.GetLocation:
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "Url",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue",
                        "PostfixText",
                        "PrefixText",
                        "PlaceholderText"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetImage:
            case ButtonType.GetFile:
            case ButtonType.GetAudio:
            case ButtonType.GetVideo:
                //if the passed button property is present in the list, that field should not be visible. here placeholder text should not be visible if button type is input(Get[X]) type
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "PlaceholderText",
                        "Url",
                        "PostfixText",
                        "PrefixText",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetItemFromSource:
                hidden =
                    [
                        "NextNodeId",
                        "DeepLinkUrl",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue",
                        "PlaceholderText"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.NextNode:
                hidden =
                    [
                        "NextNodeId",
                        "PostfixText",
                        "PrefixText",
                        "DeepLinkUrl",
                        "Url",
                        "PlaceholderText"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.DeepLink:
                hidden =
                    [
                        "NextNodeId",
                        "Url",
                        "PostfixText",
                        "PrefixText",
                        "PlaceholderText",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            case ButtonType.GetAgent:
                hidden = true; //Hide all. Probably!
                break;
            case ButtonType.ShowConfirmation:
                hidden = true; //Hide all. Probably!
                break;
            case ButtonType.FetchChatFlow:
                hidden =
                    [
                        "DeepLinkUrl",
                        "PlaceholderText",
                        "PostfixText",
                        "PrefixText",
                        "ConditionMatchKey",
                        "ConditionOperator",
                        "ConditionMatchValue"
                    ].indexOf(fieldName) != -1;
                break;
            default:
                break;
        }
        return hidden;
    }
    chatNodeApiCallFieldVisible(chatNode, fieldName) {
        switch (chatNode.ApiMethod) {
            case APIMethod.POST:
            case APIMethod.PUT: {
                if (fieldName == "RequestBody")
                    return true;
                if (fieldName == "RequiredVariables")
                    return false;
            }
            default: {
                if (fieldName == "RequestBody")
                    return false;
                if (fieldName == "RequiredVariables")
                    return true;
            }
        }
        return true;
    }
    sectionIcon(section) {
        switch (section.SectionType) {
            case SectionType.Image:
                return "fa-picture-o";
            default:
                return "fa-file-o";
        }
    }
    addSection(chatNode, sectionType) {
        if (chatNode.NodeType == NodeType.Card) {
            if (chatNode.Sections && chatNode.Sections.length >= 1) {
                this.infoDialog.alert("Not allowed", "In a Card Node, only one content item can be added.");
                return;
            }
            if ([SectionType.Text, SectionType.Image].indexOf(sectionType) == -1) {
                this.infoDialog.alert("Not allowed", "In a Card Node, only Text and Image content types can be added.");
                return;
            }
        }
        switch (sectionType) {
            case SectionType.Carousel:
                chatNode.Sections.push({
                    SectionType: sectionType,
                    _id: new bson__WEBPACK_IMPORTED_MODULE_1__["ObjectID"]().toHexString(),
                    Items: []
                });
                break;
            default:
                chatNode.Sections.push({
                    SectionType: sectionType,
                    _id: new bson__WEBPACK_IMPORTED_MODULE_1__["ObjectID"]().toHexString()
                });
                break;
        }
        this.globalsService.chatFlowComponent.updateLayout();
    }
    sectionMoveUp(chatNode, section) {
        var current = chatNode.Sections.indexOf(section);
        if (current != -1)
            this.arrayMove(chatNode.Sections, current, current - 1);
    }
    sectionMoveDown(chatNode, section) {
        var current = chatNode.Sections.indexOf(section);
        if (current != -1)
            this.arrayMove(chatNode.Sections, current, current + 1);
    }
    sectionDelete(chatNode, section) {
        var current = chatNode.Sections.indexOf(section);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete section '${this.sectionAlias(section)}'`, ok => {
                if (ok) {
                    chatNode.Sections.splice(current, 1);
                    this.globalsService.chatFlowComponent.chatFlowNetwork.updateChatNodeConnections();
                    this.globalsService.chatFlowComponent.updateLayout();
                }
            });
        }
    }
    addButton(chatNode) {
        if (chatNode.NodeType == NodeType.Card) {
            if (chatNode.Buttons && chatNode.Buttons.length >= 2) {
                this.infoDialog.alert("No allowed", "Card node cannot have more than two buttons");
                return;
            }
        }
        chatNode.Buttons.push({
            _id: new bson__WEBPACK_IMPORTED_MODULE_1__["ObjectID"]().toHexString(),
            ButtonName: "New Button",
            ButtonType: ButtonType.NextNode
        });
        this.globalsService.chatFlowComponent.updateLayout();
    }
    buttonMoveUp(chatNode, btn) {
        var current = chatNode.Buttons.indexOf(btn);
        if (current != -1)
            this.arrayMove(chatNode.Buttons, current, current - 1);
    }
    buttonMoveDown(chatNode, btn) {
        var current = chatNode.Buttons.indexOf(btn);
        if (current != -1)
            this.arrayMove(chatNode.Buttons, current, current + 1);
    }
    buttonDelete(chatNode, btn) {
        var current = chatNode.Buttons.indexOf(btn);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete button '${this.chatButtonAlias(btn)}'?`, ok => {
                if (ok) {
                    chatNode.Buttons.splice(current, 1);
                    this.globalsService.chatFlowComponent.chatFlowNetwork.updateChatNodeConnections();
                    this.globalsService.chatFlowComponent.updateLayout();
                }
            });
        }
    }
    nodeDeleteDirect(chatNode) {
        let network = this.globalsService.chatFlowComponent.chatFlowNetwork;
        var elementIdxToDel = network.chatNodeVMs.findIndex(x => x.chatNode.Id == chatNode.Id);
        network.chatNodeVMs.splice(elementIdxToDel, 1);
        network.updateChatNodeConnections();
        network.parent.updateLayout();
    }
    nodeDelete(chatNode, nodeEditor) {
        this.infoDialog.confirm("Sure?", `Are you sure you want to delete '${chatNode.Name ||
            chatNode.NodeType}' chat node?`, ok => {
            if (ok) {
                this.nodeDeleteDirect(chatNode);
                if (nodeEditor)
                    nodeEditor.dialogRef.close();
            }
        });
    }
    nodeContentMenu(chatNodeVM, event, options) {
        event.preventDefault();
        let btn = options._elementRef.nativeElement;
        btn.click();
    }
    resetOtherStartNodes(chatNode) {
        this.globalsService.chatFlowComponent.chatFlowNetwork.chatNodeVMs.forEach(vm => {
            if (vm.chatNode != chatNode)
                vm.chatNode.IsStartNode = false;
        });
    }
    test(chatNode) {
        this.infoDialog.alert("Alert", JSON.stringify(chatNode.Sections[chatNode.Sections.length - 1], null, 4));
    }
    arrayMove_RAW(array, old_index, new_index) {
        if (new_index >= array.length) {
            var k = new_index - array.length;
            while (k-- + 1) {
                array.push(undefined);
            }
        }
        array.splice(new_index, 0, array.splice(old_index, 1)[0]);
        return array; // for testing purposes
    }
    arrayMove(array, old_index, new_index) {
        if (new_index >= array.length || new_index < 0)
            throw "new index cannot be greater than or equal to array length or less than zero";
        array.splice(new_index, 0, array.splice(old_index, 1)[0]);
    }
    carouselItemAdd(carSection) {
        carSection.Items.push({
            Buttons: [],
            Title: "New Carousel Item",
            _id: new bson__WEBPACK_IMPORTED_MODULE_1__["ObjectID"]().toHexString()
        });
    }
    carouselItemMoveUp(carSection, carItem) {
        var current = carSection.Items.indexOf(carItem);
        if (current != -1)
            this.arrayMove(carSection.Items, current, current - 1);
    }
    carouselItemMoveDown(carSection, carItem) {
        var current = carSection.Items.indexOf(carItem);
        if (current != -1)
            this.arrayMove(carSection.Items, current, current + 1);
    }
    carouselItemDelete(carSection, carItem) {
        this.infoDialog.confirm("Sure?", `Delete carousel item ${carItem.Title}?`, ok => {
            var current = carSection.Items.indexOf(carItem);
            if (current != -1)
                carSection.Items.splice(current, 1);
        });
    }
    carouselButtonAdd(carItem) {
        carItem.Buttons.push({
            Text: "New Button",
            Type: CarouselButtonType.NextNode,
            _id: new bson__WEBPACK_IMPORTED_MODULE_1__["ObjectID"]().toHexString()
        });
    }
    carouselButtonMoveUp(carItem, carButton) {
        var current = carItem.Buttons.indexOf(carButton);
        if (current != -1)
            this.arrayMove(carItem.Buttons, current, current - 1);
    }
    carouselButtonMoveDown(carItem, carButton) {
        var current = carItem.Buttons.indexOf(carButton);
        if (current != -1)
            this.arrayMove(carItem.Buttons, current, current + 1);
    }
    carouselButtonDelete(carItem, carButton) {
        this.infoDialog.confirm("Sure?", `Delete carousel button ${carButton.Text}?`, ok => {
            var current = carItem.Buttons.indexOf(carButton);
            if (current != -1)
                carItem.Buttons.splice(current, 1);
        });
    }
}


/***/ }),

/***/ "./src/app/models/data.models.ts":
/*!***************************************!*\
  !*** ./src/app/models/data.models.ts ***!
  \***************************************/
/*! exports provided: BusinessAccountStatus, DevicePlatform, DeviceStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessAccountStatus", function() { return BusinessAccountStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevicePlatform", function() { return DevicePlatform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceStatus", function() { return DeviceStatus; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var BusinessAccountStatus;
(function (BusinessAccountStatus) {
    BusinessAccountStatus[BusinessAccountStatus["INACTIVE"] = 0] = "INACTIVE";
    BusinessAccountStatus[BusinessAccountStatus["ACTIVE"] = 1] = "ACTIVE";
    BusinessAccountStatus[BusinessAccountStatus["EXPIRED"] = 2] = "EXPIRED";
    BusinessAccountStatus[BusinessAccountStatus["BLOCKED"] = 3] = "BLOCKED";
    BusinessAccountStatus[BusinessAccountStatus["DELETED"] = 4] = "DELETED";
})(BusinessAccountStatus || (BusinessAccountStatus = {}));
var DevicePlatform;
(function (DevicePlatform) {
    DevicePlatform["ANDROID"] = "ANDROID";
    DevicePlatform["IOS"] = "IOS";
    DevicePlatform["WINDOWS"] = "WINDOWS";
    DevicePlatform["FACEBOOK"] = "FACEBOOK";
})(DevicePlatform || (DevicePlatform = {}));
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus["ACTIVE"] = "ACTIVE";
    DeviceStatus["INACTIVE"] = "INACTIVE";
    DeviceStatus["BLOCKED"] = "BLOCKED";
})(DeviceStatus || (DeviceStatus = {}));


/***/ }),

/***/ "./src/app/models/intelligo-chat.models.ts":
/*!*************************************************!*\
  !*** ./src/app/models/intelligo-chat.models.ts ***!
  \*************************************************/
/*! exports provided: InputType, SenderType, MediaType, ButtonType, MessageType, Bool, InputCategory, MessageContentType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputType", function() { return InputType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderType", function() { return SenderType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaType", function() { return MediaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonType", function() { return ButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bool", function() { return Bool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputCategory", function() { return InputCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageContentType", function() { return MessageContentType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var InputType;
(function (InputType) {
    InputType[InputType["LOCATION"] = 7] = "LOCATION";
    InputType[InputType["DATE"] = 5] = "DATE";
    InputType[InputType["TIME"] = 6] = "TIME";
    InputType[InputType["ADDRESS"] = 4] = "ADDRESS";
    InputType[InputType["MEDIA"] = 8] = "MEDIA";
    InputType[InputType["OPTIONS"] = 10] = "OPTIONS";
    InputType[InputType["LIST"] = 9] = "LIST";
    InputType[InputType["PHONE"] = 3] = "PHONE";
    InputType[InputType["EMAIL"] = 2] = "EMAIL";
    InputType[InputType["NUMERIC"] = 1] = "NUMERIC";
    InputType[InputType["TEXT"] = 0] = "TEXT";
})(InputType || (InputType = {}));
var SenderType;
(function (SenderType) {
    SenderType[SenderType["AGENT"] = 3] = "AGENT";
    SenderType[SenderType["ANA"] = 1] = "ANA";
    SenderType[SenderType["AI"] = 2] = "AI";
    SenderType[SenderType["USER"] = 0] = "USER";
})(SenderType || (SenderType = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["IMAGE"] = 0] = "IMAGE";
    MediaType[MediaType["VIDEO"] = 2] = "VIDEO";
    MediaType[MediaType["FILE"] = 3] = "FILE";
    MediaType[MediaType["AUDIO"] = 1] = "AUDIO";
})(MediaType || (MediaType = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["ACTION"] = 2] = "ACTION";
    ButtonType[ButtonType["QUICK_REPLY"] = 1] = "QUICK_REPLY";
    ButtonType[ButtonType["URL"] = 0] = "URL";
})(ButtonType || (ButtonType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["CAROUSEL"] = 1] = "CAROUSEL";
    MessageType[MessageType["INPUT"] = 2] = "INPUT";
    MessageType[MessageType["EXTERNAL"] = 3] = "EXTERNAL";
    MessageType[MessageType["SIMPLE"] = 0] = "SIMPLE";
})(MessageType || (MessageType = {}));
var Bool;
(function (Bool) {
    Bool[Bool["TRUE"] = 1] = "TRUE";
    Bool[Bool["FALSE"] = 0] = "FALSE";
})(Bool || (Bool = {}));
var InputCategory;
(function (InputCategory) {
    InputCategory[InputCategory["Click"] = 0] = "Click";
    InputCategory[InputCategory["Text"] = 1] = "Text";
})(InputCategory || (InputCategory = {}));
var MessageContentType;
(function (MessageContentType) {
    MessageContentType[MessageContentType["Text"] = 0] = "Text";
    MessageContentType[MessageContentType["Media"] = 1] = "Media";
    MessageContentType[MessageContentType["Typing"] = 2] = "Typing";
})(MessageContentType || (MessageContentType = {}));


/***/ }),

/***/ "./src/app/pipes/ellipsis.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/ellipsis.pipe.ts ***!
  \****************************************/
/*! exports provided: EllipsisPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EllipsisPipe", function() { return EllipsisPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let EllipsisPipe = class EllipsisPipe {
    transform(value, args) {
        if (args === undefined) {
            return value;
        }
        if (value.length > args) {
            return value.substring(0, args) + '...';
        }
        else {
            return value;
        }
    }
};
EllipsisPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'ellipsis'
    })
], EllipsisPipe);



/***/ }),

/***/ "./src/app/services/analytics-window.service.ts":
/*!******************************************************!*\
  !*** ./src/app/services/analytics-window.service.ts ***!
  \******************************************************/
/*! exports provided: AnalyticsWindowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsWindowService", function() { return AnalyticsWindowService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _info_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./info-dialog.service */ "./src/app/services/info-dialog.service.ts");



let AnalyticsWindowService = class AnalyticsWindowService {
    constructor(infoDialog) {
        this.infoDialog = infoDialog;
    }
    open(apiBase, businessId, businessName) {
        // TODO Iframe
    }
};
AnalyticsWindowService.ctorParameters = () => [
    { type: _info_dialog_service__WEBPACK_IMPORTED_MODULE_2__["InfoDialogService"] }
];
AnalyticsWindowService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AnalyticsWindowService);



/***/ }),

/***/ "./src/app/services/authentication.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/authentication.service.ts ***!
  \****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");




let AuthenticationService = class AuthenticationService {
    constructor(http) {
        this.http = http;
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
};
AuthenticationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
AuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' })
], AuthenticationService);



/***/ }),

/***/ "./src/app/services/chatflow.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/chatflow.service.ts ***!
  \**********************************************/
/*! exports provided: ChatFlowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatFlowService", function() { return ChatFlowService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



let ChatFlowService = class ChatFlowService {
    constructor(http) {
        this.http = http;
        this.publishChatBotAPI = "bot/business";
    }
    normalizeBaseUrl(baseUrl) {
        baseUrl = baseUrl.replace(/\\Ï$/, ''); //Remove ending \ char if any
        if (!baseUrl.endsWith('/'))
            baseUrl += '/';
        return baseUrl;
    }
    publishProject(conn, proj, pack) {
        let chatNodes = this.normalizeChatNodes(pack.ChatNodes);
        return this.http.post(this.normalizeBaseUrl(conn.ServerUrl) + this.publishChatBotAPI, {
            business_id: proj.Id,
            flow: chatNodes,
            business_name: proj.Name
        });
    }
    chatProjectExists(conn, proj) {
        return this.http.get(this.normalizeBaseUrl(conn.ServerUrl) + this.publishChatBotAPI + "?business_id=" + proj.Id);
    }
    normalizeChatNodes(chatNodes) {
        chatNodes.forEach(x => {
            x.IsStartNode = x.IsStartNode ? true : false; //This field should exist even if it's false
        });
        return chatNodes;
    }
};
ChatFlowService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ChatFlowService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], ChatFlowService);



/***/ }),

/***/ "./src/app/services/data.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/data.service.ts ***!
  \******************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _models_data_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/data.models */ "./src/app/models/data.models.ts");
/* harmony import */ var _info_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./info-dialog.service */ "./src/app/services/info-dialog.service.ts");








let DataService = class DataService {
    constructor(http, infoDialog, dialog, router) {
        this.http = http;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.router = router;
        let connJSON = localStorage.getItem("conn");
        if (connJSON)
            this.conn = JSON.parse(connJSON);
    }
    getAnalyticsApiBase() {
        if (!this.conn || !this.conn.ServerUrl)
            return "";
        return this.conn.ServerUrl + "analytics";
    }
    get chatServer() {
        return this.conn;
    }
    isSuperAdmin() {
        if (!this.loggedInUser || !this.loggedInUser.roles)
            return false;
        return (this.loggedInUser.roles.map(x => x.role).indexOf("SUPER_ADMIN") != -1);
    }
    isBizAdmin() {
        if (!this.loggedInUser || !this.loggedInUser.roles)
            return false;
        return (this.loggedInUser.roles.map(x => x.role).indexOf("BUSINESS_ADMIN") != -1);
    }
    isFlowManager() {
        if (!this.loggedInUser || !this.loggedInUser.roles)
            return false;
        return (this.loggedInUser.roles
            .map(x => x.role)
            .indexOf("BUSINESS_FLOW_MANAGER") != -1);
    }
    normalizeBaseUrl(baseUrl) {
        baseUrl = baseUrl.replace(/\\$/, ""); //Remove ending \ char if any
        if (!baseUrl.endsWith("/"))
            baseUrl += "/";
        return baseUrl;
    }
    getHeaders() {
        if (this.loggedInUser && this.loggedInUser.accessToken)
            return new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                "access-token": this.loggedInUser.accessToken
            });
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
    }
    setConnection(conn) {
        if (conn && conn.ServerUrl)
            conn.ServerUrl = this.normalizeBaseUrl(conn.ServerUrl);
        localStorage.setItem("conn", JSON.stringify(conn));
        this.conn = conn;
    }
    getRoles() {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}auth/roles`, {
            headers: h
        });
    }
    getBusinessAccounts(searchText = "", page = 0, size = 10) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}business/accounts?searchText=${encodeURIComponent(searchText)}&page=${page}&size=${size}`, { headers: h });
    }
    getBusinessDetails(bizId) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}business/accounts/${bizId}`, { headers: h });
    }
    updateBusinessAccountStatus(account, status) {
        let h = this.getHeaders();
        return this.http.put(this.conn.ServerUrl +
            "business/accounts/" +
            account.id +
            "/status/" +
            _models_data_models__WEBPACK_IMPORTED_MODULE_6__["BusinessAccountStatus"][status], { headers: h });
    }
    saveBusinessAccount(account, create) {
        if (create) {
            return this.http.post(this.conn.ServerUrl + "business/accounts", account, { headers: this.getHeaders() });
        }
        else {
            return this.http.put(this.conn.ServerUrl + "business/accounts/" + account.id, account, { headers: this.getHeaders() });
        }
    }
    getChatProjects(businessId, page = 0, size = 10) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}business/flows?page=${page}&size=${size}&businessId=${businessId}`, { headers: h });
    }
    createChatProject(chatProject) {
        let h = this.getHeaders();
        return this.http.post(`${this.conn.ServerUrl}business/flows`, chatProject, { headers: h });
    }
    registerOnAnaCloud(request) {
        let h = this.getHeaders();
        let serverUrl = "http://gateway.api.dev.ana.chat/";
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
            serverUrl = "http://gateway.api.ana.chat/";
        }
        return this.http.post(`${serverUrl}business/accounts/publicRegister`, request, { headers: h });
    }
    saveChatProject(chatProject) {
        let h = this.getHeaders();
        if ((chatProject.flow && Object.keys(chatProject.flow).length <= 0) ||
            chatProject.flow === null) {
            delete chatProject.flow;
        }
        if ((chatProject.source && Object.keys(chatProject.source).length <= 0) ||
            chatProject.source === null) {
            delete chatProject.source;
        }
        return this.http.put(`${this.conn.ServerUrl}business/flows/${chatProject.id}`, chatProject, { headers: h });
    }
    getUsers(bizid, searchText = "", page = 0, size = 10) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}auth/users?searchText=${encodeURIComponent(searchText)}&page=${page}&size=${size}&businessId=${bizid}`, { headers: h });
    }
    createUser(user) {
        let h = this.getHeaders();
        return this.http.post(`${this.conn.ServerUrl}auth/users/accounts/register`, user, { headers: h });
    }
    login(username, password) {
        return this.http.post(this.conn.ServerUrl + "auth/login", {
            username: username,
            password: password
        });
    }
    updatePassword(userId, password) {
        let h = this.getHeaders();
        return this.http.put(`${this.conn.ServerUrl}auth/credentials/${userId}`, {
            newPassword: password
        }, { headers: h });
    }
    changeCurrentUserPassword(password, newPassword) {
        let h = this.getHeaders();
        return this.http.put(`${this.conn.ServerUrl}auth/credentials/reset`, {
            newPassword: newPassword,
            password: password
        }, { headers: h });
    }
    checkLogin(data) {
        return this.http.get(this.conn.ServerUrl + "auth/me", {
            headers: { "access-token": data.accessToken }
        });
    }
    logout() {
        localStorage.removeItem("user");
        let h = this.getHeaders();
        delete this.loggedInUser;
        return this.http
            .get(this.conn.ServerUrl + "auth/logout", {
            headers: h
        })
            .subscribe(x => x);
    }
    userLoggedinCheck(callback, hardCheck = false) {
        if (this.conn && this.conn.ServerUrl) {
            let userJSON = localStorage.getItem("user");
            if (userJSON) {
                let user = JSON.parse(userJSON);
                if (user.accessToken && !hardCheck) {
                    this.loggedInUser = user;
                    callback(true);
                    return;
                }
                // this.checkLogin(user)(x => {
                // 	if (x.success) {
                // 		this.loggedInUser = user;
                // 		callback(true);
                // 	} else {
                // 		callback(false);
                // 	}
                // }, err => {
                // 	callback(false);
                // });
                return;
            }
        }
        callback(false);
    }
    handleError(err, title, message) {
        let body = err.error;
        if (body && body.error) {
            this.handleTypedError(body.error, title, message);
        }
        else
            this.infoDialog.alert(title, message);
    }
    handleTypedError(err, title, message) {
        let msg = err.message || message;
        if (err.errors) {
            err.errors.forEach(x => {
                msg += ` ${x.message}`;
            });
        }
        this.infoDialog.alert(title, msg);
    }
};
DataService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _info_dialog_service__WEBPACK_IMPORTED_MODULE_7__["InfoDialogService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
DataService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], DataService);



/***/ }),

/***/ "./src/app/services/globals.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/globals.service.ts ***!
  \*********************************************/
/*! exports provided: GlobalsService, VariableType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalsService", function() { return GlobalsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariableType", function() { return VariableType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bson */ "./node_modules/bson/dist/bson.browser.esm.js");
/* harmony import */ var _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/chatflow.models */ "./src/app/models/chatflow.models.ts");





let GlobalsService = class GlobalsService {
    constructor(title) {
        this.title = title;
        this.appName = "Chatbots.mn";
        this.loading = false;
        this.EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/;
        this.PHONE_REGEX = /^\+?\d{6,15}$/;
    }
    setPageTitle(title) {
        if (title)
            this.title.setTitle(`${title} - ${this.appName}`);
        else
            this.title.setTitle(this.appName);
    }
    downloadTextAsFile(filename, text) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
            .toString()
            .replace(/[018]/g, c => (c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
    }
    getVariableType(x) {
        if (Array.isArray(x))
            return VariableType.Array;
        else if (typeof x == "string")
            return VariableType.String;
        else if (x != null && typeof x == "object")
            return VariableType.Object;
        else
            return VariableType.Other;
    }
    anaDateDisplay(anaDate) {
        return `${parseInt(anaDate.mday)}-${parseInt(anaDate.month)}-${parseInt(anaDate.year)}`;
    }
    anaTimeDisplay(anaTime) {
        let hr = parseInt(anaTime.hour);
        let min = parseInt(anaTime.minute);
        var hours = hr > 12 ? hr - 12 : hr;
        var am_pm = hr >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = min < 10 ? "0" + min : min;
        return hours + ":" + minutes + " " + am_pm;
    }
    anaAddressDisplay(anaAddress) {
        return [
            anaAddress.line1,
            anaAddress.area,
            anaAddress.city,
            anaAddress.state,
            anaAddress.country,
            anaAddress.pin
        ]
            .filter(x => x)
            .join(", ");
    }
    anaLocationDisplay(anaLoc) {
        return `${anaLoc.lat},${anaLoc.lng}`;
    }
    emailValid(val) {
        if (val)
            return this.EMAIL_REGEX.test(val);
        return false;
    }
    phoneValid(val) {
        if (val)
            return this.PHONE_REGEX.test(val);
        return false;
    }
    pwdMatch(p1, p2) {
        if (!p1)
            return false;
        if (p1.length < 6)
            return false;
        return p1 == p2;
    }
    normalizeChatNodes(chatNodes) {
        chatNodes.forEach(x => {
            x.IsStartNode = x.IsStartNode ? true : false; //This field should exist even if it's false
        });
        return chatNodes;
    }
    cloneNode(srcNode) {
        if (!srcNode) {
            return false;
        }
        let targetNode = JSON.parse(JSON.stringify(srcNode));
        targetNode.Id = new bson__WEBPACK_IMPORTED_MODULE_3__["ObjectID"]().toHexString();
        targetNode.Name += " Copy";
        targetNode.NextNodeId = null;
        if (targetNode.Buttons) {
            targetNode.Buttons.forEach(btn => {
                btn._id = new bson__WEBPACK_IMPORTED_MODULE_3__["ObjectID"]().toHexString();
                btn.NextNodeId = null;
            });
        }
        if (targetNode.Sections) {
            targetNode.Sections.forEach(section => {
                section._id = new bson__WEBPACK_IMPORTED_MODULE_3__["ObjectID"]().toHexString();
                if (section.SectionType == _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Carousel) {
                    let car = section;
                    car.Items.forEach(carItem => {
                        carItem._id = new bson__WEBPACK_IMPORTED_MODULE_3__["ObjectID"]().toHexString();
                        carItem.Buttons.forEach(carBtn => {
                            carBtn._id = new bson__WEBPACK_IMPORTED_MODULE_3__["ObjectID"]().toHexString();
                            carBtn.NextNodeId = null;
                        });
                    });
                }
            });
        }
        return targetNode;
    }
};
GlobalsService.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"] }
];
GlobalsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], GlobalsService);

var VariableType;
(function (VariableType) {
    VariableType[VariableType["Array"] = 0] = "Array";
    VariableType[VariableType["String"] = 1] = "String";
    VariableType[VariableType["Object"] = 2] = "Object";
    VariableType[VariableType["Other"] = 3] = "Other";
})(VariableType || (VariableType = {}));


/***/ }),

/***/ "./src/app/services/info-dialog.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/info-dialog.service.ts ***!
  \*************************************************/
/*! exports provided: InfoDialogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoDialogService", function() { return InfoDialogService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/shared/info-dialog/info-dialog.component */ "./src/app/components/shared/info-dialog/info-dialog.component.ts");
/* harmony import */ var _components_shared_loading_mask_loading_mask_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/shared/loading-mask/loading-mask.component */ "./src/app/components/shared/loading-mask/loading-mask.component.ts");





let InfoDialogService = class InfoDialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    alert(title, message, callback) {
        let data = {
            dialogType: _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogType"].Alert,
            message: message,
            title: title
        };
        let d = this.dialog.open(_components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogComponent"], {
            width: "auto",
            data: data
        });
        if (callback)
            d.afterClosed().subscribe(x => {
                if (callback)
                    callback();
            });
    }
    prompt(title, message, callback, defaultText) {
        let data = {
            dialogType: _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogType"].Prompt,
            message: message,
            title: title,
            defaultInputText: defaultText
        };
        let d = this.dialog.open(_components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogComponent"], {
            width: "auto",
            data: data
        });
        d.afterClosed().subscribe(x => {
            callback(x);
        });
    }
    confirm(title, message, callback) {
        let data = {
            dialogType: _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogType"].Confirm,
            message: message,
            title: title
        };
        let d = this.dialog.open(_components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogComponent"], {
            width: "auto",
            data: data
        });
        d.afterClosed().subscribe(x => {
            callback(x);
        });
    }
    showSpinner() {
        this.hideSpinner();
        this.dialogRef = this.dialog.open(_components_shared_loading_mask_loading_mask_component__WEBPACK_IMPORTED_MODULE_4__["LoadingMaskComponent"], {
            width: "auto",
            disableClose: true,
            panelClass: "trans-background"
        });
    }
    hideSpinner() {
        if (this.dialogRef) {
            this.dialogRef.close();
            delete this.dialogRef;
        }
    }
};
InfoDialogService.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
InfoDialogService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], InfoDialogService);



/***/ }),

/***/ "./src/app/services/login.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/login.service.ts ***!
  \*******************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _components_shared_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/shared/login/login.component */ "./src/app/components/shared/login/login.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let LoginService = class LoginService {
    constructor(dataService, dialog, router) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.router = router;
    }
    performLogin(skipAuth, fallbackUrl = "/", hardCheck = false, next) {
        this.dataService.userLoggedinCheck((loggedin) => {
            if (!loggedin && skipAuth == false) {
                let d = this.dialog.open(_components_shared_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"], {
                    width: '600px',
                });
                d.afterClosed().subscribe(x => {
                    if (x == true) {
                        if (next)
                            next(true);
                        return;
                    }
                    if (fallbackUrl)
                        this.router.navigateByUrl(fallbackUrl);
                    if (next)
                        next(true);
                });
            }
            else {
                if (next)
                    next(loggedin);
            }
        }, hardCheck);
    }
};
LoginService.ctorParameters = () => [
    { type: _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
LoginService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], LoginService);



/***/ }),

/***/ "./src/app/services/settings.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/settings.service.ts ***!
  \**********************************************/
/*! exports provided: SettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsService", function() { return SettingsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");



let SettingsService = class SettingsService {
    constructor(infoDialog) {
        this.infoDialog = infoDialog;
    }
    loadSavedConnections() {
        var loaded = JSON.parse(localStorage.getItem(SettingKey.SavedConnsKey));
        if (loaded)
            return loaded;
        else
            return [];
    }
    saveSavedConnections(connections) {
        localStorage.setItem(SettingKey.SavedConnsKey, JSON.stringify(connections));
    }
    saveChatProject(chatProjectName, pack, quite, next) {
        chatProjectName += '.intelligo';
        if (quite) {
            localStorage.setItem(chatProjectName, JSON.stringify(pack));
            if (next)
                next();
        }
        else {
            let existing = localStorage.getItem(chatProjectName);
            if (existing) {
                this.infoDialog.confirm('Sure?', 'Chat project the given name already exists. Do you want to overwrite it?', (ok) => {
                    if (ok) {
                        localStorage.setItem(chatProjectName, JSON.stringify(pack));
                        if (next)
                            next();
                    }
                });
            }
            else {
                localStorage.setItem(chatProjectName, JSON.stringify(pack));
                if (next)
                    next();
            }
        }
    }
    getChatProject(chatProjectName) {
        chatProjectName += '.intelligo';
        let existing = localStorage.getItem(chatProjectName);
        if (!existing) {
            this.infoDialog.alert('Not found', `Chat Project with name '${chatProjectName}' does not exist`);
            return null;
        }
        return JSON.parse(existing);
    }
    listSavedChatProjectNames() {
        let savedProjs = [];
        for (var key in localStorage) {
            if (key.endsWith('.intelligo')) {
                let name = key.replace(new RegExp('\.intelligo$'), '');
                savedProjs.push(name);
            }
        }
        return savedProjs.sort((x, y) => ((x && y) ? x.localeCompare(y) : 1));
    }
    renameChatProject(oldName, newName) {
        if (oldName == newName)
            return;
        oldName += ".intelligo";
        newName += ".intelligo";
        let temp = localStorage.getItem(oldName);
        if (!temp) {
            this.infoDialog.alert('Not found', `${oldName} not found`);
            return;
        }
        localStorage.setItem(newName, temp);
        localStorage.removeItem(oldName);
    }
    deleteChatProject(name) {
        name += ".intelligo";
        let exists = localStorage.getItem(name);
        if (!exists) {
            this.infoDialog.alert('Not found', `${name} not found`);
            return false;
        }
        localStorage.removeItem(name);
        return true;
    }
};
SettingsService.ctorParameters = () => [
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_2__["InfoDialogService"] }
];
SettingsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], SettingsService);

var SettingKey;
(function (SettingKey) {
    SettingKey["SavedConnsKey"] = "SAVED_CONNECTIONS";
})(SettingKey || (SettingKey = {}));


/***/ }),

/***/ "./src/app/services/simulator.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/simulator.service.ts ***!
  \***********************************************/
/*! exports provided: SimulatorService, SimulatorMessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorService", function() { return SimulatorService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorMessageType", function() { return SimulatorMessageType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var jsonpath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonpath */ "./node_modules/jsonpath/jsonpath.js");
/* harmony import */ var jsonpath__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonpath__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/chatflow.models */ "./src/app/models/chatflow.models.ts");
/* harmony import */ var _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/intelligo-chat.models */ "./src/app/models/intelligo-chat.models.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");









let SimulatorService = class SimulatorService {
    constructor(http, globals, infoDialog) {
        this.http = http;
        this.globals = globals;
        this.infoDialog = infoDialog;
        this.debug = true;
        this.chatFlow = [];
        this.simulatorBusinessId = 'ana-studio';
        this.simulatorCustomerId = 'ana-simulator';
        window.onmessage = (event) => {
            this.logDebug('On message received from client:');
            this.logDebug(event.data);
            let msg = event.data;
            if (msg.type == SimulatorMessageType.AnaChatMessage) {
                let cfMsg = msg;
                this.handleIncomingMessage(cfMsg.data);
            }
        };
    }
    init(chatFlow, simulatorFrame) {
        this.chatFlow = chatFlow;
        this.simulatorFrame = simulatorFrame;
        if (this.chatFlow && this.chatFlow.length > 0) {
            this.state = {
                variables: {}
            };
            this.pushResetToClient();
            let firstMsg = {
                "meta": {
                    "sender": {
                        "id": this.simulatorBusinessId,
                        "medium": 100
                    },
                    "recipient": {
                        "id": this.simulatorCustomerId,
                        "medium": 100
                    },
                    "senderType": _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["SenderType"].USER,
                    "timestamp": new Date().getTime(),
                },
                "data": {
                    "type": 2,
                    "content": {
                        "inputType": _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].OPTIONS,
                        "mandatory": 1,
                        "options": [
                            {
                                "title": "Get Started",
                                "value": "GetStarted"
                            }
                        ],
                        "input": {
                            "val": "GET_STARTED"
                        }
                    }
                }
            };
            this.handleIncomingMessage(firstMsg);
        }
    }
    handleIncomingMessage(message) {
        this.logDebug("Incoming message from client: ");
        this.logDebug(message);
        this.processIncomingMessage(message);
    }
    pushMessageToClient(message) {
        if (this.simulatorFrame) {
            let resp = {
                data: message,
                type: SimulatorMessageType.AnaChatMessage
            };
            this.simulatorFrame.frame().postMessage(resp, "*");
        }
    }
    pushResetToClient() {
        if (this.simulatorFrame) {
            this.simulatorFrame.frame().postMessage({
                type: SimulatorMessageType.AnaChatReset
            }, "*");
        }
    }
    processIncomingMessage(chatMsg) {
        let message = chatMsg.data;
        if (message.type == _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT) {
            let ipMsgContent = message.content;
            if (ipMsgContent.input && Object.keys(ipMsgContent.input).length > 0) {
                let nextNodeId = "";
                let userData = null;
                switch (ipMsgContent.inputType) {
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].LOCATION: //Click, Complex
                        {
                            let locIp = ipMsgContent.input;
                            userData = locIp.location;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetLocation);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].DATE: //Click, Complex
                        {
                            let ip = ipMsgContent.input;
                            userData = ip.date;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetDate);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].TIME: //Click, Complex
                        {
                            let ip = ipMsgContent.input;
                            userData = ip.time;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetTime);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].ADDRESS: //Click, Complex
                        {
                            let ip = ipMsgContent.input;
                            userData = ip.address;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetAddress);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].MEDIA: //Click, Non Complex
                        {
                            let ip = ipMsgContent.input;
                            if (ip.media && ip.media.length > 0 && ip.media[0]) {
                                if (typeof ip.media[0].url == 'object')
                                    userData = ip.media[0].url.changingThisBreaksApplicationSecurity;
                                else
                                    userData = ip.media[0].url;
                                let cfmType = _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetFile;
                                switch (ip.media[0].type) {
                                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].AUDIO:
                                        cfmType = _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetAudio;
                                        break;
                                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].VIDEO:
                                        cfmType = _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetVideo;
                                        break;
                                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].IMAGE:
                                        cfmType = _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetImage;
                                        break;
                                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].FILE:
                                    default:
                                        cfmType = _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetFile;
                                        break;
                                }
                                let clickedBtn = this.getNodeButtonByType(cfmType);
                                if (clickedBtn)
                                    nextNodeId = clickedBtn.NextNodeId;
                            }
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].OPTIONS: //Click, Non Complex
                        {
                            let ip = ipMsgContent.input; //Option also has input.val
                            if (ip.val == "GET_STARTED") {
                                let firstNode = underscore__WEBPACK_IMPORTED_MODULE_3__["first"](this.chatFlow.filter(x => x.IsStartNode));
                                nextNodeId = (firstNode ? firstNode.Id : this.chatFlow[0].Id);
                            }
                            else {
                                let clickedBtn = this.getNodeButtonById(ip.val);
                                if (clickedBtn) {
                                    nextNodeId = clickedBtn.NextNodeId;
                                    userData = clickedBtn.VariableValue;
                                }
                            }
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].LIST: //Click, Complex
                        {
                            let ipMsg = ipMsgContent;
                            let ip = ipMsg.input;
                            let listSelectedValues = ip.val.split(',');
                            let listSelectedItems = ipMsg.values.filter(x => listSelectedValues.indexOf(x.value) != -1);
                            userData = ip.val; //listSelectedItems.map(x => x.text);
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetItemFromSource);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].PHONE:
                        {
                            let ip = ipMsgContent.input;
                            userData = ip.val;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetPhoneNumber);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].EMAIL:
                        {
                            let ip = ipMsgContent.input;
                            userData = ip.val;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetEmail);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].NUMERIC:
                        {
                            let ip = ipMsgContent.input;
                            userData = ip.val;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetNumber);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    case _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].TEXT:
                        {
                            let ip = ipMsgContent.input;
                            userData = ip.val;
                            let clickedBtn = this.getNodeButtonByType(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetText);
                            if (clickedBtn)
                                nextNodeId = clickedBtn.NextNodeId;
                        }
                        break;
                    default:
                        break;
                }
                if (typeof userData == 'object') {
                    userData = JSON.stringify(userData);
                }
                this.saveVariable(userData);
                this.gotoNextNode(nextNodeId);
            }
        }
        else if (message.type == _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].CAROUSEL) {
            let msgContent = message.content;
            if (msgContent.input && Object.keys(msgContent.input).indexOf('val') != -1 && msgContent.input.val) {
                let clickedCarBtn = this.getCarouselButtonById(msgContent.input.val);
                this.saveVariable(clickedCarBtn.VariableValue);
                switch (clickedCarBtn.Type) {
                    case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["CarouselButtonType"].DeepLink:
                    case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["CarouselButtonType"].OpenUrl:
                    case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["CarouselButtonType"].NextNode:
                    default:
                        this.gotoNextNode(clickedCarBtn.NextNodeId);
                        break;
                }
            }
        }
    }
    gotoNextNode(nextNodeId) {
        let nextNode = this.getNodeById(nextNodeId);
        if (nextNode)
            this.processNode(nextNode);
    }
    getNodeById(Id) {
        if (Id) {
            let foundNodes = this.chatFlow.filter(n => n.Id == Id);
            if (foundNodes && foundNodes.length > 0)
                return foundNodes[0];
        }
        return null;
    }
    getNodeButtonById(buttonId) {
        let btn = this.state.currentNode.Buttons.filter(x => x._id == buttonId);
        return (btn && btn.length > 0) ? btn[0] : null;
    }
    getNodeButtonByType(type) {
        let btn = this.state.currentNode.Buttons.filter(x => x.ButtonType == type);
        let firstTry = (btn && btn.length > 0) ? btn[0] : null;
        if (firstTry)
            return firstTry;
        if (type == _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetText) {
            let found = underscore__WEBPACK_IMPORTED_MODULE_3__["first"](underscore__WEBPACK_IMPORTED_MODULE_3__["filter"](this.state.currentNode.Buttons, x => underscore__WEBPACK_IMPORTED_MODULE_3__["contains"]([
                _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetPhoneNumber,
                _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetEmail,
                _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetNumber
            ], x.ButtonType)));
            if (found)
                return found;
        }
        return null;
    }
    getCarouselButtonById(carItemBtnId) {
        let carSection = this.state.currentSection;
        if (carSection && carSection.SectionType == _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Carousel) {
            let selectedCarBtn = null;
            for (var i = 0; i < carSection.Items.length; i++) {
                let carItem = carSection.Items[i];
                for (var j = 0; j < carItem.Buttons.length; j++) {
                    let carBtn = carItem.Buttons[j];
                    if (carBtn._id == carItemBtnId) {
                        selectedCarBtn = carBtn;
                        break;
                    }
                }
                if (selectedCarBtn) {
                    break;
                }
            }
            return selectedCarBtn;
        }
        return null;
    }
    saveVariable(value) {
        if (value && this.state.currentNode && this.state.currentNode.VariableName)
            this.state.variables[this.state.currentNode.VariableName] = value;
    }
    logDebug(msg) {
        if (this.debug)
            console.log(msg);
    }
    processVerbsForChatNode(chatNode) {
        try {
            let nodeJson = this.processVerbs(JSON.stringify(chatNode));
            return JSON.parse(nodeJson);
        }
        catch (e) {
            this.logDebug(e);
        }
    }
    replaceTxt(subStr, key) {
        if (!key)
            key = subStr.replace('{{', '').replace('}}', '');
        try {
            if (this.state.variables && this.state.variables[key])
                return this.state.variables[key];
            else {
                let rootToken = key.split(/\.|\[/)[0];
                let wrappedResp = {};
                wrappedResp[rootToken] = JSON.parse(this.state.variables[rootToken]);
                let deepValue = jsonpath__WEBPACK_IMPORTED_MODULE_2__["query"](wrappedResp, key);
                if (deepValue && typeof deepValue == 'object' && deepValue.length == 1) {
                    deepValue = deepValue[0];
                }
                return deepValue;
            }
        }
        catch (e) {
            return subStr;
        }
    }
    jsonEscape(value) {
        if (value && (typeof value == "string") && value.replace) {
            let rTxt = value
                .replace(/\n/g, "\\n")
                //.replace(/\'/g, "\\'")
                .replace(/\"/g, '\\"')
                //.replace(/\&/g, "\\&")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t")
                .replace(/\f/g, "\\f");
            return rTxt;
        }
        return value;
    }
    processVerbs(txt) {
        let processedText = txt.replace(/\[~(.*?)\]|{{(.*?)}}/g, (subStr, key) => {
            return this.jsonEscape(this.replaceTxt(subStr, key));
        });
        return processedText;
    }
    processNode(chatNode, section) {
        chatNode = this.processVerbsForChatNode(chatNode);
        this.state.currentNode = chatNode;
        this.state.currentSection = section || underscore__WEBPACK_IMPORTED_MODULE_3__["first"](chatNode.Sections);
        switch (chatNode.NodeType) {
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["NodeType"].ApiCall:
                {
                    let apiHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpHeaders"]();
                    if (chatNode.Headers) {
                        let splits = chatNode.Headers.split(/\n|,/);
                        for (var si = 0; si < splits.length; si++) {
                            try {
                                let split = splits[si];
                                if (split.indexOf(':') != -1) {
                                    let key = split.split(':')[0];
                                    let value = split.split(':')[1];
                                    apiHeaders.set(key, value);
                                }
                            }
                            catch (e) {
                                this.logDebug('Invalid format provided in headers');
                                this.logDebug(e);
                            }
                        }
                    }
                    let reqBody = null;
                    if (chatNode.RequestBody)
                        reqBody = this.processVerbs(chatNode.RequestBody);
                    let reqParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]();
                    if (chatNode.RequiredVariables) {
                        for (var i = 0; i < chatNode.RequiredVariables.length; i++) {
                            if (chatNode.RequiredVariables[i] && Object.keys(this.state.variables).indexOf(chatNode.RequiredVariables[i]) != -1)
                                reqParams.append(chatNode.RequiredVariables[i], this.state.variables[chatNode.RequiredVariables[i]]);
                        }
                    }
                    let nextNodeId = chatNode.NextNodeId;
                    this.http.request(_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["APIMethod"][chatNode.ApiMethod], chatNode.ApiUrl, {
                        headers: apiHeaders,
                        body: reqBody,
                        params: reqParams,
                    }).subscribe((res) => {
                        this.saveVariable(res.text());
                        this.processConditionNode(chatNode);
                    }, err => {
                        if (Math.trunc(err.status / 100) == 5 || typeof err._body == 'object') { //Only 5xx errors are counted as errors
                            this.logDebug(err);
                            this.gotoNextNode(nextNodeId); //Fallback node
                        }
                        else {
                            this.saveVariable(err._body);
                            this.processConditionNode(chatNode);
                        }
                    });
                }
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["NodeType"].Card:
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["NodeType"].Condition:
                this.processConditionNode(chatNode);
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["NodeType"].Combination:
            default:
                {
                    if (chatNode.Sections && chatNode.Sections.length > 0) {
                        let msg = this.convertSection(this.state.currentSection);
                        this.prepareReplyAndSend(msg);
                        let sectionIndex = chatNode.Sections.findIndex(x => x._id == this.state.currentSection._id);
                        let remainingSections = chatNode.Sections.length - (sectionIndex + 1);
                        if (remainingSections > 0) {
                            this.processNode(chatNode, chatNode.Sections[sectionIndex + 1]);
                            return;
                        }
                    }
                    if (this.state.currentNode && this.state.currentNode.Buttons && this.state.currentNode.Buttons.length > 0) {
                        this.convertButtons(this.state.currentNode, (inputMsgToSend) => {
                            this.prepareReplyAndSend(inputMsgToSend);
                        });
                    }
                }
                break;
        }
    }
    prepareReplyAndSend(data) {
        let meta = {
            id: this.globals.uuidv4(),
            recipient: {
                id: this.simulatorBusinessId,
                medium: 100
            },
            sender: {
                id: this.simulatorCustomerId,
                medium: 100
            },
            senderType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["SenderType"].ANA,
            sessionId: '1234',
            timestamp: new Date().getTime(),
            responseTo: ''
        };
        this.pushMessageToClient({
            meta: meta,
            data: data
        });
    }
    convertSection(section) {
        let anaMessageContent = {
            text: ''
        };
        let anaMessageData = {
            content: anaMessageContent,
            type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].SIMPLE
        };
        switch (section.SectionType) {
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Image:
                anaMessageContent.media = {
                    type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].IMAGE,
                    url: section.Url,
                };
                anaMessageContent.text = section.Title;
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Text:
            default:
                anaMessageContent.text = section.Text;
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Gif:
                anaMessageContent.media = {
                    type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].IMAGE,
                    url: section.Url,
                };
                anaMessageContent.text = section.Title;
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Audio:
                anaMessageContent.media = {
                    type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].AUDIO,
                    url: section.Url,
                };
                anaMessageContent.text = section.Title;
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Video:
                anaMessageContent.media = {
                    type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].VIDEO,
                    url: section.Url,
                };
                anaMessageContent.text = section.Title;
                break;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["SectionType"].Carousel:
                {
                    let carContent = {
                        items: underscore__WEBPACK_IMPORTED_MODULE_3__["map"](section.Items, x => {
                            return {
                                title: x.Title,
                                desc: x.Caption,
                                media: {
                                    type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].IMAGE,
                                    url: x.ImageUrl
                                },
                                options: underscore__WEBPACK_IMPORTED_MODULE_3__["map"](x.Buttons, y => {
                                    if (y.Type == _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["CarouselButtonType"].NextNode) {
                                        return {
                                            title: y.Text,
                                            value: y._id,
                                            type: this.convertCarouselButtonType(y.Type)
                                        };
                                    }
                                    else {
                                        return {
                                            title: y.Text,
                                            value: JSON.stringify({
                                                url: y.Url,
                                                value: y._id
                                            }),
                                            type: this.convertCarouselButtonType(y.Type)
                                        };
                                    }
                                }),
                                url: ''
                            };
                        }),
                        mandatory: 1
                    };
                    anaMessageData = {
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].CAROUSEL,
                        content: carContent
                    };
                }
                break;
        }
        return anaMessageData;
    }
    convertButtons(chatNode, callback) {
        let clickInputs = underscore__WEBPACK_IMPORTED_MODULE_3__["filter"](chatNode.Buttons, x => underscore__WEBPACK_IMPORTED_MODULE_3__["contains"]([
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].DeepLink,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].OpenUrl,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetDate,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetImage,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetVideo,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetAddress,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetAudio,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetDateTime,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetTime,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetItemFromSource,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetFile,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetLocation,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].FetchChatFlow,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].ShowConfirmation,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].NextNode,
        ], x.ButtonType));
        let textInputs = underscore__WEBPACK_IMPORTED_MODULE_3__["filter"](chatNode.Buttons, x => underscore__WEBPACK_IMPORTED_MODULE_3__["contains"]([
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetText,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetEmail,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetPhoneNumber,
            _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetNumber,
        ], x.ButtonType));
        let mandatory = 1;
        if (textInputs && textInputs.length > 0 && clickInputs && clickInputs.length > 0)
            mandatory = 0;
        if (clickInputs && clickInputs.length > 0) {
            if (underscore__WEBPACK_IMPORTED_MODULE_3__["filter"](clickInputs, x => underscore__WEBPACK_IMPORTED_MODULE_3__["contains"]([_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].NextNode, _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].OpenUrl], x.ButtonType)).length > 0) { //If next node/open url button is present, only options can be sent
                //Build options input and send
                let optionsInput = {
                    inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].OPTIONS,
                    mandatory: mandatory,
                    options: underscore__WEBPACK_IMPORTED_MODULE_3__["map"](underscore__WEBPACK_IMPORTED_MODULE_3__["filter"](clickInputs, x => underscore__WEBPACK_IMPORTED_MODULE_3__["contains"]([_models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].NextNode, _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].OpenUrl], x.ButtonType)), y => {
                        return {
                            title: y.ButtonName || y.ButtonText,
                            value: (y.ButtonType == _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].OpenUrl ? JSON.stringify({ url: y.Url, value: y._id }) : y._id),
                            type: this.convertButtonType(y.ButtonType)
                        };
                    })
                };
                return callback({
                    content: optionsInput,
                    type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                });
            }
            let inputButton = underscore__WEBPACK_IMPORTED_MODULE_3__["first"](clickInputs);
            switch (inputButton.ButtonType) {
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetDate:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].DATE,
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetTime:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].TIME,
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetVideo:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].MEDIA,
                            mediaType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].VIDEO
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetImage:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].MEDIA,
                            mediaType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].IMAGE
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetAddress:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].ADDRESS,
                            requiredFields: [
                                "area",
                                "country",
                                "pin",
                                "city",
                                "state",
                                "line1"
                            ]
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetAudio:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].MEDIA,
                            mediaType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].AUDIO
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetItemFromSource:
                    {
                        if (inputButton.ItemsSource) {
                            let msg = {
                                inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].LIST,
                                multiple: inputButton.AllowMultiple,
                                mandatory: mandatory,
                                values: []
                            };
                            let itemSrc = inputButton.ItemsSource.split(',').map(x => {
                                let y = x.trim().split(':');
                                return { K: y[0], V: y[1] };
                            });
                            itemSrc.forEach(x => msg.values.push({
                                text: x.K,
                                value: x.V
                            }));
                            return callback({
                                content: msg,
                                type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                            });
                        }
                        if (inputButton.Url) {
                            this.http.get(inputButton.Url).subscribe((x) => {
                                let items = x.json();
                                let itemKeys = Object.keys(items);
                                let msg = {
                                    inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].LIST,
                                    multiple: inputButton.AllowMultiple,
                                    mandatory: mandatory,
                                    values: itemKeys.map(key => {
                                        return {
                                            text: key,
                                            value: items[key]
                                        };
                                    })
                                };
                                return callback({
                                    content: msg,
                                    type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                                });
                            });
                            return;
                        }
                    }
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetFile:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].MEDIA,
                            mediaType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MediaType"].FILE
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetLocation:
                    return callback({
                        content: {
                            mandatory: mandatory,
                            inputType: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].LOCATION,
                        },
                        type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
                    });
                default:
                    break;
            }
        }
        if (textInputs && textInputs.length > 0) {
            let textInput = textInputs[0];
            let inputMsg = {
                inputType: this.convertButtonTypeToInputType(textInput.ButtonType),
                mandatory: mandatory,
                textInputAttr: {
                    defaultText: textInput.DefaultText,
                    maxLength: textInput.MaxLength,
                    minLength: textInput.MinLength,
                    multiLine: textInput.IsMultiLine ? 1 : 0,
                    placeHolder: textInput.PlaceholderText
                }
            };
            return callback({
                content: inputMsg,
                type: _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["MessageType"].INPUT
            });
        }
    }
    convertButtonTypeToInputType(srcType) {
        switch (srcType) {
            default:
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetText:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].TEXT;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetEmail:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].EMAIL;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetNumber:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].NUMERIC;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].GetPhoneNumber:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["InputType"].PHONE;
        }
    }
    convertCarouselButtonType(srcType) {
        switch (srcType) {
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["CarouselButtonType"].DeepLink:
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["CarouselButtonType"].OpenUrl:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["ButtonType"].URL;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["CarouselButtonType"].NextNode:
            default:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["ButtonType"].ACTION;
        }
    }
    convertButtonType(srcType) {
        switch (srcType) {
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].DeepLink:
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].OpenUrl:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["ButtonType"].URL;
            case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ButtonType"].NextNode:
            default:
                return _models_intelligo_chat_models__WEBPACK_IMPORTED_MODULE_5__["ButtonType"].ACTION;
        }
    }
    processConditionNode(chatNode) {
        let done = false;
        try {
            if (chatNode.Buttons) {
                for (var btnIdx = 0; btnIdx < chatNode.Buttons.length; btnIdx++) {
                    let btn = chatNode.Buttons[btnIdx];
                    let rootToken = btn.ConditionMatchKey.split(/\.|\[/)[0];
                    let wrappedResp = {};
                    wrappedResp[rootToken] = JSON.parse(this.state.variables[rootToken]);
                    let deepValue = jsonpath__WEBPACK_IMPORTED_MODULE_2__["query"](wrappedResp, btn.ConditionMatchKey);
                    if (deepValue && typeof deepValue == 'object' && deepValue.length == 1) {
                        deepValue = deepValue[0];
                    }
                    if (this.match(deepValue, btn.ConditionOperator, btn.ConditionMatchValue)) {
                        this.saveVariable(btn.VariableValue);
                        this.gotoNextNode(btn.NextNodeId);
                        done = true;
                        break;
                    }
                }
            }
        }
        catch (e) {
            if (chatNode.Buttons) {
                for (var btnIdx = 0; btnIdx < chatNode.Buttons.length; btnIdx++) {
                    let btn = chatNode.Buttons[btnIdx];
                    let leftOperand = this.state.variables[btn.ConditionMatchKey];
                    if (this.match(leftOperand, btn.ConditionOperator, btn.ConditionMatchValue)) {
                        this.saveVariable(btn.VariableValue);
                        this.gotoNextNode(btn.NextNodeId);
                        done = true;
                        break;
                    }
                }
            }
        }
        if (!done)
            this.gotoNextNode(chatNode.NextNodeId); //Fallback node id
    }
    match(left, op, right) {
        try {
            switch (op) {
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].Between:
                    {
                        let r1 = right.split(',')[0];
                        let r2 = right.split(',')[1];
                        return (r1 < left && left < r2);
                    }
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].NotEqualTo:
                    return left != right;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].GreaterThan:
                    return left > right;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].LessThan:
                    return left < right;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].GreaterThanOrEqualTo:
                    return left >= right;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].LessThanOrEqualTo:
                    return left <= right;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].In:
                    return right.split(',').indexOf(left) != -1;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].NotIn:
                    return right.split(',').indexOf(left) == -1;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].StartsWith:
                    return left.startsWith(right);
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].EndsWith:
                    return left.endsWith(right);
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].Contains:
                    return left.indexOf(right) != -1;
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].IsNull:
                    return (left == null || left == undefined);
                case _models_chatflow_models__WEBPACK_IMPORTED_MODULE_4__["ConditionOperator"].EqualTo:
                default:
                    return left == right;
            }
        }
        catch (e) {
            this.infoDialog.alert('Invalid operation or operands', e);
        }
    }
};
SimulatorService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
    { type: _services_globals_service__WEBPACK_IMPORTED_MODULE_6__["GlobalsService"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_7__["InfoDialogService"] }
];
SimulatorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], SimulatorService);

var SimulatorMessageType;
(function (SimulatorMessageType) {
    SimulatorMessageType["AnaChatMessage"] = "AnaChatMessage";
    SimulatorMessageType["AnaChatReset"] = "AnaChatReset";
})(SimulatorMessageType || (SimulatorMessageType = {}));


/***/ }),

/***/ "./src/app/shared.module.ts":
/*!**********************************!*\
  !*** ./src/app/shared.module.ts ***!
  \**********************************/
/*! exports provided: HttpLoaderFactory, SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/fesm2015/ngx-translate-http-loader.js");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular2-hotkeys */ "./node_modules/angular2-hotkeys/index.js");
/* harmony import */ var angular2_hotkeys__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(angular2_hotkeys__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js");
/* harmony import */ var _components_shared_ana_cloud_signup_ana_cloud_signup_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/shared/ana-cloud-signup/ana-cloud-signup.component */ "./src/app/components/shared/ana-cloud-signup/ana-cloud-signup.component.ts");
/* harmony import */ var _components_shared_app_header_bar_app_header_bar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/shared/app-header-bar/app-header-bar.component */ "./src/app/components/shared/app-header-bar/app-header-bar.component.ts");
/* harmony import */ var _components_shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/shared/business-picker/business-picker.component */ "./src/app/components/shared/business-picker/business-picker.component.ts");
/* harmony import */ var _components_shared_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/shared/change-password/change-password.component */ "./src/app/components/shared/change-password/change-password.component.ts");
/* harmony import */ var _components_shared_chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/shared/chat-server-manager/chat-server-manager.component */ "./src/app/components/shared/chat-server-manager/chat-server-manager.component.ts");
/* harmony import */ var _components_shared_create_chatbot_create_chatbot_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/shared/create-chatbot/create-chatbot.component */ "./src/app/components/shared/create-chatbot/create-chatbot.component.ts");
/* harmony import */ var _components_shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/shared/create-user/create-user.component */ "./src/app/components/shared/create-user/create-user.component.ts");
/* harmony import */ var _components_shared_edit_business_account_edit_business_account_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/shared/edit-business-account/edit-business-account.component */ "./src/app/components/shared/edit-business-account/edit-business-account.component.ts");
/* harmony import */ var _components_shared_get_ana_chat_server_get_ana_chat_server_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/shared/get-ana-chat-server/get-ana-chat-server.component */ "./src/app/components/shared/get-ana-chat-server/get-ana-chat-server.component.ts");
/* harmony import */ var _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/shared/info-dialog/info-dialog.component */ "./src/app/components/shared/info-dialog/info-dialog.component.ts");
/* harmony import */ var _components_shared_loading_indicator_loading_indicator_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/shared/loading-indicator/loading-indicator.component */ "./src/app/components/shared/loading-indicator/loading-indicator.component.ts");
/* harmony import */ var _components_shared_loading_mask_loading_mask_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/shared/loading-mask/loading-mask.component */ "./src/app/components/shared/loading-mask/loading-mask.component.ts");
/* harmony import */ var _components_shared_login_login_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/shared/login/login.component */ "./src/app/components/shared/login/login.component.ts");
/* harmony import */ var _components_shared_publish_chatbot_publish_chatbot_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/shared/publish-chatbot/publish-chatbot.component */ "./src/app/components/shared/publish-chatbot/publish-chatbot.component.ts");
/* harmony import */ var _components_shared_publish_dialog_publish_dialog_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/shared/publish-dialog/publish-dialog.component */ "./src/app/components/shared/publish-dialog/publish-dialog.component.ts");
/* harmony import */ var _components_shared_update_password_update_password_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/shared/update-password/update-password.component */ "./src/app/components/shared/update-password/update-password.component.ts");
/* harmony import */ var _directives_autofocus_directive__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./directives/autofocus.directive */ "./src/app/directives/autofocus.directive.ts");
/* harmony import */ var _pipes_ellipsis_pipe__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./pipes/ellipsis.pipe */ "./src/app/pipes/ellipsis.pipe.ts");
/* harmony import */ var _services_analytics_window_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./services/analytics-window.service */ "./src/app/services/analytics-window.service.ts");
/* harmony import */ var _services_chatflow_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./services/chatflow.service */ "./src/app/services/chatflow.service.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _services_globals_service__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./services/globals.service */ "./src/app/services/globals.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./services/login.service */ "./src/app/services/login.service.ts");
/* harmony import */ var _services_settings_service__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./services/settings.service */ "./src/app/services/settings.service.ts");
/* harmony import */ var _services_simulator_service__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./services/simulator.service */ "./src/app/services/simulator.service.ts");






































function HttpLoaderFactory(httpClient) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_9__["TranslateHttpLoader"](httpClient);
}
let SharedModule = class SharedModule {
};
SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [
            _components_shared_chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_16__["ChatServerManagerComponent"],
            _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_21__["InfoDialogComponent"],
            _components_shared_loading_indicator_loading_indicator_component__WEBPACK_IMPORTED_MODULE_22__["LoadingIndicatorComponent"],
            _components_shared_login_login_component__WEBPACK_IMPORTED_MODULE_24__["LoginComponent"],
            _components_shared_publish_dialog_publish_dialog_component__WEBPACK_IMPORTED_MODULE_26__["PublishDialogComponent"],
            _components_shared_edit_business_account_edit_business_account_component__WEBPACK_IMPORTED_MODULE_19__["EditBusinessAccountComponent"],
            _components_shared_app_header_bar_app_header_bar_component__WEBPACK_IMPORTED_MODULE_13__["AppHeaderBarComponent"],
            _components_shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_18__["CreateUserComponent"],
            _components_shared_update_password_update_password_component__WEBPACK_IMPORTED_MODULE_27__["UpdatePasswordComponent"],
            _components_shared_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_15__["ChangePasswordComponent"],
            _components_shared_loading_mask_loading_mask_component__WEBPACK_IMPORTED_MODULE_23__["LoadingMaskComponent"],
            _components_shared_get_ana_chat_server_get_ana_chat_server_component__WEBPACK_IMPORTED_MODULE_20__["GetAnaChatServerComponent"],
            _components_shared_create_chatbot_create_chatbot_component__WEBPACK_IMPORTED_MODULE_17__["CreateChatbotComponent"],
            _components_shared_publish_chatbot_publish_chatbot_component__WEBPACK_IMPORTED_MODULE_25__["PublishChatbotComponent"],
            _components_shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_14__["BusinessPickerComponent"],
            _components_shared_ana_cloud_signup_ana_cloud_signup_component__WEBPACK_IMPORTED_MODULE_12__["AnaCloudSignupComponent"],
            _directives_autofocus_directive__WEBPACK_IMPORTED_MODULE_28__["AutofocusDirective"],
            _pipes_ellipsis_pipe__WEBPACK_IMPORTED_MODULE_29__["EllipsisPipe"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            angular2_hotkeys__WEBPACK_IMPORTED_MODULE_10__["HotkeyModule"],
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_11__["ClipboardModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressBarModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatAutocompleteModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatChipsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSlideToggleModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"].forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateLoader"],
                    useFactory: HttpLoaderFactory,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]]
                }
            })
        ],
        exports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            angular2_hotkeys__WEBPACK_IMPORTED_MODULE_10__["HotkeyModule"],
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_11__["ClipboardModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressBarModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatAutocompleteModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatChipsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSlideToggleModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
            _components_shared_chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_16__["ChatServerManagerComponent"],
            _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_21__["InfoDialogComponent"],
            _components_shared_loading_indicator_loading_indicator_component__WEBPACK_IMPORTED_MODULE_22__["LoadingIndicatorComponent"],
            _components_shared_login_login_component__WEBPACK_IMPORTED_MODULE_24__["LoginComponent"],
            _components_shared_publish_dialog_publish_dialog_component__WEBPACK_IMPORTED_MODULE_26__["PublishDialogComponent"],
            _components_shared_edit_business_account_edit_business_account_component__WEBPACK_IMPORTED_MODULE_19__["EditBusinessAccountComponent"],
            _components_shared_app_header_bar_app_header_bar_component__WEBPACK_IMPORTED_MODULE_13__["AppHeaderBarComponent"],
            _components_shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_18__["CreateUserComponent"],
            _components_shared_update_password_update_password_component__WEBPACK_IMPORTED_MODULE_27__["UpdatePasswordComponent"],
            _components_shared_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_15__["ChangePasswordComponent"],
            _components_shared_loading_mask_loading_mask_component__WEBPACK_IMPORTED_MODULE_23__["LoadingMaskComponent"],
            _components_shared_get_ana_chat_server_get_ana_chat_server_component__WEBPACK_IMPORTED_MODULE_20__["GetAnaChatServerComponent"],
            _components_shared_create_chatbot_create_chatbot_component__WEBPACK_IMPORTED_MODULE_17__["CreateChatbotComponent"],
            _components_shared_publish_chatbot_publish_chatbot_component__WEBPACK_IMPORTED_MODULE_25__["PublishChatbotComponent"],
            _components_shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_14__["BusinessPickerComponent"],
            _components_shared_ana_cloud_signup_ana_cloud_signup_component__WEBPACK_IMPORTED_MODULE_12__["AnaCloudSignupComponent"],
            _directives_autofocus_directive__WEBPACK_IMPORTED_MODULE_28__["AutofocusDirective"],
            _pipes_ellipsis_pipe__WEBPACK_IMPORTED_MODULE_29__["EllipsisPipe"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"]
        ],
        providers: [
            _services_chatflow_service__WEBPACK_IMPORTED_MODULE_31__["ChatFlowService"],
            _services_globals_service__WEBPACK_IMPORTED_MODULE_33__["GlobalsService"],
            _services_settings_service__WEBPACK_IMPORTED_MODULE_36__["SettingsService"],
            _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_34__["InfoDialogService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["Title"],
            _services_simulator_service__WEBPACK_IMPORTED_MODULE_37__["SimulatorService"],
            _services_data_service__WEBPACK_IMPORTED_MODULE_32__["DataService"],
            _services_login_service__WEBPACK_IMPORTED_MODULE_35__["LoginService"],
            _services_analytics_window_service__WEBPACK_IMPORTED_MODULE_30__["AnalyticsWindowService"]
        ],
        entryComponents: [
            _components_shared_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_21__["InfoDialogComponent"],
            _components_shared_publish_dialog_publish_dialog_component__WEBPACK_IMPORTED_MODULE_26__["PublishDialogComponent"],
            _components_shared_login_login_component__WEBPACK_IMPORTED_MODULE_24__["LoginComponent"],
            _components_shared_chat_server_manager_chat_server_manager_component__WEBPACK_IMPORTED_MODULE_16__["ChatServerManagerComponent"],
            _components_shared_edit_business_account_edit_business_account_component__WEBPACK_IMPORTED_MODULE_19__["EditBusinessAccountComponent"],
            _components_shared_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_18__["CreateUserComponent"],
            _components_shared_update_password_update_password_component__WEBPACK_IMPORTED_MODULE_27__["UpdatePasswordComponent"],
            _components_shared_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_15__["ChangePasswordComponent"],
            _components_shared_loading_mask_loading_mask_component__WEBPACK_IMPORTED_MODULE_23__["LoadingMaskComponent"],
            _components_shared_get_ana_chat_server_get_ana_chat_server_component__WEBPACK_IMPORTED_MODULE_20__["GetAnaChatServerComponent"],
            _components_shared_create_chatbot_create_chatbot_component__WEBPACK_IMPORTED_MODULE_17__["CreateChatbotComponent"],
            _components_shared_publish_chatbot_publish_chatbot_component__WEBPACK_IMPORTED_MODULE_25__["PublishChatbotComponent"],
            _components_shared_business_picker_business_picker_component__WEBPACK_IMPORTED_MODULE_14__["BusinessPickerComponent"],
            _components_shared_ana_cloud_signup_ana_cloud_signup_component__WEBPACK_IMPORTED_MODULE_12__["AnaCloudSignupComponent"]
        ],
    })
], SharedModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false,
    local: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\learning-projects\chatbots.mn\studio\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map