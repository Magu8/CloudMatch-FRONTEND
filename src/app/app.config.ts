import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore(reducers, { metaReducers }),
    provideEffects(UserEffects),
    provideAnimationsAsync(),
    provideAnimations(),
    importProvidersFrom(MatSidenavModule),
  ],
};
