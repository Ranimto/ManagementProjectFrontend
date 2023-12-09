import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
import { AuthService } from 'src/app/services/serviceSTBS/authService/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nom! : String
  prenom! : String
  email!: String
  password!: String
  role!: Role
  constructor(private router:Router, private authService : AuthService){}


  ngOnInit(): void {

  }

  OnRegister ():void{
 this.authService.register(this.nom, this.prenom, this.email,this.password,this.role).subscribe( {next:

      (Response)=>{
      const token= Response.token;

      localStorage.setItem('token',token) ;
      console.log(token);
      alert("Register done");
      this.router.navigate(['projects']);
        }

    }


      )

   }

}
