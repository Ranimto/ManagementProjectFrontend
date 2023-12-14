import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TaskStatus } from 'src/app/models/TaskModel/TaskStatus';
import { Priority } from 'src/app/models/TaskModel/Priority';
import { Task } from 'src/app/models/TaskModel/Task';
import { TaskService } from 'src/app/services/serviceSTBS/taskService/task.service';
import { NotifierService } from 'angular-notifier';
import { Chart } from 'chart.js';

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
  NbTasksPending!:number;  NbTasksCompleted!:number; NbTasksTesting!:number; NbTasksInProgress!:number;
  //data= new Map<string, number>();

   data = {
    'Completed': 0,
    'Pending': 0,
    'Testing': 0,
    'InProgress': 0,
  };

  constructor(private taskService:TaskService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.getAllTasks();
    console.log("le task est " + this.taskCompletedCount);
    this.getChar();

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
  }

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
      const taskCount = pendingTasks.length;
      this.data.Completed=taskCount; // Push the number to the data array
      return taskCount;

    }

    getNbTasksPending(tasks: Task[]): number {
      if (!tasks || tasks.length === 0) { return 0; }
      const pendingTasks = tasks.filter(task => task.status === TaskStatus.Pending);
      this.data.Pending=pendingTasks.length;
      return pendingTasks.length;
    }

    getNbTasksTesting(tasks: Task[]): number {
      if (!tasks || tasks.length === 0) { return 0; }
      const pendingTasks = tasks.filter(task => task.status === TaskStatus.Testing);
      this.data.Testing=pendingTasks.length;
      return pendingTasks.length;
    }
    getNbTasksInProgress(tasks: Task[]): number {
      if (!tasks || tasks.length === 0) { return 0; }
      const pendingTasks = tasks.filter(task => task.status === TaskStatus.In_Progress);
      this.data.InProgress=pendingTasks.length;
      return pendingTasks.length;
    }


    UpdateTask(task: Task) {
      this.taskService.UpdateTask(task,task.id).subscribe(
        () => {
          this.notifierService.notify('success', 'Task is updated succefully!');

        },
        (error) => {
          console.error('Error update Task:', error);

        }
      );
    }

    DeleteTask(idTask: number) {
      this.taskService.DeleteTask(idTask).subscribe(
        () => {
          this.notifierService.notify('success', 'Task is deleted succefully!');

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



//charjs
getChar(){

  var myChart = new Chart("myChart", {
    type: 'pie',
    data: {
        labels: ['Completed','Pending', 'In Progress', 'Testing'],
        datasets: [{
            label: 'Task Status',
            data: [this.data.Completed,this.data.Pending,this.data.InProgress,this.data.Testing],
            backgroundColor:["#2ecc71", "#3498db", "#f1c40f"],
            borderColor: ["#2ecc71", "#3498db", "#f1c40f"],
            borderWidth: 1
        },
       ]
    },

});
}


}
