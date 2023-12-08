import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisateur } from 'src/app/ModelsEvents/organisateur';
import { environment } from 'src/environments/environment';
import { AutheneventService } from '../AuthenEvents/authenevent.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisateurService {
  private URL = environment.apiBasrUrlEvent;
  constructor(private http: HttpClient, private authServicee:AutheneventService) { }

  getAllOrganisateurs(): Observable<Organisateur[]> {
      // Récupérer le token depuis le service AuthService
    const token = this.authServicee.getToken();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //console.log('Fetching all organisateurs with token:', token);
    return this.http.get<Organisateur[]>(`${this.URL}/api/organisateurs/all`, {
      headers,
    });
  }

  getOrganisateurById(idorganisateur: number): Observable<Organisateur[]> {
    const token = this.authServicee.getToken();

    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Organisateur[]>(`${this.URL}/api/organisateurs/by/${idorganisateur}`, {
      headers,
    });
  }

  createOrganisateur(organisateurData: Organisateur) : Observable<Organisateur[]> {
    const token = this.authServicee.getToken();

    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Organisateur[]>(`${this.URL}/api/organisateurs/add`, organisateurData, {
      headers,
    });
  }

  updateOrganisateur(idorganisateur: number, organisateur: Organisateur) : Observable<Organisateur>  {
    const token = this.authServicee.getToken();

    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Organisateur>(`${this.URL}/api/organisateurs/update/${idorganisateur}`, organisateur, {
      headers,
    });
  }

  deleteOrganisateur(idorganisateur: number): Observable<void> {
    const token = this.authServicee.getToken();

    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.URL}/api/organisateurs/delete/${idorganisateur}`, {
      headers,
    });
  }
}
