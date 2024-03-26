import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { TeamComponent } from './components/home/components/team/team.component';
import { PlayerComponent } from './components/home/components/player/player.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
  { path: '', redirectTo: 'CloudMatch_Welcome', pathMatch: 'full' },
  { path: 'CloudMatch_Welcome', component: WelcomeComponent },
  {
    path: 'CloudMatch',
    component: HeaderComponent,
    children: [
      {
        path: 'HOME',
        component: HomeComponent,
      },
      {
        path: 'CREATE',
        component: CreateComponent
      },
      {
        path: 'Team',
        component: TeamComponent
      },
      {
        path: 'Player/:PlayerId',
        component: PlayerComponent
      }
    ],
  },
];
