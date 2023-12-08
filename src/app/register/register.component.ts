import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationRequest } from '../models/VerificationRequest';

import { AuthenticationService } from '../services/authService/authentication.service';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';

  constructor(private authService: AuthenticationService,private router: Router) { }
  
  ngOnInit(): void {
  }

  // registerUser() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjVAZ21haWwuY29tIiwiaWF0IjoxNzAxMDE3NzY4LCJleHAiOjE3MDkwMTc3Njh9.L-oy0ZzXM3YM2Zz5jAVAiYAigfhJidy_aydjGjqf1OA'
  //     })
  //   };
  //   this.message = '';
  //   this.authService.register(this.registerRequest, httpOptions)
  //     .subscribe({
  //       next: (event: HttpEvent<AuthenticationResponse[]>) => {
  //         if (event instanceof HttpResponse) {
  //           this.authResponse = event.body as AuthenticationResponse;;
  //         } else {
  //           // inform the user
  //           this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
  //           console.log('Received event of type:', event.type);
  //           setTimeout(() => {
  //             this.router.navigate(['']);
  //           }, 3000)
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Error occurred:', err);
  //       }
  //     });

  // }

  // verifyTfa() {
  //   this.message = '';
  //   const verifyRequest: VerificationRequest = {
  //     email: this.registerRequest.email,
  //     code: this.otpCode
  //   };
  //   this.authService.verifyCode(verifyRequest)
  //     .subscribe({
  //       next: (response) => {
  //         this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
  //         setTimeout(() => {
  //           localStorage.setItem('token', response.accessToken as string);
  //           this.router.navigate(['welcome']);
  //         }, 3000);
  //       }
  //     });
  // }
//   employee: any = {};
//   email:any={}
//   authResponse: any = {};
//   message = '';
//   otpCode = '';
//   constructor(private employeeService: EmployeeService,private emailService:EmailService,private authService:AuthenticationService) { }

//   ngOnInit(): void {
//   }
//   //Register employee
//   registerEmployee(addForm: NgForm) {
//     this.employeeService.registerEmployee(addForm.value).subscribe(
//       (response: Employee) => {
//         this.email.toEmail="sahar.khmissi1@gmail.com"
//         this.email.subject="Account Credentials"
//         this.email.body="Dear"+addForm.value.firstname+addForm.value.lastname+", "+"Please find below your credentials .. Email : "+addForm.value.email+" and  Password : "+addForm.value.password
//      this.sendEmail()
//         console.log("email" + this.email.body)
//       },
//       (error: HttpErrorResponse) => {
//         alert("erreur" + error.message);
//       },
//     );
//     console.log("email" + this.employee.email)
//   }
//   //Send Email to new employee to inform him
//   sendEmail(){
//     this.emailService.sendEmail(this.email).subscribe(
//       (response: Email) => {this.emailService.sendEmail(this.email)},
//       (error: HttpErrorResponse) => {
//         alert("erreur" + error.message);
//       },
//     )
//   } 
}
