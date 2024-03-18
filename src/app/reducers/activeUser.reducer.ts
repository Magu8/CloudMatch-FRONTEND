import { createReducer, on } from '@ngrx/store';
import { logOutActiveUser, setActiveUser } from '../actions/activeUser.actions';

export const initialState = '';

export const ActiveUserReducer = createReducer(
  initialState,
  on(setActiveUser, (state, { token }) => {
    let payload = token.split('.')[1];
    const decodedToken = JSON.parse(atob(payload));
    return { ...decodedToken };
  }),
  on(logOutActiveUser, () => {
    return '';
  })
);
