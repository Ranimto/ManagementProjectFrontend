import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/models/Provider';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {

  private URL=environment.apiBaseUrl;
  constructor(private http :HttpClient, private authen: AuthenticationService) { }
  // private addTokenToHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  // }
  

  getAllProviders(): Observable<Provider[]> {
    const token = this.authen.getToken1();
      console.log('Token:', token);
      // Créer les en-têtes avec le token d'autorisation
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Provider[]>(`${this.URL}/api/provider/all`, { headers,});
  }

  DeleteProvider(idProvider: number): Observable<void> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // const headersWithToken = this.addTokenToHeaders();
    return this.http.delete<void>(`${this.URL}/api/provider/delete/${idProvider}`, { headers, });
  }
  AddProvider(providerData: Provider): Observable<Provider[]> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   // const headersWithToken = this.addTokenToHeaders();
    return this.http.post<Provider[]>(`${this.URL}/api/provider/add`, providerData, { headers, });
  }

  UpdateProvider(providerData: Provider): Observable<Provider[]> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //  const headersWithToken = this.addTokenToHeaders();
    return this.http.put<Provider[]>(`${this.URL}/api/provider/update`, providerData, { headers, });
  }

}
