import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOutActiveUser } from '../../actions/activeUser.actions';
import { LeagueService } from '../../services/league.service';
import { OtherService } from '../../services/other.service';
import { take } from 'rxjs';

@Component({
  selector: 'cloudMatch-header',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private leagueService: LeagueService,
    private otherService: OtherService
  ) {}
  private store = inject(Store);

  activeUser: any = null;

  ngOnInit(): void {
    this.store.select('activeUser').subscribe((user) => {
      if (user !== '') {
        this.activeUser = user;
      } else {
        this.router.navigate(['']);
      }
    });
    const actualDay = this.otherService.getActualDay();
    this.leagueService.finishLeague(actualDay).subscribe((response) => {
      if (response) {
        console.log(response);
        
      }
    })
  }

  logOut() {
    this.store.dispatch(logOutActiveUser());
  }
}
