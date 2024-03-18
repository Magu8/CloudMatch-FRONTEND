import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cloudMatch-header',
  standalone: true,
  imports: [HomeComponent, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  private store = inject(Store);

  activeUser: any = {};

  ngOnInit(): void {
    this.store.select('activeUser').subscribe((user) => {
      setTimeout(() => {
        if (user !== '') {
          this.activeUser = user;
        } else {
          this.router.navigate(['']);
        }
      }, 100);
    });
  }
}
