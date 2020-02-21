import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Task } from "../../model/task";
import { LocalStorageTodoService } from "../../services/localstorage/localstorage-todo.service";
//import { InMemoryTodoService } from "../../services/inMemory/in-memory-todo.service";
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from "@angular/forms";

@Component({
	selector: "app-task",
	templateUrl: "./task.component.html",
	styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
	@Input() task: Task;
	@Output() notify: EventEmitter<string> = new EventEmitter<string>();
	selected: boolean = false;
	editable: boolean = false;
	isSubmitted = false;
	form: FormGroup;
	toggleTaskProcessing = false;

	constructor(
		private todoService: LocalStorageTodoService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		//console.log("On init called of task component: ");
		this.form = this.fb.group({
			updatedTask: new FormControl(this.task.name, [Validators.required])
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
		//console.log("delete called");
		//console.log(this.task.id);
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
		//console.log(this.form.get("updatedTask").value);
	}

	editName({ value, valid }: { value: FormGroup; valid: boolean }) {
		this.isSubmitted = true;
		//console.log("edit name called");
		//console.log("valid: " + valid);
		/* Consider a case when if user doesnt enter any value while updating task list,
       it will notify to the user to enter something at that case the value of valid is 'false' */
		if (!valid) {
			return;
		}

		if (!(this.form.get("updatedTask").value === this.task.name)) {
			let newTask = new Task(
				this.task.id,
				this.form.get("updatedTask").value,
				this.task.isDone
			);
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
}
