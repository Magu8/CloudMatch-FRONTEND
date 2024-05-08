import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Store } from '@ngrx/store';
import { MatchScores } from '../../models/match.scores';
import { InputService } from '../../services/input.service';
import { interval, Subscription, switchMap, take } from 'rxjs';
import { startTIMER, stopTIMER } from '../../actions/timer.actions';
import { TeamService } from '../../services/team.service';
import { PlayerBenchComponent } from './player-bench/player-bench.component';
import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'cloudMatch-on-live',
  standalone: true,
  imports: [PlayerBenchComponent],
  templateUrl: './on-live.component.html',
  styleUrl: './on-live.component.scss',
})
export class OnLiveComponent implements OnInit, OnDestroy {
  constructor(
    private matchService: MatchService,
    private inputService: InputService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) {}

  private store = inject(Store);
  private timerSubscription: Subscription | undefined;

  onLiveMatch?: any = null;

  activeUser: any = null;

  matchPlayers: any = null;

  timerOn: boolean = false;
  timerState: boolean = false;

  player: any = null;
  score: string = '';
  foul: boolean = false; //TODO

  localPlayers: any = null;
  visitorPlayers: any = null;

  winnerTeam: any = null;

  drawCheck: boolean = false;
  error: string = '';

  matchScore: MatchScores = {
    match_id: 0,
    local_score: 0,
    local_fouls: 0,
    visitor_score: 0,
    visitor_fouls: 0,
  };

  ngOnInit(): void {
    this.timerReducer();
    if (this.timerState) {
      this.timerBtn();
    }
    this.store.select('activeUser').subscribe((user: any) => {
      this.activeUser = user;
    });
    this.matchService.getMatchOnLive().subscribe((onLiveMatchData) => {
      this.onLiveMatch = onLiveMatchData;
      this.teamService
        .getTeamPlayers(this.onLiveMatch.local_id)
        .subscribe((localData) => {
          this.localPlayers = localData;
        });
      this.teamService
        .getTeamPlayers(this.onLiveMatch.visitor_id)
        .subscribe((visitorData) => {
          this.visitorPlayers = visitorData;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  saveMatch(saving: any) {
    this.drawCheck = false;
    const {
      local_score,
      local_fouls,
      visitor_fouls,
      visitor_score,
      match_id,
      league_id,
    } = saving;

    if (local_score > visitor_score) {
      this.winnerTeam = saving.local_id;
    } else if (local_score < visitor_score) {
      this.winnerTeam = saving.visitor_id;
    } else {
      this.drawCheck = true;
    }

    if (this.drawCheck) {
      this.error = 'No draws allowed';
    } else {
      this.matchScore = {
        local_score,
        local_fouls,
        visitor_fouls,
        visitor_score,
        match_id,
      };
      this.matchService.saveMatch(saving).subscribe({
        next: () => {
          this.leagueService
            .addLeagueScore(league_id, this.winnerTeam)
            .subscribe((success) => {
              console.log(success);
            });
          this.matchService.resetMatch().subscribe((success) => {
            localStorage.removeItem('benchLocal');
            localStorage.removeItem('inGameLocal');
            localStorage.removeItem('benchVisitor');
            localStorage.removeItem('inGameVisitor')
            console.log(success);
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  aa() {
    console.log(this.onLiveMatch);
  }

  scoreBtn(score: number) {
    this.inputService
      .SCORE(score, this.player, this.onLiveMatch)
      .subscribe(() => {
        this.matchService.getMatchOnLive().subscribe((onLiveMatchData) => {
          this.onLiveMatch = onLiveMatchData;
        });
      });
  }

  foulBtn() {
    this.inputService.FOUL(this.player, this.onLiveMatch).subscribe(() => {
      this.matchService.getMatchOnLive().subscribe((onLiveMatchData) => {
        this.onLiveMatch = onLiveMatchData;
      });
    });
  }

  scoreOrFoulPlayer(data: { id: number; lorv: string }) {
    this.player = data;
  }

  timerReducer() {
    this.store
      .select('timer')
      .pipe(take(1))
      .subscribe((data) => {
        this.timerState = data;
      });
  }

  timerBtn() {
    if (this.timerOn) {
      this.timerOn = false;
      this.store.dispatch(stopTIMER());
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    } else {
      this.timerOn = true;
      this.store.dispatch(startTIMER());
      this.timerSubscription = interval(1000)
        .pipe(switchMap(() => this.inputService.TIME()))
        .subscribe(() => {
          this.matchService.getMatchOnLive().subscribe((onLiveMatchData) => {
            this.onLiveMatch = onLiveMatchData;
            if (this.onLiveMatch.TIME === '00:00') {
              this.timerOn = false;
              this.store.dispatch(stopTIMER());
              if (this.timerSubscription) {
                this.timerSubscription.unsubscribe();
              }
              setTimeout(() => {
                this.inputService.resetTIME().subscribe(() => {
                  this.inputService.PERIOD().subscribe(() => {
                    this.matchService
                      .getMatchOnLive()
                      .subscribe((onLiveMatchData) => {
                        this.onLiveMatch = onLiveMatchData;
                      });
                  });
                });
              }, 2000);
            }
          });
        });
    }
  }
}
