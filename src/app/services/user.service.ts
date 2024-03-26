import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  login(user: Login): Observable<any> {
    const loginUrl =
      'http://localhost/CloudMatch-BACKEND/php/auth/authenticate.php';
    const loginBody = JSON.stringify(user);
    return this.http.post<any>(loginUrl, loginBody, this.httpOptions);
  }

  register(user: Register) {
    const registerUrl =
      'http://localhost/CloudMatch-BACKEND/php/users_controller/registerUser.php';
    const registerBody = JSON.stringify(user);
    return this.http.post(registerUrl, registerBody, this.httpOptions);
  }

  getAllUsers(){
    const getAllUsersUrl = 'http://localhost/CloudMatch-BACKEND/php/users_controller/getAllUsers.php';
    return this.http.get(getAllUsersUrl, this.httpOptions)
  }


}
