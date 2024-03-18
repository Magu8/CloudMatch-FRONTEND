import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import {
  logActiveUser,
  loginError,
  setActiveUser,
} from '../actions/activeUser.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  logIntoAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logActiveUser),
      mergeMap((action) =>
        this.userService.login(action.login).pipe(
          map((object) => {
            return setActiveUser({ token: object.token });
          }),
          tap(() => {
            this.store.select('activeUser').subscribe((aU) => {
              if (aU !== '') {
                this.router.navigate(["/CloudMatch/HOME"])
              }
            });
          }),
          catchError((error) => {
            console.error('Error during login:', error.status);
            return of(loginError({ errorMessage: 'Wrong user or password' }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService, private router: Router) {}
  private store = inject(Store);
}
