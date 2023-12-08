import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private URL=environment.apiBaseUrl;
  constructor(private http :HttpClient) { }

  getAllProduct(){
    return this.http.get<ProductModel[]>(`${this.URL}/api/product/all`);
  }
}
