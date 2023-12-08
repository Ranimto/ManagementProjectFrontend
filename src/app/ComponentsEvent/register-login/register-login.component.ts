import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Organisateur } from 'src/app/ModelsEvents/organisateur';
import { AutheneventService } from 'src/app/ServiceEvenements/AuthenEvents/authenevent.service';
import { OrganisateurService } from 'src/app/ServiceEvenements/Organisateurs/organisateur.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  organisateurs: Organisateur[] = [];
  organisateur: Organisateur={
    id:0,
    firstname:'',
    lastname:'',
    email:'',
    cin:'',
    phoneNumber:'',
    adresse:'',
    password:'',
    role:''
  };
  constructor(private authService : AutheneventService) { }

  ngOnInit(): void {
  }
  SignUp(addForm: NgForm) {
    if (addForm.valid) {
      this.authService.SignUp(this.organisateur).subscribe(
        () => {
          alert('account is added successfully');
          addForm.resetForm();
        },
        (error) => {
          console.error('Error add account:', error);
        }
      );
    }
  }
}
