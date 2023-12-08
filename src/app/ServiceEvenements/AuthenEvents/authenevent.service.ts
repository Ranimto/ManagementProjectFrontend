import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthenticationResponse } from 'src/app/ModelsEvents/authentication-response';
import { LoginRequest } from 'src/app/ModelsEvents/login-request';
import { Organisateur } from 'src/app/ModelsEvents/organisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutheneventService {
  private URL = environment.apiBasrUrlEvent;
  constructor(private http: HttpClient) { }

  SignUp(organisateurData: Organisateur) : Observable<Organisateur[]> {
    
    return this.http.post<Organisateur[]>(`${this.URL}/api/organisateurs/add`, organisateurData);
  }


  authenticate(authRequest: LoginRequest): Observable<AuthenticationResponse> {
    console.log('Authenticating with request:', authRequest);
    return this.http.post<AuthenticationResponse>(`${this.URL}/auth/authenticate`, authRequest)
        .pipe(
            tap(response => {
                console.log('Token received:', response.token);
                this.saveToken(response.token);
                console.log('Token saved:', this.getToken());
            })
        );
}



    saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
