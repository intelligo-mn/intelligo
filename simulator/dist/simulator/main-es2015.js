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
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/chat-thread/chat-thread.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/chat-thread/chat-thread.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"root\" [ngClass]=\"{ 'ana-min': isMin }\">\n  <div class=\"content\">\n    <div class=\"ana-title\">\n      <div class=\"ana-logo\">\n        <img [src]=\"settings.brandingConfig.logoUrl\" class=\"ana-full\" (click)=\"\n            settings.brandingConfig.logoClickUrl\n              ? openWindow(settings.brandingConfig.logoClickUrl)\n              : null\n          \" [class.clickable]=\"settings.brandingConfig.logoClickUrl\" />\n      </div>\n      <div class=\"ana-content\">\n        <div class=\"title\">{{ settings.brandingConfig.agentName }}</div>\n        <div class=\"subtitle\">\n          <span *ngIf=\"settings.brandingConfig.agentDesc\">\n            <span *ngIf=\"connectionStatusMessage() != 'Available'\">\n              {{ settings.brandingConfig.agentDesc }} -\n              <i *ngIf=\"connectionStatusMessage() == 'Available'\" [title]=\"connectionStatusMessage()\"\n                class=\"ana-online-dot\"></i>\n              {{ connectionStatusMessage() }}\n            </span>\n            <span *ngIf=\"connectionStatusMessage() == 'Available'\">\n              {{ settings.brandingConfig.agentDesc }}\n              <i [title]=\"connectionStatusMessage()\" class=\"ana-online-dot\"></i>\n            </span>\n          </span>\n          <span *ngIf=\"!settings.brandingConfig.agentDesc\">\n            <i *ngIf=\"connectionStatusMessage() == 'Available'\" [title]=\"connectionStatusMessage()\"\n              class=\"ana-online-dot\"></i>{{ connectionStatusMessage() }}\n          </span>\n        </div>\n      </div>\n      <div class=\"ana-actions\">\n        <div class=\"ana-action\" title=\"Mute\" (click)=\"isMute = !isMute\" *ngIf=\"settings.appConfig.msgSounds\">\n          <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"isMute\">\n            <path\n              d=\"M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z\" />\n          </svg>\n          <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"!isMute\">\n            <path\n              d=\"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z\" />\n          </svg>\n        </div>\n        <div class=\"ana-action refresh\" title=\"Start a fresh chat\" (click)=\"getStarted(true, true)\"\n          [hidden]=\"!settings.appConfig.allowFlowReset\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 15.279 15.279\">\n            <path\n              d=\"M7.599 1.918v-1.8c0-.1.125-.154.209-.091l3.7 2.719a.114.114 0 0 1 0 .184l-3.7 2.719c-.084.062-.21.006-.21-.09V3.76A4.843 4.843 0 0 0 2.847 8.93c.159 2.4 2.115 4.347 4.515 4.5a4.849 4.849 0 0 0 5.094-4.06.92.92 0 0 1 .912-.771c.56 0 .994.497.907 1.047-.544 3.428-3.703 6-7.366 5.59-3.062-.343-5.522-2.793-5.869-5.856C.58 5.374 3.692 1.961 7.6 1.918z\" />\n          </svg>\n        </div>\n      </div>\n      <div class=\"chat-history-loading\" [hidden]=\"!fetchingHistory\">\n        <mat-progress-bar mode=\"indeterminate\" color=\"primary\"></mat-progress-bar>\n      </div>\n    </div>\n    <div class=\"chat-thread scrollbar\" #chatThreadView (scroll)=\"chatThreadOnScroll($event)\">\n      <div class=\"chat-message\" *ngFor=\"let msg of chatThread.messages\">\n        <div [ngSwitch]=\"msg.messageData.type\">\n          <ng-container *ngSwitchCase=\"MH.MessageType.SIMPLE\">\n            <div class=\"chat-message-item-container\">\n              <div class=\"chat-message-item\" [ngClass]=\"{\n                  media:\n                    msg.getMessageContentType() == MH.MessageContentType.Media,\n                  text:\n                    msg.getMessageContentType() == MH.MessageContentType.Text,\n                  typing:\n                    msg.getMessageContentType() == MH.MessageContentType.Typing,\n                  incoming: msg.direction == MH.Direction.Incoming,\n                  outgoing: msg.direction == MH.Direction.Outgoing,\n                  'chat-message-last': isLastInMessageGroup(msg)\n                }\">\n                <div [ngSwitch]=\"msg.getMessageContentType()\">\n                  <ng-container *ngSwitchCase=\"MH.MessageContentType.Text\">\n                    <span class=\"chat-text\"\n                      *ngIf=\"!settings.appConfig.htmlMessages\">{{ msg.messageData.content.text }}</span>\n                    <span class=\"chat-text\" *ngIf=\"settings.appConfig.htmlMessages\"\n                      [innerHTML]=\"msg.messageData.content.text\"></span>\n                  </ng-container>\n                  <ng-container *ngSwitchCase=\"MH.MessageContentType.Typing\">\n                    <div class=\"typing-indicator-container\">\n                      <div class=\"typing-indicator\">\n                        <span></span>\n                        <span></span>\n                        <span></span>\n                      </div>\n                    </div>\n                  </ng-container>\n                  <ng-container *ngSwitchCase=\"MH.MessageContentType.Media\">\n                    <div [ngSwitch]=\"msg.messageData.content.media.type\">\n                      <ng-container *ngSwitchCase=\"MH.MediaType.IMAGE\">\n                        <img [src]=\"msg.messageData.content.media.url\" class=\"chat-media\"\n                          (click)=\"viewImage(msg.messageData.content.media.url)\"\n                          [class.clickable]=\"msg.messageData.content.media.url\" />\n                        <span class=\"chat-bottom-overlay\">\n                          <img src=\"assets/svg/picture.svg\" />&nbsp;\n                          {{ msg.messageData.content.text || \"Photo\" }}\n                        </span>\n                      </ng-container>\n                      <ng-container *ngSwitchCase=\"MH.MediaType.VIDEO\">\n                        <video controls=\"controls\" class=\"chat-media\"\n                          (click)=\"viewVideo(msg.messageData.content.media.url)\"\n                          [class.clickable]=\"msg.messageData.content.media.url\">\n                          <source [src]=\"msg.messageData.content.media.url\" />\n                        </video>\n                        <span class=\"chat-bottom-overlay\">\n                          <img src=\"assets/svg/video-from-gallery.svg\" />&nbsp;\n                          {{ msg.messageData.content.text || \"Video\" }}\n                        </span>\n                      </ng-container>\n                      <ng-container *ngSwitchCase=\"MH.MediaType.AUDIO\">\n                        <div class=\"chat-media\">\n                          <audio controls=\"controls\">\n                            <source [src]=\"msg.messageData.content.media.url\" />\n                          </audio>\n                        </div>\n                        <span class=\"chat-bottom-overlay\">\n                          <img src=\"assets/svg/record-voice.svg\" />&nbsp;\n                          {{ msg.messageData.content.text || \"Audio\" }}\n                        </span>\n                      </ng-container>\n                      <ng-container *ngSwitchCase=\"MH.MediaType.FILE\">\n                        <img src=\"assets/svg/attachment.svg\" class=\"chat-media chat-file-attachment\" />\n                        <span class=\"chat-bottom-overlay\">\n                          <img src=\"assets/svg/attachment-white.svg\" />&nbsp;\n                          {{ msg.messageData.content.text || \"File\" }}\n                        </span>\n                      </ng-container>\n                    </div>\n                  </ng-container>\n                </div>\n                <span class=\"chat-time\" [hidden]=\"\n                    msg.getMessageContentType() == MH.MessageContentType.Typing\n                  \">\n                  <span *ngIf=\"\n                      msg.direction == MH.Direction.Outgoing &&\n                      msg.status == MH.MessageStatus.SentTimeout\n                    \"><a href=\"javascript:;\" (click)=\"msg.executeRetry()\"\n                      class=\"ana-link ana-btn-retry\">Retry</a></span>\n                  <span *ngIf=\"!msg.isToday()\">\n                    {{ msg.time | date: \"MMM d, h:mm a\" }}\n                  </span>\n                  <span *ngIf=\"msg.isToday()\">\n                    {{ msg.time | date: \"shortTime\" }}\n                  </span>\n                  <svg class=\"ana-sent-tick\" *ngIf=\"\n                      msg.direction == MH.Direction.Outgoing &&\n                      msg.status == MH.MessageStatus.ReceivedAtServer\n                    \" xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"10\">\n                    <path\n                      d=\"M9.887 1.475a.385.385 0 0 0-.544 0L3.11 7.709.657 5.257a.385.385 0 1 0-.544.544l2.724 2.724c.15.15.394.15.544 0L9.887 2.02a.385.385 0 0 0 0-.544z\" />\n                  </svg>\n                  <svg class=\"ana-delivered-tick\" *ngIf=\"\n                      msg.direction == MH.Direction.Outgoing &&\n                      msg.status == MH.MessageStatus.DelieveredToTarget\n                    \" xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"10\">\n                    <path\n                      d=\"M7.554 2.725l-.601-.6-2.704 2.703.6.601 2.705-2.704zm1.802-.6L4.85 6.673 3.047 4.87l-.6.601L4.85 7.876 10 2.726l-.644-.602zM0 5.471l2.403 2.404.601-.601L.601 4.87 0 5.472z\" />\n                  </svg>\n                </span>\n                <span class=\"chat-stub\"></span>\n              </div>\n            </div>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"MH.MessageType.CAROUSEL\">\n            <div class=\"carousel-wrapper\">\n              <div #carouselContainer class=\"carousel-container scrollbar\" [ngClass]=\"msg.meta.id\">\n                <div *ngFor=\"let carItem of msg.messageData.content.items\" class=\"carousel-item-container\">\n                  <div class=\"carousel-item\">\n                    <div class=\"carousel-item-content\" [class.no-media]=\"!carouselItemHasMedia(carItem)\">\n                      <div *ngIf=\"carouselItemHasMedia(carItem)\">\n                        <div [ngSwitch]=\"carItem.media.type\" class=\"carousel-item-media\">\n                          <ng-container *ngSwitchCase=\"MH.MediaType.IMAGE\">\n                            <img [src]=\"carItem.media.url\" (click)=\"viewImage(carItem.media.url)\"\n                              [class.clickable]=\"carItem.media.url\" />\n                          </ng-container>\n                          <ng-container *ngSwitchCase=\"MH.MediaType.VIDEO\" (click)=\"viewVideo(carItem.media.url)\"\n                            [class.clickable]=\"carItem.media.url\">\n                            <video controls [src]=\"carItem.media.url\"></video>\n                          </ng-container>\n                          <ng-container *ngSwitchCase=\"MH.MediaType.AUDIO\">\n                            <audio controls [src]=\"carItem.media.url\"></audio>\n                          </ng-container>\n                        </div>\n                      </div>\n                      <div class=\"carousel-item-title text-wrap\">\n                        {{ carItem.title }}\n                      </div>\n                      <div class=\"carousel-item-desc text-wrap\" [innerHTML]=\"carItem.desc\"></div>\n                    </div>\n                    <div class=\"carousel-item-button-container\">\n                      <div class=\"carousel-item-button\" *ngFor=\"let carBtn of carItem.options\">\n                        <button mat-button (click)=\"handleCarouselClick(msg, carBtn)\" [disabled]=\"!isLastMessage(msg)\">\n                          {{ carBtn.title }}\n                        </button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"carousel-arrow right\" (click)=\"scrollCarousel(msg.meta.id, 'right')\"\n                [hidden]=\"!canScrollCarousel(msg.meta.id, 'right')\">\n                <svg>\n                  <path d=\"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z\"></path>\n                </svg>\n              </div>\n              <div class=\"carousel-arrow left\" (click)=\"scrollCarousel(msg.meta.id, 'left')\"\n                [hidden]=\"!canScrollCarousel(msg.meta.id, 'left')\">\n                <svg>\n                  <path d=\"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z\"></path>\n                </svg>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"chat-input-container\" #inputContainer>\n      <div *ngIf=\"chatInput.clickInput\">\n        <div [ngSwitch]=\"chatInput.clickInput.content.inputType\">\n          <ng-container *ngSwitchCase=\"MH.InputType.OPTIONS\">\n            <div class=\"chat-input-click-container\">\n              <div *ngFor=\"let option of chatInput.clickInput.content.options\" class=\"chat-input click\">\n                <button type=\"button\" class=\"btn-click\" (click)=\"\n                    chatInput.handleBtnOptionClick(\n                      chatInput.clickInput,\n                      option.value\n                    )\n                  \">\n                  {{ option.title }}\n                </button>\n              </div>\n            </div>\n          </ng-container>\n          <ng-container *ngSwitchDefault>\n            <div class=\"chat-input-click-container\">\n              <div class=\"chat-input click\">\n                <button type=\"button\" class=\"btn-click\" (click)=\"chatInput.handleClick(chatInput.clickInput)\">\n                  {{ chatInput.clickInputTitle() }}\n                </button>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </div>\n\n      <div class=\"chat-input text\" *ngIf=\"chatInput.textInput\">\n        <input [type]=\"chatInput.htmlInputType(chatInput.textInput)\" [readonly]=\"chatInput.textInput.disabled\"\n          (keypress)=\"chatInput.handleKeyPress(chatInput.textInput, $event)\" name=\"chat-text\" id=\"chat-text\"\n          class=\"chat-text-input\" [(ngModel)]=\"chatInput.textInput.content.input.val\" [placeholder]=\"\n            chatInput.textInput.disabled\n              ? 'Waiting for response'\n              : chatInput.textInput.content.textInputAttr\n              ? chatInput.textInput.content.textInputAttr.placeHolder\n                ? chatInput.textInput.content.textInputAttr.placeHolder\n                : ''\n              : ''\n          \" [maxlength]=\"\n            chatInput.textInput.content.textInputAttr\n              ? chatInput.textInput.content.textInputAttr.maxLength\n              : ''\n          \" (focus)=\"chatTextInputOnFocus()\" />\n        <button type=\"button\" class=\"btn-icon\" [disabled]=\"!chatInput.textInput.content.input.val\"\n          (click)=\"chatInput.handleClick(chatInput.textInput)\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\">\n            <path class=\"send-button\"\n              d=\"M23.878.983a.359.359 0 0 0-.388-.056L.208 11.745a.359.359 0 0 0-.007.647l6.589 3.234c.12.06.265.046.372-.035l6.407-4.788-5.03 5.173a.359.359 0 0 0-.1.278l.5 6.52a.359.359 0 0 0 .63.208l3.497-4.053 4.323 2.066a.358.358 0 0 0 .497-.217L23.983 1.36a.359.359 0 0 0-.105-.377z\" />\n          </svg>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"image-viewer-container\" [hidden]=\"!fullScreenImage\">\n  <ngx-image-viewer #imageViewer [src]=\"[fullScreenImage]\"></ngx-image-viewer>\n  <button mat-icon-button (click)=\"closeImageViewer()\" class=\"btn-close\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 3.748 3.748\">\n      <path\n        d=\"M2.205 1.874L3.68.4A.234.234 0 1 0 3.348.07L1.874 1.543.4.069A.234.234 0 1 0 .07.4l1.473 1.474L.07 3.348a.234.234 0 1 0 .331.331l1.474-1.474L3.348 3.68a.234.234 0 0 0 .331 0 .234.234 0 0 0 0-.331L2.205 1.874z\" />\n    </svg>\n  </button>\n</div>\n<div class=\"video-viewer-container\" *ngIf=\"fullScreenVideo\">\n  <div class=\"video-container\">\n    <video controls=\"controls\">\n      <source [src]=\"fullScreenVideo\" />\n    </video>\n  </div>\n  <button mat-icon-button (click)=\"closeVideoViewer()\" class=\"btn-close\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 3.748 3.748\">\n      <path\n        d=\"M2.205 1.874L3.68.4A.234.234 0 1 0 3.348.07L1.874 1.543.4.069A.234.234 0 1 0 .07.4l1.473 1.474L.07 3.348a.234.234 0 1 0 .331.331l1.474-1.474L3.348 3.68a.234.234 0 0 0 .331 0 .234.234 0 0 0 0-.331L2.205 1.874z\" />\n    </svg>\n  </button>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/complex-input/complex-input.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/complex-input/complex-input.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-dialog-content>\n    <div [ngSwitch]=\"params.Type\">\n        <ng-container *ngSwitchCase=\"ComplexType.Date\">\n            <mat-form-field>\n                <input matInput [matDatepicker]=\"datePicker\" placeholder=\"Choose a date\" [(ngModel)]=\"choosenDate\">\n                <mat-datepicker-toggle matSuffix [for]=\"datePicker\" class=\"ana-color-accent\"></mat-datepicker-toggle>\n                <mat-datepicker touchUi=\"true\" #datePicker></mat-datepicker>\n            </mat-form-field>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"ComplexType.Time\">\n            <mat-form-field>\n                <input matInput type=\"time\" placeholder=\"Choose a time\" [(ngModel)]=\"choosenTime\">\n            </mat-form-field>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"ComplexType.Address\">\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Street Address\" [(ngModel)]=\"givenAddress.line1\"\n                    name=\"addressLine1\">\n            </mat-form-field>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Area\" [(ngModel)]=\"givenAddress.area\" name=\"addressArea\">\n            </mat-form-field>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"City\" [(ngModel)]=\"givenAddress.city\" name=\"addressCity\">\n            </mat-form-field>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"State\" [(ngModel)]=\"givenAddress.state\" name=\"addressState\">\n            </mat-form-field>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Country\" [(ngModel)]=\"givenAddress.country\"\n                    name=\"addressCountry\">\n            </mat-form-field>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Pin\" [(ngModel)]=\"givenAddress.pin\" name=\"addressPin\">\n            </mat-form-field>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"ComplexType.Location\">\n            <agm-map [latitude]=\"geoLoc.lat\" [longitude]=\"geoLoc.lng\">\n                <agm-marker [latitude]=\"geoLoc.lat\" [longitude]=\"geoLoc.lng\" [markerDraggable]=\"true\"\n                    (dragEnd)=\"mapLocationUpdated($event)\"></agm-marker>\n            </agm-map>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"ComplexType.List\">\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Search\" [(ngModel)]=\"listItemsSearch\" name=\"listItemsSearch\">\n            </mat-form-field>\n            <mat-card *ngIf=\"searchedListValues().length <= 0\">\n                No items to display\n            </mat-card>\n            <mat-list *ngIf=\"listMultiple\">\n                <mat-list-item *ngFor=\"let listItem of searchedListValues(); let i = index\">\n                    <mat-checkbox [(ngModel)]=\"listItem.isSelected\" name=\"listItemIsSelected-{{i}}\" align=\"start\">\n                        {{listItem.text}}</mat-checkbox>\n                </mat-list-item>\n            </mat-list>\n            <mat-list *ngIf=\"!listMultiple\">\n                <mat-radio-group [(ngModel)]=\"selectedListItem\">\n                    <mat-list-item *ngFor=\"let listItem of searchedListValues(); let i = index\">\n                        <mat-radio-button name=\"listItemIsSelected-{{i}}\" [value]=\"listItem\" align=\"start\">\n                            {{listItem.text}}</mat-radio-button>\n                    </mat-list-item>\n                </mat-radio-group>\n            </mat-list>\n        </ng-container>\n    </div>\n</mat-dialog-content>\n<mat-dialog-actions align=\"center\">\n    <button mat-raised-button color=\"primary\" [disabled]=\"!isValid()\" mat-button class=\"complex-input-btn-done\"\n        (click)=\"dialogClose()\">Submit</button>\n</mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/info-dialog/info-dialog.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/info-dialog/info-dialog.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 matDialogTitle>{{options.title}}</h2>\n<mat-dialog-content>\n    <p>{{options.message}}</p>\n    <mat-form-field [hidden]=\"options.dialogType!=InfoDialogType.Prompt\">\n        <input type=\"text\" name=\"text\" matInput [(ngModel)]=\"inputText\" (keypress)=\"inputKeypress($event)\" />\n    </mat-form-field>\n</mat-dialog-content>\n<mat-dialog-actions>\n    <button mat-raised-button color=\"primary\" (click)=\"primaryClick()\"\n        *ngIf=\"primaryButtonText\">{{primaryButtonText}}</button>\n    <button mat-raised-button [color]=\"options.dialogType==InfoDialogType.Alert?'primary':''\"\n        [matDialogClose]=\"false\">{{secondaryButtonText}}</button>\n</mat-dialog-actions>");

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
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */");

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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _services_mat_css_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/mat-css.service */ "./src/app/services/mat-css.service.ts");
/* harmony import */ var _services_simulator_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/simulator.service */ "./src/app/services/simulator.service.ts");
/* harmony import */ var _services_stomp_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/stomp.service */ "./src/app/services/stomp.service.ts");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/utilities.service */ "./src/app/services/utilities.service.ts");








let AppComponent = class AppComponent {
    constructor(route, apiService, stomp, simulator, utils, matCSS) {
        this.route = route;
        this.apiService = apiService;
        this.stomp = stomp;
        this.simulator = simulator;
        this.utils = utils;
        this.matCSS = matCSS;
        this.route.queryParams.subscribe(params => {
            if (params['s']) {
                let settings = JSON.parse(atob(params['s']));
                if (settings.stompConfig && settings.stompConfig.debug)
                    console.log(settings);
                this.setAppSettings(settings);
            }
        });
    }
    setAppSettings(settings) {
        _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"].settings = settings;
        if (settings.brandingConfig) {
            this.getCustomStyle(settings.brandingConfig.primaryBackgroundColor, settings.brandingConfig.secondaryBackgroundColor, settings.brandingConfig.primaryForegroundColor, settings.brandingConfig.frameContentWidth);
        }
        if (settings.thirdPartyConfig && _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"].googleMapsConfigRef)
            _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"].googleMapsConfigRef.apiKey = settings.thirdPartyConfig.googleMapsKey;
        if (settings.appConfig) {
            this.apiService.fileUploadEndpoint = settings.appConfig.fileUploadEndpoint;
            this.apiService.setAPIEndpoint(settings.appConfig.apiEndpoint);
        }
        if (settings.stompConfig)
            this.stomp.configure(settings.stompConfig);
    }
    getCustomStyle(accent = undefined, secondary = undefined, accentFG = undefined, contentWidth = undefined) {
        const ANA_CUSTOM_STYLE = 'ana-custom-style';
        let customStyle = document.getElementById(ANA_CUSTOM_STYLE);
        if (!customStyle) {
            customStyle = document.createElement('style');
            customStyle.id = ANA_CUSTOM_STYLE;
            document.head.appendChild(customStyle);
        }
        let appCSS = `/*Dynamic styles*/
.chat-message-item.incoming {
  border-left-color: ${accent || '#8cc83c'};
}

.incoming > .chat-stub {
  border-top-color: ${accent || '#8cc83c'};
}

.carousel-item-button:first-child,
.chat-input button.btn-icon {
  color: ${accent || '#8cc83c'};
}

.chat-input button.btn-click {
  background-color: ${accent || '#8cc83c'};
  color: ${accentFG || 'white'};
}

.ana-sent-tick path{
	fill: ${accent || '#8cc83c'};
}
.ana-sent-tick{
  color: ${accent || '#8cc83c'};
}

.ana-delivered-tick path{
	fill: ${accent || '#8cc83c'};
}
.ana-delivered-tick{
  color: ${accent || '#8cc83c'};
}

.chat-message-item.outgoing {
  border-right-color: ${secondary || 'black'};
}

.outgoing > .chat-stub {
  border-top-color: ${secondary || 'black'};
}

.complex-input-btn-done {
  color: ${accentFG || 'white'} !important;
}

.content {
  width: 100vw;
}

.ana-title {
  background-color: ${accent || '#8cc83c'};
  color: ${accentFG || 'white'};
}
.chat-text-input{
	caret-color: ${accent || '#8cc83c'};
}
path.send-button{
  fill: ${accent || '#8cc83c'};
}
.ana-logo > img {
  background-color: ${accentFG || 'white'};
  border: 2px solid ${accentFG || 'white'};
}

.ana-min .ana-minmax-btn {
  border: 2px solid ${accentFG || 'white'};
}

.ana-minmax-btn {
  background-color: ${accentFG || 'white'};
}

.typing-indicator span{
  background-color: ${accent || '#8cc83c'};
}

.ana-actions {
  margin-right: ${_services_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"].settings.appConfig.fullpage ? "-5px" : "15px"};
}
`;
        this.matCSS.loadCustomMatTheme(accent, customStyle, appCSS);
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__["APIService"] },
    { type: _services_stomp_service__WEBPACK_IMPORTED_MODULE_6__["StompService"] },
    { type: _services_simulator_service__WEBPACK_IMPORTED_MODULE_5__["SimulatorService"] },
    { type: _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _services_mat_css_service__WEBPACK_IMPORTED_MODULE_4__["MatCSSService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _services_api_service__WEBPACK_IMPORTED_MODULE_3__["APIService"],
        _services_stomp_service__WEBPACK_IMPORTED_MODULE_6__["StompService"],
        _services_simulator_service__WEBPACK_IMPORTED_MODULE_5__["SimulatorService"],
        _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"],
        _services_mat_css_service__WEBPACK_IMPORTED_MODULE_4__["MatCSSService"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ngx_image_viewer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-image-viewer */ "./node_modules/ngx-image-viewer/ngx-image-viewer.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_chat_thread_chat_thread_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/chat-thread/chat-thread.component */ "./src/app/components/chat-thread/chat-thread.component.ts");
/* harmony import */ var _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/stomp.service */ "./src/app/services/stomp.service.ts");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/utilities.service */ "./src/app/services/utilities.service.ts");
/* harmony import */ var _services_simulator_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/simulator.service */ "./src/app/services/simulator.service.ts");
/* harmony import */ var _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/complex-input/complex-input.component */ "./src/app/components/complex-input/complex-input.component.ts");
/* harmony import */ var _models_google_maps_config_model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./models/google-maps-config.model */ "./src/app/models/google-maps-config.model.ts");
/* harmony import */ var _services_mat_css_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/mat-css.service */ "./src/app/services/mat-css.service.ts");
/* harmony import */ var _services_chain_delay_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./services/chain-delay.service */ "./src/app/services/chain-delay.service.ts");
/* harmony import */ var _components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/info-dialog/info-dialog.component */ "./src/app/components/info-dialog/info-dialog.component.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");






















let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
            _components_chat_thread_chat_thread_component__WEBPACK_IMPORTED_MODULE_10__["ChatThreadComponent"],
            _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_15__["ComplexInputComponent"],
            _components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_19__["InfoDialogComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDatepickerModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatNativeDateModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatRadioModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressBarModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot([
                { path: '', component: _components_chat_thread_chat_thread_component__WEBPACK_IMPORTED_MODULE_10__["ChatThreadComponent"] },
                { path: '**', redirectTo: '' }
            ]),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_21__["HttpClientModule"],
            _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot(),
            ngx_image_viewer__WEBPACK_IMPORTED_MODULE_8__["ImageViewerModule"].forRoot({
                btnClass: 'hidden',
                zoomFactor: 0.1,
                containerBackgroundColor: 'rgba(0,0,0,0)',
                wheelZoom: true,
                allowFullscreen: true,
                btnIcons: {
                    zoomIn: 'hidden',
                    zoomOut: 'hidden',
                    rotateClockwise: 'hidden',
                    rotateCounterClockwise: 'hidden',
                    next: 'hidden',
                    prev: 'hidden',
                    fullscreen: 'hidden',
                }
            }),
        ],
        providers: [
            _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__["StompService"],
            _services_utilities_service__WEBPACK_IMPORTED_MODULE_13__["UtilitiesService"],
            _services_api_service__WEBPACK_IMPORTED_MODULE_12__["APIService"],
            _services_mat_css_service__WEBPACK_IMPORTED_MODULE_17__["MatCSSService"],
            _services_chain_delay_service__WEBPACK_IMPORTED_MODULE_18__["ChainDelayService"],
            _services_simulator_service__WEBPACK_IMPORTED_MODULE_14__["SimulatorService"],
            _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_20__["InfoDialogService"],
            { provide: _agm_core__WEBPACK_IMPORTED_MODULE_7__["LAZY_MAPS_API_CONFIG"], useClass: _models_google_maps_config_model__WEBPACK_IMPORTED_MODULE_16__["GoogleMapsConfig"] }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]],
        entryComponents: [
            _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_15__["ComplexInputComponent"],
            _components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_19__["InfoDialogComponent"]
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["NO_ERRORS_SCHEMA"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/components/chat-thread/chat-thread.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/components/chat-thread/chat-thread.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\n.root {\n  display: block;\n  margin: 0 auto;\n  height: 100vh;\n  border-radius: 10px;\n  overflow: hidden;\n}\n.media {\n  overflow: visible;\n}\n.clickable {\n  cursor: pointer;\n}\n.content {\n  margin: 0 auto;\n  display: inline-block;\n  display: flex;\n  flex-direction: column;\n  height: inherit;\n}\n.ana-min.root {\n  height: 57px !important;\n}\n.ana-min .chat-thread,\n.ana-min .chat-input-container {\n  height: 0 !important;\n  display: none;\n}\n.ana-min .root {\n  height: 57px !important;\n}\n.chat-thread {\n  padding: 20px;\n  height: 100%;\n  flex-grow: 1;\n  overflow-y: scroll;\n  background-color: #F5F5F5;\n}\n.chat-message-group {\n  margin: 10px 0;\n}\n.chat-message-item {\n  max-width: 80%;\n  position: relative;\n  min-width: 40%;\n  box-shadow: 0px 2px 3px -1px rgba(110, 110, 110, 0.15);\n}\n.chat-message-item.media * .chat-media {\n  width: 100%;\n  height: 100%;\n  background-color: white;\n}\n.chat-message-item.media.incoming * .chat-media {\n  border-radius: 0 10px 10px 0;\n}\n.chat-message-item.media.incoming * video.chat-media,\n.chat-message-item.media.incoming * .chat-media > audio {\n  border-radius: 0 10px 0 0 !important;\n}\n.chat-message-item.media.outgoing * .chat-media {\n  border-radius: 10px 0 0 10px;\n}\n.chat-message-item.media.outgoing * video.chat-media,\n.chat-message-item.media.outgoing * .chat-media > audio {\n  border-radius: 10px 0 0 0 !important;\n}\n.chat-message-item.text {\n  background-color: white;\n  padding: 15px;\n}\n.chat-message-item.typing {\n  background-color: white;\n  padding: 10px 15px;\n  min-width: auto;\n}\n.chat-message-item.incoming {\n  float: left;\n  border-radius: 0 10px 10px 0;\n  border-left-width: 3px;\n  border-left-style: solid;\n}\n.chat-message-item.outgoing {\n  float: right;\n  border-radius: 10px 0 0 10px;\n  border-right-width: 3px;\n  border-right-style: solid;\n}\n.chat-message-item-container {\n  width: 100%;\n  display: inline-block;\n}\napp-chat-thread {\n  max-width: 500px;\n}\n.dots {\n  width: 100%;\n  height: 100%;\n  background-image: linear-gradient(transparent 0px, transparent 2px, white 2px, white 20px), linear-gradient(to right, #c8c3c7 0px, #c8c3c7 2px, white 2px, white 20px);\n  background-position: 437px -2px;\n  background-size: 20px 20px;\n}\n.chat-text {\n  word-wrap: break-word;\n}\n.chat-time {\n  font-size: 8px;\n  position: absolute;\n  bottom: 2px;\n  right: 8px;\n}\n.chat-time > span {\n  opacity: 0.4;\n}\n.chat-stub {\n  width: 0;\n  height: 0;\n  bottom: -13px;\n  display: none;\n}\n.incoming > .chat-stub {\n  border-top-width: 13px;\n  border-top-style: solid;\n  border-left: 15px solid transparent;\n  position: absolute;\n  left: -3px;\n}\n.outgoing > .chat-stub {\n  border-top-width: 13px;\n  border-top-style: solid;\n  border-right: 15px solid transparent;\n  position: absolute;\n  right: -3px;\n}\n.chat-message-last {\n  margin-bottom: 15px;\n}\n.chat-message-last > .chat-stub {\n  display: block;\n}\n.chat-bottom-overlay {\n  background-color: rgba(0, 0, 0, 0.5);\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  color: white;\n  font-size: 9.6px;\n  font-style: italic;\n  padding: 5px 10px;\n}\n.outgoing * .chat-bottom-overlay {\n  border-radius: 0 0 0 10px;\n}\n.incoming * .chat-bottom-overlay {\n  border-radius: 0 0 10px 0;\n}\n.media > .chat-time {\n  color: white;\n  opacity: 1;\n  bottom: 5px;\n}\n.chat-media > audio {\n  width: 230px;\n  margin-bottom: 19px;\n}\nvideo.chat-media {\n  margin-bottom: 19px;\n}\n/*\nGreen dot up\nCarousel left right button background\nCarousel left right vertical center\nbg white\n*/\n.chat-input-container {\n  background-color: #F5F5F5;\n  border-radius: 0 0 10px 10px;\n}\n.chat-input {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n.chat-input.click {\n  display: inline;\n  float: left;\n  width: auto;\n}\n.chat-input.text {\n  background-color: white;\n  border-radius: 0 0 10px 10px;\n  box-shadow: 0px -3px 11px 0px rgba(0, 0, 0, 0.05);\n}\n.chat-input button.btn-click {\n  border-radius: 4px;\n  padding: 7px 23px;\n  border: transparent;\n  margin: 0 10px 10px 10px;\n  white-space: nowrap;\n}\n.chat-input button.btn-icon {\n  font-size: 20px;\n  border: none;\n  background: none;\n  padding: 0 14px;\n  opacity: 0.8;\n}\n.chat-input button.btn-icon:disabled {\n  opacity: 0.1;\n}\n.chat-input i {\n  font-size: 20px;\n}\n.chat-text-input {\n  border: none;\n  vertical-align: middle;\n  padding: 12px 16px;\n  width: 100%;\n  outline: none;\n  color: black;\n}\n.chat-input-click-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  overflow-x: auto;\n  background-color: transparent;\n  /*Remove below for click buttons to scroll horizontally*/\n  justify-content: center;\n  flex-wrap: wrap;\n  border-radius: 10px;\n}\n.chat-file-attachment {\n  height: 60px !important;\n  background-color: white !important;\n}\n.ana-sent-tick {\n  transform: translateY(1px);\n}\n.ana-delivered-tick {\n  transform: translateY(1px);\n}\n.carousel-wrapper {\n  position: relative;\n  margin: 0 -20px;\n}\n.carousel-wrapper > .carousel-arrow {\n  position: absolute;\n  top: 50%;\n  padding: 5px 0 0;\n  cursor: pointer;\n  transform: translateY(-50%);\n  background-color: white;\n  opacity: 0.85;\n}\n.carousel-wrapper > .carousel-arrow:hover {\n  opacity: 1;\n}\n.carousel-wrapper > .carousel-arrow.right {\n  right: 0;\n  box-shadow: -1px 0px 1px 1px rgba(0, 0, 0, 0.1);\n  border-radius: 5px 0 0 5px;\n}\n.carousel-wrapper > .carousel-arrow.left {\n  left: 0;\n  box-shadow: 1px 0px 1px 1px rgba(0, 0, 0, 0.1);\n  border-radius: 0 5px 5px 0;\n}\n.carousel-arrow.right svg {\n  width: 24px;\n  height: 24px;\n  transform: rotate(-90deg);\n  fill: #333;\n}\n.carousel-arrow.left svg {\n  width: 24px;\n  height: 24px;\n  fill: #333;\n  transform: rotate(90deg);\n}\n.carousel-container {\n  width: 100%;\n  overflow-x: auto;\n  white-space: nowrap;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  display: flex;\n  flex-direction: row;\n}\n.carousel-item-media > img,\n.carousel-item-media > video,\n.carousel-item-media > audio {\n  width: 100%;\n  border-radius: inherit;\n}\n.carousel-item-media {\n  padding: 20px 0;\n  overflow: hidden;\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  min-height: 170px;\n}\n.carousel-item {\n  width: 240px;\n  margin: 0 10px;\n  border-radius: 10px;\n  background-color: white;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0px 1px 6px 1px rgba(110, 110, 110, 0.15);\n}\n.carousel-item-content {\n  padding: 0 20px;\n  flex-grow: 1;\n}\n.carousel-item-content.no-media {\n  padding: 10px 20px;\n}\n.carousel-item-container {\n  margin-bottom: 5px;\n  padding: 3px;\n  /*For carousel item shadow to be visible*/\n}\n.carousel-item-title {\n  font-weight: bold;\n  margin: �0 0 2px 0;\n  overflow: hidden;\n}\n.carousel-item-desc {\n  color: gray;\n  font-size: 11px;\n  margin: 2px 0 10px 0;\n}\n.carousel-item-button > button {\n  width: 100%;\n  border-top: 1px solid #ccc;\n  border-radius: 0;\n  text-align: left;\n  font-weight: bold;\n  text-transform: uppercase;\n  font-size: x-small;\n  text-align: center;\n  font-family: \"Open Sans\";\n}\n.text-wrap {\n  white-space: normal;\n}\n.carousel-container > table {\n  margin-bottom: 10px;\n}\n.ana-title {\n  padding: 10px 15px;\n  z-index: 100;\n  position: relative;\n  border-radius: 10px 10px 0 0;\n}\n.ana-min .ana-title {\n  margin-top: 20px;\n  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.36);\n  margin-left: 6px;\n  margin-right: 6px;\n}\n.ana-logo {\n  display: inline;\n  float: left;\n  margin: 0 15px -4px 0;\n}\n.ana-logo > img {\n  width: 35px;\n  height: 35px;\n  border-radius: 0 7px 7px 7px;\n  box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.19);\n  margin-top: 4px;\n}\n.ana-content {\n  display: flex;\n  flex-direction: column;\n  float: left;\n  width: 63%;\n}\n.ana-content > .title {\n  font-weight: bold;\n  font-size: 18px;\n  position: relative;\n}\n.ana-content > .subtitle {\n  font-size: 11px;\n  opacity: 0.9;\n}\n.ana-actions {\n  display: flex;\n  flex-direction: row;\n  float: right;\n  margin-top: 5px;\n}\n.ana-actions .ana-action {\n  opacity: 0.6;\n  height: 24px;\n  width: 24px;\n  padding: 4px;\n  border-radius: 3px;\n  cursor: pointer;\n}\n.ana-actions .ana-action:hover {\n  opacity: 1;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.ana-actions .ana-action svg {\n  height: 16px;\n  width: 16px;\n}\n.ana-actions .ana-action svg path {\n  fill: #fff;\n}\n.ana-actions .ana-action.refresh svg {\n  height: 14px;\n  width: 14px;\n}\n.ana-minmax-btn {\n  border-radius: 3px;\n  height: 3px;\n  width: 15px;\n  opacity: 0.6;\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n.ana-min .ana-minmax-btn {\n  border-radius: 2px;\n  height: 11px;\n  background-color: transparent;\n  width: 11px;\n}\n.ana-min .ana-logo {\n  transform: translateY(-22px);\n}\n.ana-min .ana-logo > img {\n  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.36);\n}\n.input-msg {\n  background-color: white;\n  padding: 5px 16px;\n  font-size: 10px;\n  color: crimson;\n}\n.typing-indicator-container {\n  display: table-cell;\n}\n.typing-indicator {\n  width: auto;\n  display: table;\n  position: relative;\n}\n.typing-indicator span {\n  height: 6px;\n  width: 6px;\n  float: left;\n  margin: 0 1px;\n  display: block;\n  border-radius: 50%;\n  opacity: 0.4;\n}\n.typing-indicator span:nth-of-type(1) {\n  -webkit-animation: 1s blink infinite 0.3333s;\n  animation: 1s blink infinite 0.3333s;\n}\n.typing-indicator span:nth-of-type(2) {\n  -webkit-animation: 1s blink infinite 0.6666s;\n  animation: 1s blink infinite 0.6666s;\n}\n.typing-indicator span:nth-of-type(3) {\n  -webkit-animation: 1s blink infinite 0.9999s;\n  animation: 1s blink infinite 0.9999s;\n}\n@-webkit-keyframes blink {\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes blink {\n  50% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes bulge {\n  50% {\n    transform: scale(1.05);\n  }\n}\n@keyframes bulge {\n  50% {\n    transform: scale(1.05);\n  }\n}\n.scrollbar::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n.scrollbar::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n  background-color: transparent;\n}\n.scrollable::-webkit-scrollbar * {\n  background: transparent;\n}\n.scrollbar::-webkit-scrollbar-thumb {\n  border-radius: 10px !important;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;\n  background-color: rgba(0, 0, 0, 0.3) !important;\n}\n.carousel-item-container:first-child > .carousel-item {\n  margin-left: 16px;\n}\n.carousel-item-container:last-child > .carousel-item {\n  margin-right: 16px;\n}\n.carousel-arrow > i {\n  color: rgba(0, 0, 0, 0.6);\n}\n.ana-link {\n  color: inherit;\n  text-decoration: underline;\n}\n.chat-bottom-overlay > img {\n  height: 12px;\n  width: 12px;\n}\n.ana-online-dot {\n  border-radius: 5px;\n  height: 6px;\n  width: 6px;\n  background-color: #00DF50;\n  border: 1px solid white;\n  margin-top: 7px;\n  margin-right: 5px;\n  display: inline-block;\n}\n.chat-history-loading {\n  position: absolute;\n  bottom: -2px;\n  z-index: 100;\n  text-align: center;\n  width: 100%;\n  margin: 0 -20px 0 -15px;\n}\n.chat-history-loading > mat-progress-spinner {\n  display: inline-block;\n  height: 50px;\n  width: 50px;\n}\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .root {\n    border-radius: 0;\n  }\n\n  .ana-title {\n    border-radius: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jaGF0LXRocmVhZC9jaGF0LXRocmVhZC5jb21wb25lbnQuc2NzcyIsIi9Vc2Vycy90dXJ0dXZzaGluL1Byb2plY3RzL2NoYXRib3RzLm1uL3NpbXVsYXRvci9zcmMvYXBwL2NvbXBvbmVudHMvY2hhdC10aHJlYWQvY2hhdC10aHJlYWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDQWhCO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBREVGO0FDQ0E7RUFDRSxpQkFBQTtBREVGO0FDQ0E7RUFDRSxlQUFBO0FERUY7QUNDQTtFQUNFLGNBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7QURFRjtBQ0NBO0VBQ0UsdUJBQUE7QURFRjtBQ0NBOztFQUVFLG9CQUFBO0VBQ0EsYUFBQTtBREVGO0FDQ0E7RUFDRSx1QkFBQTtBREVGO0FDQ0E7RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FERUY7QUNDQTtFQUNFLGNBQUE7QURFRjtBQ0NBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLHNEQUFBO0FERUY7QUNDQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7QURFRjtBQ0NBO0VBQ0UsNEJBQUE7QURFRjtBQ0NBOztFQUVFLG9DQUFBO0FERUY7QUNDQTtFQUNFLDRCQUFBO0FERUY7QUNDQTs7RUFFRSxvQ0FBQTtBREVGO0FDQ0E7RUFDRSx1QkFBQTtFQUNBLGFBQUE7QURFRjtBQ0NBO0VBQ0UsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QURFRjtBQ0NBO0VBQ0UsV0FBQTtFQUNBLDRCQUFBO0VBQ0Esc0JBQUE7RUFDQSx3QkFBQTtBREVGO0FDQ0E7RUFDRSxZQUFBO0VBQ0EsNEJBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0FERUY7QUNDQTtFQUNFLFdBQUE7RUFDQSxxQkFBQTtBREVGO0FDQ0E7RUFDRSxnQkFBQTtBREVGO0FDQ0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNLQUFBO0VBQ0EsK0JBQUE7RUFDQSwwQkFBQTtBREVGO0FDQ0E7RUFDRSxxQkFBQTtBREVGO0FDQ0E7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBREVGO0FDQ0E7RUFDRSxZQUFBO0FERUY7QUNDQTtFQUNFLFFBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7QURFRjtBQ0NBO0VBQ0Usc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1DQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FERUY7QUNDQTtFQUNFLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBREVGO0FDQ0E7RUFDRSxtQkFBQTtBREVGO0FDQ0E7RUFDRSxjQUFBO0FERUY7QUNDQTtFQUNFLG9DQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FERUY7QUNDQTtFQUNFLHlCQUFBO0FERUY7QUNDQTtFQUNFLHlCQUFBO0FERUY7QUNDQTtFQUNFLFlBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBREVGO0FDQ0E7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7QURFRjtBQ0NBO0VBQ0UsbUJBQUE7QURFRjtBQ0VBOzs7OztDQUFBO0FBT0E7RUFDRSx5QkFBQTtFQUNBLDRCQUFBO0FEQUY7QUNHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QURBRjtBQ0dBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0FEQUY7QUNHQTtFQUNFLHVCQUFBO0VBR0EsNEJBQUE7RUFDQSxpREFBQTtBREFGO0FDR0E7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0FEQUY7QUNHQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBREFGO0FDR0E7RUFDRSxZQUFBO0FEQUY7QUNHQTtFQUNFLGVBQUE7QURBRjtBQ0dBO0VBQ0UsWUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QURBRjtBQ0dBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0Esd0RBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFHQSxtQkFBQTtBREFGO0FDR0E7RUFDRSx1QkFBQTtFQUNBLGtDQUFBO0FEQUY7QUNHQTtFQUNFLDBCQUFBO0FEQUY7QUNHQTtFQUNFLDBCQUFBO0FEQUY7QUNHQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtBREFGO0FDR0E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBREFGO0FDR0E7RUFDRSxVQUFBO0FEQUY7QUNHQTtFQUNFLFFBQUE7RUFDQSwrQ0FBQTtFQUNBLDBCQUFBO0FEQUY7QUNHQTtFQUNFLE9BQUE7RUFDQSw4Q0FBQTtFQUNBLDBCQUFBO0FEQUY7QUNHQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBS0EseUJBQUE7RUFDQSxVQUFBO0FEQUY7QUNHQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUtBLHdCQUFBO0FEQUY7QUNHQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUdBLG1CQUFBO0FEQUY7QUNHQTs7O0VBR0UsV0FBQTtFQUdBLHNCQUFBO0FEQUY7QUNLQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtBREZGO0FDS0E7RUFDRSxZQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EscURBQUE7QURGRjtBQ0tBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7QURGRjtBQ0tBO0VBQ0Usa0JBQUE7QURGRjtBQ0tBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EseUNBQUE7QURGRjtBQ0tBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FERkY7QUNLQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7QURGRjtBQ0tBO0VBQ0UsV0FBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7QURGRjtBQ0tBO0VBQ0UsbUJBQUE7QURGRjtBQ0tBO0VBQ0UsbUJBQUE7QURGRjtBQ0tBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFHQSw0QkFBQTtBREZGO0FDS0E7RUFDRSxnQkFBQTtFQUNBLCtDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBREZGO0FDS0E7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLHFCQUFBO0FERkY7QUNLQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNEJBQUE7RUFDQSxnREFBQTtFQUNBLGVBQUE7QURGRjtBQ0tBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7QURGRjtBQ0tBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QURGRjtBQ0tBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7QURGRjtBQ0tBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QURGRjtBQ0tBO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBREZGO0FDS0E7RUFDRSxVQUFBO0VBQ0Esb0NBQUE7QURGRjtBQ0tBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QURGRjtBQ0tBO0VBQ0UsVUFBQTtBREZGO0FDS0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBREZGO0FDS0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7QURGRjtBQ0tBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSxXQUFBO0FERkY7QUNLQTtFQUNFLDRCQUFBO0FERkY7QUNLQTtFQUNFLCtDQUFBO0FERkY7QUNLQTtFQUNFLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBREZGO0FDS0E7RUFDRSxtQkFBQTtBREZGO0FDS0E7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FERkY7QUNLQTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FERkY7QUNLQTtFQUdFLDRDQUFBO0VBQ0Esb0NBQUE7QURGRjtBQ0tBO0VBR0UsNENBQUE7RUFDQSxvQ0FBQTtBREZGO0FDS0E7RUFHRSw0Q0FBQTtFQUNBLG9DQUFBO0FERkY7QUNXQTtFQUNFO0lBQ0UsVUFBQTtFREhGO0FBQ0Y7QUNNQTtFQUNFO0lBQ0UsVUFBQTtFREpGO0FBQ0Y7QUNPQTtFQUNFO0lBS0Usc0JBQUE7RURMRjtBQUNGO0FDa0JBO0VBQ0U7SUFLRSxzQkFBQTtFRFBGO0FBQ0Y7QUNVQTtFQUNFLDZCQUFBO0FEUkY7QUNXQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsNkJBQUE7QURSRjtBQ1dBO0VBQ0UsdUJBQUE7QURSRjtBQ1dBO0VBQ0UsOEJBQUE7RUFDQSwrREFBQTtFQUNBLCtDQUFBO0FEUkY7QUNXQTtFQUNFLGlCQUFBO0FEUkY7QUNXQTtFQUNFLGtCQUFBO0FEUkY7QUNXQTtFQUNFLHlCQUFBO0FEUkY7QUNXQTtFQUNFLGNBQUE7RUFDQSwwQkFBQTtBRFJGO0FDV0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBRFJGO0FDV0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0FEUkY7QUNXQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtBRFJGO0FDV0E7RUFDRSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FEUkY7QUNXQTtFQUNFO0lBR0UsZ0JBQUE7RURSRjs7RUNXQTtJQUdFLGdCQUFBO0VEUkY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvY2hhdC10aHJlYWQvY2hhdC10aHJlYWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4ucm9vdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgYXV0bztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLm1lZGlhIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi5jbGlja2FibGUge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jb250ZW50IHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuXG4uYW5hLW1pbi5yb290IHtcbiAgaGVpZ2h0OiA1N3B4ICFpbXBvcnRhbnQ7XG59XG5cbi5hbmEtbWluIC5jaGF0LXRocmVhZCxcbi5hbmEtbWluIC5jaGF0LWlucHV0LWNvbnRhaW5lciB7XG4gIGhlaWdodDogMCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uYW5hLW1pbiAucm9vdCB7XG4gIGhlaWdodDogNTdweCAhaW1wb3J0YW50O1xufVxuXG4uY2hhdC10aHJlYWQge1xuICBwYWRkaW5nOiAyMHB4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZsZXgtZ3JvdzogMTtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xufVxuXG4uY2hhdC1tZXNzYWdlLWdyb3VwIHtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbSB7XG4gIG1heC13aWR0aDogODAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1pbi13aWR0aDogNDAlO1xuICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAtMXB4IHJnYmEoMTEwLCAxMTAsIDExMCwgMC4xNSk7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYSAqIC5jaGF0LW1lZGlhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYS5pbmNvbWluZyAqIC5jaGF0LW1lZGlhIHtcbiAgYm9yZGVyLXJhZGl1czogMCAxMHB4IDEwcHggMDtcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLm1lZGlhLmluY29taW5nICogdmlkZW8uY2hhdC1tZWRpYSxcbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYS5pbmNvbWluZyAqIC5jaGF0LW1lZGlhID4gYXVkaW8ge1xuICBib3JkZXItcmFkaXVzOiAwIDEwcHggMCAwICFpbXBvcnRhbnQ7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYS5vdXRnb2luZyAqIC5jaGF0LW1lZGlhIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAwIDAgMTBweDtcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLm1lZGlhLm91dGdvaW5nICogdmlkZW8uY2hhdC1tZWRpYSxcbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYS5vdXRnb2luZyAqIC5jaGF0LW1lZGlhID4gYXVkaW8ge1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDAgMCAwICFpbXBvcnRhbnQ7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS50ZXh0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDE1cHg7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS50eXBpbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMTBweCAxNXB4O1xuICBtaW4td2lkdGg6IGF1dG87XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5pbmNvbWluZyB7XG4gIGZsb2F0OiBsZWZ0O1xuICBib3JkZXItcmFkaXVzOiAwIDEwcHggMTBweCAwO1xuICBib3JkZXItbGVmdC13aWR0aDogM3B4O1xuICBib3JkZXItbGVmdC1zdHlsZTogc29saWQ7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5vdXRnb2luZyB7XG4gIGZsb2F0OiByaWdodDtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAwIDAgMTBweDtcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAzcHg7XG4gIGJvcmRlci1yaWdodC1zdHlsZTogc29saWQ7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG5hcHAtY2hhdC10aHJlYWQge1xuICBtYXgtd2lkdGg6IDUwMHB4O1xufVxuXG4uZG90cyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCAwcHgsIHRyYW5zcGFyZW50IDJweCwgd2hpdGUgMnB4LCB3aGl0ZSAyMHB4KSwgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjYzhjM2M3IDBweCwgI2M4YzNjNyAycHgsIHdoaXRlIDJweCwgd2hpdGUgMjBweCk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDQzN3B4IC0ycHg7XG4gIGJhY2tncm91bmQtc2l6ZTogMjBweCAyMHB4O1xufVxuXG4uY2hhdC10ZXh0IHtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xufVxuXG4uY2hhdC10aW1lIHtcbiAgZm9udC1zaXplOiA4cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAycHg7XG4gIHJpZ2h0OiA4cHg7XG59XG5cbi5jaGF0LXRpbWUgPiBzcGFuIHtcbiAgb3BhY2l0eTogMC40O1xufVxuXG4uY2hhdC1zdHViIHtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgYm90dG9tOiAtMTNweDtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmluY29taW5nID4gLmNoYXQtc3R1YiB7XG4gIGJvcmRlci10b3Atd2lkdGg6IDEzcHg7XG4gIGJvcmRlci10b3Atc3R5bGU6IHNvbGlkO1xuICBib3JkZXItbGVmdDogMTVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAtM3B4O1xufVxuXG4ub3V0Z29pbmcgPiAuY2hhdC1zdHViIHtcbiAgYm9yZGVyLXRvcC13aWR0aDogMTNweDtcbiAgYm9yZGVyLXRvcC1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1yaWdodDogMTVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogLTNweDtcbn1cblxuLmNoYXQtbWVzc2FnZS1sYXN0IHtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuLmNoYXQtbWVzc2FnZS1sYXN0ID4gLmNoYXQtc3R1YiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uY2hhdC1ib3R0b20tb3ZlcmxheSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDkuNnB4O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xufVxuXG4ub3V0Z29pbmcgKiAuY2hhdC1ib3R0b20tb3ZlcmxheSB7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAwIDEwcHg7XG59XG5cbi5pbmNvbWluZyAqIC5jaGF0LWJvdHRvbS1vdmVybGF5IHtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMDtcbn1cblxuLm1lZGlhID4gLmNoYXQtdGltZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgb3BhY2l0eTogMTtcbiAgYm90dG9tOiA1cHg7XG59XG5cbi5jaGF0LW1lZGlhID4gYXVkaW8ge1xuICB3aWR0aDogMjMwcHg7XG4gIG1hcmdpbi1ib3R0b206IDE5cHg7XG59XG5cbnZpZGVvLmNoYXQtbWVkaWEge1xuICBtYXJnaW4tYm90dG9tOiAxOXB4O1xufVxuXG4vKlxuR3JlZW4gZG90IHVwXG5DYXJvdXNlbCBsZWZ0IHJpZ2h0IGJ1dHRvbiBiYWNrZ3JvdW5kXG5DYXJvdXNlbCBsZWZ0IHJpZ2h0IHZlcnRpY2FsIGNlbnRlclxuYmcgd2hpdGVcbiovXG4uY2hhdC1pbnB1dC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xufVxuXG4uY2hhdC1pbnB1dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY2hhdC1pbnB1dC5jbGljayB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHdpZHRoOiBhdXRvO1xufVxuXG4uY2hhdC1pbnB1dC50ZXh0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xuICBib3gtc2hhZG93OiAwcHggLTNweCAxMXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuXG4uY2hhdC1pbnB1dCBidXR0b24uYnRuLWNsaWNrIHtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiA3cHggMjNweDtcbiAgYm9yZGVyOiB0cmFuc3BhcmVudDtcbiAgbWFyZ2luOiAwIDEwcHggMTBweCAxMHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uY2hhdC1pbnB1dCBidXR0b24uYnRuLWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgcGFkZGluZzogMCAxNHB4O1xuICBvcGFjaXR5OiAwLjg7XG59XG5cbi5jaGF0LWlucHV0IGJ1dHRvbi5idG4taWNvbjpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuMTtcbn1cblxuLmNoYXQtaW5wdXQgaSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmNoYXQtdGV4dC1pbnB1dCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICB3aWR0aDogMTAwJTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uY2hhdC1pbnB1dC1jbGljay1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgLypSZW1vdmUgYmVsb3cgZm9yIGNsaWNrIGJ1dHRvbnMgdG8gc2Nyb2xsIGhvcml6b250YWxseSovXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMTBweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4uY2hhdC1maWxlLWF0dGFjaG1lbnQge1xuICBoZWlnaHQ6IDYwcHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLmFuYS1zZW50LXRpY2sge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMXB4KTtcbn1cblxuLmFuYS1kZWxpdmVyZWQtdGljayB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxcHgpO1xufVxuXG4uY2Fyb3VzZWwtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAwIC0yMHB4O1xufVxuXG4uY2Fyb3VzZWwtd3JhcHBlciA+IC5jYXJvdXNlbC1hcnJvdyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHBhZGRpbmc6IDVweCAwIDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgb3BhY2l0eTogMC44NTtcbn1cblxuLmNhcm91c2VsLXdyYXBwZXIgPiAuY2Fyb3VzZWwtYXJyb3c6aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uY2Fyb3VzZWwtd3JhcHBlciA+IC5jYXJvdXNlbC1hcnJvdy5yaWdodCB7XG4gIHJpZ2h0OiAwO1xuICBib3gtc2hhZG93OiAtMXB4IDBweCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYm9yZGVyLXJhZGl1czogNXB4IDAgMCA1cHg7XG59XG5cbi5jYXJvdXNlbC13cmFwcGVyID4gLmNhcm91c2VsLWFycm93LmxlZnQge1xuICBsZWZ0OiAwO1xuICBib3gtc2hhZG93OiAxcHggMHB4IDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBib3JkZXItcmFkaXVzOiAwIDVweCA1cHggMDtcbn1cblxuLmNhcm91c2VsLWFycm93LnJpZ2h0IHN2ZyB7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gIC1vLXRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgZmlsbDogIzMzMztcbn1cblxuLmNhcm91c2VsLWFycm93LmxlZnQgc3ZnIHtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgZmlsbDogIzMzMztcbiAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gIC1vLXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbn1cblxuLmNhcm91c2VsLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIG1hcmdpbi10b3A6IDVweDtcbiAgZGlzcGxheTogZmxleDtcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cblxuLmNhcm91c2VsLWl0ZW0tbWVkaWEgPiBpbWcsXG4uY2Fyb3VzZWwtaXRlbS1tZWRpYSA+IHZpZGVvLFxuLmNhcm91c2VsLWl0ZW0tbWVkaWEgPiBhdWRpbyB7XG4gIHdpZHRoOiAxMDAlO1xuICAtbW96LWJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbiAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbn1cblxuLmNhcm91c2VsLWl0ZW0tbWVkaWEge1xuICBwYWRkaW5nOiAyMHB4IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDE3MHB4O1xufVxuXG4uY2Fyb3VzZWwtaXRlbSB7XG4gIHdpZHRoOiAyNDBweDtcbiAgbWFyZ2luOiAwIDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGJveC1zaGFkb3c6IDBweCAxcHggNnB4IDFweCByZ2JhKDExMCwgMTEwLCAxMTAsIDAuMTUpO1xufVxuXG4uY2Fyb3VzZWwtaXRlbS1jb250ZW50IHtcbiAgcGFkZGluZzogMCAyMHB4O1xuICBmbGV4LWdyb3c6IDE7XG59XG5cbi5jYXJvdXNlbC1pdGVtLWNvbnRlbnQubm8tbWVkaWEge1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG59XG5cbi5jYXJvdXNlbC1pdGVtLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgcGFkZGluZzogM3B4O1xuICAvKkZvciBjYXJvdXNlbCBpdGVtIHNoYWRvdyB0byBiZSB2aXNpYmxlKi9cbn1cblxuLmNhcm91c2VsLWl0ZW0tdGl0bGUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbWFyZ2luOiDvv70wIDAgMnB4IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5jYXJvdXNlbC1pdGVtLWRlc2Mge1xuICBjb2xvcjogZ3JheTtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBtYXJnaW46IDJweCAwIDEwcHggMDtcbn1cblxuLmNhcm91c2VsLWl0ZW0tYnV0dG9uID4gYnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiB4LXNtYWxsO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBcIk9wZW4gU2Fuc1wiO1xufVxuXG4udGV4dC13cmFwIHtcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLmNhcm91c2VsLWNvbnRhaW5lciA+IHRhYmxlIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmFuYS10aXRsZSB7XG4gIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgei1pbmRleDogMTAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDAgMDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMCAwO1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMCAwO1xufVxuXG4uYW5hLW1pbiAuYW5hLXRpdGxlIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgYm94LXNoYWRvdzogMHB4IDFweCA2cHggMXB4IHJnYmEoMCwgMCwgMCwgMC4zNik7XG4gIG1hcmdpbi1sZWZ0OiA2cHg7XG4gIG1hcmdpbi1yaWdodDogNnB4O1xufVxuXG4uYW5hLWxvZ28ge1xuICBkaXNwbGF5OiBpbmxpbmU7XG4gIGZsb2F0OiBsZWZ0O1xuICBtYXJnaW46IDAgMTVweCAtNHB4IDA7XG59XG5cbi5hbmEtbG9nbyA+IGltZyB7XG4gIHdpZHRoOiAzNXB4O1xuICBoZWlnaHQ6IDM1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDAgN3B4IDdweCA3cHg7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMjVweCAzcHggcmdiYSgwLCAwLCAwLCAwLjE5KTtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuXG4uYW5hLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDYzJTtcbn1cblxuLmFuYS1jb250ZW50ID4gLnRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uYW5hLWNvbnRlbnQgPiAuc3VidGl0bGUge1xuICBmb250LXNpemU6IDExcHg7XG4gIG9wYWNpdHk6IDAuOTtcbn1cblxuLmFuYS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxvYXQ6IHJpZ2h0O1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG5cbi5hbmEtYWN0aW9ucyAuYW5hLWFjdGlvbiB7XG4gIG9wYWNpdHk6IDAuNjtcbiAgaGVpZ2h0OiAyNHB4O1xuICB3aWR0aDogMjRweDtcbiAgcGFkZGluZzogNHB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFuYS1hY3Rpb25zIC5hbmEtYWN0aW9uOmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uYW5hLWFjdGlvbnMgLmFuYS1hY3Rpb24gc3ZnIHtcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTZweDtcbn1cblxuLmFuYS1hY3Rpb25zIC5hbmEtYWN0aW9uIHN2ZyBwYXRoIHtcbiAgZmlsbDogI2ZmZjtcbn1cblxuLmFuYS1hY3Rpb25zIC5hbmEtYWN0aW9uLnJlZnJlc2ggc3ZnIHtcbiAgaGVpZ2h0OiAxNHB4O1xuICB3aWR0aDogMTRweDtcbn1cblxuLmFuYS1taW5tYXgtYnRuIHtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBoZWlnaHQ6IDNweDtcbiAgd2lkdGg6IDE1cHg7XG4gIG9wYWNpdHk6IDAuNjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwcHg7XG4gIHJpZ2h0OiAxMHB4O1xufVxuXG4uYW5hLW1pbiAuYW5hLW1pbm1heC1idG4ge1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGhlaWdodDogMTFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIHdpZHRoOiAxMXB4O1xufVxuXG4uYW5hLW1pbiAuYW5hLWxvZ28ge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIycHgpO1xufVxuXG4uYW5hLW1pbiAuYW5hLWxvZ28gPiBpbWcge1xuICBib3gtc2hhZG93OiAwcHggMXB4IDZweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM2KTtcbn1cblxuLmlucHV0LW1zZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiA1cHggMTZweDtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogY3JpbXNvbjtcbn1cblxuLnR5cGluZy1pbmRpY2F0b3ItY29udGFpbmVyIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbn1cblxuLnR5cGluZy1pbmRpY2F0b3Ige1xuICB3aWR0aDogYXV0bztcbiAgZGlzcGxheTogdGFibGU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnR5cGluZy1pbmRpY2F0b3Igc3BhbiB7XG4gIGhlaWdodDogNnB4O1xuICB3aWR0aDogNnB4O1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luOiAwIDFweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgb3BhY2l0eTogMC40O1xufVxuXG4udHlwaW5nLWluZGljYXRvciBzcGFuOm50aC1vZi10eXBlKDEpIHtcbiAgLW1vei1hbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuMzMzM3M7XG4gIC1vLWFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC4zMzMzcztcbiAgLXdlYmtpdC1hbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuMzMzM3M7XG4gIGFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC4zMzMzcztcbn1cblxuLnR5cGluZy1pbmRpY2F0b3Igc3BhbjpudGgtb2YtdHlwZSgyKSB7XG4gIC1tb3otYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjY2NjZzO1xuICAtby1hbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuNjY2NnM7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjY2NjZzO1xuICBhbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuNjY2NnM7XG59XG5cbi50eXBpbmctaW5kaWNhdG9yIHNwYW46bnRoLW9mLXR5cGUoMykge1xuICAtbW96LWFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC45OTk5cztcbiAgLW8tYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjk5OTlzO1xuICAtd2Via2l0LWFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC45OTk5cztcbiAgYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjk5OTlzO1xufVxuXG5ALW1vei1rZXlmcmFtZXMgYmxpbmsge1xuICA1MCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cbkAtd2Via2l0LWtleWZyYW1lcyBibGluayB7XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuQGtleWZyYW1lcyBibGluayB7XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuQC13ZWJraXQta2V5ZnJhbWVzIGJ1bGdlIHtcbiAgNTAlIHtcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgfVxufVxuQC1tb3ota2V5ZnJhbWVzIGJ1bGdlIHtcbiAgNTAlIHtcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgfVxufVxuQGtleWZyYW1lcyBidWxnZSB7XG4gIDUwJSB7XG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gIH1cbn1cbi5zY3JvbGxiYXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5zY3JvbGxiYXI6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDVweDtcbiAgaGVpZ2h0OiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uc2Nyb2xsYWJsZTo6LXdlYmtpdC1zY3JvbGxiYXIgKiB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4uc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggIWltcG9ydGFudDtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4zKSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMykgIWltcG9ydGFudDtcbn1cblxuLmNhcm91c2VsLWl0ZW0tY29udGFpbmVyOmZpcnN0LWNoaWxkID4gLmNhcm91c2VsLWl0ZW0ge1xuICBtYXJnaW4tbGVmdDogMTZweDtcbn1cblxuLmNhcm91c2VsLWl0ZW0tY29udGFpbmVyOmxhc3QtY2hpbGQgPiAuY2Fyb3VzZWwtaXRlbSB7XG4gIG1hcmdpbi1yaWdodDogMTZweDtcbn1cblxuLmNhcm91c2VsLWFycm93ID4gaSB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG59XG5cbi5hbmEtbGluayB7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLmNoYXQtYm90dG9tLW92ZXJsYXkgPiBpbWcge1xuICBoZWlnaHQ6IDEycHg7XG4gIHdpZHRoOiAxMnB4O1xufVxuXG4uYW5hLW9ubGluZS1kb3Qge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGhlaWdodDogNnB4O1xuICB3aWR0aDogNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBERjUwO1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgbWFyZ2luLXRvcDogN3B4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4uY2hhdC1oaXN0b3J5LWxvYWRpbmcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogLTJweDtcbiAgei1pbmRleDogMTAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDAgLTIwcHggMCAtMTVweDtcbn1cblxuLmNoYXQtaGlzdG9yeS1sb2FkaW5nID4gbWF0LXByb2dyZXNzLXNwaW5uZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogNTBweDtcbiAgd2lkdGg6IDUwcHg7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGg6IDMyMHB4KSBhbmQgKG1heC1kZXZpY2Utd2lkdGg6IDQ4MHB4KSB7XG4gIC5yb290IHtcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDA7XG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gIH1cblxuICAuYW5hLXRpdGxlIHtcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDA7XG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gIH1cbn0iLCIucm9vdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgYXV0bztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLm1lZGlhIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi5jbGlja2FibGUge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jb250ZW50IHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuXG4uYW5hLW1pbi5yb290IHtcbiAgaGVpZ2h0OiA1N3B4ICFpbXBvcnRhbnQ7XG59XG5cbi5hbmEtbWluIC5jaGF0LXRocmVhZCxcbi5hbmEtbWluIC5jaGF0LWlucHV0LWNvbnRhaW5lciB7XG4gIGhlaWdodDogMCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uYW5hLW1pbiAucm9vdCB7XG4gIGhlaWdodDogNTdweCAhaW1wb3J0YW50O1xufVxuXG4uY2hhdC10aHJlYWQge1xuICBwYWRkaW5nOiAyMHB4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZsZXgtZ3JvdzogMTtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xufVxuXG4uY2hhdC1tZXNzYWdlLWdyb3VwIHtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbSB7XG4gIG1heC13aWR0aDogODAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1pbi13aWR0aDogNDAlO1xuICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAtMXB4IHJnYmEoMTEwLCAxMTAsIDExMCwgMC4xNSk7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYSAqIC5jaGF0LW1lZGlhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYS5pbmNvbWluZyAqIC5jaGF0LW1lZGlhIHtcbiAgYm9yZGVyLXJhZGl1czogMCAxMHB4IDEwcHggMDtcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLm1lZGlhLmluY29taW5nICogdmlkZW8uY2hhdC1tZWRpYSxcbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYS5pbmNvbWluZyAqIC5jaGF0LW1lZGlhPmF1ZGlvIHtcbiAgYm9yZGVyLXJhZGl1czogMCAxMHB4IDAgMCAhaW1wb3J0YW50O1xufVxuXG4uY2hhdC1tZXNzYWdlLWl0ZW0ubWVkaWEub3V0Z29pbmcgKiAuY2hhdC1tZWRpYSB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMCAwIDEwcHg7XG59XG5cbi5jaGF0LW1lc3NhZ2UtaXRlbS5tZWRpYS5vdXRnb2luZyAqIHZpZGVvLmNoYXQtbWVkaWEsXG4uY2hhdC1tZXNzYWdlLWl0ZW0ubWVkaWEub3V0Z29pbmcgKiAuY2hhdC1tZWRpYT5hdWRpbyB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMCAwIDAgIWltcG9ydGFudDtcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLnRleHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMTVweDtcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLnR5cGluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gIG1pbi13aWR0aDogYXV0bztcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLmluY29taW5nIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGJvcmRlci1yYWRpdXM6IDAgMTBweCAxMHB4IDA7XG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAzcHg7XG4gIGJvcmRlci1sZWZ0LXN0eWxlOiBzb2xpZDtcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLm91dGdvaW5nIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDAgMCAxMHB4O1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDNweDtcbiAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBzb2xpZDtcbn1cblxuLmNoYXQtbWVzc2FnZS1pdGVtLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbmFwcC1jaGF0LXRocmVhZCB7XG4gIG1heC13aWR0aDogNTAwcHg7XG59XG5cbi5kb3RzIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDBweCwgdHJhbnNwYXJlbnQgMnB4LCByZ2IoMjU1LCAyNTUsIDI1NSkgMnB4LCByZ2IoMjU1LCAyNTUsIDI1NSkgMjBweCksIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiKDIwMCwgMTk1LCAxOTkpIDBweCwgcmdiKDIwMCwgMTk1LCAxOTkpIDJweCwgcmdiKDI1NSwgMjU1LCAyNTUpIDJweCwgcmdiKDI1NSwgMjU1LCAyNTUpIDIwcHgpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0MzdweCAtMnB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IDIwcHggMjBweDtcbn1cblxuLmNoYXQtdGV4dCB7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbn1cblxuLmNoYXQtdGltZSB7XG4gIGZvbnQtc2l6ZTogOHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMnB4O1xuICByaWdodDogOHB4O1xufVxuXG4uY2hhdC10aW1lPnNwYW4ge1xuICBvcGFjaXR5OiAwLjQ7XG59XG5cbi5jaGF0LXN0dWIge1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBib3R0b206IC0xM3B4O1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaW5jb21pbmc+LmNoYXQtc3R1YiB7XG4gIGJvcmRlci10b3Atd2lkdGg6IDEzcHg7XG4gIGJvcmRlci10b3Atc3R5bGU6IHNvbGlkO1xuICBib3JkZXItbGVmdDogMTVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAtM3B4O1xufVxuXG4ub3V0Z29pbmc+LmNoYXQtc3R1YiB7XG4gIGJvcmRlci10b3Atd2lkdGg6IDEzcHg7XG4gIGJvcmRlci10b3Atc3R5bGU6IHNvbGlkO1xuICBib3JkZXItcmlnaHQ6IDE1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IC0zcHg7XG59XG5cbi5jaGF0LW1lc3NhZ2UtbGFzdCB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbi5jaGF0LW1lc3NhZ2UtbGFzdD4uY2hhdC1zdHViIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5jaGF0LWJvdHRvbS1vdmVybGF5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICB3aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogOS42cHg7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgcGFkZGluZzogNXB4IDEwcHg7XG59XG5cbi5vdXRnb2luZyAqIC5jaGF0LWJvdHRvbS1vdmVybGF5IHtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDAgMTBweDtcbn1cblxuLmluY29taW5nICogLmNoYXQtYm90dG9tLW92ZXJsYXkge1xuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAwO1xufVxuXG4ubWVkaWE+LmNoYXQtdGltZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgb3BhY2l0eTogMTtcbiAgYm90dG9tOiA1cHg7XG59XG5cbi5jaGF0LW1lZGlhPmF1ZGlvIHtcbiAgd2lkdGg6IDIzMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxOXB4O1xufVxuXG52aWRlby5jaGF0LW1lZGlhIHtcbiAgbWFyZ2luLWJvdHRvbTogMTlweDtcbn1cblxuXG4vKlxuR3JlZW4gZG90IHVwXG5DYXJvdXNlbCBsZWZ0IHJpZ2h0IGJ1dHRvbiBiYWNrZ3JvdW5kXG5DYXJvdXNlbCBsZWZ0IHJpZ2h0IHZlcnRpY2FsIGNlbnRlclxuYmcgd2hpdGVcbiovXG5cbi5jaGF0LWlucHV0LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGNUY1RjU7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XG59XG5cbi5jaGF0LWlucHV0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jaGF0LWlucHV0LmNsaWNrIHtcbiAgZGlzcGxheTogaW5saW5lO1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IGF1dG87XG59XG5cbi5jaGF0LWlucHV0LnRleHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XG4gIGJveC1zaGFkb3c6IDBweCAtM3B4IDExcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG59XG5cbi5jaGF0LWlucHV0IGJ1dHRvbi5idG4tY2xpY2sge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDdweCAyM3B4O1xuICBib3JkZXI6IHRyYW5zcGFyZW50O1xuICBtYXJnaW46IDAgMTBweCAxMHB4IDEwcHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5jaGF0LWlucHV0IGJ1dHRvbi5idG4taWNvbiB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBwYWRkaW5nOiAwIDE0cHg7XG4gIG9wYWNpdHk6IDAuODtcbn1cblxuLmNoYXQtaW5wdXQgYnV0dG9uLmJ0bi1pY29uOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC4xMDtcbn1cblxuLmNoYXQtaW5wdXQgaSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmNoYXQtdGV4dC1pbnB1dCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICB3aWR0aDogMTAwJTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uY2hhdC1pbnB1dC1jbGljay1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgLypSZW1vdmUgYmVsb3cgZm9yIGNsaWNrIGJ1dHRvbnMgdG8gc2Nyb2xsIGhvcml6b250YWxseSovXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMTBweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4uY2hhdC1maWxlLWF0dGFjaG1lbnQge1xuICBoZWlnaHQ6IDYwcHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLmFuYS1zZW50LXRpY2sge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMXB4KTtcbn1cblxuLmFuYS1kZWxpdmVyZWQtdGljayB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxcHgpO1xufVxuXG4uY2Fyb3VzZWwtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAwIC0yMHB4O1xufVxuXG4uY2Fyb3VzZWwtd3JhcHBlcj4uY2Fyb3VzZWwtYXJyb3cge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBwYWRkaW5nOiA1cHggMCAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG9wYWNpdHk6IDAuODU7XG59XG5cbi5jYXJvdXNlbC13cmFwcGVyPi5jYXJvdXNlbC1hcnJvdzpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5jYXJvdXNlbC13cmFwcGVyPi5jYXJvdXNlbC1hcnJvdy5yaWdodCB7XG4gIHJpZ2h0OiAwO1xuICBib3gtc2hhZG93OiAtMXB4IDBweCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYm9yZGVyLXJhZGl1czogNXB4IDAgMCA1cHg7XG59XG5cbi5jYXJvdXNlbC13cmFwcGVyPi5jYXJvdXNlbC1hcnJvdy5sZWZ0IHtcbiAgbGVmdDogMDtcbiAgYm94LXNoYWRvdzogMXB4IDBweCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYm9yZGVyLXJhZGl1czogMCA1cHggNXB4IDA7XG59XG5cbi5jYXJvdXNlbC1hcnJvdy5yaWdodCBzdmcge1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICAtbW96LXRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xuICAtby10cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gIGZpbGw6ICMzMzM7XG59XG5cbi5jYXJvdXNlbC1hcnJvdy5sZWZ0IHN2ZyB7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGZpbGw6ICMzMzM7XG4gIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAtby10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG59XG5cbi5jYXJvdXNlbC1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbi5jYXJvdXNlbC1pdGVtLW1lZGlhPmltZyxcbi5jYXJvdXNlbC1pdGVtLW1lZGlhPnZpZGVvLFxuLmNhcm91c2VsLWl0ZW0tbWVkaWE+YXVkaW8ge1xuICB3aWR0aDogMTAwJTtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG59XG5cblxuXG4uY2Fyb3VzZWwtaXRlbS1tZWRpYSB7XG4gIHBhZGRpbmc6IDIwcHggMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMTcwcHg7XG59XG5cbi5jYXJvdXNlbC1pdGVtIHtcbiAgd2lkdGg6IDI0MHB4O1xuICBtYXJnaW46IDAgMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYm94LXNoYWRvdzogMHB4IDFweCA2cHggMXB4IHJnYmEoMTEwLCAxMTAsIDExMCwgMC4xNSk7XG59XG5cbi5jYXJvdXNlbC1pdGVtLWNvbnRlbnQge1xuICBwYWRkaW5nOiAwIDIwcHg7XG4gIGZsZXgtZ3JvdzogMTtcbn1cblxuLmNhcm91c2VsLWl0ZW0tY29udGVudC5uby1tZWRpYSB7XG4gIHBhZGRpbmc6IDEwcHggMjBweDtcbn1cblxuLmNhcm91c2VsLWl0ZW0tY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICBwYWRkaW5nOiAzcHg7XG4gIC8qRm9yIGNhcm91c2VsIGl0ZW0gc2hhZG93IHRvIGJlIHZpc2libGUqL1xufVxuXG4uY2Fyb3VzZWwtaXRlbS10aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW46IO+/vTAgMCAycHggMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmNhcm91c2VsLWl0ZW0tZGVzYyB7XG4gIGNvbG9yOiBncmF5O1xuICBmb250LXNpemU6IDExcHg7XG4gIG1hcmdpbjogMnB4IDAgMTBweCAwO1xufVxuXG4uY2Fyb3VzZWwtaXRlbS1idXR0b24+YnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiB4LXNtYWxsO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcbn1cblxuLnRleHQtd3JhcCB7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG59XG5cbi5jYXJvdXNlbC1jb250YWluZXI+dGFibGUge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYW5hLXRpdGxlIHtcbiAgcGFkZGluZzogMTBweCAxNXB4O1xuICB6LWluZGV4OiAxMDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMCAwO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwIDA7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwIDA7XG59XG5cbi5hbmEtbWluIC5hbmEtdGl0bGUge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBib3gtc2hhZG93OiAwcHggMXB4IDZweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM2KTtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XG59XG5cbi5hbmEtbG9nbyB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1hcmdpbjogMCAxNXB4IC00cHggMDtcbn1cblxuLmFuYS1sb2dvPmltZyB7XG4gIHdpZHRoOiAzNXB4O1xuICBoZWlnaHQ6IDM1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDAgN3B4IDdweCA3cHg7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMjVweCAzcHggcmdiYSgwLCAwLCAwLCAwLjE5KTtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuXG4uYW5hLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDYzJTtcbn1cblxuLmFuYS1jb250ZW50Pi50aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDE4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFuYS1jb250ZW50Pi5zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgb3BhY2l0eTogMC45O1xufVxuXG4uYW5hLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbG9hdDogcmlnaHQ7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cblxuLmFuYS1hY3Rpb25zIC5hbmEtYWN0aW9uIHtcbiAgb3BhY2l0eTogMC42O1xuICBoZWlnaHQ6IDI0cHg7XG4gIHdpZHRoOiAyNHB4O1xuICBwYWRkaW5nOiA0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYW5hLWFjdGlvbnMgLmFuYS1hY3Rpb246aG92ZXIge1xuICBvcGFjaXR5OiAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5hbmEtYWN0aW9ucyAuYW5hLWFjdGlvbiBzdmcge1xuICBoZWlnaHQ6IDE2cHg7XG4gIHdpZHRoOiAxNnB4O1xufVxuXG4uYW5hLWFjdGlvbnMgLmFuYS1hY3Rpb24gc3ZnIHBhdGgge1xuICBmaWxsOiAjZmZmO1xufVxuXG4uYW5hLWFjdGlvbnMgLmFuYS1hY3Rpb24ucmVmcmVzaCBzdmcge1xuICBoZWlnaHQ6IDE0cHg7XG4gIHdpZHRoOiAxNHB4O1xufVxuXG4uYW5hLW1pbm1heC1idG4ge1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGhlaWdodDogM3B4O1xuICB3aWR0aDogMTVweDtcbiAgb3BhY2l0eTogMC42O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTBweDtcbiAgcmlnaHQ6IDEwcHg7XG59XG5cbi5hbmEtbWluIC5hbmEtbWlubWF4LWJ0biB7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgaGVpZ2h0OiAxMXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgd2lkdGg6IDExcHg7XG59XG5cbi5hbmEtbWluIC5hbmEtbG9nbyB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjJweCk7XG59XG5cbi5hbmEtbWluIC5hbmEtbG9nbz5pbWcge1xuICBib3gtc2hhZG93OiAwcHggMXB4IDZweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM2KTtcbn1cblxuLmlucHV0LW1zZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiA1cHggMTZweDtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogY3JpbXNvbjtcbn1cblxuLnR5cGluZy1pbmRpY2F0b3ItY29udGFpbmVyIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbn1cblxuLnR5cGluZy1pbmRpY2F0b3Ige1xuICB3aWR0aDogYXV0bztcbiAgZGlzcGxheTogdGFibGU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnR5cGluZy1pbmRpY2F0b3Igc3BhbiB7XG4gIGhlaWdodDogNnB4O1xuICB3aWR0aDogNnB4O1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luOiAwIDFweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgb3BhY2l0eTogMC40O1xufVxuXG4udHlwaW5nLWluZGljYXRvciBzcGFuOm50aC1vZi10eXBlKDEpIHtcbiAgLW1vei1hbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuMzMzM3M7XG4gIC1vLWFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC4zMzMzcztcbiAgLXdlYmtpdC1hbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuMzMzM3M7XG4gIGFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC4zMzMzcztcbn1cblxuLnR5cGluZy1pbmRpY2F0b3Igc3BhbjpudGgtb2YtdHlwZSgyKSB7XG4gIC1tb3otYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjY2NjZzO1xuICAtby1hbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuNjY2NnM7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjY2NjZzO1xuICBhbmltYXRpb246IDFzIGJsaW5rIGluZmluaXRlIDAuNjY2NnM7XG59XG5cbi50eXBpbmctaW5kaWNhdG9yIHNwYW46bnRoLW9mLXR5cGUoMykge1xuICAtbW96LWFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC45OTk5cztcbiAgLW8tYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjk5OTlzO1xuICAtd2Via2l0LWFuaW1hdGlvbjogMXMgYmxpbmsgaW5maW5pdGUgMC45OTk5cztcbiAgYW5pbWF0aW9uOiAxcyBibGluayBpbmZpbml0ZSAwLjk5OTlzO1xufVxuXG5ALW1vei1rZXlmcmFtZXMgYmxpbmsge1xuICA1MCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIGJsaW5rIHtcbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYmxpbmsge1xuICA1MCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIGJ1bGdlIHtcbiAgNTAlIHtcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgfVxufVxuXG5ALW1vei1rZXlmcmFtZXMgYnVsZ2Uge1xuICA1MCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYnVsZ2Uge1xuICA1MCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICB9XG59XG5cbi5zY3JvbGxiYXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5zY3JvbGxiYXI6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDVweDtcbiAgaGVpZ2h0OiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uc2Nyb2xsYWJsZTo6LXdlYmtpdC1zY3JvbGxiYXIgKiB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4uc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggIWltcG9ydGFudDtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgLjMpICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgLjMpICFpbXBvcnRhbnQ7XG59XG5cbi5jYXJvdXNlbC1pdGVtLWNvbnRhaW5lcjpmaXJzdC1jaGlsZD4uY2Fyb3VzZWwtaXRlbSB7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4uY2Fyb3VzZWwtaXRlbS1jb250YWluZXI6bGFzdC1jaGlsZD4uY2Fyb3VzZWwtaXRlbSB7XG4gIG1hcmdpbi1yaWdodDogMTZweDtcbn1cblxuLmNhcm91c2VsLWFycm93Pmkge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XG59XG5cbi5hbmEtbGluayB7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLmNoYXQtYm90dG9tLW92ZXJsYXk+aW1nIHtcbiAgaGVpZ2h0OiAxMnB4O1xuICB3aWR0aDogMTJweDtcbn1cblxuLmFuYS1vbmxpbmUtZG90IHtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBoZWlnaHQ6IDZweDtcbiAgd2lkdGg6IDZweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwREY1MDtcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gIG1hcmdpbi10b3A6IDdweDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLmNoYXQtaGlzdG9yeS1sb2FkaW5nIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0ycHg7XG4gIHotaW5kZXg6IDEwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwIC0yMHB4IDAgLTE1cHg7XG59XG5cbi5jaGF0LWhpc3RvcnktbG9hZGluZz5tYXQtcHJvZ3Jlc3Mtc3Bpbm5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiA1MHB4O1xuICB3aWR0aDogNTBweDtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS13aWR0aCA6IDMyMHB4KSBhbmQgKG1heC1kZXZpY2Utd2lkdGggOiA0ODBweCkge1xuICAucm9vdCB7XG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAwO1xuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICB9XG5cbiAgLmFuYS10aXRsZSB7XG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAwO1xuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICB9XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/components/chat-thread/chat-thread.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/chat-thread/chat-thread.component.ts ***!
  \*****************************************************************/
/*! exports provided: ChatThreadComponent, ModelHelpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatThreadComponent", function() { return ChatThreadComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelHelpers", function() { return ModelHelpers; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/ana-chat-vm.models */ "./src/app/models/ana-chat-vm.models.ts");
/* harmony import */ var _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../models/ana-chat.models */ "./src/app/models/ana-chat.models.ts");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _services_chain_delay_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/chain-delay.service */ "./src/app/services/chain-delay.service.ts");
/* harmony import */ var _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/info-dialog.service */ "./src/app/services/info-dialog.service.ts");
/* harmony import */ var _services_simulator_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/simulator.service */ "./src/app/services/simulator.service.ts");
/* harmony import */ var _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/stomp.service */ "./src/app/services/stomp.service.ts");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/utilities.service */ "./src/app/services/utilities.service.ts");













let ChatThreadComponent = class ChatThreadComponent {
    constructor(stompService, apiService, dialog, simulator, sanitizer, infoDialog, chainDelayService) {
        this.stompService = stompService;
        this.apiService = apiService;
        this.dialog = dialog;
        this.simulator = simulator;
        this.sanitizer = sanitizer;
        this.infoDialog = infoDialog;
        this.chainDelayService = chainDelayService;
        this.isMin = false;
        this.isMute = false;
        this.carItemWidth = 245;
        this.fetchingHistory = false;
        this.lastScrollTop = 0;
        this._handleMessageReceivedDelegate = message => {
            if (this.settings &&
                this.settings.stompConfig &&
                this.settings.stompConfig.debug) {
                console.log("Socket Message Received: ");
                console.log(message);
            }
            switch (message.data.type) {
                case _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].INPUT: {
                    this.chainDelayService.delay(queueLength => {
                        this.chatInput.resetInputs(); //Currently only one input item is supported
                        this.chatInput.setInput(new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatInputItemVM"](message));
                        this.chatThread.removeTyping();
                        this.textInputFocus();
                    }, 0);
                    break;
                }
                case _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].SIMPLE:
                case _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].CAROUSEL: {
                    this.chatThread.setTyping();
                    this.chainDelayService.delay(queueLength => {
                        let msg = new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatMessageVM"](message, _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Incoming, "");
                        this.chatThread.addMessage(msg);
                        this.notifyNewMsg();
                        if (message.data.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].CAROUSEL) {
                            let carItemsWithOptions = msg
                                .carouselMessageData()
                                .content.items.filter(x => x.options && x.options.length > 0)
                                .length;
                            if (carItemsWithOptions > 0)
                                //Hide the fixed input textbox if carousel has options
                                this.chatInput.resetInputs();
                        }
                        if (queueLength > 0)
                            this.chatThread.setTyping();
                    }, 2000);
                    break;
                }
                default:
                    console.log(`Unsupported message type: ${_models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"][message.data.type]}`);
            }
        };
        this.MH = new ModelHelpers();
        this.chatThread = new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatThreadVM"](this.sanitizer);
        this.chatInput = new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatInputVM"](this.dialog, this.chatThread, this.apiService, this.stompService, this, this.sanitizer);
    }
    ngAfterViewInit() {
        if (this.chatThreadView)
            this.chatThread.chatThreadView = this.chatThreadView.nativeElement;
    }
    connectionStatusMessage() {
        if (!this.stompService)
            return "";
        switch (this.stompService.connectionStatus) {
            case _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__["StompConnectionStatus"].Connected:
                return "Available";
            case _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__["StompConnectionStatus"].Connecting:
                return "Trying to connect...";
            case _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__["StompConnectionStatus"].Disconnected:
                return "Not available";
            default:
                return "";
        }
    }
    setMin(min) {
        this.isMin = min;
    }
    scrollCarousel(carId, direction) {
        if (this.carouselContainers && this.carouselContainers.length > 0) {
            let carousels = this.carouselContainers
                .map(x => x.nativeElement)
                .filter(x => x.classList.contains(carId));
            if (carousels) {
                let car = carousels[0];
                if (direction == "right") {
                    if (car.scrollBy) {
                        car.scrollBy({ behavior: "smooth", left: this.carItemWidth }); //The 'left' value should be the width + margin of a single carousel item set in the CSS
                    }
                    else {
                        car.scrollLeft += this.carItemWidth;
                    }
                }
                else if (direction == "left") {
                    if (car.scrollBy) {
                        car.scrollBy({ behavior: "smooth", left: -this.carItemWidth });
                    }
                    else {
                        car.scrollLeft -= this.carItemWidth;
                    }
                }
            }
        }
    }
    canScrollCarousel(carId, direction) {
        return true;
        //Below implementation is not accurate.
        //if (this.carouselContainers && this.carouselContainers.length > 0) {
        //    let carousels = this.carouselContainers.map(x => x.nativeElement as HTMLDivElement).filter(x => x.classList.contains(carId));
        //    if (carousels) {
        //        let car = carousels[0];
        //        if (direction == 'right')
        //            return car.scrollLeft < car.scrollWidth;
        //        else if (direction == 'left')
        //            return car.scrollLeft > 0;
        //    }
        //}
    }
    isLastInMessageGroup(msg) {
        let msgsOnly = this.chatThread.messages.filter(x => x.getMessageContentType() != _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageContentType"].Typing);
        let index = msgsOnly.indexOf(msg);
        if (index != -1) {
            if (index >= msgsOnly.length - 1)
                return true;
            if (msgsOnly[index].direction != msgsOnly[index + 1].direction)
                return true;
        }
        return false;
    }
    isLastMessage(msg) {
        let msgsOnly = this.chatThread.messages.filter(x => x.getMessageContentType() != _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageContentType"].Typing);
        let index = msgsOnly.indexOf(msg);
        return index == msgsOnly.length - 1;
    }
    handleCarouselClick(chatMessage, carOption) {
        let carMsg = chatMessage.carouselMessageData();
        if (!carMsg.content.input)
            carMsg.content.input = {
                val: ""
            };
        if (carOption.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["ButtonType"].URL) {
            let v = JSON.parse(carOption.value);
            carMsg.content.input.val = v.value;
            window.open(v.url, "_blank");
        }
        else
            carMsg.content.input.val = carOption.value;
        let msg = this.chatThread.addTextReply(carOption.title, _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["UtilitiesService"].uuidv4());
        this._sendMessageDelegate(new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["ANAChatMessage"]({
            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["UtilitiesService"].getReplyMeta(chatMessage.meta),
            data: carMsg
        }), msg);
        this.chatInput.resetInputs();
    }
    insertThreadMessageForCarouselInput(chatMessage) {
        try {
            let carMsg = chatMessage.carouselMessageData();
            let msg = null;
            carMsg.content.items.forEach(x => {
                try {
                    x.options.forEach(y => {
                        try {
                            let value = "";
                            if (y.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["ButtonType"].URL) {
                                let v = JSON.parse(y.value);
                                value = v.value;
                            }
                            else
                                value = y.value;
                            if (value == carMsg.content.input.val)
                                msg = this.chatThread.addTextReply(y.title, "", chatMessage.meta.timestamp, true);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    });
                }
                catch (e) {
                    console.log(e);
                }
            });
            return msg;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    chatThreadOnScroll(event) {
        if (!this.chatThread.chatThreadView)
            return;
        if (!this.settings || this.settings.simulatorMode)
            return;
        let currentScrollTop = this.chatThread.chatThreadView.scrollTop;
        if (currentScrollTop < this.lastScrollTop) {
            if (this.fetchingHistory)
                return;
            if (this.chatThread.chatThreadView) {
                if (this.chatThread.chatThreadView.scrollTop <= 2) {
                    this.fetchingHistory = true;
                    this.loadHistory(() => (this.fetchingHistory = false));
                }
            }
        }
        this.lastScrollTop = currentScrollTop;
    }
    chatTextInputOnFocus() {
        this.chatThread.scrollLastIntoView(1000);
    }
    textInputFocus() {
        let ele = this.inputContainerRef.nativeElement;
        if (ele) {
            setTimeout(() => {
                let inputEle = ele.querySelector("#chat-text");
                if (inputEle)
                    inputEle.focus();
            }, 100);
        }
    }
    loadHistory(next) {
        if (!this.settings || this.settings.simulatorMode)
            return;
        let oldMsgTimestamp = this.chatThread.messages && this.chatThread.messages.length > 0
            ? this.chatThread.messages[0].meta.timestamp
            : null;
        let oldScrollHeight = null;
        if (this.chatThread.chatThreadView)
            oldScrollHeight = this.chatThread.chatThreadView.scrollHeight;
        this.apiService.fetchHistory(oldMsgTimestamp).subscribe(resp => {
            try {
                let chatMsgs = resp.content.map(x => new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["ANAChatMessage"](x));
                for (let i = 0; i < chatMsgs.length; i++) {
                    let chatMsg = chatMsgs[i];
                    let direction = chatMsg.meta.recipient.id == this.stompService.config.businessId
                        ? _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Outgoing
                        : _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Incoming;
                    switch (chatMsg.data.type) {
                        case _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].CAROUSEL:
                            if (direction == _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Incoming)
                                this.chatThread.addMessage(new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatMessageVM"](chatMsg, direction, ""), true);
                            else if (direction == _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Outgoing)
                                this.insertThreadMessageForCarouselInput(new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatMessageVM"](chatMsg, direction, ""));
                            break;
                        case _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].SIMPLE:
                            if (direction == _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Incoming)
                                //Outgoing messages are never 'SIMPLE',  they are mostly 'INPUT' and rarely 'CAROUSEL'
                                this.chatThread.addMessage(new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatMessageVM"](chatMsg, direction, ""), true);
                            break;
                        case _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].INPUT:
                            if (direction == _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Outgoing) {
                                //Ignore incoming input messages as their outgoing messages will be present (along with user given data).
                                this.chatInput.insertThreadMessageForInput(new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatInputItemVM"](chatMsg));
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (!oldMsgTimestamp) {
                    //Display input and scroll to last only for page 0 of the history (latest page)
                    if (chatMsgs[0] &&
                        chatMsgs[0].data.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"].INPUT) {
                        let inputContent = chatMsgs[0].data
                            .content;
                        if (!inputContent.input ||
                            Object.keys(inputContent.input).length <= 0)
                            this.chatInput.setInput(new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatInputItemVM"](chatMsgs[0]));
                    }
                    this.chatThread.scrollToLast();
                }
                else {
                    if (oldScrollHeight && this.chatThread.chatThreadView) {
                        window.requestAnimationFrame(() => {
                            this.chatThread.chatThreadView.scrollTop =
                                this.chatThread.chatThreadView.scrollHeight - oldScrollHeight;
                        });
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
            if (next)
                next();
        }, err => {
            if (next)
                next();
        });
    }
    removeConsecutiveErrorsMessage() {
        let oldMsgIdx = this.chatThread.messages.findIndex(x => x.messageAckId == _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["Config"].consecutiveErrorsMessageAckId);
        if (oldMsgIdx != -1)
            this.chatThread.messages.splice(oldMsgIdx, 1);
    }
    notifyNewMsg() {
        if (this.settings.appConfig.msgSounds &&
            document.visibilityState != "visible" &&
            !this.isMute) {
            let audio = new Audio("assets/sounds/new-msg.mp3");
            audio.play();
        }
    }
    openWindow(url) {
        if (typeof url == "string")
            window.open(url);
        else if (typeof url == "object") {
            window.open(url.changingThisBreaksApplicationSecurity);
        }
    }
    viewImage(url) {
        this.fullScreenImage = url;
        let imgContainer = document.querySelector("div.img-container");
        let image = document.querySelector("div.img-container>img");
        if (imgContainer && image) {
            image.alt = "";
            image.style.transform = "";
            imgContainer.style.transform = "";
            this.setupImageViewerGestures(imgContainer, image);
        }
    }
    viewVideo(url) {
        this.fullScreenVideo = url;
    }
    closeImageViewer() {
        this.fullScreenImage = null;
        this.destroyHammer();
    }
    closeVideoViewer() {
        this.fullScreenVideo = null;
    }
    destroyHammer() {
        //Hela \m/
        if (this.hammerManager) {
            this.hammerManager.destroy();
            delete this.hammerManager;
        }
    }
    setupImageViewerGestures(imgContainer, image) {
        this.destroyHammer();
        if (!_services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["UtilitiesService"].isMobile()) {
            //Ignore touch handlers if mouse is detected
            return;
        }
        this.hammerManager = new hammerjs__WEBPACK_IMPORTED_MODULE_4__["Manager"](image);
        let pinch = new hammerjs__WEBPACK_IMPORTED_MODULE_4__["Pinch"]();
        let pan = new hammerjs__WEBPACK_IMPORTED_MODULE_4__["Pan"]();
        pinch.recognizeWith(pan);
        this.hammerManager.add([pinch, pan]);
        let adjustScale = 1;
        let adjustDeltaX = 0;
        let adjustDeltaY = 0;
        let currentScale = null;
        let currentDeltaX = null;
        let currentDeltaY = null;
        // Prevent long press saving on mobiles.
        imgContainer.ontouchstart = function (e) {
            e.preventDefault();
        };
        // Handles pinch and pan events/transforming at the same time;
        this.hammerManager.on("pinch pan", function (ev) {
            let transforms = [];
            // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
            currentScale = adjustScale * ev.scale;
            currentDeltaX = adjustDeltaX + ev.deltaX / currentScale;
            currentDeltaY = adjustDeltaY + ev.deltaY / currentScale;
            // Concatinating and applying parameters.
            transforms.push(`scale(${currentScale})`);
            transforms.push(`translate(${currentDeltaX}px,${currentDeltaY}px)`);
            imgContainer.style.transform = transforms.join(" ");
        });
        this.hammerManager.on("panend pinchend", function (ev) {
            // Saving the final transforms for adjustment next time the user interacts.
            adjustScale = currentScale;
            adjustDeltaX = currentDeltaX;
            adjustDeltaY = currentDeltaY;
        });
    }
    getStarted(clearThread, askConfirmation) {
        if (askConfirmation) {
            this.infoDialog.confirm("Start a fresh chat?", "Restarting the chat will clear current chat messages. Are you sure?", ok => {
                if (ok) {
                    this.getStarted(true, false);
                }
            }, "Yes", "No");
            return;
        }
        if (clearThread) {
            this.fetchingHistory = true;
            setTimeout(() => (this.fetchingHistory = false), 1000);
            this.chatThread.messages = [];
            this.chatInput.resetInputs();
        }
        let firstMsg = new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["ANAChatMessage"]({
            meta: {
                sender: {
                    id: this.stompService.config.businessId,
                    medium: 3
                },
                recipient: {
                    id: this.stompService.config.customerId,
                    medium: 3
                },
                senderType: _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["SenderType"].USER,
                flowId: this.stompService.config.flowId,
                previousFlowId: this.stompService.config.flowId,
                currentFlowId: this.stompService.config.flowId,
                timestamp: new Date().getTime()
            },
            data: {
                type: 2,
                content: {
                    inputType: _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["InputType"].OPTIONS,
                    mandatory: 1,
                    options: [
                        {
                            title: "Get Started",
                            value: "GetStarted"
                        }
                    ],
                    input: {
                        val: ""
                    }
                }
            },
            events: [
                {
                    type: _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["EventType"].SET_SESSION_DATA,
                    data: JSON.stringify(_services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["UtilitiesService"].settings.appConfig.initVerbs)
                }
            ]
        });
        let msg = new _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["ChatMessageVM"](firstMsg, _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"].Outgoing, _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["UtilitiesService"].uuidv4()); //Pseudo, not actually added to thread.
        this._sendMessageDelegate(new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["ANAChatMessage"]({
            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["UtilitiesService"].getReplyMeta(firstMsg.meta),
            data: firstMsg.data,
            events: firstMsg.events
        }), msg);
    }
    ngOnInit() {
        this.settings = _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["UtilitiesService"].settings;
        if (this.settings && this.settings.stompConfig) {
            this._sendMessageDelegate = (a, b) => this.stompService.sendMessage(a, b);
            this.stompService.handleMessageReceived = this._handleMessageReceivedDelegate;
            this.stompService.handleConnect = () => {
                if (this.chatThread.messages.length <= 0) {
                    this.getStarted(false, false);
                }
                else {
                    //Retrying all pending messages in the chat thread.
                    this.removeConsecutiveErrorsMessage();
                    let pendingMsgs = this.chatThread.messages.filter(x => x.status == _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["MessageStatus"].SentTimeout ||
                        (x.status == _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["MessageStatus"].SentToServer && x.retrySending));
                    pendingMsgs.forEach(x => x.retrySending());
                }
            };
            this.stompService.handleAck = (messageAckId, deliveredAck) => {
                if (deliveredAck) {
                    //For deliveredAck, msgAckId is the msg.meta.id
                    let msg = this.chatThread.messages.find(x => x.meta.id == messageAckId);
                    if (msg) {
                        msg.status = _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["MessageStatus"].DelieveredToTarget;
                        msg.clearTimeoutTimer();
                    }
                }
                else {
                    let msg = this.chatThread.messages.find(x => x.messageAckId == messageAckId);
                    if (msg) {
                        msg.status = _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["MessageStatus"].ReceivedAtServer;
                        msg.clearTimeoutTimer();
                    }
                }
            };
            this.stompService.handleTyping = () => {
                this.chatThread.setTyping();
            };
            this.stompService.handleConsecutiveErrorsState = () => {
                this.removeConsecutiveErrorsMessage();
                this.chatThread.addTextIncoming(_services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["Config"].consecutiveErrorsMessageText, _services_utilities_service__WEBPACK_IMPORTED_MODULE_12__["Config"].consecutiveErrorsMessageAckId);
            };
            this.loadHistory(() => {
                try {
                    if (window.parent && window.parent.postMessage) {
                        window.parent.postMessage({
                            type: "LOADED"
                        }, "*");
                    }
                }
                catch (e) { }
                this.stompService.connect();
            });
        }
        if (this.settings.simulatorMode) {
            this.fetchingHistory = false;
            this.simulator.handleMessageReceived = this._handleMessageReceivedDelegate;
            this.simulator.handleResetSignal = () => {
                this.chatThread.messages = [];
                this.chatInput.resetInputs();
            };
            this._sendMessageDelegate = (a, b) => this.simulator.sendMessage(a, b);
        }
    }
    carouselItemHasMedia(carItem) {
        return (carItem.media &&
            (carItem.media.type != null || carItem.media.type != undefined) &&
            carItem.media.url);
    }
};
ChatThreadComponent.ctorParameters = () => [
    { type: _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__["StompService"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_7__["APIService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: _services_simulator_service__WEBPACK_IMPORTED_MODULE_10__["SimulatorService"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] },
    { type: _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_9__["InfoDialogService"] },
    { type: _services_chain_delay_service__WEBPACK_IMPORTED_MODULE_8__["ChainDelayService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("inputContainer", { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ChatThreadComponent.prototype, "inputContainerRef", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("chatThreadView", { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ChatThreadComponent.prototype, "chatThreadView", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"])("carouselContainer"),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], ChatThreadComponent.prototype, "carouselContainers", void 0);
ChatThreadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-chat-thread",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chat-thread.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/chat-thread/chat-thread.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chat-thread.component.scss */ "./src/app/components/chat-thread/chat-thread.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_stomp_service__WEBPACK_IMPORTED_MODULE_11__["StompService"],
        _services_api_service__WEBPACK_IMPORTED_MODULE_7__["APIService"],
        _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
        _services_simulator_service__WEBPACK_IMPORTED_MODULE_10__["SimulatorService"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],
        _services_info_dialog_service__WEBPACK_IMPORTED_MODULE_9__["InfoDialogService"],
        _services_chain_delay_service__WEBPACK_IMPORTED_MODULE_8__["ChainDelayService"]])
], ChatThreadComponent);

class ModelHelpers {
    constructor() {
        this.Direction = _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["Direction"];
        this.MessageStatus = _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_5__["MessageStatus"];
        this.MessageType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageType"];
        this.MessageContentType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MessageContentType"];
        this.MediaType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["MediaType"];
        this.InputType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_6__["InputType"];
        this.StompConnectionStatus = _services_stomp_service__WEBPACK_IMPORTED_MODULE_11__["StompConnectionStatus"];
    }
}


/***/ }),

/***/ "./src/app/components/complex-input/complex-input.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/complex-input/complex-input.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field {\n  width: 100%;\n}\n\nagm-map {\n  height: 286px;\n  width: 237px;\n}\n\nmat-list {\n  max-height: 80vh;\n  max-width: 90vh;\n  min-width: 200px;\n}\n\nmat-list-item {\n  margin: 10px -16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90dXJ0dXZzaGluL1Byb2plY3RzL2NoYXRib3RzLm1uL3NpbXVsYXRvci9zcmMvYXBwL2NvbXBvbmVudHMvY29tcGxleC1pbnB1dC9jb21wbGV4LWlucHV0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2NvbXBsZXgtaW5wdXQvY29tcGxleC1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvY29tcGxleC1pbnB1dC9jb21wbGV4LWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWZvcm0tZmllbGQge1xuICB3aWR0aDogMTAwJTtcbn1cblxuYWdtLW1hcCB7XG4gIGhlaWdodDogMjg2cHg7XG4gIHdpZHRoOiAyMzdweDtcbn1cblxubWF0LWxpc3Qge1xuICBtYXgtaGVpZ2h0OiA4MHZoO1xuICBtYXgtd2lkdGg6IDkwdmg7XG4gIG1pbi13aWR0aDogMjAwcHg7XG59XG5cbm1hdC1saXN0LWl0ZW0ge1xuICBtYXJnaW46IDEwcHggLTE2cHg7XG59XG4iLCJtYXQtZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5hZ20tbWFwIHtcbiAgaGVpZ2h0OiAyODZweDtcbiAgd2lkdGg6IDIzN3B4O1xufVxuXG5tYXQtbGlzdCB7XG4gIG1heC1oZWlnaHQ6IDgwdmg7XG4gIG1heC13aWR0aDogOTB2aDtcbiAgbWluLXdpZHRoOiAyMDBweDtcbn1cblxubWF0LWxpc3QtaXRlbSB7XG4gIG1hcmdpbjogMTBweCAtMTZweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/complex-input/complex-input.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/complex-input/complex-input.component.ts ***!
  \*********************************************************************/
/*! exports provided: ComplexInputComponent, ComplexType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplexInputComponent", function() { return ComplexInputComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplexType", function() { return ComplexType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/utilities.service */ "./src/app/services/utilities.service.ts");




let ComplexInputComponent = class ComplexInputComponent {
    constructor(dialogRef, params) {
        this.dialogRef = dialogRef;
        this.params = params;
        this.ComplexType = ComplexType;
        this.givenAddress = {
            area: "",
            city: "",
            country: "",
            line1: "",
            pin: "",
            state: ""
        };
        this.geoLoc = {
            lat: 0.0,
            lng: 0.0
        };
    }
    ngOnInit() {
        if (this.params.Type == ComplexType.Location) {
            if (this.params.DefaultGeoLoc)
                this.geoLoc = this.params.DefaultGeoLoc;
        }
        else if (this.params.Type == ComplexType.List) {
            this.listValues = this.params.ListValues;
            this.listMultiple = this.params.ListMultiple;
        }
        else if (this.params.Type == ComplexType.Time) {
            let date = new Date();
            this.choosenTime = `${_services_utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"].pad(date.getHours(), 2)}:${_services_utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"].pad(date.getMinutes(), 2)}`; //:${UtilitiesService.pad(date.getSeconds(), 2)}
        }
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            if (this.params.Type == ComplexType.Date)
                this.datePicker.open();
        });
    }
    getChoosenANATime() {
        let split = this.choosenTime.split(':');
        return {
            hour: split[0],
            minute: split[1],
            second: (split.length >= 3 ? split[2] : '0')
        };
    }
    getChoosenANADate() {
        return {
            mday: this.choosenDate.getDate().toString(),
            month: (this.choosenDate.getMonth() + 1).toString(),
            year: this.choosenDate.getFullYear().toString()
        };
    }
    mapLocationUpdated(event) {
        this.geoLoc.lat = event.coords.lat;
        this.geoLoc.lng = event.coords.lng;
    }
    choosenListValues() {
        if (this.listMultiple)
            return this.listValues.filter(x => x.isSelected);
        else
            return [this.selectedListItem];
    }
    searchedListValues() {
        if (this.listItemsSearch) {
            return this.listValues.filter(x => x.text && x.text.toLowerCase().includes(this.listItemsSearch.toLowerCase()));
        }
        return this.listValues;
    }
    isValid() {
        switch (this.params.Type) {
            case ComplexType.Address:
                {
                    if (this.givenAddress &&
                        this.givenAddress.area &&
                        this.givenAddress.city &&
                        this.givenAddress.country &&
                        this.givenAddress.line1 &&
                        this.givenAddress.pin &&
                        this.givenAddress.state) {
                        return true;
                    }
                    else
                        return false;
                }
            case ComplexType.Date:
                {
                    if (this.choosenDate)
                        return true;
                    else
                        return false;
                }
            case ComplexType.Time:
                {
                    if (this.choosenTime)
                        return true;
                    else
                        return false;
                }
            case ComplexType.List:
                {
                    if (this.listMultiple) {
                        if (this.choosenListValues() && this.choosenListValues().length > 0)
                            return true;
                        else
                            return false;
                    }
                    else {
                        return this.selectedListItem != null;
                    }
                }
            case ComplexType.Location:
                {
                    if (this.geoLoc)
                        return true;
                    else
                        return false;
                }
            default:
                return true;
        }
    }
    dialogClose() {
        this.dialogRef.close(true);
    }
};
ComplexInputComponent.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("datePicker", { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepicker"])
], ComplexInputComponent.prototype, "datePicker", void 0);
ComplexInputComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-complex-input',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./complex-input.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/complex-input/complex-input.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./complex-input.component.scss */ "./src/app/components/complex-input/complex-input.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
], ComplexInputComponent);

var ComplexType;
(function (ComplexType) {
    ComplexType[ComplexType["Date"] = 0] = "Date";
    ComplexType[ComplexType["Time"] = 1] = "Time";
    ComplexType[ComplexType["Location"] = 2] = "Location";
    ComplexType[ComplexType["Address"] = 3] = "Address";
    ComplexType[ComplexType["List"] = 4] = "List";
})(ComplexType || (ComplexType = {}));


/***/ }),

/***/ "./src/app/components/info-dialog/info-dialog.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/components/info-dialog/info-dialog.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-dialog-actions {\n  justify-content: center;\n}\n\nmat-form-field {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90dXJ0dXZzaGluL1Byb2plY3RzL2NoYXRib3RzLm1uL3NpbXVsYXRvci9zcmMvYXBwL2NvbXBvbmVudHMvaW5mby1kaWFsb2cvaW5mby1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvaW5mby1kaWFsb2cvaW5mby1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1QkFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9pbmZvLWRpYWxvZy9pbmZvLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1kaWFsb2ctYWN0aW9ucyB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5tYXQtZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAxMDAlXG59XG4iLCJtYXQtZGlhbG9nLWFjdGlvbnMge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxubWF0LWZvcm0tZmllbGQge1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/info-dialog/info-dialog.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/info-dialog/info-dialog.component.ts ***!
  \*****************************************************************/
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
                    this.primaryButtonText = this.options.primaryButton || "OK";
                    this.secondaryButtonText = this.options.secondaryButton || "Cancel";
                }
                break;
            case InfoDialogType.Prompt:
                {
                    this.inputText = options.defaultInputText;
                    this.primaryButtonText = this.options.primaryButton || "Done";
                    this.secondaryButtonText = this.options.secondaryButton || "Cancel";
                }
                break;
            case InfoDialogType.Alert:
            default:
                {
                    this.secondaryButtonText = this.options.primaryButton || "Close"; //Primary button plays as the text for secondaryButton here.
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
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./info-dialog.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/info-dialog/info-dialog.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./info-dialog.component.scss */ "./src/app/components/info-dialog/info-dialog.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
], InfoDialogComponent);

var InfoDialogType;
(function (InfoDialogType) {
    InfoDialogType[InfoDialogType["Prompt"] = 0] = "Prompt";
    InfoDialogType[InfoDialogType["Alert"] = 1] = "Alert";
    InfoDialogType[InfoDialogType["Confirm"] = 2] = "Confirm";
})(InfoDialogType || (InfoDialogType = {}));


/***/ }),

/***/ "./src/app/models/ana-chat-vm.models.ts":
/*!**********************************************!*\
  !*** ./src/app/models/ana-chat-vm.models.ts ***!
  \**********************************************/
/*! exports provided: Direction, MessageStatus, ChatMessageVM, ChatThreadVM, ChatInputItemVM, ChatInputVM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageStatus", function() { return MessageStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatMessageVM", function() { return ChatMessageVM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatThreadVM", function() { return ChatThreadVM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatInputItemVM", function() { return ChatInputItemVM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatInputVM", function() { return ChatInputVM; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/complex-input/complex-input.component */ "./src/app/components/complex-input/complex-input.component.ts");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");
/* harmony import */ var _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ana-chat.models */ "./src/app/models/ana-chat.models.ts");




var Direction;
(function (Direction) {
    Direction[Direction["Incoming"] = 0] = "Incoming";
    Direction[Direction["Outgoing"] = 1] = "Outgoing";
})(Direction || (Direction = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus[MessageStatus["None"] = 0] = "None";
    MessageStatus[MessageStatus["SentToServer"] = 1] = "SentToServer";
    MessageStatus[MessageStatus["ReceivedAtServer"] = 2] = "ReceivedAtServer";
    MessageStatus[MessageStatus["SentTimeout"] = 3] = "SentTimeout";
    MessageStatus[MessageStatus["DelieveredToTarget"] = 4] = "DelieveredToTarget";
})(MessageStatus || (MessageStatus = {}));
class ChatMessageVM {
    startTimeoutTimer() {
        this.timeoutTimer = setTimeout(() => {
            if (this.status == MessageStatus.SentToServer)
                this.status = MessageStatus.SentTimeout;
        }, 2000);
    }
    clearTimeoutTimer() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = undefined;
    }
    executeRetry() {
        if (this.retrySending)
            this.retrySending();
    }
    simpleMessageData() {
        return this.messageData;
    }
    carouselMessageData() {
        return this.messageData;
    }
    getMessageContentType() {
        if (this.messageData.type == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageType"].SIMPLE) {
            var simple = this.simpleMessageData();
            if (simple.content.typing)
                return _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageContentType"].Typing;
            if (simple.content.media)
                return _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageContentType"].Media;
            else if (simple.content.text)
                return _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageContentType"].Text;
            else
                return null;
        }
        return null;
    }
    isToday() {
        return this.time.toDateString() == (new Date()).toDateString();
    }
    constructor(chatMessage, direction, ackId, status) {
        this.direction = direction;
        this.time = new Date(chatMessage.meta.timestamp);
        this.meta = chatMessage.meta;
        this.messageData = chatMessage.data;
        this.status = status || MessageStatus.None;
        this.messageAckId = ackId;
    }
}
class ChatThreadVM {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.messages = [];
    }
    addTextIncoming(text, ackId) {
        let msg = new ChatMessageVM(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
            "meta": {
                "timestamp": new Date().getTime(),
            },
            "data": {
                "type": _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageType"].SIMPLE,
                "content": {
                    "text": text,
                }
            }
        }), Direction.Incoming, ackId);
        this.addMessage(msg);
        return msg;
    }
    addTextReply(text, ackId, timestamp, insert = false) {
        if (!text)
            return null;
        let msg = new ChatMessageVM(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
            "meta": {
                "timestamp": timestamp || new Date().getTime(),
            },
            "data": {
                "type": _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageType"].SIMPLE,
                "content": {
                    "text": text,
                }
            }
        }), Direction.Outgoing, ackId);
        this.addMessage(msg, insert);
        return msg;
    }
    setTyping(autohide) {
        if (this.typingTimerId)
            clearTimeout(this.typingTimerId);
        this.removeTyping();
        let msg = new ChatMessageVM(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
            "meta": {
                "timestamp": new Date().getTime(),
            },
            "data": {
                "type": _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageType"].SIMPLE,
                "content": {
                    "typing": true
                }
            }
        }), Direction.Incoming, '');
        this.addMessage(msg);
        if (autohide) {
            this.typingTimerId = setTimeout(() => {
                this.removeTyping();
            }, 1000);
        }
    }
    removeTyping() {
        let index = this.messages.findIndex(x => x.getMessageContentType() == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageContentType"].Typing);
        if (index != -1) {
            this.messages.splice(index, 1);
            if (this.typingTimerId)
                clearTimeout(this.typingTimerId);
        }
    }
    addMediaReply(media, text = '', ackId, timestamp, insert = false) {
        let msg = new ChatMessageVM(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
            "meta": {
                "timestamp": timestamp || new Date().getTime(),
            },
            "data": {
                "type": _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageType"].SIMPLE,
                "content": {
                    "text": text,
                    "media": media,
                }
            }
        }), Direction.Outgoing, ackId);
        this.addMessage(msg, insert);
        return msg;
    }
    addMessage(chatMsgVM, insert = false) {
        if (_services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].settings.simulatorMode) {
            let simpleData = chatMsgVM.simpleMessageData();
            if (simpleData.content.media && simpleData.content.media.url)
                simpleData.content.media.url = this.sanitizer.bypassSecurityTrustUrl(simpleData.content.media.url);
        }
        if (!insert)
            this.removeTyping();
        if (!chatMsgVM.meta.id || this.messages.findIndex(x => x.meta.id == chatMsgVM.meta.id) == -1) { //Not allowing duplicate messages, if meta.id is set
            if (insert)
                this.messages.unshift(chatMsgVM);
            else
                this.messages.push(chatMsgVM);
        }
        //Sorting the messages based on timestamp. Currently disabled.
        //this.messages.sort((x, y) => x.meta.timestamp - y.meta.timestamp);
        if (!insert)
            this.scrollLastIntoView();
    }
    scrollLastIntoView(t = 100) {
        if (this.chatThreadView)
            setTimeout(() => this.chatThreadView.children.item(this.chatThreadView.children.length - 1).scrollIntoView({ behavior: 'smooth' }), t);
    }
    scrollToLast() {
        if (this.chatThreadView)
            window.requestAnimationFrame(() => this.chatThreadView.scrollTo({ top: this.chatThreadView.scrollHeight, behavior: 'smooth' }));
    }
}
class ChatInputItemVM {
    textInputContent() {
        return this.content;
    }
    constructor(message) {
        this.data = message.data;
        this.content = message.inputData().content;
        if (!this.content.input)
            this.content.input = {};
        this.meta = message.meta;
        this.disabled = false;
    }
}
class ChatInputVM {
    constructor(dialog, chatThread, apiService, stomp, chatThreadComponent, sanitizer) {
        this.dialog = dialog;
        this.chatThread = chatThread;
        this.apiService = apiService;
        this.stomp = stomp;
        this.chatThreadComponent = chatThreadComponent;
        this.sanitizer = sanitizer;
        this.textInput = undefined;
        this.clickInput = undefined;
    }
    insertThreadMessageForInput(inputVM) {
        let ackId = "";
        let timestamp = inputVM.meta.timestamp;
        switch (inputVM.content.inputType) {
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TEXT:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].EMAIL:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].PHONE:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].NUMERIC:
                {
                    let modifieldInputContent = inputVM.content;
                    return this.chatThread.addTextReply(modifieldInputContent.input.val, ackId, timestamp, true);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].ADDRESS:
                {
                    let modifieldInputContent = inputVM.content;
                    let userAddressInput = modifieldInputContent.input.address;
                    return this.chatThread.addTextReply(`${[userAddressInput.line1, userAddressInput.area, userAddressInput.city, userAddressInput.state, userAddressInput.country, userAddressInput.pin].filter(x => x).join(", ")}`, ackId, timestamp, true);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].LOCATION:
                {
                    let locInputData = inputVM.content;
                    let gMapUrl = _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].googleMapsStaticLink(locInputData.input.location);
                    return this.chatThread.addMediaReply({
                        previewUrl: gMapUrl,
                        type: _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MediaType"].IMAGE,
                        url: gMapUrl
                    }, "Location", ackId, timestamp, true);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].MEDIA:
                {
                    let mediaInputContent = inputVM.content;
                    if (mediaInputContent && mediaInputContent.input.media) {
                        let asset = mediaInputContent.input.media[0];
                        let media = {
                            previewUrl: asset.previewUrl,
                            type: asset.type,
                            url: asset.url
                        };
                        return this.chatThread.addMediaReply(media, '', ackId, timestamp, true);
                    }
                    return null;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].LIST:
                {
                    let listInputContent = inputVM.content;
                    let selectedValues = listInputContent.input.val.split(',');
                    let selectedListItems = listInputContent.values.filter(x => selectedValues.indexOf(x.value) != -1);
                    return this.chatThread.addTextReply(selectedListItems.map(x => x.text).join(', '), ackId, timestamp, true);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TIME:
                {
                    let timeContent = inputVM.content;
                    let displayTime = _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].anaTimeDisplay(timeContent.input.time);
                    return this.chatThread.addTextReply(displayTime, ackId, timestamp, true);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].DATE:
                {
                    let dateContent = inputVM.content;
                    let displayDate = _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].anaDateDisplay(dateContent.input.date);
                    return this.chatThread.addTextReply(displayDate, ackId, timestamp, true);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].OPTIONS:
                {
                    let optionInputContent = inputVM.content;
                    let selectedOption = optionInputContent.options.find(x => x.value == optionInputContent.input.val);
                    if (selectedOption)
                        return this.chatThread.addTextReply(selectedOption.title, ackId, timestamp, true);
                    return null;
                }
            default:
                console.log(`Unsupported button type: ${inputVM.content.inputType}`);
                break;
        }
    }
    setInput(chatInputItemVM) {
        if (this.textInput)
            this.textInput.disabled = true;
        if (this.inputCategory(chatInputItemVM) == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputCategory"].Text) {
            let a = chatInputItemVM.content;
            if (a.textInputAttr && a.textInputAttr.defaultText)
                a.input.val = a.textInputAttr.defaultText;
            this.textInput = chatInputItemVM;
        }
        else if (this.inputCategory(chatInputItemVM) == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputCategory"].Click) {
            this.clickInput = chatInputItemVM;
            if (chatInputItemVM.content.mandatory == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["Bool"].FALSE) {
                this.textInput = this.textInputForNonMandatoryCase(chatInputItemVM.meta);
            }
            else
                this.textInput = undefined;
        }
        this.chatThread.scrollLastIntoView(300);
    }
    textInputForNonMandatoryCase(srcMeta) {
        let anaMeta = {
            id: "",
            sender: {
                id: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].settings.stompConfig ? _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].settings.stompConfig.businessId : _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["Config"].simulatorBusinessId,
                medium: 3,
            },
            recipient: {
                id: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].settings.stompConfig ? _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].settings.stompConfig.customerId : _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["Config"].simulatorCustomerId,
                medium: 3
            },
            responseTo: srcMeta ? srcMeta.id : '',
            senderType: _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["SenderType"].USER,
            sessionId: srcMeta ? srcMeta.sessionId : '',
            flowId: srcMeta.flowId,
            currentFlowId: srcMeta.currentFlowId,
            previousFlowId: srcMeta.previousFlowId,
            timestamp: srcMeta ? srcMeta.timestamp : new Date().getTime()
        };
        let input = new ChatInputItemVM(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
            meta: anaMeta,
            data: {
                type: _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MessageType"].INPUT,
                content: {
                    inputType: 0,
                    mandatory: 1,
                    textInputAttr: {
                        multiLine: 1,
                        minLength: 0,
                        maxLength: 400,
                        defaultText: "",
                        placeHolder: "Type a message..."
                    },
                    input: {
                        val: "",
                    }
                }
            }
        }));
        return input;
    }
    clickInputTitle() {
        if (this.clickInput) {
            try {
                if (this.clickInput.content.inputType == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].MEDIA)
                    return 'Choose ' + _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MediaType"][this.clickInput.content.mediaType].toLowerCase();
                if (this.clickInput.content.inputType == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].LIST) {
                    if (this.clickInput.content.multiple)
                        return 'Choose';
                    else
                        return 'Choose an option';
                }
                return 'Choose ' + _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"][this.clickInput.content.inputType].toLowerCase();
            }
            catch (e) {
                return 'Choose';
            }
        }
        else
            return "Choose";
    }
    inputCategory(inputVM) {
        switch (inputVM.content.inputType) {
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TEXT:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].EMAIL:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].NUMERIC:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].PHONE:
                return _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputCategory"].Text;
            default:
                return _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputCategory"].Click;
        }
    }
    handleClick(inputVM) {
        if (!this.isInputValid(inputVM)) {
            let errorMsg = this.inputErrorMsg(inputVM);
            let lastMsg = this.chatThread.messages[this.chatThread.messages.length - 1];
            if (lastMsg.direction == Direction.Incoming && lastMsg.messageAckId == "ERROR_MSG" && lastMsg.simpleMessageData().content.text == errorMsg)
                return; //Skip if already error message is added with the same msg text.
            //alert(this.inputErrorMsg(inputVM));
            switch (inputVM.content.inputType) {
                case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TEXT:
                case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].EMAIL:
                case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].PHONE:
                case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].NUMERIC:
                    {
                        let modifieldInputContent = inputVM.content;
                        this.chatThread.addTextReply(modifieldInputContent.input.val, "");
                        break;
                    }
            }
            this.chatThread.addTextIncoming(errorMsg, "ERROR_MSG");
            return;
        }
        let ackId = _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].uuidv4();
        switch (inputVM.content.inputType) {
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TEXT:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].EMAIL:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].PHONE:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].NUMERIC:
                {
                    this.resetInputs();
                    let modifieldInputContent = inputVM.content;
                    let msg = this.chatThread.addTextReply(modifieldInputContent.input.val, ackId);
                    this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
                        meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputVM.meta),
                        data: { type: inputVM.data.type, content: modifieldInputContent }
                    }), msg);
                    break;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].ADDRESS:
                {
                    let modifieldInputContent = inputVM.content;
                    let dialogRef = this.dialog.open(_components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexInputComponent"], {
                        width: 'auto',
                        data: {
                            Type: _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexType"].Address
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        let userAddressInput = dialogRef.componentInstance.givenAddress;
                        let msg = this.chatThread.addTextReply(`${_services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].anaAddressDisplay(userAddressInput)}`, ackId);
                        modifieldInputContent.input = {
                            address: userAddressInput
                        };
                        this.resetInputs();
                        this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
                            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: modifieldInputContent }
                        }), msg);
                    });
                    break;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].LOCATION:
                {
                    let locInputData = inputVM.content;
                    let geoLoc = locInputData.defaultLocation;
                    if (!geoLoc) {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((pos) => {
                                let loc = {
                                    lat: pos.coords.latitude,
                                    lng: pos.coords.longitude
                                };
                                this.showLocationPickerDialog(locInputData, inputVM.meta, inputVM.data.type, ackId, loc);
                            }, err => {
                                this.showLocationPickerDialog(locInputData, inputVM.meta, inputVM.data.type, ackId);
                            });
                        }
                    }
                    else
                        this.showLocationPickerDialog(locInputData, inputVM.meta, inputVM.data.type, ackId, geoLoc);
                    break;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].MEDIA:
                {
                    let mediaInputContent = inputVM.content;
                    let input = document.createElement('input');
                    input.type = 'file';
                    if (mediaInputContent.mediaType != _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MediaType"].FILE)
                        input.accept = `${_ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MediaType"][mediaInputContent.mediaType]}/*`;
                    input.multiple = false;
                    input.onchange = () => {
                        if (input.files) {
                            let f = input.files[0];
                            if (!_services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].settings.simulatorMode) {
                                this.apiService.uploadFile(f).subscribe(resp => {
                                    if (resp.links)
                                        this.sendReplyAfterFileUpload(resp.links[0].href, f.type, mediaInputContent, ackId, inputVM);
                                    else
                                        alert("Error occurred while sending the file!");
                                }, err => {
                                    alert("Unable to send file!");
                                });
                            }
                            else {
                                let mediaBlob = new Blob([f], {
                                    type: f.type
                                });
                                let mediaBlobUrl = URL.createObjectURL(mediaBlob);
                                this.sendReplyAfterFileUpload(mediaBlobUrl, f.type, mediaInputContent, ackId, inputVM);
                            }
                        }
                    };
                    input.click();
                    break;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].LIST:
                {
                    let listInputContent = inputVM.content;
                    let dialogRef = this.dialog.open(_components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexInputComponent"], {
                        width: 'auto',
                        data: {
                            Type: _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexType"].List,
                            ListValues: listInputContent.values,
                            ListMultiple: listInputContent.multiple
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        this.resetInputs();
                        let selectedListItems = dialogRef.componentInstance.choosenListValues();
                        let msg = this.chatThread.addTextReply(selectedListItems.map(x => x.text).join(', '), ackId);
                        listInputContent.input.val = selectedListItems.map(x => x.value).join(',');
                        this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
                            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: listInputContent }
                        }), msg);
                    });
                    break;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TIME:
                {
                    let timeContent = inputVM.content;
                    let dialogRef = this.dialog.open(_components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexInputComponent"], {
                        width: 'auto',
                        data: {
                            Type: _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexType"].Time
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        this.resetInputs();
                        let userInputTime = dialogRef.componentInstance.getChoosenANATime();
                        let displayTime = _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].anaTimeDisplay(userInputTime);
                        let msg = this.chatThread.addTextReply(displayTime, ackId);
                        timeContent.input = { time: userInputTime };
                        this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
                            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: timeContent }
                        }), msg);
                    });
                    break;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].DATE:
                {
                    let dateContent = inputVM.content;
                    let dialogRef = this.dialog.open(_components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexInputComponent"], {
                        width: 'auto',
                        data: {
                            Type: _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexType"].Date
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        this.resetInputs();
                        let userInputDate = dialogRef.componentInstance.getChoosenANADate();
                        let displayDate = _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].anaDateDisplay(userInputDate);
                        let msg = this.chatThread.addTextReply(displayDate, ackId);
                        dateContent.input = { date: userInputDate };
                        this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
                            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: dateContent }
                        }), msg);
                    });
                    break;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].OPTIONS:
                {
                    this.resetInputs();
                    let optionInputContent = inputVM.content;
                    let msg = this.chatThread.addTextReply(optionInputContent.input.title, ackId);
                    this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
                        meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputVM.meta),
                        data: { type: inputVM.data.type, content: optionInputContent }
                    }), msg);
                    break;
                }
            default:
                console.log(`Unsupported button type: ${inputVM.content.inputType}`);
                break;
        }
    }
    handleKeyPress(inputVM, event) {
        if (event.keyCode == 13) //Enter key
         {
            if (this.inputCategory(inputVM) == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputCategory"].Text) {
                if (inputVM.textInputContent().input.val)
                    this.handleClick(inputVM);
            }
            else
                this.handleClick(inputVM);
        }
        else {
            this.stomp.sendTypingMessage(inputVM.meta);
        }
    }
    handleBtnOptionClick(inputVM, optionVal) {
        if (inputVM.content.inputType == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].OPTIONS) {
            let x = inputVM.content;
            let option = x.options.find(y => y.value == optionVal);
            if (!option) {
                alert('Invalid option!');
                return;
            }
            if (option.type == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ButtonType"].URL) {
                let v = JSON.parse(option.value);
                x.input.val = v.value;
                window.open(v.url, '_blank');
            }
            if (option.type == _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ButtonType"].DEEPLINK) {
                let v = JSON.parse(option.value);
                x.input.val = v.value;
                try {
                    if (window.parent && window.parent.postMessage) {
                        window.parent.postMessage({
                            type: "DEEPLINK",
                            payload: v.url
                        }, "*");
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            else
                x.input.val = option.value;
            x.input.title = option.title;
        }
        this.handleClick(inputVM);
    }
    htmlInputType(inputVM) {
        switch (inputVM.content.inputType) {
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TEXT:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].PHONE:
                return 'text';
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].EMAIL:
                return 'email';
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].NUMERIC:
                return 'number';
            default:
                return 'text';
        }
    }
    isInputValid(inputVM) {
        switch (inputVM.content.inputType) {
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TEXT:
                {
                    let x = inputVM.content;
                    if (!x.input.val)
                        return false;
                    if (x.textInputAttr) {
                        if (x.textInputAttr.minLength > 0 && x.input.val.length < x.textInputAttr.minLength)
                            return false;
                        if (x.textInputAttr.maxLength > 0 && x.input.val.length > x.textInputAttr.maxLength)
                            return false;
                    }
                    return true;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].EMAIL:
                {
                    let x = inputVM.content;
                    return x.input.val && x.input.val.match(_services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["Config"].emailRegex);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].PHONE:
                {
                    let x = inputVM.content;
                    return x.input.val && x.input.val.match(_services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["Config"].phoneRegex);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].NUMERIC:
                {
                    let x = inputVM.content;
                    return x.input.val && x.input.val.match(_services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["Config"].numberRegex);
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].ADDRESS:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].LOCATION:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].MEDIA:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].LIST:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TIME:
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].DATE:
                {
                    //These are validated in the complex input dialog itself.
                    return true;
                }
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].OPTIONS:
                {
                    let x = inputVM.content;
                    return x.input.val;
                }
            default:
                console.log(`Unsupported button type: ${inputVM.content.inputType}`);
                break;
        }
    }
    inputErrorMsg(inputVM) {
        switch (inputVM.content.inputType) {
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].EMAIL:
                return 'Please give a valid email address';
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].NUMERIC:
                return 'Please give a valid number';
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].PHONE:
                return 'Please give a valid phone number';
            case _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["InputType"].TEXT:
                {
                    let c = inputVM.textInputContent();
                    if (!c.input.val)
                        return "The value cannot be empty";
                    if (c.input.val && c.input.val.length < c.textInputAttr.minLength)
                        return `Minimum ${c.textInputAttr.minLength} characters required.`;
                    else if (c.input.val && c.input.val.length > c.textInputAttr.maxLength)
                        return `Maximum ${c.textInputAttr.maxLength} characters allowed.`;
                }
            default:
                return 'The value cannot be empty!';
        }
    }
    resetInputs() {
        this.textInput = undefined;
        this.clickInput = undefined;
    }
    showLocationPickerDialog(locInputContent, inputMeta, inputMessageType, ackId, defaultLoc) {
        let dialogRef = this.dialog.open(_components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexInputComponent"], {
            width: 'auto',
            data: {
                Type: _components_complex_input_complex_input_component__WEBPACK_IMPORTED_MODULE_1__["ComplexType"].Location,
                DefaultGeoLoc: defaultLoc
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != true)
                return;
            this.resetInputs();
            let userInputLoc = dialogRef.componentInstance.geoLoc;
            let gMapUrl = _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].googleMapsStaticLink(userInputLoc);
            let msg = this.chatThread.addMediaReply({
                previewUrl: gMapUrl,
                type: _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["MediaType"].IMAGE,
                url: gMapUrl
            }, "Location", ackId);
            locInputContent.input = { location: userInputLoc };
            this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
                meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputMeta),
                data: { type: inputMessageType, content: locInputContent }
            }), msg);
        });
    }
    sendReplyAfterFileUpload(assetUrl, assetType, mediaInputContent, ackId, inputVM) {
        let media = {
            previewUrl: assetUrl,
            type: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getAnaMediaTypeFromMIMEType(assetType),
            url: assetUrl
        };
        let msg = this.chatThread.addMediaReply(media, '', ackId);
        mediaInputContent.input = { media: [media] };
        this.resetInputs();
        this.chatThreadComponent._sendMessageDelegate(new _ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"]({
            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].getReplyMeta(inputVM.meta),
            data: { type: inputVM.data.type, content: mediaInputContent }
        }), msg);
    }
}


/***/ }),

/***/ "./src/app/models/ana-chat.models.ts":
/*!*******************************************!*\
  !*** ./src/app/models/ana-chat.models.ts ***!
  \*******************************************/
/*! exports provided: InputType, EventType, SenderType, MediaType, ButtonType, MessageType, Bool, InputCategory, MessageContentType, ANAChatMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputType", function() { return InputType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventType", function() { return EventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderType", function() { return SenderType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaType", function() { return MediaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonType", function() { return ButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bool", function() { return Bool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputCategory", function() { return InputCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageContentType", function() { return MessageContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANAChatMessage", function() { return ANAChatMessage; });
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
var EventType;
(function (EventType) {
    EventType[EventType["SET_SESSION_DATA"] = 21] = "SET_SESSION_DATA";
    EventType[EventType["TYPING"] = 11] = "TYPING";
    EventType[EventType["ACK"] = 13] = "ACK";
})(EventType || (EventType = {}));
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
    ButtonType[ButtonType["DEEPLINK"] = 3] = "DEEPLINK";
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
class ANAChatMessage {
    constructor(rawMessage) {
        this.events = [];
        this.raw = rawMessage;
        this.meta = this.raw.meta;
        this.data = this.raw.data;
        this.events = this.raw.events;
    }
    simpleData() {
        return this.data;
    }
    carouselData() {
        return this.data;
    }
    inputData() {
        return this.data;
    }
    extract() {
        return {
            meta: this.meta,
            data: this.data,
            events: this.events
        };
    }
}


/***/ }),

/***/ "./src/app/models/google-maps-config.model.ts":
/*!****************************************************!*\
  !*** ./src/app/models/google-maps-config.model.ts ***!
  \****************************************************/
/*! exports provided: GoogleMapsConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleMapsConfig", function() { return GoogleMapsConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");



let GoogleMapsConfig = class GoogleMapsConfig {
    constructor(utils) {
        _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"].googleMapsConfigRef = this;
    }
};
GoogleMapsConfig.ctorParameters = () => [
    { type: _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"] }
];
GoogleMapsConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"]])
], GoogleMapsConfig);



/***/ }),

/***/ "./src/app/services/api.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/*! exports provided: APIService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIService", function() { return APIService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");




let APIService = class APIService {
    constructor(http) {
        this.http = http;
    }
    setAPIEndpoint(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        if (this.apiEndpoint && !this.apiEndpoint.endsWith('/'))
            this.apiEndpoint += "/";
        if (!this.fileUploadEndpoint)
            this.fileUploadEndpoint = this.apiEndpoint + "files";
        this.chatHistoryEndpoint = this.apiEndpoint + "chatdata/messages?userId={userId}&businessId={businessId}&flowId={flowId}&size={size}&page=0&ofCurrentSession={ofCurrentSession}";
    }
    uploadFile(file) {
        let formData = new FormData();
        formData.append("file", file);
        return this.http.post(this.fileUploadEndpoint, formData);
    }
    fetchHistory(oldestMsgTimestamp, size = 20) {
        let businessId = _services_utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"].settings.stompConfig.businessId;
        let customerId = _services_utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"].settings.stompConfig.customerId;
        let flowId = _services_utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"].settings.stompConfig.flowId;
        let currentSessionOnly = _services_utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"].settings.stompConfig.currentSessionOnly;
        let api = this.chatHistoryEndpoint
            .replace('{userId}', customerId)
            .replace('{businessId}', businessId)
            .replace('{size}', size.toString())
            .replace('{flowId}', flowId)
            .replace('{ofCurrentSession}', currentSessionOnly ? 'true' : 'false');
        if (oldestMsgTimestamp)
            api += "&lastMessageTimeStamp=" + oldestMsgTimestamp.toString();
        return this.http.get(api);
    }
};
APIService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
APIService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], APIService);



/***/ }),

/***/ "./src/app/services/chain-delay.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/chain-delay.service.ts ***!
  \*************************************************/
/*! exports provided: ChainDelayService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainDelayService", function() { return ChainDelayService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ChainDelayService = class ChainDelayService {
    constructor() {
        this.queue = [];
    }
    schedule(fn, t) {
        this.timer = setTimeout(() => {
            this.timer = null;
            fn(this.queue.length);
            if (this.queue.length) {
                let item = this.queue.shift();
                this.schedule(item.fn, item.t);
            }
        }, t);
    }
    ;
    delay(fn, t) {
        // if already queuing things or running a timer, 
        //   then just add to the queue
        if (this.queue.length || this.timer) {
            this.queue.push({ fn: fn, t: t });
        }
        else {
            // no queue or timer yet, so schedule the timer
            this.schedule(fn, t);
        }
    }
    ;
    cancel() {
        clearTimeout(this.timer);
        this.queue = [];
    }
    ;
};
ChainDelayService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ChainDelayService);



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
/* harmony import */ var _components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/info-dialog/info-dialog.component */ "./src/app/components/info-dialog/info-dialog.component.ts");




let InfoDialogService = class InfoDialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    alert(title, message, callback, primaryButton, secondaryButton) {
        let data = {
            dialogType: _components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogType"].Alert,
            message: message,
            title: title,
            primaryButton: primaryButton,
            secondaryButton: secondaryButton
        };
        let d = this.dialog.open(_components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogComponent"], {
            width: 'auto',
            data: data
        });
        if (callback)
            d.afterClosed().subscribe(x => {
                if (callback)
                    callback();
            });
    }
    prompt(title, message, callback, defaultText, primaryButton, secondaryButton) {
        let data = {
            dialogType: _components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogType"].Prompt,
            message: message,
            title: title,
            defaultInputText: defaultText,
            primaryButton: primaryButton,
            secondaryButton: secondaryButton
        };
        let d = this.dialog.open(_components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogComponent"], {
            width: 'auto',
            data: data
        });
        d.afterClosed().subscribe(x => {
            callback(x);
        });
    }
    confirm(title, message, callback, primaryButton, secondaryButton) {
        let data = {
            dialogType: _components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogType"].Confirm,
            message: message,
            title: title,
            primaryButton: primaryButton,
            secondaryButton: secondaryButton
        };
        let d = this.dialog.open(_components_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__["InfoDialogComponent"], {
            width: 'auto',
            data: data
        });
        d.afterClosed().subscribe(x => {
            callback(x);
        });
    }
};
InfoDialogService.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
InfoDialogService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], InfoDialogService);



/***/ }),

/***/ "./src/app/services/mat-css.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/mat-css.service.ts ***!
  \*********************************************/
/*! exports provided: MatCSSService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatCSSService", function() { return MatCSSService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let MAT_CSS = __webpack_require__(/*! ../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css */ "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css");
let MatCSSService = class MatCSSService {
    constructor() { }
    loadCustomMatTheme(accent, customStyle, appCSS) {
        let c1 = /#3f51b5/g;
        let c2 = /#ff4081/g;
        let c3 = /#f44336/g;
        //Replacing mat default theme colors with the requested accent color
        let resultCSS = MAT_CSS.replace(c1, accent).replace(c2, accent).replace(c3, accent) + "\r\n" + appCSS;
        customStyle.innerHTML = resultCSS;
    }
};
MatCSSService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], MatCSSService);



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
/* harmony import */ var _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/ana-chat-vm.models */ "./src/app/models/ana-chat-vm.models.ts");
/* harmony import */ var _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/ana-chat.models */ "./src/app/models/ana-chat.models.ts");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");






let SimulatorService = class SimulatorService {
    constructor(http, utils) {
        this.http = http;
        this.utils = utils;
        this.debug = true;
        window.onmessage = (event) => {
            this.logDebug('On message received from studio:');
            this.logDebug(event.data);
            let msg = event.data;
            if (msg.type == SimulatorMessageType.AnaChatMessage) {
                let cfMsg = msg;
                if (this.handleMessageReceived)
                    this.handleMessageReceived(new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_3__["ANAChatMessage"](cfMsg.data));
            }
            else if (msg.type == SimulatorMessageType.AnaChatReset) {
                if (this.handleResetSignal)
                    this.handleResetSignal();
            }
        };
    }
    logDebug(msg) {
        if (this.debug)
            console.log(msg);
    }
    sendMessage(message, threadMsgRef) {
        window.parent.postMessage({
            data: message,
            type: SimulatorMessageType.AnaChatMessage
        }, "*");
        if (threadMsgRef)
            threadMsgRef.status = _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_2__["MessageStatus"].ReceivedAtServer;
    }
};
SimulatorService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] },
    { type: _services_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"] }
];
SimulatorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"], _services_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"]])
], SimulatorService);

var SimulatorMessageType;
(function (SimulatorMessageType) {
    SimulatorMessageType["AnaChatMessage"] = "AnaChatMessage";
    SimulatorMessageType["AnaChatReset"] = "AnaChatReset";
})(SimulatorMessageType || (SimulatorMessageType = {}));


/***/ }),

/***/ "./src/app/services/stomp.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/stomp.service.ts ***!
  \*******************************************/
/*! exports provided: StompService, StompConnectionStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StompService", function() { return StompService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StompConnectionStatus", function() { return StompConnectionStatus; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var sockjs_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sockjs-client */ "./node_modules/sockjs-client/lib/entry.js");
/* harmony import */ var sockjs_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sockjs_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var stompjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stompjs */ "./node_modules/stompjs/index.js");
/* harmony import */ var stompjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(stompjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/ana-chat-vm.models */ "./src/app/models/ana-chat-vm.models.ts");
/* harmony import */ var _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/ana-chat.models */ "./src/app/models/ana-chat.models.ts");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");







let StompService = class StompService {
    constructor() {
        this.stompHeaders = {};
        this.consecutiveErrorsCount = 0;
        this.debug = (...args) => {
            if (console && console.log && console.log.apply && this.config && this.config.debug)
                console.log.apply(console, args);
        };
        //Should be an arrow function to follow class context
        this.onConnect = (frame) => {
            this.clearTimer();
            this.consecutiveErrorsCount = 0;
            if (this.connectionStatus == StompConnectionStatus.Connected)
                return;
            try {
                this.subscribe();
                this.connectionStatus = StompConnectionStatus.Connected;
                if (this.handleConnect)
                    this.handleConnect();
            }
            catch (e) {
                this.debug(e);
                this.connectionStatus = StompConnectionStatus.Disconnected;
            }
        };
        this.subscribe = () => {
            this.stompHeaders['user_id'] = this.config.customerId;
            let custId = this.stompHeaders['user_id'];
            this.stompHeaders['id'] = _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"].uuidv4();
            this.client.subscribe('/topic/presence', (message) => {
                this.client.send("/app/presence", this.stompHeaders, JSON.stringify({ user_id: custId }));
            }, this.stompHeaders);
            //Header: Id should be different for different subscription
            this.stompHeaders['id'] = _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"].uuidv4();
            let channel = (this.config.flowId ? '/topic/chat/customer/' + custId + "/business/" + this.config.businessId + "/flow/" + this.config.flowId : '/topic/chat/customer/' + custId + "/business/" + this.config.businessId);
            this.client.subscribe(channel, (message) => {
                this.onMessage(JSON.parse(message.body));
            }, this.stompHeaders);
            this.stompHeaders['id'] = _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"].uuidv4();
            this.client.subscribe('/queue/events/user/' + custId, (message) => {
                let msg = new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["ANAChatMessage"](JSON.parse(message.body));
                if (msg.events) {
                    for (var i = 0; i < msg.events.length; i++) {
                        let event = msg.events[i];
                        if (event.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["EventType"].ACK) {
                            this.onAck(message.headers['tid']);
                        }
                        else if (event.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["EventType"].TYPING) {
                            this.onTyping();
                        }
                    }
                }
            }, this.stompHeaders);
        };
        this.onError = (error) => {
            this.connectionStatus = StompConnectionStatus.Disconnected;
            if (this.consecutiveErrorsCount <= _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__["Config"].consecutiveErrorsThreshold) {
                this.consecutiveErrorsCount++;
                console.log(this.consecutiveErrorsCount);
                if (this.consecutiveErrorsCount == _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__["Config"].consecutiveErrorsThreshold)
                    if (this.handleConsecutiveErrorsState)
                        this.handleConsecutiveErrorsState();
            }
            if (typeof error === 'object')
                error = error.body;
            if (this.config && this.config.debug)
                this.debug('Socket Error: ' + JSON.stringify(error));
            this.debug(`Error: ${error}`);
            if (error.indexOf('Lost connection') !== -1)
                this.delayReconnect(5000);
        };
        this.onAck = (msgAckId, delivered) => {
            this.debug(`${delivered ? "DeliveredAck:" : "SentAck:"}` + msgAckId);
            if (this.handleAck)
                this.handleAck(msgAckId, delivered);
        };
        this.onTyping = () => {
            this.debug("Typing... ");
            if (this.handleTyping)
                this.handleTyping();
        };
        this.msgsIds = [];
        this.onMessage = (messageBody) => {
            let anaMsg = new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["ANAChatMessage"](messageBody);
            if (anaMsg.data && Object.keys(anaMsg.data).length > 0) {
                this.sendMessageReceivedAck(anaMsg.meta);
            }
            if (anaMsg.events && anaMsg.events.length > 0) {
                for (var i = 0; i < anaMsg.events.length; i++) {
                    let event = anaMsg.events[i];
                    if (event.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["EventType"].ACK) {
                        this.onAck(anaMsg.meta.id, true);
                    }
                    else if (event.type == _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["EventType"].TYPING) {
                        this.onTyping();
                    }
                }
            }
            if (anaMsg.data && Object.keys(anaMsg.data).length > 0) {
                if (this.handleMessageReceived) {
                    if (this.msgsIds.indexOf(anaMsg.meta.id) == -1) { //handle message only if it is not already handled
                        this.msgsIds.push(anaMsg.meta.id);
                        this.handleMessageReceived(anaMsg);
                    }
                }
            }
        };
        this.typingBusy = false;
    }
    connect(config) {
        this.clearTimer();
        this.configure(config);
        if (!this.client)
            throw Error('Client not configured!');
        this.debug('Connecting...');
        this.connectionStatus = StompConnectionStatus.Connecting;
        let headers = { user_id: this.config.customerId };
        this.client.connect(headers, this.onConnect, this.onError);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    disconnect() {
        this.clearTimer();
        if (this.client && this.client.connected) {
            this.client.disconnect(() => this.debug("WebSocket Disconnected"));
        }
    }
    configure(config) {
        if (config === null && this.config === null)
            throw Error('No configuration provided!');
        if (config != null)
            this.config = config;
        this.sockInstance = new sockjs_client__WEBPACK_IMPORTED_MODULE_2__(this.config.endpoint);
        this.client = stompjs__WEBPACK_IMPORTED_MODULE_3__["over"](this.sockInstance);
        this.connectionStatus = StompConnectionStatus.Disconnected;
        this.client.debug = (this.config.debug || this.config.debug == null ? this.debug : null);
    }
    delayReconnect(t) {
        this.debug(`Reconnecting in ${t / 1000} second(s)...`);
        this.timer = setTimeout(() => {
            this.connect();
        }, t);
    }
    sendMessage(message, threadMsgRef) {
        let _sendMessage = () => {
            let msg = message.extract();
            this.debug("Sent Socket Message: ");
            this.debug(msg);
            let headers = this.stompHeaders;
            headers['tid'] = threadMsgRef.messageAckId;
            this.client.send(`/app/message`, headers, JSON.stringify(msg));
            threadMsgRef.status = _models_ana_chat_vm_models__WEBPACK_IMPORTED_MODULE_4__["MessageStatus"].SentToServer;
            threadMsgRef.startTimeoutTimer();
        };
        threadMsgRef.retrySending = _sendMessage; //Saving the context to be used for retrying in case of failure
        _sendMessage();
    }
    sendTypingMessage(meta) {
        if (this.typingBusy || !this.client) {
            return;
        }
        this.typingBusy = true;
        setTimeout(() => this.typingBusy = false, 1000);
        let msg = new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["ANAChatMessage"]({
            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"].getReplyMeta(meta),
            events: [{
                    type: _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["EventType"].TYPING
                }]
        });
        let headers = this.stompHeaders;
        this.client.send(`/app/message`, headers, JSON.stringify(msg.extract()));
    }
    sendMessageReceivedAck(meta) {
        let msg = new _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["ANAChatMessage"]({
            meta: _services_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"].getReplyMeta(meta, false, true),
            events: [{
                    type: _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_5__["EventType"].ACK
                }]
        });
        let headers = this.stompHeaders;
        this.client.send(`/app/message`, headers, JSON.stringify(msg.extract()));
    }
};
StompService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], StompService);

var StompConnectionStatus;
(function (StompConnectionStatus) {
    StompConnectionStatus[StompConnectionStatus["None"] = 0] = "None";
    StompConnectionStatus[StompConnectionStatus["Connected"] = 1] = "Connected";
    StompConnectionStatus[StompConnectionStatus["Disconnected"] = 2] = "Disconnected";
    StompConnectionStatus[StompConnectionStatus["Connecting"] = 3] = "Connecting";
})(StompConnectionStatus || (StompConnectionStatus = {}));


/***/ }),

/***/ "./src/app/services/utilities.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/utilities.service.ts ***!
  \***********************************************/
/*! exports provided: UtilitiesService, Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilitiesService", function() { return UtilitiesService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/ana-chat.models */ "./src/app/models/ana-chat.models.ts");
var UtilitiesService_1;



let UtilitiesService = UtilitiesService_1 = class UtilitiesService {
    constructor() { }
    static uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
    static anaDateDisplay(anaDate) {
        return `${parseInt(anaDate.mday)}-${parseInt(anaDate.month)}-${parseInt(anaDate.year)}`;
    }
    static anaDateToDate(anaDate) {
        return new Date(parseInt(anaDate.year), parseInt(anaDate.month) - 1, parseInt(anaDate.mday));
    }
    static anaTimeToDate(anaTime) {
        let d = new Date();
        d.setHours(parseInt(anaTime.hour), parseInt(anaTime.minute), parseInt(anaTime.second));
        return d;
    }
    static anaTimeDisplay(anaTime) {
        let hr = parseInt(anaTime.hour);
        let min = parseInt(anaTime.minute);
        let hours = hr > 12 ? hr - 12 : hr;
        let am_pm = hr >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        let minutes = min < 10 ? "0" + min : min;
        return hours + ":" + minutes + " " + am_pm;
    }
    static getReplyMeta(srcMeta, copyId, copyRespTo) {
        let replyMeta = {
            id: copyId ? srcMeta.id : this.uuidv4(),
            recipient: srcMeta.sender,
            responseTo: copyRespTo ? srcMeta.responseTo : srcMeta.id,
            sender: srcMeta.recipient,
            senderType: _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_2__["SenderType"].USER,
            sessionId: srcMeta.sessionId,
            flowId: srcMeta.flowId,
            previousFlowId: srcMeta.previousFlowId,
            currentFlowId: srcMeta.currentFlowId,
            timestamp: new Date().getTime()
        };
        return replyMeta;
    }
    static googleMapsStaticLink(latLng) {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${latLng.lat},${latLng.lng}&zoom=13&size=300x150&maptype=roadmap&markers=color:red|label:A|${latLng.lat},${latLng.lng}&key=${UtilitiesService_1.googleMapsConfigRef.apiKey}`;
    }
    static getAnaMediaTypeFromMIMEType(mimeType) {
        let assetType;
        if (mimeType.startsWith('image'))
            assetType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_2__["MediaType"].IMAGE;
        else if (mimeType.startsWith('video'))
            assetType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_2__["MediaType"].VIDEO;
        else if (mimeType.startsWith('audio'))
            assetType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_2__["MediaType"].AUDIO;
        else
            assetType = _models_ana_chat_models__WEBPACK_IMPORTED_MODULE_2__["MediaType"].FILE;
        return assetType;
    }
    static anaAddressDisplay(anaAddress) {
        return [anaAddress.line1, anaAddress.area, anaAddress.city, anaAddress.state, anaAddress.country, anaAddress.pin].filter(x => x).join(", ");
    }
    static pad(number, width, z = '0') {
        let n = number + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    static isMobile() {
        if (this._isMobile === null) {
            let check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true; })(navigator.userAgent || navigator.vendor || window.opera);
            this._isMobile = check;
        }
        return this._isMobile;
    }
    ;
};
UtilitiesService.googleMapsConfigRef = { apiKey: '' };
UtilitiesService._isMobile = null;
UtilitiesService = UtilitiesService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], UtilitiesService);

class Config {
}
Config.emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
Config.phoneRegex = /^\+?\d{6,15}$/;
Config.numberRegex = /^[0-9]*\.?[0-9]+$/;
Config.consecutiveErrorsThreshold = 5;
Config.consecutiveErrorsMessageText = "Uh oh, seems like you've lost your internet connection";
Config.consecutiveErrorsMessageAckId = "CONSECUTIVE_ERRORS_MESSAGE";
Config.simulatorBusinessId = 'ana-studio';
Config.simulatorCustomerId = 'ana-simulator';


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
    production: false
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
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_5__);






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

module.exports = __webpack_require__(/*! /Users/turtuvshin/Projects/chatbots.mn/simulator/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map