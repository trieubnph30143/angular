import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api =
    'https://hilarious-zabaione-9cf395.netlify.app/.netlify/functions/api/category';

  constructor(private http: HttpClient) {}
  getCategory(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  getOneCategory(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }
  deleteCategory(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
  addCategory(Category: any) {
    return this.http.post(`${this.api}`, Category);
  }
  updateCategory(Category: any) {
    return this.http.put(`${this.api}/${Category.id}`, Category);
  }
}
