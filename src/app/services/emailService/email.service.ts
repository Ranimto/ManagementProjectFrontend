import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Email } from 'src/app/models/Email';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiServiceUrl=environment.apiBaseUrl;
  

  constructor(private http:HttpClient, private authen: AuthenticationService) { }

  
  public sendEmail(email:Email):Observable<Email>{
    const token = this.authen.getToken1();
      console.log('Token:', token);
      // Créer les en-têtes avec le token d'autorisation
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Email>(`${this.apiServiceUrl}/api/email/send`,email, { headers,});
  }
}
