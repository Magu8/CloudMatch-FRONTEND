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

  matches?: any = null;
  error: string = '';

  ngOnChanges(): void {
    if (this.leagueId) {
      this.matchService.matchCalendar(this.leagueId).subscribe({
        next: (successData) => {
          this.error = '';
          this.matches = successData;
        },
        error: (fail) => {
          this.matches = null;
          this.error = fail.error.message;
        },
      });
    }
  }

  btn() {
    console.log(this.matches, this.leagueId);
  }
}
