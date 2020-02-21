"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(id, name, isDone) {
        this.isDone = false;
        this.id = id;
        this.name = name;
        this.isDone = isDone;
    }
    getName() {
        return this.name;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map