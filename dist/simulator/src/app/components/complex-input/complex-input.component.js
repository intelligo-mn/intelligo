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
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const utilities_service_1 = require("../../services/utilities.service");
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
            this.choosenTime = `${utilities_service_1.UtilitiesService.pad(date.getHours(), 2)}:${utilities_service_1.UtilitiesService.pad(date.getMinutes(), 2)}`;
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
__decorate([
    core_1.ViewChild("datePicker", { static: true }),
    __metadata("design:type", material_1.MatDatepicker)
], ComplexInputComponent.prototype, "datePicker", void 0);
ComplexInputComponent = __decorate([
    core_1.Component({
        selector: 'app-complex-input',
        templateUrl: './complex-input.component.html',
        styleUrls: ['./complex-input.component.scss']
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
], ComplexInputComponent);
exports.ComplexInputComponent = ComplexInputComponent;
var ComplexType;
(function (ComplexType) {
    ComplexType[ComplexType["Date"] = 0] = "Date";
    ComplexType[ComplexType["Time"] = 1] = "Time";
    ComplexType[ComplexType["Location"] = 2] = "Location";
    ComplexType[ComplexType["Address"] = 3] = "Address";
    ComplexType[ComplexType["List"] = 4] = "List";
})(ComplexType = exports.ComplexType || (exports.ComplexType = {}));
//# sourceMappingURL=complex-input.component.js.map