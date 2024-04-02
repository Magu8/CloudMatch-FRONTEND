import { Component, Input, OnInit, inject } from '@angular/core';
import { LeagueService } from '../../../../services/league.service';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { TeamService } from '../../../../services/team.service';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'league',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatSelectModule, CalendarComponent],
  templateUrl: './league.component.html',
  styleUrl: './league.component.scss',
})
export class LeagueComponent implements OnInit {
  constructor(
    private leagueService: LeagueService,
    private teamService: TeamService
  ) {}
  private store = inject(Store);

  activeUser?: any = null;
  leagues?: any = [];
  participants?: any = [];
  selectedLeagueId: number = 0;
  leagueInfo?: any = {};
  leaguesError: any = null;
  alert: any = null;
  error: any = null;
  myTeamId: any = null;

  Object = Object;

  ngOnInit(): void {
    this.alert = '';
    this.store.select('activeUser').subscribe((user) => {
      if (user.role === 'Team Delegate') {
        this.store.select('myTeam').subscribe((myTeamData) => {
          this.myTeamId = myTeamData.team_id;
        });
      }
      this.activeUser = user;
    });
    this.leagueService.getAllLeagues().subscribe({
      next: (dataAllLeagues) => {
        this.leaguesError = '';
        this.leagues = dataAllLeagues;
      },
      error: (error) => {
        if (error.status === 404) {
          this.leaguesError = 'No leagues found';
        }
      },
    });
  }

  getParticipants(leagueId: number) {
    this.leagueService.getLeague(leagueId).subscribe((dataLeague) => {
      this.leagueInfo = dataLeague;
    });
    this.leagueService.getLeagueParticipants(leagueId).subscribe({
      next: (dataParticipants) => {
        this.error = '';
        this.participants = dataParticipants;
      },
      error: () => {
        this.participants = [];
        this.error = 'No participants yet';
      },
    });
  }

  participateTeamIntoLeague(leagueId: number) {
    this.teamService.participateMyteam(this.myTeamId, leagueId).subscribe({
      next: () => {
        this.alert = 'Participation successfully added';
      },
      error: () => {
        this.alert = 'This team is already participating in this leagues';
      },
    });
  }

  parti() {
    console.log(this.participants, this.activeUser);
  }
}
