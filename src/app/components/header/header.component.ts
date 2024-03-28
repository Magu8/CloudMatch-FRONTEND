import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOutActiveUser } from '../../actions/activeUser.actions';

@Component({
  selector: 'cloudMatch-header',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
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
  }

  getAct() {
    console.log(this.activeUser);
  }

  logOut() {
    this.store.dispatch(logOutActiveUser());
  }
}
