import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TaskStatus } from 'src/app/models/TaskModel/TaskStatus';
import { Priority } from 'src/app/models/TaskModel/Priority';
import { Task } from 'src/app/models/TaskModel/Task';
import { TaskService } from 'src/app/services/serviceSTBS/taskService/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Task[]=[];
  collaboratorName!: String;
  showForm = false;
  isEditing = false;
  task: Task={
    id: 0,
    nom: '',
    description: '',
    startDate:  new Date('2024-11-20'),
    endDate:  new Date('2024-12-22'),
    status:TaskStatus.Pending,
    priority :Priority.Low,
    tags :'',
    id_collaborator: 0
  }


  taskCompletedCount: number | undefined;


  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.taskCompletedCount=this.getNbTasksCompleted();
    console.log("le task est " + this.taskCompletedCount);

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

  getCollaborator(taskId :number) {
    this.taskService.getCollaboratorNameForTask(taskId).subscribe(
     (result) => {
       this.collaboratorName=result;

     },
     (error) => {
       console.error('Error fetching Tasks:', error);
       console.log(this.tasks)})
     }

  getAllTasks() {
   this.taskService.getAllTasks().subscribe(
    (result) => {
      this.tasks=result;
      this.taskCompletedCount=this.getNbTasksCompleted();
      console.log(this.tasks);
      if (this.tasks && this.tasks.length > 0) {
        this.taskCompletedCount = this.getNbTasksCompleted();
      }

    },
    (error) => {
      console.error('Error fetching Tasks:', error);
      console.log(this.tasks)})
    }

    getNbTasksCompleted(): number {
      let taskCompletedCount = 0;

      // Check if tasks array is defined and not empty
      console.log(this.tasks)
      if (this.tasks && this.tasks.length > 0) {
        for (let i = 0; i < this.tasks.length; i++) {

          if (this.tasks[i].status === TaskStatus.Complete) {
            taskCompletedCount++;
          }
        }
      }

      return taskCompletedCount;
    }



    UpdateTask(task: Task) {
      this.taskService.UpdateTask(task,task.id).subscribe(
        () => {
          alert('task successfully updated.');

        },
        (error) => {
          console.error('Error update Task:', error);

        }
      );
    }

    DeleteTask(idTask: number) {
      this.taskService.DeleteTask(idTask).subscribe(
        () => {
          alert("Task"+" "+idTask +"is deleted successfully");

          // La suppression a réussi, mettez à jour la liste des fournisseurs

          this.taskService.getAllTasks();
          console.log(this.task)
        },
        (error) => {
          console.error('Error Delete task:', error);
        }
      );
    }



 editingTask:Task | null = null; // Ajoutez cette ligne



 setEditingTask(task: Task | null) {
   this.editingTask = task;
 }


 addTask(addForm: NgForm) {
  if (addForm.valid) {
    // Vérifiez si le formulaire est valide avant d'ajouter le fournisseur
    this.taskService.AddTask(this.task).subscribe(
      () => {
        alert('task is added successfully');
        // Réinitialisez le formulaire après l'ajout si nécessaire
        addForm.resetForm();
      },
      (error) => {
        console.error('Error add task:', error);
      }
    );
  }
}
}
