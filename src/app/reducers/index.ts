import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { ActiveUserReducer } from './activeUser.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
activeUser: ActiveUserReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
