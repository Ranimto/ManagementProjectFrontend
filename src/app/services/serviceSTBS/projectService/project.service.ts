import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/Project/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URL=environment.apiBaseUrlTask;
  constructor(private http :HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.URL}/project/getAllProjects`);
  }

  DeleteProject(idProject: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/project/delete/${idProject}`);
  }


  AddProject(projectData: Project)  {
    return this.http.post<Project[]>(`${this.URL}/project/addProject`, projectData);
  }
  UpdateProject(projectData: Project) {
    return this.http.put<Project[]>(`${this.URL}/project/update`, projectData);
  }

}
