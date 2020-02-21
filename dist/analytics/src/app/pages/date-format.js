"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@angular/material");
const SUPPORTS_INTL_API = typeof Intl !== 'undefined';
class MyDateAdapter extends material_1.NativeDateAdapter {
    format(date, displayFormat) {
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return this._to2digit(day) + '-' + this._to2digit(month) + '-' + year;
        }
        else {
            return date.toDateString();
        }
    }
    _to2digit(n) {
        return ('00' + n).slice(-2);
    }
}
exports.MyDateAdapter = MyDateAdapter;
//# sourceMappingURL=date-format.js.map