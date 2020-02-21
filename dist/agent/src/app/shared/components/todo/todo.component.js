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
const forms_1 = require("@angular/forms");
const localstorage_todo_service_1 = require("../../services/localstorage/localstorage-todo.service");
let TodoComponent = class TodoComponent {
    constructor(todoService, fb) {
        this.todoService = todoService;
        this.isSubmitted = false;
        this.triggerToggleInput = false;
        this.form = fb.group({
            newTask: new forms_1.FormControl("", [forms_1.Validators.required])
        });
    }
    ngOnInit() {
        this.todoService.getAll().then(tasks => {
            this.tasks = tasks;
        });
    }
    onSubmit({ value, valid }) {
        this.isSubmitted = true;
        if (!valid) {
            return;
        }
        this.todoService
            .add(this.form.get("newTask").value)
            .then(task => {
            return this.todoService.getAll();
        })
            .then(tasks => {
            this.tasks = tasks;
            this.form.setValue({
                newTask: ""
            });
            this.form.reset();
            this.isSubmitted = false;
        });
    }
    onNotify(message) {
        this.todoService.getAll().then(tasks => {
            this.tasks = tasks;
        });
    }
};
TodoComponent = __decorate([
    core_1.Component({
        selector: "app-todo",
        templateUrl: "./todo.component.html",
        styleUrls: ["./todo.component.scss"],
        providers: []
    }),
    __metadata("design:paramtypes", [localstorage_todo_service_1.LocalStorageTodoService, forms_1.FormBuilder])
], TodoComponent);
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map