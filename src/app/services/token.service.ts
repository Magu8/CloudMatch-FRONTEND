import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  saveToken(token: any): Observable<any> {
    const saveTokenUrl = `http://localhost/CloudMatch-BACKEND/php/redis/token/saveToken.php?TOKEN=${token}`;
    console.log(token);
    return this.http.post<any>(saveTokenUrl, this.httpOptions);
  }

  getToken(): Observable<any> {
    const getTokenUrl =
      'http://localhost/CloudMatch-BACKEND/php/redis/token/getToken.php';
    return this.http.get<any>(getTokenUrl, this.httpOptions);
  }
}
