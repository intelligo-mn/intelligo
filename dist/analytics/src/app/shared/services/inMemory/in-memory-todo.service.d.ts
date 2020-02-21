import { Task } from "../../model/task";
export declare class InMemoryTodoService {
    id: number;
    tasks: Task[];
    constructor();
    add(name: string): Promise<Task>;
    delete(id: string): Promise<void>;
    getAll(): Promise<Task[]>;
    updateDone(id: string, isDone: boolean): Promise<void>;
    update(task: Task): Promise<void>;
}
