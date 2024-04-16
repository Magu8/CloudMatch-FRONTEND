import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { ActiveUserReducer } from './activeUser.reducer';
import { MyTeamReducer } from './myTeam.reducer';
import { timerReducer } from './timer.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  activeUser: ActiveUserReducer,
  myTeam: MyTeamReducer,
  timer: timerReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
