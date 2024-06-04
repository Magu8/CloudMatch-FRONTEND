import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { TeamService } from '../../../../services/team.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'search',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private teamService: TeamService) {}

  searchTeam: string = '';
  results: any = null;

  search() {
    this.teamService.searchTeam(this.searchTeam).subscribe({
      next: (result) => {
        this.results = result;
      },
      error: (er) => {
        this.results = null
        
      },
    });
  }
}
