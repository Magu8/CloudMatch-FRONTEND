import { createReducer, on } from '@ngrx/store';
import { setMyTeam } from '../actions/myTeam.actions';

export const initialState = '';

export const MyTeamReducer = createReducer(
  initialState,
  on(setMyTeam, (state, { myTeam }) => {
    return { ...myTeam };
  })
);
