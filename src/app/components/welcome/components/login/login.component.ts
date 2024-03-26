import { Component, inject } from '@angular/core';
import { Login } from '../../../../models/login';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { logActiveUser } from '../../../../actions/activeUser.actions';

@Component({
  selector: 'cloudMatch-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private store = inject(Store);

  login: Login = {
    email: 'ds@cloudMatch.com',
    password: 'iamdelegate',
  };

  loginUserReducer(loginBody: Login) {
    this.store.dispatch(logActiveUser({ login: { ...loginBody } }));
  }
}
