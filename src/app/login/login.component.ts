import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employeeService/employee.service';
import { AuthenticationService } from '../services/authService/authentication.service';
import { EmailService } from '../services/emailService/email.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Email } from '../models/Email';
import { NgForm } from '@angular/forms';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { Router } from '@angular/router';
import { Role } from '../models/Role';
import { LocalStorageService } from '../TokenClass';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // employee: any = {};
  // email:any={}
  // authResponse: any = {};
  // message = '';
  // otpCode = '';
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
authenrequests: AuthenticationRequest[]=[];
authenrequest: AuthenticationRequest={
  email:'',
  password:''
}
  constructor(private authService:AuthenticationService, private router: Router, private tokenService: LocalStorageService) { }
 

  ngOnInit(): void {
    }
    authentificate(addForm: NgForm) {
      if (addForm.valid) {
        this.authService.authenticate(this.authenrequest).subscribe(
          (response) => {
            console.log('After successful authentication:', response);
   
            // Enregistrez le rôle de l'utilisateur après une authentification réussie
            this.authService.setUserRole(response.role);
    
            alert('Employee is authenticated successfully');
    
            // Naviguer en fonction du rôle s'il est défini
            if (response.role) {
              this.navigateToPageBasedOnRole(response.role);
            } else {
              console.warn('Role is undefined. Unable to navigate based on role.');
            }
          },
          (error) => {
            console.error('Error during authentication:', error);
            alert('Failed to authenticate employee. Please try again.');
          }
        );
      }
    }
    
    private navigateToPageBasedOnRole(role: string): void {
      switch (role) {
        case 'ADMIN':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'EMPLOYEE':
          this.router.navigate(['/requisition']);
          break;
        case 'PURCHASE_MANAGER':
          this.router.navigate(['/requisition']);
          break;
        default:
          console.warn('Role not recognized:', role);
          // Vous pouvez gérer d'autres rôles ou cas ici
      }
    }
  
  
  
  }





    //Register employee
    // registerEmployee(addForm: NgForm) {
    //   this.employeeService.registerEmployee(addForm.value).subscribe(
    //     (response: Employee) => {
    //       this.email.toEmail="sahar.khmissi1@gmail.com"
    //       this.email.subject="Account Credentials"
    //       this.email.body="Dear"+addForm.value.firstname+addForm.value.lastname+", "+"Please find below your credentials .. Email : "+addForm.value.email+" and  Password : "+addForm.value.password
         
    //       console.log("email" + this.email.body)
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert("erreur" + error.message);
    //     },
    //   );
    //   console.log("email" + this.employee.email)
    // }
    //Send Email to new employee to inform him
    // sendEmail(){
    //   this.emailService.sendEmail(this.email).subscribe(
    //     (response: Email) => {this.emailService.sendEmail(this.email)},
    //     (error: HttpErrorResponse) => {
    //       alert("erreur" + error.message);
    //     },
    //   )
    // }
      // user: any = {}; // Cette propriété stockera les données du formulaire
    
      // createAccount() {
      //   // Gérez la création de compte ici avec this.user
      // }
    
      // signIn() {
      //   // Gérez la connexion ici avec this.user
      // }


