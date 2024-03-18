import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'CloudMatch_Welcome', pathMatch: 'full' },
  { path: 'CloudMatch_Welcome', component: LoginComponent },
  { path: 'CloudMatch_Register', component: RegisterComponent },
  {
    path: 'CloudMatch',
    component: HeaderComponent,
    children: [
      {
        path: 'HOME',
        component: HomeComponent,
      },
    ],
  },
];
