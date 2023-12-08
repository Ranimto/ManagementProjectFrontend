import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AutheneventService } from 'src/app/ServiceEvenements/AuthenEvents/authenevent.service';
import { AuthenticationRequest } from 'src/app/models/AuthenticationRequest';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { Role } from 'src/app/models/Role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //private userRole!: Role;
  private apiServiceUrl=environment.apiBaseUrl;

  private readonly TOKEN_KEY = 'jwtToken';

  //pour récupèrer le token du localStorage.
  getToken1(): string | null {
      return localStorage.getItem(this.TOKEN_KEY);
  }

  //pour stocker un token dans le localStorag
  setToken1(token: string): void{
   localStorage.setItem(this.TOKEN_KEY, token);
  }


// pour supprimer un token du localStorage
removeToken1(): void {
  localStorage.removeItem(this.TOKEN_KEY);
}
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNzAwOTUyNTU1LCJleHAiOjE3MDg5NTI1NTV9.S1rxETp95q6BJ_SKut-z8BfWNk0GYEr5rcS0nqzKXkw'
  // });
  private userRole: Role | undefined;

  setUserRole(role: Role | undefined) {
    this.userRole = role;
  }

  getUserRole(): Role | undefined {
    return this.userRole;
  }

  hasUserRole(expectedRole: Role): boolean {
    return !!this.userRole && this.userRole === expectedRole;
  }
  
  constructor(private http:HttpClient, private authen: AutheneventService) { }
//authentification
  public authenticate(authRequest:AuthenticationRequest):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.apiServiceUrl}/api/auth/authenticate`,authRequest)
    .pipe(
      tap(response => {
          console.log('Token received:', response.accessToken);
          this.setToken1(response.accessToken!);
          console.log('Token saved:', this.getToken1());
      })
  );
    
  }



}
  // getUserRole(): Role {
  //   return this.userRole;
  // }
  /*registerUser(registerRequest: Employee, httpOptions?: any) {
    return this.http.post<Employee[]>(`${this.apiBaseUrl}/api/user/add`, registerRequest);
  }

  public login(authRequest: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiBaseUrl}/user/authenticate`, authRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.apiBaseUrl}/verify`, verificationRequest);
  } */