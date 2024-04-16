import { createReducer, on } from '@ngrx/store';
import { handleTIMER } from '../actions/timer.actions';

export const initialState = false;

export const timerReducer = createReducer(
  initialState,
  on(handleTIMER, (state) => {
    return !state;
  })
);
