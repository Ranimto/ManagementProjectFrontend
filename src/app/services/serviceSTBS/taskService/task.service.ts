import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from 'src/app/models/CollaboratorModel/Collaborator';
import { Task } from 'src/app/models/TaskModel/Task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL=environment.apiBaseUrlTask;

  constructor(private Http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
return this.Http.get<Task[]>(`${this.URL}/Task/getAllTasks`)
  }

  getNbTasksCompleted(): Observable<number>{
    return this.Http.get<number>(`${this.URL}/Task/NbTaskCompleted`)

  }
    getNbTasksPending(): Observable<number>{
    return this.Http.get<number>(`${this.URL}/Task/getNbTaskPending`)

  }

  getNbTasksInProgress(): Observable<number>{
    return this.Http.get<number>(`${this.URL}/Task/getNbTaskInProgress`)

  }
  getNbTasksTesting(): Observable<number>{
    return this.Http.get<number>(`${this.URL}/Task/getNbTaskTesting`)

  }
  getNbTasksAwaiting(): Observable<number>{
    return this.Http.get<number>(`${this.URL}/Task/getNbTaskAwaiting`)

  }

  getCollaboratorNameForTask(taskId :number): Observable<String> {
    return this.Http.get<String>(`${this.URL}/Task/getCollaboratorNameForTask`)
      }

      DeleteTask(idTask: number): Observable<void> {
        return this.Http.delete<void>(`${this.URL}/Task/delete/${idTask}`);
      }


      AddTask(taskData: Task)  {
        return this.Http.post<Task[]>(`${this.URL}/Task/addTask`, taskData);
      }
      UpdateTask(taskData: Task, idTask:number) {
        return this.Http.put<Task[]>(`${this.URL}/Task/update/${idTask}`, taskData);
      }


}
