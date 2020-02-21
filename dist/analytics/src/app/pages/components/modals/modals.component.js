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
var _a, _b, _c;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let ModalsComponent = class ModalsComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this.hidden = false;
        this.isValid = true;
        this.showNext = true;
        this.showPrev = true;
        this.onNext = new core_1.EventEmitter();
        this.onPrev = new core_1.EventEmitter();
        this.language = ["English", "French", "German"];
        this._isActive = false;
        this.isDisabled = true;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.isCompleted = false;
    }
    set isActive(isActive) {
        this._isActive = isActive;
        this.isDisabled = false;
    }
    get isActive() {
        return this._isActive;
    }
    onStep1Next(event) {
        console.log("Step1 - Next");
    }
    onStep2Next(event) {
        console.log("Step2 - Next");
    }
    onStep3Next(event) {
        console.log("Step3 - Next");
    }
    onComplete(event) {
        this.isCompleted = true;
    }
    onStepChanged(step) {
        console.log("Changed to " + step.title);
    }
    ngOnInit() {
        this.myform = new forms_1.FormGroup({
            name: new forms_1.FormGroup({
                firstName: new forms_1.FormControl("", forms_1.Validators.required),
                lastName: new forms_1.FormControl("", forms_1.Validators.required)
            }),
            email: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.pattern("[^ @]*@[^ @]*")
            ]),
            language: new forms_1.FormControl(),
            address: new forms_1.FormGroup({
                addressOne: new forms_1.FormControl("", forms_1.Validators.required),
                addressTwo: new forms_1.FormControl("", forms_1.Validators.required)
            }),
            city: new forms_1.FormControl()
        });
    }
    openFullscreen(fullscreen) {
        this.modalService.open(fullscreen, { windowClass: 'fullscreen custom-show' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openBottomSheetModal(bottomSheetModal) {
        this.modalService.open(bottomSheetModal, { windowClass: 'bottom-sheet custom-show' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    open(param) {
        this.modalService.open(param, { windowClass: 'custom-show' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    getDismissReason(reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return `with: ${reason}`;
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalsComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalsComponent.prototype, "hidden", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalsComponent.prototype, "isValid", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalsComponent.prototype, "showNext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalsComponent.prototype, "showPrev", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _a : Object)
], ModalsComponent.prototype, "onNext", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _b : Object)
], ModalsComponent.prototype, "onPrev", void 0);
__decorate([
    core_1.Input("isActive"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ModalsComponent.prototype, "isActive", null);
ModalsComponent = __decorate([
    core_1.Component({
        selector: ".content_inner_wrapper",
        templateUrl: "./modals.component.html",
        styleUrls: ["./modals.component.scss"]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof ng_bootstrap_1.NgbModal !== "undefined" && ng_bootstrap_1.NgbModal) === "function" ? _c : Object])
], ModalsComponent);
exports.ModalsComponent = ModalsComponent;
//# sourceMappingURL=modals.component.js.map