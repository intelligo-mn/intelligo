"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GaugeLabel {
    constructor(options = {}) {
        this.color = options.color;
        this.text = options.text;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.fontSize = options.fontSize || "1em";
    }
}
exports.GaugeLabel = GaugeLabel;
//# sourceMappingURL=gauge-label.js.map