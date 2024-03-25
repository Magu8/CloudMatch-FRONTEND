import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'team',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  favoriteTeams?: any = [{}];
  team?: any = {};
  players?: any = {};
  Object = Object;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamService.getTeam(params['info']).subscribe((data) => {
        this.team = data;
        this.teamService.getTeamPlayers(this.team.team_id).subscribe((data) => {
          this.players = data;
        });
      });
    });
  }


}
