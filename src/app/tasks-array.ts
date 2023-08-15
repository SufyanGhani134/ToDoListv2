import { Task } from "./task";

export interface TasksArray {
    display: boolean;
    date: Date;
    children?: Task[];
}
