import { Component, inject, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Store } from '@ngrx/store';
import { MatchScores } from '../../models/match.scores';
import { InputService } from '../../services/input.service';
import { interval, Subscription, switchMap } from 'rxjs';
import { handleTIMER } from '../../actions/timer.actions';

@Component({
  selector: 'cloudMatch-on-live',
  standalone: true,
  imports: [],
  templateUrl: './on-live.component.html',
  styleUrl: './on-live.component.scss',
})
export class OnLiveComponent implements OnInit {
  constructor(
    private matchService: MatchService,
    private inputService: InputService
  ) {}

  private store = inject(Store);
  private timerSubscription: Subscription | undefined;

  onLiveMatch?: any = null;
  activeUser: any = null;

  timerOnCheck: any = undefined;
  timerOn: boolean = false;

  matchScore: MatchScores = {
    match_id: 0,
    local_score: 0,
    local_fouls: 0,
    visitor_score: 0,
    visitor_fouls: 0,
  };

  ngOnInit(): void {
    this.matchService.getMatchOnLive().subscribe((onLiveMatchData) => {
      this.onLiveMatch = onLiveMatchData;
      this.store.select('activeUser').subscribe((user: any) => {
        this.activeUser = user;
        this.store.select('timer').subscribe((timer) => {
          this.timerOnCheck = timer;
          if (this.timerOnCheck) {
            this.timerBtn();
          }
        });
      });
    });
  }

  saveMatch(saving: any) {
    const { local_score, local_fouls, visitor_fouls, visitor_score, match_id } =
      saving;
    this.matchScore = {
      local_score,
      local_fouls,
      visitor_fouls,
      visitor_score,
      match_id,
    };
    this.matchService.saveMatch(saving).subscribe({
      next: () => {
        this.matchService.resetMatch().subscribe((success) => {
          console.log(success);
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  inputBtn(type: string) {
    this.inputService.input(type).subscribe(() => {
      this.matchService.getMatchOnLive().subscribe((onLiveMatchData) => {
        this.onLiveMatch = onLiveMatchData;
      });
    });
  }

  timerBtn() {
    if (this.timerOn) {
      this.timerOn = false;
      this.store.dispatch(handleTIMER());
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    } else {
      this.timerOn = true;
      this.store.dispatch(handleTIMER());
      this.timerSubscription = interval(1000)
        .pipe(switchMap(() => this.matchService.TIME()))
        .subscribe(() => {
          this.matchService.getMatchOnLive().subscribe((onLiveMatchData) => {
            this.onLiveMatch = onLiveMatchData;
          });
        });
    }
  }
}
