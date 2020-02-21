import { EventEmitter, OnInit } from "@angular/core";
import { Task } from "../../model/task";
import { LocalStorageTodoService } from "../../services/localstorage/localstorage-todo.service";
import { FormGroup, FormBuilder } from "@angular/forms";
export declare class TaskComponent implements OnInit {
    private todoService;
    private fb;
    task: Task;
    notify: EventEmitter<string>;
    selected: boolean;
    editable: boolean;
    isSubmitted: boolean;
    form: FormGroup;
    toggleTaskProcessing: boolean;
    constructor(todoService: LocalStorageTodoService, fb: FormBuilder);
    ngOnInit(): void;
    toggleTask(event: any): void;
    deleteTask(): void;
    enableEditing(): void;
    disableEditing(): void;
    editName({ value, valid }: {
        value: FormGroup;
        valid: boolean;
    }): void;
}
