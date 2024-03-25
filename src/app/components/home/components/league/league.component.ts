import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../../services/league.service';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'league',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatSelectModule],
  templateUrl: './league.component.html',
  styleUrl: './league.component.scss',
})
export class LeagueComponent implements OnInit {
  constructor(private leagueService: LeagueService) {}

  leagues?: any = [];
  participants?: any = [];
  selectedLeagueId: number = 0;
  error: string = '';

  ngOnInit(): void {
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    });
  }

  getParti(leagueId: number) {
    this.leagueService.getLeagueParticipants(leagueId).subscribe({
      next: (info) => {
        this.participants = info;
        this.error = '';
      },
      error: () => {
        this.participants = [];
        this.error = 'No participants';
      },
    });
  }
}
