import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL = environment.apiBaseUrl ;

  constructor(private http: HttpClient, private authen: AuthenticationService) { }

  getAllCategories(): Observable<Category[]> {
    const token = this.authen.getToken1();
      console.log('Token:', token);
      // Créer les en-têtes avec le token d'autorisation
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(`${this.URL}/api/category/all`, { headers,});
  }

  DeleteCategory(idCategory: number): Observable<void> {
    const token = this.authen.getToken1();
      console.log('Token:', token);
      // Créer les en-têtes avec le token d'autorisation
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.URL}/api/category/delete/${idCategory}`, { headers,});
  }


  AddCategory(categoryData: Category) : Observable<Category[]> {
    const token = this.authen.getToken1();
      console.log('Token:', token);
      // Créer les en-têtes avec le token d'autorisation
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Category[]>(`${this.URL}/api/category/add`, categoryData, { headers,});
  }
  UpdateCategory(categoryData: Category)  {
    const token = this.authen.getToken1();
    console.log('Token:', token);
    // Créer les en-têtes avec le token d'autorisation
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Category[]>(`${this.URL}/api/category/update`, categoryData, { headers,});
  }

  // DeleteCategory(idCategory: number, httpOptions?: any): Observable<HttpEvent<void>> {
  //   return this.http.delete<void>(`${this.URL}/api/category/delete/${idCategory}`, httpOptions || {});
  // }


  // AddCategory(categoryData: Category, httpOptions?: any) : Observable<HttpEvent<Category[]>> {
  //   return this.http.post<Category[]>(`${this.URL}/api/category/add`, categoryData, httpOptions || {});
  // }
  // UpdateCategory(categoryData: Category, httpOptions?: any)  {
  //   return this.http.put<Category[]>(`${this.URL}/api/category/update`, categoryData,  httpOptions || {});
  // }
}
