import { Component, inject } from '@angular/core';
import { Login } from '../../../../models/login';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { Store } from '@ngrx/store';
import { logActiveUser } from '../../../../actions/activeUser.actions';


@Component({
  selector: 'cloudMatch-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {


  private store = inject(Store);

  login: Login = {
    email: 'mg@cloudMatch.com',
    password: 'iamadmin',
  };
  scrollToRegister(): void {
    const element = document.getElementById('register_div');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  loginUser(loginBody: Login) {
    this.store.dispatch(logActiveUser({ login: { ...loginBody } }));
  }
}
