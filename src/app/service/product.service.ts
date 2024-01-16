import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductAdmin } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api =
    'https://hilarious-zabaione-9cf395.netlify.apps/.netlify/functions/api/product';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  getOneProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
  addProduct(product: any) {
    return this.http.post(`${this.api}`, product);
  }
  updateProduct(product: any) {
    return this.http.put(`${this.api}/${product.id}`, product);
  }
}
