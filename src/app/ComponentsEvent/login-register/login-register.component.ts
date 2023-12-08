import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/ModelsEvents/login-request';
import { AutheneventService } from 'src/app/ServiceEvenements/AuthenEvents/authenevent.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
loginrequest: LoginRequest={
email:'',
password:''
}
  constructor(private autheneventService : AutheneventService, private router: Router) { }

  ngOnInit(): void {
  }
  Authenticate(addForm: NgForm) {
    if (addForm.valid) {
      this.autheneventService.authenticate(this.loginrequest).subscribe(
        () => {
          alert('Authentification is done successfully.');
          addForm.resetForm();
          this.router.navigate(['/evenement'])
        },
        (error) => {
          console.error('Error  Authentification:', error);
          // Affichez un message d'erreur à l'utilisateur ici.
        }
      );
    }
  }
}
