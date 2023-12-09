import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/serviceSTBS/authService/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email!:String
  password!:String

  constructor(private router :Router ,private AuthService : AuthService) {

   }

  ngOnInit(): void {
  }

  OnLogin (): void{


    this.AuthService.login(this.email , this.password).subscribe( (response)=>{

       // Si l'authentification réussit, le token sera dans la réponse
      const token=response.token;
       // Enregistrez le token dans le LocalStorage pour une utilisation ultérieure
       localStorage.setItem('token', token);

      console.log( token) ;
      this.router.navigate(['projects']);
      alert("login done");


    },

    (error)=>{ console.log('Erreur d\'authentification :', error);
   alert("Admin not verified !! ")}

    )

 }

}
