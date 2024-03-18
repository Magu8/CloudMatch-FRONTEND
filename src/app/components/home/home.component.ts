import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LeagueComponent } from './components/league/league.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamComponent } from './components/team/team.component';
import { MatchComponent } from './components/match/match.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatchComponent, CalendarComponent, LeagueComponent, TeamComponent, PlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
