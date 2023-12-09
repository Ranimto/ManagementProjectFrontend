import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBaseUrl=environment.apiBaseUrlTask;

  constructor(private http:HttpClient) { }

  login(email: String , password:String){

    // form json
    const request={
      email :email,
      password :password
    }
    return this.http.post<any>(`${this.apiBaseUrl}/auth/authenticate`, request)
  }



  register(nom :String ,prenom :String ,email: String , password:String, role:Role){

    // form json
    const request={

      nom:nom,
      prenom:prenom,
      email :email,
      password :password,
      role: role
    }
    return this.http.post<any>(`${this.apiBaseUrl}/auth/register`, request)
  }
}
