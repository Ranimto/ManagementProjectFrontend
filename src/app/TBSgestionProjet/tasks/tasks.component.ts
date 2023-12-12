import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TaskStatus } from 'src/app/models/TaskModel/TaskStatus';
import { Priority } from 'src/app/models/TaskModel/Priority';
import { Task } from 'src/app/models/TaskModel/Task';
import { TaskService } from 'src/app/services/serviceSTBS/taskService/task.service';
import { NotifierService } from 'angular-notifier';

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
  selectedSortOption!: string;
  selectedFilterOption!: string;


  constructor(private taskService:TaskService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.getAllTasks();
    console.log("le task est " + this.taskCompletedCount);

  }

  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire
  }

// pour le tri
  sortTasks(tasks: Task[]){
    if (this.selectedSortOption ==='name') {
      this.tasks.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (this.selectedSortOption ==='startDate') {
      this.tasks.sort((a, b) => new Date(a.startDate).getDate() - new Date(b.startDate).getDate());
    }
   // else if (this.selectedSortOption ==='Complete') {this.tasks.sort(a=> a.status.localeCompare(TaskStatus.Complete))}
    //else if (this.selectedSortOption ==='Pending') {{this.tasks.filter((a,b)=> a.status.localeCompare(TaskStatus.Complete))}}
    //else if (this.selectedSortOption ==='Testing') {}
  }
  //filterTasks(tasks: Task[]){
   // if (this.selectedSortOption ==='Complete') {this.tasks.sort(a=> a.status.localeCompare(TaskStatus.Complete))}
   // else if (this.selectedSortOption ==='Pending') {this.tasks.filter((a,b)=> a.status.localeCompare(TaskStatus.Pending))}
   // else if (this.selectedSortOption ==='Testing') {this.tasks.filter((a,b)=> a.status.localeCompare(TaskStatus.Testing))}
 // }
  filterTasks(tasks: Task[]): Task[] {
    if (this.selectedFilterOption === TaskStatus.Complete) {
      return tasks.filter((a => a.status === TaskStatus.Complete));
    } else if (this.selectedFilterOption === 'Pending') {
      return tasks.filter((a) => a.status === TaskStatus.Pending);
    } else if (this.selectedFilterOption === 'Testing') {
      return tasks.filter((a) => a.status === TaskStatus.Testing);
    } else {
      return tasks;
    }
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
      console.log(this.tasks);

    },
    (error) => {
      console.error('Error fetching Tasks:', error);
      console.log(this.tasks)})
    }



    getNbTasksCompleted(tasks: Task[]): number {
      if (!tasks || tasks.length === 0) { return 0; }
      const pendingTasks = tasks.filter(task => task.status === TaskStatus.Complete);
      return pendingTasks.length;
    }

    getNbTasksPending(tasks: Task[]): number {
      if (!tasks || tasks.length === 0) { return 0; }
      const pendingTasks = tasks.filter(task => task.status === TaskStatus.Pending);
      return pendingTasks.length;
    }

    getNbTasksTesting(tasks: Task[]): number {
      if (!tasks || tasks.length === 0) { return 0; }
      const pendingTasks = tasks.filter(task => task.status === TaskStatus.Testing);
      return pendingTasks.length;
    }
    getNbTasksInProgress(tasks: Task[]): number {
      if (!tasks || tasks.length === 0) { return 0; }
      const pendingTasks = tasks.filter(task => task.status === TaskStatus.In_Progress);
      return pendingTasks.length;
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

        //alert('task is added successfully');
        // Réinitialisez le formulaire après l'ajout si nécessaire
        addForm.resetForm();
          this.notifierService.notify('success', 'Task is added succefully!');
      },
      (error) => {
        console.error('Error add task:', error);
        this.notifierService.notify('error', 'Error, Check your credentials please !');
      }
    );
  }
}
printReport():void {
  let datatype ='application/vnd.ms-excel.sheet.macroEnabled.12';
  let tableSelect=document.getElementById('tasks');
  let tableHtml=tableSelect?.outerHTML.replace(/ /g,'%20');
  let downloadLink=document.createElement('a') ;
  document.body.appendChild(downloadLink);
  downloadLink.href='data:'+datatype+',' +tableHtml;
  downloadLink.download='project-report.xls';
  downloadLink.click();
  document.body.removeChild(downloadLink);

}

}
