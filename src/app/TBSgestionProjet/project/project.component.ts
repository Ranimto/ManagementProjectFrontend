import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/Project/project';
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

  constructor(private projectService: ProjectService) {

  /*   this.webSocketService.connect().subscribe('/topic/projectAdded', (message) => {
      this.notification = message.body; */

  }



  ngOnInit(): void {
    this.getAllProject();

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

  addProject(addForm: NgForm) {
    if (addForm.valid) {
      // Vérifiez si le formulaire est valide avant d'ajouter le fournisseur
      this.projectService.AddProject(this.project).subscribe(
        () => {
          alert('Project is added successfully');
          // Réinitialisez le formulaire après l'ajout si nécessaire
          addForm.resetForm();
        },
        (error) => {
          console.error('Error add Project:', error);
        }
      );
    }
  }

  UpdateProject(Project: Project) {
    this.projectService.UpdateProject(Project).subscribe(
      () => {
        alert('successful update.');

      },
      (error) => {
        console.error('Error update Project:', error);

      }
    );
  }

  DeleteProject(idProvider: number) {
    this.projectService.DeleteProject(idProvider).subscribe(
      () => {
        alert("Project"+idProvider +"is deleted  successfully");

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



}
