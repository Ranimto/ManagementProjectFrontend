import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { Project } from 'src/app/models/Project/project';
import { NotificationService } from 'src/app/services/serviceSTBS/notificationService/web-socket.service';
import { ProjectService } from 'src/app/services/serviceSTBS/projectService/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  projects: Project[]=[] ;
  showForm = false;
  isEditing = false;
  notification: string | undefined;
  project : Project={
    id: 0,
    nom: '',
    startDate: '',
    endDate: '',
    id_manager: 0
  };
  selectedSearchKeyword!: string;
  filteredProjects!: Project[];


  constructor(private projectService: ProjectService, private notificationService: NotificationService, private notifierService: NotifierService) {

  }



  ngOnInit(): void {
    this.getAllProject();
    this.notificationService.connect(); // Make sure to establish the WebSocket connection
    this.notificationService.sendNotification('Le projet a été créé avec succès.');


  }


  subscribeToNotifications(callback: (message: any) => void): void {
    this.notificationService.subscribeToNotifications((message) => {
      console.log('Received notification:', message);
      this.notification = message; // Ajoutez cette ligne pour afficher la notification dans le composant

    });
  }

  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire

  }


  CloseForm(addForm: NgForm) {
    this.toggleForm() ;
    addForm.resetForm();

  }
  toggleEditing(id:number) {
    this.isEditing = !this.isEditing;
  }
  getAllProject (){
    this.projectService.getAllProjects().subscribe(
      (result) => {
        this.projects = result;
        console.log(this.project);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  searchProjects(projects: Project[]): void {
    const filteredProjects = projects.filter((project) =>
      this.projectContainsKeyword(project, this.selectedSearchKeyword.toLowerCase())

    );
    console.log(filteredProjects)
    // Update the table data source with the filtered projects
    this.filteredProjects = filteredProjects; // Replace with your specific data source update mechanism
    this.projects= filteredProjects;
  }

  projectContainsKeyword(project: Project, keyword: string): boolean {
    return (
      project.nom.toLowerCase().includes(keyword) ||
      project.startDate.toString().toLowerCase().includes(keyword) ||
      project.endDate.toString().toLowerCase().includes(keyword) ||
      project.id_manager.toString().toLowerCase().includes(keyword)
    );
  }

  addProject(addForm: NgForm) {
    if (addForm.valid) {
      // Vérifiez si le formulaire est valide avant d'ajouter le fournisseur
      this.projectService.AddProject(this.project).subscribe(
        () => {
         // alert('Project is added successfully');
          // Réinitialisez le formulaire après l'ajout si nécessaire
          addForm.resetForm();
          this.notifierService.notify('success', 'Project is added succefully!');
        },
        (error) => {
          console.error('Error add Project:', error);
          this.notifierService.notify('error', 'Error, Check your credentials please !');
        }
      );
    }
  }

  UpdateProject(Project: Project) {
    this.projectService.UpdateProject(Project).subscribe(
      () => {
        this.notifierService.notify('success', 'Task is updated succefully!');

      },
      (error) => {
        console.error('Error update Project:', error);

      }
    );
  }

  DeleteProject(idProvider: number) {
    this.projectService.DeleteProject(idProvider).subscribe(
      () => {
        this.notifierService.notify('success', 'Task is deleted succefully!');

        // La suppression a réussi, mettez à jour la liste des fournisseurs

        this.projectService.getAllProjects();
        console.log(this.project)
      },
      (error) => {
        console.error('Error Delete Project:', error);
      }
    );
  }



 editingProject: Project | null = null; // Ajoutez cette ligne



  setEditingProject(Project: Project | null) {
    this.editingProject = Project;
  }

printReport():void {
  let datatype ='application/vnd.ms-excel.sheet.macroEnabled.12';
  let tableSelect=document.getElementById('projects');
  let tableHtml=tableSelect?.outerHTML.replace(/ /g,'%20');
  let downloadLink=document.createElement('a') ;
  document.body.appendChild(downloadLink);
  downloadLink.href='data:'+datatype+',' +tableHtml;
  downloadLink.download='project-report.xls';
  downloadLink.click();
  document.body.removeChild(downloadLink);

}

}
