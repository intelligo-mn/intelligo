"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Note {
    constructor(values = {}) {
        this.title = "";
        this.content = "";
        Object.assign(this, values);
    }
}
exports.Note = Note;
//# sourceMappingURL=notes.js.map