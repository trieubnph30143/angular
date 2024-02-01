import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUser =
    'https://curious-pithivier-714a06.netlify.app/.netlify/functions/api/auth';

  constructor(private http: HttpClient) {}

  SignUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUser}/signup`, data);
  }
  SignIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUser}/signin`, data);
  }
  getPagiUser(page: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUser}/pagi?page=${page.page}&size=${page.size}`
    );
  }
  getSearchUser(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUser}/search/${id.search}?page=${id.page}&size=${id.size}`
    );
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUser}/delete/${id}`);
  }
}
