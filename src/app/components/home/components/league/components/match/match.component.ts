import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatchService } from '../../../../../../services/match.service';
import { OtherService } from '../../../../../../services/other.service';
import { RouterLink } from '@angular/router';
import { Match } from '../../../../../../models/match';

@Component({
  selector: 'match',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss',
})
export class MatchComponent implements OnChanges {
  @Input() leagueId: any;
  constructor(
    private matchService: MatchService,
    private otherService: OtherService
  ) {}

  actualDay: string = '';
  actualTime: string = '';
  match: any = null;
  matchOnLive: boolean = false;
  matchFinished: boolean = false;

  matchToRedis: Match = {
    league_id: 0,
    match_id: 0,
    match_date: '',
    local_id: 0,
    local_team: '',
    visitor_id: 0,
    visitor_team: '',
  };

  ngOnChanges(): void {
    this.actualDay = this.otherService.getActualDay();
    this.actualTime = this.otherService.getActualTime();
    this.matchService.getMatchDay(this.actualDay, this.leagueId).subscribe({
      next: (successData: any) => {
        this.matchFinished = false;

        this.matchToRedis.league_id = successData.league_id;
        this.matchToRedis.match_id = successData.match_id;
        this.matchToRedis.match_date = successData.match_date;
        this.matchToRedis.local_id = successData.local_id;
        this.matchToRedis.local_team = successData.local_team;
        this.matchToRedis.visitor_id = successData.visitor_id;
        this.matchToRedis.visitor_team = successData.visitor_team;

        const matchTime = successData.match_time.split(':');
        const actualTime = this.actualTime.split(':');

        if (actualTime[0] >= matchTime[0]) {
          this.matchOnLive = true;
        }
        if (successData.finished === 1) {
          this.matchOnLive = false;
          this.matchFinished = true;
          this.match = successData;
        } else {
          this.matchService.setMatchOnLive(this.matchToRedis).subscribe(() => {
            this.matchService.getMatchOnLive().subscribe((matchData) => {
              this.match = matchData;
            });
          });
        }
      },
      error: () => {
        this.match = null;
      },
    });
  }
}
