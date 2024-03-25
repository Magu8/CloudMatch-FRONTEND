import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { League } from '../../models/league';
import { LeagueService } from '../../services/league.service';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  value?: string = '';

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.value = params['type'];
    });
  }

  league: League = {
    league_name: '',
    start_date: '',
    end_date: '',
  };

  team: Team = {
    team_name: '',
  }

  createLeague(leagueBody: League) {
    console.log(this.league);
    this.leagueService.createLeague(leagueBody).subscribe((res) => {
      console.log(res);
    });
  }

  createTeam(teamBody: Team){
    console.log(this.team);
    
    
  }
}
