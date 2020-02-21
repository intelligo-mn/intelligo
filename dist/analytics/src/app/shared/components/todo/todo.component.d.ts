import { OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Task } from "../../model/task";
import { LocalStorageTodoService } from "../../services/localstorage/localstorage-todo.service";
export declare class TodoComponent implements OnInit {
    private todoService;
    tasks: Task[];
    form: FormGroup;
    isSubmitted: boolean;
    triggerToggleInput: boolean;
    constructor(todoService: LocalStorageTodoService, fb: FormBuilder);
    ngOnInit(): void;
    onSubmit({ value, valid }: {
        value: FormGroup;
        valid: boolean;
    }): void;
    onNotify(message: string): void;
}
