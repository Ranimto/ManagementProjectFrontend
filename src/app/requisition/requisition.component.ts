import { Component, OnInit } from '@angular/core';
import { Requisition } from '../models/requisition';
import { NgForm } from '@angular/forms';
import { RequisitionStatus } from '../models/RequisitionStatus';
import { RequisitionLine } from '../models/requisition-line';
import { User } from '../models/user';
import { EmployeeService } from '../services/employeeService/employee.service';
import { HttpHeaders } from '@angular/common/http';
import { RequisitionService } from '../services/requisitionService/requisition.service';


@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.css']
})
export class RequisitionComponent implements OnInit {
  users: User[] = [];
  showForm = false;
  isEditing = false;
  requisition: Requisition={
    id: 0,
    name: '',
    purpose: '',
    details: '',
    requestedDate: new Date(),
    requisitionDate:new Date(),
    amount: 0,
    requisitionStatus:RequisitionStatus.Pending,
    user: new User(), 
    requisitionLines: new RequisitionLine(), 
  }
  
  public requisitions: Requisition[] = [];
  constructor(private employeeService :EmployeeService, private requisitionService: RequisitionService) {
  
   }

  ngOnInit(): void {
    this.getAllEmployees();
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
  openDatePicker() {
    // Vous pouvez ajouter le code ici pour ouvrir le datepicker si nécessaire
  }
  
 


  editingRequisition: Requisition | null = null; // Ajoutez cette ligne
  setEditingProvider(requisition: Requisition | null) {
    this.editingRequisition = requisition;
  }

  getAllEmployees (){
    this.employeeService.getEmployees().subscribe(
      (result) => {
        this.users = result;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

  }

  addRequisition(addForm: NgForm) {
    if (addForm.valid) {
      // Définissez vos options HTTP avec les en-têtes d'autorisation
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNzAwODY3MjA1LCJleHAiOjE3MDg4NjcyMDV9.zQKiKxdUcs5tx1c-ovW_Iutvvm7taRiQTnHfnU28lg0'
      //   })
      // };
      // Vérifiez si le formulaire est valide avant d'ajouter le fournisseur
      this.requisitionService.addRequisitionHeader(this.requisition).subscribe(
        () => {
          alert('requisition is added successfully');
          // Réinitialisez le formulaire après l'ajout si nécessaire
          addForm.resetForm();
        },
        (error) => {
          console.error('Error add requisition:', error);
        }
      );
    }
  }

}
