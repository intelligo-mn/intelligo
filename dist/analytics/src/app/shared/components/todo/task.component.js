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
var _a, _b;
const core_1 = require("@angular/core");
const task_1 = require("../../model/task");
const localstorage_todo_service_1 = require("../../services/localstorage/localstorage-todo.service");
const forms_1 = require("@angular/forms");
let TaskComponent = class TaskComponent {
    constructor(todoService, fb) {
        this.todoService = todoService;
        this.fb = fb;
        this.notify = new core_1.EventEmitter();
        this.selected = false;
        this.editable = false;
        this.isSubmitted = false;
        this.toggleTaskProcessing = false;
    }
    ngOnInit() {
        this.form = this.fb.group({
            updatedTask: new forms_1.FormControl(this.task.name, [forms_1.Validators.required])
        });
    }
    toggleTask(event) {
        event.stopPropagation();
        this.toggleTaskProcessing = true;
        this.todoService.updateDone(this.task.id, !this.task.isDone).then(() => {
            this.notify.emit("toggled");
        });
    }
    deleteTask() {
        this.todoService.delete(this.task.id).then(() => {
            console.log("promise fulfilled for delete");
            this.notify.emit("deleted");
        });
    }
    enableEditing() {
        this.editable = true;
    }
    disableEditing() {
        this.editable = false;
        this.form.setValue({
            updatedTask: this.task.name
        });
    }
    editName({ value, valid }) {
        this.isSubmitted = true;
        if (!valid) {
            return;
        }
        if (!(this.form.get("updatedTask").value === this.task.name)) {
            let newTask = new task_1.Task(this.task.id, this.form.get("updatedTask").value, this.task.isDone);
            this.todoService.update(newTask).then(() => {
                this.task = newTask;
                this.notify.emit("edited");
            });
        }
        this.editable = false;
        this.isSubmitted = false;
        this.form.setValue({
            updatedTask: this.task.name
        });
        this.form.reset();
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", task_1.Task)
], TaskComponent.prototype, "task", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _a : Object)
], TaskComponent.prototype, "notify", void 0);
TaskComponent = __decorate([
    core_1.Component({
        selector: "app-task",
        templateUrl: "./task.component.html",
        styleUrls: ["./task.component.scss"]
    }),
    __metadata("design:paramtypes", [localstorage_todo_service_1.LocalStorageTodoService, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" ? _b : Object])
], TaskComponent);
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map