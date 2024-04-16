import { Component, OnInit, inject } from '@angular/core';
import { CalendarComponent } from './components/league/components/calendar/calendar.component';
import { LeagueComponent } from './components/league/league.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamComponent } from './components/team/team.component';
import { MatchComponent } from './components/league/components/match/match.component';
import { Store } from '@ngrx/store';
import { TeamService } from '../../services/team.service';
import { setMyTeam } from '../../actions/myTeam.actions';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatchComponent,
    LeagueComponent,
    TeamComponent,
    PlayerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private teamService: TeamService) {}
  private store = inject(Store);

  ngOnInit(): void {
    this.store.select('activeUser').subscribe((activeUserData) => {
      if (activeUserData.role === 'Team Delegate') {
        this.teamService
          .getMyTeam(activeUserData.user_id)
          .subscribe((myTeamData) => {
            this.store.dispatch(setMyTeam({ myTeam: myTeamData }));
          });
      }
    });
  }
}
