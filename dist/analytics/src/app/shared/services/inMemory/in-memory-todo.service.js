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
const task_1 = require("../../model/task");
let InMemoryTodoService = class InMemoryTodoService {
    constructor() {
        this.tasks = [];
        this.id = 1;
    }
    add(name) {
        var task = new task_1.Task("" + this.id++, name, false);
        this.tasks.push(task);
        return Promise.resolve(task);
    }
    delete(id) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === id) {
                this.tasks.splice(i, 1);
                return Promise.resolve();
            }
        }
        return Promise.reject("task not found");
    }
    getAll() {
        return Promise.resolve(this.tasks);
    }
    updateDone(id, isDone) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === id + "") {
                this.tasks[i].isDone = isDone;
                return Promise.resolve();
            }
        }
        return Promise.reject("task not found");
    }
    update(task) {
        console.log("In memory task service >>>>> update called : " + task.id);
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === task.id + "") {
                this.tasks[i] = task;
                return Promise.resolve();
            }
        }
    }
};
InMemoryTodoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], InMemoryTodoService);
exports.InMemoryTodoService = InMemoryTodoService;
//# sourceMappingURL=in-memory-todo.service.js.map