import { createAction, props } from '@ngrx/store';

export const setMyTeam = createAction(
  '[TeamComponent] My Team',
  props<{ myTeam: any }>()
);
