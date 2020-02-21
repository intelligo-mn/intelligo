import { NativeDateAdapter } from '@angular/material';
export declare class MyDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string;
    private _to2digit;
}
