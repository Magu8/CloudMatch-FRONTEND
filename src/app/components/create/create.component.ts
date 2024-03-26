import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { League } from '../../models/league';
import { LeagueService } from '../../services/league.service';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';

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
  selectedUserId: number = 0;
  alert?: string = '';
  error?: string = '';

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.value = params['type'];
      this.alert = '';
      this.error = '';
    });
    this.userService.getAllUsers().subscribe(data => { 
      this.users = data;
    })
  }

  league: League = {
    league_name: '',
    start_date: '',
    end_date: '',
  };

  team: Team = {
    team_name: '',
    team_logo: '',
    team_delegate: 0
  };

  createLeague(leagueBody: League) {
    this.leagueService.createLeague(leagueBody).subscribe({
      next: () => {
        this.error = '';
        this.alert = 'League succesfully created!';
      },
      error: (error) => {
        this.alert = '';
        if (error.error.error === 'Invalid dates') {
          this.error = 'Invalid dates';
        } else {
          this.error = 'Must fill all the fields';
        }
      },
    });
  }

  createTeam(teamBody: Team) {
    this.team.team_delegate = this.selectedUserId;
    this.teamService.createTeam(teamBody).subscribe({
      next: () => {
        this.error = '';
        this.alert = 'Team succesfully created!';
      },
      error: (error) => {
        this.alert = '';
        if (error.status === 409) {
          this.error = 'This team name is already taken';
        } else {
          this.error = 'Must fill all the fields';
        }
      },
    });
  }
}
