import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../../services/league.service';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  leagueInfo?: any = {};
  error: string = '';
  Object = Object;

  ngOnInit(): void {
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    });
  }

  getParti(leagueId: number) {
    this.leagueService.getLeague(leagueId).subscribe(data => {
      this.leagueInfo = data;
    })
    this.leagueService.getLeagueParticipants(leagueId).subscribe({
      next: (info) => {
        this.participants = info;
        this.error = '';
      },
      error: () => {
        this.participants = [];
        this.error = 'No participants yet';
      },
    });
  }
}
