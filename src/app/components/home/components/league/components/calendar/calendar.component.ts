import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatchService } from '../../../../../../services/match.service';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnChanges {
  constructor(private matchService: MatchService) {}

  @Input() leagueId: any;

  matches?: any = undefined;
  error: string = '';

  ngOnChanges(): void {
    if (this.leagueId !== undefined) {
      this.matchService.matchCalendar(this.leagueId).subscribe({
        next: (successData) => {
          this.error = '';
          this.matches = successData;
        },
        error: (fail) => {
          this.matches = undefined;
          this.error = fail.error.message;
        },
      });
    }
  }

  btn() {
    console.log(this.matches, this.leagueId);
  }
}
