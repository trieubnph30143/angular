import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductAdmin } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api =
    'https://curious-pithivier-714a06.netlify.app/.netlify/functions/api/product';

  constructor(private http: HttpClient) {}

  getProduct(page?: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}?page=${page.page}&size=${page.size}`
    );
  }
  getOneProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/detail/${id}`);
  }
  getCategoryProduct(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/category/${id.id}?page=${id.page}&size=${id.size}`
    );
  }
  getSearchProduct(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/search/${id.search}?page=${id.page}&size=${id.size}`
    );
  }
  getSearchDebouceProduct(id: any): Observable<any> {
    return this.http.get<any>(`${this.api}/searchdebouce?search=${id.search}`);
  }
  getFilterProduct(id: any): Observable<any> {
    return this.http.post<any>(
      `${this.api}/filter?page=${id.page}&size=${id.size}`,
      { id: id.id }
    );
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
