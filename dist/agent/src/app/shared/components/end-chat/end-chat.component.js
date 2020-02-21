"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const info_dialog_service_1 = require("app/shared/services/helpers/info-dialog.service");
const data_service_1 = require("app/shared/services/data/data.service");
const ana_chat_models_1 = require("app/shared/model/ana-chat.models");
let EndChatComponent = class EndChatComponent {
    constructor(dialogRef, sessionId, infoDialog, dataService) {
        this.dialogRef = dialogRef;
        this.sessionId = sessionId;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
    }
    ngOnInit() {
        this.loading = true;
        this.dataService.intentToHandover(this.sessionId).subscribe(x => {
            this.loading = false;
            if (x.data) {
                this.message = x.data.message;
            }
        }, err => {
            this.loading = false;
            this.infoDialog.alert("Error", JSON.stringify(err, null, 4));
        });
    }
    getOptions() {
        if (!this.message)
            return [];
        try {
            return this.message.data.content.options || [];
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    optionClick(option) {
        this.message.data.content.input = {
            val: option.value
        };
        this.message.meta.senderType = ana_chat_models_1.SenderType.AGENT;
        this.loading = true;
        this.dataService.handover(this.sessionId, this.message).subscribe(x => {
            this.loading = false;
            if (!x.error) {
                this.infoDialog.alert("Done", "Chat session has been closed", () => {
                    this.dialogRef.close(true);
                });
            }
            else {
                this.infoDialog.alert("Error", (x.error.message ? x.error.message : "Something went wrong! Please try again."));
            }
        }, err => {
            this.loading = false;
            console.error(err);
            this.infoDialog.alert("Error", (err._body ? JSON.parse(err._body).error.message : "Something went wrong! Please try again."));
        });
    }
};
EndChatComponent = __decorate([
    core_1.Component({
        selector: 'app-end-chat',
        templateUrl: './end-chat.component.html',
        styleUrls: ['./end-chat.component.scss']
    }),
    __param(1, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MdDialogRef, String, typeof (_a = typeof info_dialog_service_1.InfoDialogService !== "undefined" && info_dialog_service_1.InfoDialogService) === "function" ? _a : Object, typeof (_b = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" ? _b : Object])
], EndChatComponent);
exports.EndChatComponent = EndChatComponent;
//# sourceMappingURL=end-chat.component.js.map