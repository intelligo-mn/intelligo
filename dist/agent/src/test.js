"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy.js");
require("zone.js/dist/sync-test");
require("zone.js/dist/jasmine-patch");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/platform-browser-dynamic/testing");
__karma__.loaded = function () { };
testing_1.getTestBed().initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
__karma__.start();
//# sourceMappingURL=test.js.map