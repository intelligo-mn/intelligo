"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class Angular4SeedPage {
    navigateTo() {
        return protractor_1.browser.get('/');
    }
    getParagraphText() {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    }
}
exports.Angular4SeedPage = Angular4SeedPage;
//# sourceMappingURL=app.po.js.map