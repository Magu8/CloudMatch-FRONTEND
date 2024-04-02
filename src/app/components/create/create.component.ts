import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { League } from '../../models/league';
import { LeagueService } from '../../services/league.service';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { Player } from '../../models/player';
import { Store } from '@ngrx/store';
import { PlayerService } from '../../services/player.service';
import { Match } from '../../models/match';
import { MatchService } from '../../services/match.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  value?: string = '';

  users: any = [];
  leagues: any = [];
  teams: any = [];

  myTeamId?: any = null;
  selectedLeagueId: number = 0;
  selectedTeamLocalId: number = 0;
  selectedTeamVisitorId: number = 0;
  selectedUserId: number = 0;
  selectedRole: string = '';

  alert?: string = '';
  error?: string = '';

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private teamService: TeamService,
    private userService: UserService,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {}
  private store = inject(Store);

  ngOnInit(): void {
    this.store.select('myTeam').subscribe((myTeamData) => {
      this.myTeamId = myTeamData.team_id;
    });

    this.route.params.subscribe((params) => {
      this.value = params['type'];
      this.alert = '';
      this.error = '';
    });
    this.userService.getAllUsers().subscribe((allUsersData) => {
      this.users = allUsersData;
    });
    if (this.value === 'match') {
      this.leagueService.getAllLeagues().subscribe((leaguesData) => {
        this.leagues = leaguesData;
      });
      this.teamService.getAllTeams().subscribe((teamsData) => {
        this.teams = teamsData;
      });
    }
  }

  user: User = {
    role: '',
  };

  editUserRole(userRole: User, userId: number) {
    this.userService.editUserRole(userRole, userId).subscribe({
      next: (success: any) => {
        this.error = '';
        this.alert = success.message;
      },
      error: (fail: any) => {
        this.alert = '';
        this.error = fail.error.message;
      },
    });
  }

  league: League = {
    league_name: '',
    start_date: '',
    end_date: '',
  };
  createLeague(leagueBody: League) {
    this.leagueService.createLeague(leagueBody).subscribe({
      next: (success: any) => {
        this.error = '';
        this.alert = success.message;
      },
      error: (fail: any) => {
        this.alert = '';
        if (fail.error.message === 'Invalid dates') {
          this.error = fail.error.message;
        } else {
          this.error = fail.error.message;
        }
      },
    });
  }

  team: Team = {
    team_name: '',
    team_logo: '',
    team_delegate: 0,
  };
  createTeam(teamBody: Team) {
    this.team.team_delegate = this.selectedUserId;
    this.teamService.createTeam(teamBody).subscribe({
      next: (success: any) => {
        this.error = '';
        this.alert = success.message;
      },
      error: (fail: any) => {
        this.alert = '';
        if (fail.status === 409) {
          this.error = fail.error.message;
        } else {
          this.error = fail.error.message;
        }
      },
    });
  }

  player: Player = {
    player_name: '',
    player_surname: '',
    player_nickname: '',
    player_photo: '',
    age: 0,
  };
  createPlayer(playerBody: Player) {
    this.playerService.createPlayer(playerBody, this.myTeamId).subscribe({
      next: (success: any) => {
        this.error = '';
        this.alert = success.message;
      },
      error: (fail: any) => {
        this.alert = '';
        if (fail.status === 409) {
          this.error = fail.error.message;
        } else if (fail.error.message === 'Underaged player') {
          this.error = fail.error.message;
        } else {
          this.error = fail.error.message;
        }
      },
    });
  }

  match: Match = {
    match_date: '',
    match_time: '',
  };
  createMatchDay(matchBody: Match) {
    this.matchService
      .createMatch(
        matchBody,
        this.selectedLeagueId,
        this.selectedTeamLocalId,
        this.selectedTeamVisitorId,
        this.selectedUserId
      )
      .subscribe({
        next: (success: any) => {
          this.error = '';
          this.alert = success.message;
        },
        error: (fail: any) => {
          this.alert = '';
          if (fail.status === 404) {
            this.error = fail.error.message;
          } else {
            this.error = fail.error.message;
          }
        },
      });
  }
}
