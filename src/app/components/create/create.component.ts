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
import { MatchDate } from '../../models/match.date';
import { MatchService } from '../../services/match.service';
import { UserRole } from '../../models/user.role';
import { OtherService } from '../../services/other.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cloudMatch-create',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  value?: string = '';

  users: any = [];
  leagues: any = [];


  participants: any = [];

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
    private matchService: MatchService,
    private otherService: OtherService
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
    }
  }

  user: UserRole = {
    role: '',
  };

  editUserRole(userRole: UserRole, userId: number) {
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
    league_logo: '', //TODO create a league_logo
    league_name: '',
    start_date: '',
    end_date: '',
  };

 

  createLeague(leagueBody: League) {

    this.leagueService.createLeague(leagueBody).subscribe({
      next: (success: any) => {
        this.error = '';
        this.alert = success.message;
        console.log(success);
        
      },
      error: (fail: any) => {
        this.alert = '';
        if (fail.error.message === 'Invalid dates') {
          this.error = fail.error.message;
        } else {
          console.log(fail);
          
          this.error = fail.error.message;
        }
      },
    });
  }

  team: Team = {
    team_name: '',
    team_logo: '', //TODO create a team_logo
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
    player_photo: '../../../assets/player_image.png',
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

  match: MatchDate = {
    match_date: '',
    match_time: '',
  };

  getLeagueParticipants(leagueId: number) {
    this.leagueService.getLeagueParticipants(leagueId).subscribe({
      next: (successParticipantsData) => {
        this.error = '';
        this.participants = successParticipantsData;
      },
      error: (fail) => {
        this.participants = [];
        this.error = fail.error.message;
      },
    });
  }

  createMatchDay(matchBody: MatchDate) {
    matchBody.match_time = this.otherService.floatTime(matchBody.match_time);
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
