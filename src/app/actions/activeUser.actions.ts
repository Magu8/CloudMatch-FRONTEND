import { createAction, props } from '@ngrx/store';
import { Login } from '../models/login';


export const logActiveUser = createAction(
  '[LoginComponent] Login',
  props<{ login: Login }>()
);

export const setActiveUser = createAction(
  '[UserService] Login Success',
  props<{token: string}>()
);

export const loginError = createAction(
  '[UserService] Login Error',
  props<{ errorMessage: string }>()
);

export const logOutActiveUser = createAction('[HeaderComponent] Log Out')

