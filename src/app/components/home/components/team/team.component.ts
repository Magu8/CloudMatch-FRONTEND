import { Component, OnInit, inject } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { setMyTeam } from '../../../../actions/myTeam.actions';

@Component({
  selector: 'team',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  value?: string = '';
  favoriteTeams?: any = [];
  team?: any = {};
  myTeam?: any = {};
  players?: any = {};
  activeUser?: any = {};
  error: string = '';
  Object = Object;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  private store = inject(Store);

  ngOnInit(): void {
    this.store.select('activeUser').subscribe((activeUserData) => {
      this.activeUser = activeUserData;
    });
    this.route.params.subscribe((params) => {
      this.value = params['type'];
      if (this.value === 'delegate') {
        if (this.activeUser.role === 'Team Delegate') {
          this.teamService
            .getMyTeam(this.activeUser.user_id)
            .subscribe((myTeamData) => {
              this.store.dispatch(setMyTeam({ myTeam: myTeamData }));
              this.myTeam = myTeamData;
              this.teamService.getTeamPlayers(this.myTeam.team_id).subscribe({
                next: (myTeamPlayersData) => {
                  this.error = '';
                  this.players = myTeamPlayersData;
                },
                error: (fail) => {
                  this.error = fail.error.message;
                },
              });
            });
        } else {
          this.router.navigate(['']);
        }
      } else if (params['info']) {
        this.teamService.getTeam(params['info']).subscribe((teamData) => {
          this.team = teamData;
          this.teamService.getTeamPlayers(this.team.team_id).subscribe({
            next: (playersData) => {
              this.players = playersData;
            },
            error: (fail) => {
              this.error = fail.error.message;
            },
          });
        });
      }
    });
  }

  mytm() {
    console.log(this.players);
  }
}
