import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Organisation } from 'src/app/ModelsEvents/organisation';
import { environment } from 'src/environments/environment';
import { AutheneventService } from '../AuthenEvents/authenevent.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private URL = environment.apiBasrUrlEvent;
  constructor(private http: HttpClient, private authServicee:AutheneventService) { }

  getAllOrganisations(): Observable<Organisation[]> {
     // Récupérer le token depuis le service AuthService
     const token = this.authServicee.getToken();
     console.log('Token:', token);
     // Créer les en-têtes avec le token d'autorisation
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Organisation[]>(`${this.URL}/api/organisations/all`, {
      headers,
    })
  }

  getOrganisationById(idorganisation: number): Observable<Organisation[]> {
     // Récupérer le token depuis le service AuthService
     const token = this.authServicee.getToken();
     console.log('Token:', token);
     // Créer les en-têtes avec le token d'autorisation
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Organisation[]>(`${this.URL}/api/organisations/by/${idorganisation}`, {
      headers,
    });
  }

  createOrganisation(organisationData: Organisation) : Observable<Organisation[]> {
     // Récupérer le token depuis le service AuthService
     const token = this.authServicee.getToken();
     console.log('Token:', token);
     // Créer les en-têtes avec le token d'autorisation
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Organisation[]>(`${this.URL}/api/organisations/add`, organisationData, {
      headers,
    });
  }

  updateOrganisation(idorganisation: number, organisation: Organisation) : Observable<Organisation>  {
     // Récupérer le token depuis le service AuthService
     const token = this.authServicee.getToken();
     console.log('Token:', token);
     // Créer les en-têtes avec le token d'autorisation
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Organisation>(`${this.URL}/api/organisations/update/${idorganisation}`, organisation, {
      headers,
    });
  }

  deleteOrganisation(idorganisation: number): Observable<void> {
     // Récupérer le token depuis le service AuthService
     const token = this.authServicee.getToken();
     console.log('Token:', token);
     // Créer les en-têtes avec le token d'autorisation
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.URL}/api/organisations/delete/${idorganisation}`, {
      headers,
    });
  }
}
