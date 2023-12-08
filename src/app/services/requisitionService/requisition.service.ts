import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisition } from 'src/app/models/requisition';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {
  private URL = environment.apiBaseUrl ;
  constructor(private http: HttpClient, private authen: AuthenticationService) { }

  
  getAllRequisitions(): Observable<Requisition[]> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Requisition[]>(`${this.URL}/api/requisition/all`, { headers,});
  }

  getApprovedRequisitions(): Observable<Requisition[]> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Requisition[]>(`${this.URL}/api/requisition/approvedRequisitions`, { headers,});
  }

  
  getRequisitionById(id: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Requisition>(`${this.URL}/api/requisition/find/${id}`, { headers,});
  }

  addRequisitionHeader(requisitionData: Requisition) : Observable<Requisition[]> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Requisition[]>(`${this.URL}/api/requisition/addHeader`, requisitionData, { headers,});
  }

  createRequisition(id: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Requisition>(`${this.URL}/api/requisition/${id}/send`, null, { headers,});
  }

  updateRequisition(requisitionData: Requisition)  {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Requisition[]>(`${this.URL}/api/requisition/update`, requisitionData, { headers,});
  }

  approveRequisition(id: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Requisition>(`${this.URL}/api/requisition/approve/${id}`, null, { headers,});
  }

  rejectRequisition(id: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Requisition>(`${this.URL}/api/requisition/reject/${id}`, null, { headers,});
  }

  isRequisitionApproved(id: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Requisition>(`${this.URL}/api/requisition/isRequisitionApproved/${id}`, null, { headers,});
  }

  DeleteRequisition(id: number): Observable<void> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.URL}/api/requisition/delete/${id}`, { headers,});
  }

  getAllRequisitionLinesForRequisition(id: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Requisition>(`${this.URL}/api/requisition/${id}/requisitionLines`, { headers,});
  }

  addRequisitionLineToRequisition(requisitionId: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Requisition>(`${this.URL}/api/requisition/${requisitionId}/addRequisitionLine`, null, { headers,});
  }

  
  getRequisitionsByUserId(userId: number): Observable<Requisition> {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Requisition>(`${this.URL}/api/requisition/user/${userId}`, { headers,});
  }
}
