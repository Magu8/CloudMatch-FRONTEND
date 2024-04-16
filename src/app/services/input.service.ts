import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private urls = {
    addLS:
      'http://localhost/CloudMatch-BACKEND/php/redis/input/addLocalScore.php',
    subsLS:
      'http://localhost/CloudMatch-BACKEND/php/redis/input/substractLocalScore.php',
    addVS:
      'http://localhost/CloudMatch-BACKEND/php/redis/input/addVisitorScore.php',
    subsVS:
      'http://localhost/CloudMatch-BACKEND/php/redis/input/substractVisitorScore.php',
    addPERIOD:
      'http://localhost/CloudMatch-BACKEND/php/redis/input/addPERIOD.php',
    substactPERIOD:
      'http://localhost/CloudMatch-BACKEND/php/redis/input/substractPERIOD.php',
  };

  constructor(private http: HttpClient) {}

  input(type: string) {
    if (type === 'LS+') {
      return this.http.post(this.urls.addLS, this.httpOptions);
    } else if (type === 'LS-') {
      return this.http.post(this.urls.subsLS, this.httpOptions);
    } else if (type === 'VS+') {
      return this.http.post(this.urls.addVS, this.httpOptions);
    } else if (type === 'VS-') {
      return this.http.post(this.urls.subsVS, this.httpOptions);
    } else if (type === 'P+') {
      return this.http.post(this.urls.addPERIOD, this.httpOptions);
    } else {
      return this.http.post(this.urls.substactPERIOD, this.httpOptions);
    }
  }
}
