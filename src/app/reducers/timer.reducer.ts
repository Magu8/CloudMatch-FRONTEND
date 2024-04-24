import { createReducer, on } from '@ngrx/store';
import { startTIMER, stopTIMER } from '../actions/timer.actions';

export const initialState = false;

export const timerReducer = createReducer(
  initialState,
  on(startTIMER, () => {
    return true;
  }),
  on(stopTIMER, () => {
    return false;
  })
);
