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
const Subject_1 = require("rxjs/Subject");
let GlobalState = class GlobalState {
    constructor() {
        this._data = new Subject_1.Subject();
        this._dataStream = this._data.asObservable();
        this._subscriptions = new Map();
        this._dataStream.subscribe((data) => this._onEvent(data));
    }
    notifyDataChanged(event, value) {
        let current = this._data[event];
        if (current !== value) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event]
            });
        }
    }
    subscribe(event, callback) {
        let subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    }
    _onEvent(data) {
        let subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
};
GlobalState = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], GlobalState);
exports.GlobalState = GlobalState;
//# sourceMappingURL=app.state.js.map