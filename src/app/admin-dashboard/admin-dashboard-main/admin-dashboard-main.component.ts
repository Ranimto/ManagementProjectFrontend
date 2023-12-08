import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/Employee';
import { Role } from 'src/app/models/Role';
import { Report } from 'src/app/models/report';
import { Requisition } from 'src/app/models/requisition';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { EmailService } from 'src/app/services/emailService/email.service';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';

@Component({
  selector: 'app-admin-dashboard-main',
  templateUrl: './admin-dashboard-main.component.html',
  styleUrls: ['./admin-dashboard-main.component.css']
})
export class AdminDashboardMainComponent implements OnInit {
  // Définissez les options du rôle
roleOptions: { value: Role; label: string }[] = [
  { value: Role.EMPLOYEE, label: 'Employee' },
  { value: Role.ADMIN, label: 'Admin' },
  { value: Role.PURCHASE_MANAGER, label: 'Purchase Manager' },
];
employees: Employee[]=[];
employee: Employee={
  id:0,
  firstname:'',
  lastname:'',
  email:'',
  password:'',
  phone:'',
  imageURL:'',
  createdAt:'',
  tfaEnabled:false,
  secret:'',
  position:'',
  role:Role.ADMIN,
  requisitions: new Requisition(),
  reports:new Report()
}
email: any = {}; // Assurez-vous que la classe Email est correctement définie

  constructor(private employeeService :EmployeeService, private http: HttpClient, private emailService:EmailService) { }

  ngOnInit(): void {
  }
  addEmployee(addForm: NgForm){
    console.log('Is the form valid?', addForm.valid);
    console.log('Employee to be added:', this.employee);
    console.log('roleOptions:', this.roleOptions);
    console.log("Role:", this.employee.role);
    if (addForm.valid) {
     
     // Vérifiez si le formulaire est valide avant d'ajouter le fournisseur
     console.log('Before calling registerEmployee');
      this.employeeService.registerEmployee(this.employee).subscribe(
        () => {
          console.log('After successful registration');
          alert('employee is added successfully');
            // Envoyer un e-mail après l'ajout de l'employé
            this.sendRegistrationEmail(addForm.value);
          // Réinitialisez le formulaire après l'ajout si nécessaire
          addForm.resetForm();
        },
        (error) => {
          console.error('Error add employee:', error);
          alert('Failed to add employee. Please try again.');
        }
      );
    }
  }
   // Envoyer un e-mail après l'ajout de l'employé
   sendRegistrationEmail(employeeData: any) {
    this.email.toEmail = employeeData.email;
    this.email.subject = "Account Credentials";
    this.email.body = `Dear ${employeeData.firstname} ${employeeData.lastname}, Please find below your credentials. Email: ${employeeData.email} and Password: ${employeeData.password}`;

    this.emailService.sendEmail(this.email).subscribe(
      (response: any) => {
        console.log('Email sent successfully:', response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error sending email:', error);
        alert(`Failed to send email. Error: ${error.message}`);
      }
    );
  }
}
