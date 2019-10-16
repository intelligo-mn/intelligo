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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const bson_1 = require("bson");
const chatflow_models_1 = require("../models/chatflow.models");
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
            x.IsStartNode = x.IsStartNode ? true : false;
        });
        return chatNodes;
    }
    cloneNode(srcNode) {
        if (!srcNode) {
            return false;
        }
        let targetNode = JSON.parse(JSON.stringify(srcNode));
        targetNode.Id = new bson_1.ObjectID().toHexString();
        targetNode.Name += " Copy";
        targetNode.NextNodeId = null;
        if (targetNode.Buttons) {
            targetNode.Buttons.forEach(btn => {
                btn._id = new bson_1.ObjectID().toHexString();
                btn.NextNodeId = null;
            });
        }
        if (targetNode.Sections) {
            targetNode.Sections.forEach(section => {
                section._id = new bson_1.ObjectID().toHexString();
                if (section.SectionType == chatflow_models_1.SectionType.Carousel) {
                    let car = section;
                    car.Items.forEach(carItem => {
                        carItem._id = new bson_1.ObjectID().toHexString();
                        carItem.Buttons.forEach(carBtn => {
                            carBtn._id = new bson_1.ObjectID().toHexString();
                            carBtn.NextNodeId = null;
                        });
                    });
                }
            });
        }
        return targetNode;
    }
};
GlobalsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [platform_browser_1.Title])
], GlobalsService);
exports.GlobalsService = GlobalsService;
var VariableType;
(function (VariableType) {
    VariableType[VariableType["Array"] = 0] = "Array";
    VariableType[VariableType["String"] = 1] = "String";
    VariableType[VariableType["Object"] = 2] = "Object";
    VariableType[VariableType["Other"] = 3] = "Other";
})(VariableType = exports.VariableType || (exports.VariableType = {}));
//# sourceMappingURL=globals.service.js.map