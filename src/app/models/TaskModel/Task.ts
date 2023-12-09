import { Priority } from "./Priority";
import { TaskStatus } from "./TaskStatus";

export interface Task{
    id:number;
    nom: string;
    description: string;
    startDate: Date ;
    endDate: Date;
    status: TaskStatus;
    priority : Priority;
    tags : String;
    id_collaborator: number



}
