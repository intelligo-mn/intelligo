"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BusinessAccountStatus;
(function (BusinessAccountStatus) {
    BusinessAccountStatus[BusinessAccountStatus["INACTIVE"] = 0] = "INACTIVE";
    BusinessAccountStatus[BusinessAccountStatus["ACTIVE"] = 1] = "ACTIVE";
    BusinessAccountStatus[BusinessAccountStatus["EXPIRED"] = 2] = "EXPIRED";
    BusinessAccountStatus[BusinessAccountStatus["BLOCKED"] = 3] = "BLOCKED";
    BusinessAccountStatus[BusinessAccountStatus["DELETED"] = 4] = "DELETED";
})(BusinessAccountStatus = exports.BusinessAccountStatus || (exports.BusinessAccountStatus = {}));
var DevicePlatform;
(function (DevicePlatform) {
    DevicePlatform["ANDROID"] = "ANDROID";
    DevicePlatform["IOS"] = "IOS";
    DevicePlatform["WINDOWS"] = "WINDOWS";
    DevicePlatform["FACEBOOK"] = "FACEBOOK";
})(DevicePlatform = exports.DevicePlatform || (exports.DevicePlatform = {}));
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus["ACTIVE"] = "ACTIVE";
    DeviceStatus["INACTIVE"] = "INACTIVE";
    DeviceStatus["BLOCKED"] = "BLOCKED";
})(DeviceStatus = exports.DeviceStatus || (exports.DeviceStatus = {}));
//# sourceMappingURL=data.models.js.map