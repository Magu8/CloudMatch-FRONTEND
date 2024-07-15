import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import { TeamService } from '../../../../services/team.service';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'search',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, RouterLink, MatInputModule],
  templateUrl: './search.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(100)
      ]),
    ])
  ],
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

  clear(){
    this.searchTeam = '';
    this.results = null
  }
}
