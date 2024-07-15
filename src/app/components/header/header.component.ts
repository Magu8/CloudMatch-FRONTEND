import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOutActiveUser } from '../../actions/activeUser.actions';
import { LeagueService } from '../../services/league.service';
import { OtherService } from '../../services/other.service';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { SearchComponent } from '../home/components/search/search.component';

@Component({
  selector: 'cloudMatch-header',
  standalone: true,
  imports: [HomeComponent, SearchComponent, RouterOutlet, RouterLink, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, MatDividerModule],
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
menuOpen:  boolean = false;

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
