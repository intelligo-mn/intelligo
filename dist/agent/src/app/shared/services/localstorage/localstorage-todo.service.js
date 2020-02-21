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
let LocalStorageTodoService = class LocalStorageTodoService {
    constructor() {
        this.id = 1;
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem("todos", JSON.stringify([]));
        }
    }
    add(name) {
        var task = new task_1.Task("" + this.id++, name, false);
        var tasks = JSON.parse(localStorage.getItem("todos"));
        tasks.push(JSON.stringify(task));
        localStorage.setItem("todos", JSON.stringify(tasks));
        return Promise.resolve(task);
    }
    delete(id) {
        var tasks = JSON.parse(localStorage.getItem("todos"));
        for (var i = 0; i < tasks.length; i++) {
            const parsedTask = JSON.parse(tasks[i]);
            if (parsedTask.id === id) {
                tasks.splice(i, 1);
                localStorage.setItem("todos", JSON.stringify(tasks));
                return Promise.resolve();
            }
        }
        return Promise.reject("task not found");
    }
    getAll() {
        var tasks = JSON.parse(localStorage.getItem("todos"));
        let tasksModel = [];
        for (let task of tasks) {
            const parsedTask = JSON.parse(task);
            tasksModel.push(new task_1.Task(parsedTask.id, parsedTask.name, parsedTask.isDone));
        }
        return Promise.resolve(tasksModel);
    }
    updateDone(id, isDone) {
        var tasks = JSON.parse(localStorage.getItem("todos"));
        for (var i = 0; i < tasks.length; i++) {
            const parsedTask = JSON.parse(tasks[i]);
            if (parsedTask.id === id) {
                parsedTask.isDone = isDone;
                tasks[i] = JSON.stringify(parsedTask);
                localStorage.setItem("todos", JSON.stringify(tasks));
                return Promise.resolve();
            }
        }
        return Promise.reject("task not found");
    }
    update(task) {
        console.log("In memory task service >>>>> update called : " + task.id);
        var tasks = JSON.parse(localStorage.getItem("todos"));
        for (var i = 0; i < tasks.length; i++) {
            const parsedTask = JSON.parse(tasks[i]);
            if (parsedTask.id === task.id) {
                tasks[i] = JSON.stringify(task);
                localStorage.setItem("todos", JSON.stringify(tasks));
                return Promise.resolve();
            }
        }
        return Promise.reject("task not found");
    }
};
LocalStorageTodoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], LocalStorageTodoService);
exports.LocalStorageTodoService = LocalStorageTodoService;
//# sourceMappingURL=localstorage-todo.service.js.map