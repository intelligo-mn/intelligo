import { Injectable } from "@angular/core";
import { Task } from "../../model/task";

@Injectable()
export class LocalStorageTodoService {
	id: number;

	constructor() {
		this.id = 1;
		if (localStorage.getItem("todos") === null) {
			localStorage.setItem("todos", JSON.stringify([]));
		}
	}

	add(name: string): Promise<Task> {
		var task = new Task("" + this.id++, name, false);
		var tasks = JSON.parse(localStorage.getItem("todos"));
		tasks.push(JSON.stringify(task));
		localStorage.setItem("todos", JSON.stringify(tasks));
		return Promise.resolve(task);
	}

	delete(id: string): Promise<void> {
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

	getAll(): Promise<Task[]> {
		var tasks = JSON.parse(localStorage.getItem("todos"));
		let tasksModel: Task[] = [];
		for (let task of tasks) {
			const parsedTask = JSON.parse(task);
			tasksModel.push(
				new Task(parsedTask.id, parsedTask.name, parsedTask.isDone)
			);
		}
		return Promise.resolve(tasksModel);
	}

	updateDone(id: string, isDone: boolean): Promise<void> {
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

	update(task: Task): Promise<void> {
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
}
