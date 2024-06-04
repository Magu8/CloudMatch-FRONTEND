import { Component, OnInit, inject } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { setMyTeam } from '../../../../actions/myTeam.actions';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'team',
  standalone: true,
  imports: [RouterLink, HighchartsChartModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {

  public myGraph: typeof Highcharts = Highcharts;
  public configGraph: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    series: [
      {
        type: 'line',
      },
    ],
  };

  value?: string = '';
  favoriteTeams?: any = [];
  filtered: any = null || [];
  team?: any = {};
  myTeam?: any = {};
  players?: any = {};
  activeUser?: any = {};
  error: string = '';
  alert: string = '';
  Object = Object;
  isFave: boolean = false;
 
  stadistics: any[] = [];
  hideGraphs: boolean = true;

  miniMenu: boolean = false;
  selectedTeam: any = null;
  

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
              this.getStats(this.myTeam.team_id);
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
          this.teamService
            .getFavoriteTeamData(this.activeUser.user_id)
            .subscribe((favesData) => {
              this.favoriteTeams = favesData;
              this.filtered = this.filterFavesData();
              if (this.filtered.length > 0) {
                this.isFave = true;
              }
            });
        });
      } else if (this.value == 'my_favorites') {
        this.miniMenu = false
        this.hideGraphs = true;
        this.teamService
          .getFavoriteTeamData(this.activeUser.user_id)
          .subscribe({
            next: (favesData: any) => {
              this.favoriteTeams = favesData;
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  addTeamToFaves() {
    this.teamService
      .addTeamToFaves(this.team.team_id, this.activeUser.user_id)
      .subscribe((successData: any) => {
        this.alert = successData.message;
        this.isFave = true;
      });
  }

  removeTeamFromFaves() {
    this.teamService
      .removeTeamFromFaves(this.team.team_id, this.activeUser.user_id)
      .subscribe((succesData: any) => {
        this.alert = succesData.message;
        this.isFave = false;
      });
  }

  getStats(teamId: number) {
    this.teamService.getStadistics(teamId).subscribe((data: any) => {
      this.stadistics = data;
      this.updateGraph();
    });
  }

  updateGraph() {
    this.miniMenu = false
    this.hideGraphs = false;
    const data = this.stadistics.map((v) => [
      new Date(v.win_date).getTime(),
      v.score,
    ]);
    this.configGraph = {
      title: {
        text: `${this.stadistics[0].team_name}'s stadistics`,
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      yAxis: {
        title: {
          text: 'Score',
        },
      },
      series: [
        {
          type: 'line',
          data: data,
          name: 'Score',
        },
      ],
    };
  }

  showMiniMenu(selectedTeam: any){
    if (this.miniMenu) {
      this.miniMenu = false
    } else {
      this.selectedTeam = selectedTeam
      this.miniMenu = true
    }
    
  }

  filterFavesData(): any[] {
    return this.favoriteTeams.filter((fave: any) => {
      return fave.team_id == this.team.team_id;
    });
  }
}
