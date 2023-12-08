import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/app/ModelsEvents/evenement';
import { environment } from 'src/environments/environment';
import { AutheneventService } from '../AuthenEvents/authenevent.service';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {
private URL = environment.apiBasrUrlEvent;
  constructor(private http: HttpClient, private authServicee:AutheneventService) { }

  getAllEvenements(): Observable<Evenement[]> {
      // Récupérer le token depuis le service AuthService
      const token = this.authServicee.getToken();
      console.log('Token:', token);
      // Créer les en-têtes avec le token d'autorisation
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Evenement[]>(`${this.URL}/api/evenements/all`, {
      headers,
    });
  }

  getEvenementById(idevenements: number): Observable<Evenement[]> {
    const token = this.authServicee.getToken();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Evenement[]>(`${this.URL}/api/evenements/by/${idevenements}`, {
      headers,
    });
  }

  createEvenement(evenementsData: Evenement) : Observable<Evenement[]> {
    const token = this.authServicee.getToken();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Evenement[]>(`${this.URL}/api/evenements/add`, evenementsData, {
      headers,
    });
  }

  updateEvenement(idevenements: number, evenement: Evenement) : Observable<Evenement>  {
    const token = this.authServicee.getToken();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Evenement>(`${this.URL}/api/evenements/update/${idevenements}`, evenement, {
      headers,
    });
  }

  DeleteEvenement(idevenements: number): Observable<void> {
    const token = this.authServicee.getToken();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.URL}/api/evenements/delete/${idevenements}`, {
      headers,
    });
  }

}
