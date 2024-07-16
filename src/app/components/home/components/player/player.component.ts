import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'player',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  player?: any = {};

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.playerService.getPlayer(params['PlayerId']).subscribe((data) => {
        this.player = data;
      });
    });
  }

  btn() {
    console.log(this.player);
  }
}
