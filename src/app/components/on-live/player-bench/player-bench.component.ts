import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cloudMatch-player-bench',
  standalone: true,
  imports: [],
  templateUrl: './player-bench.component.html',
  styleUrl: './player-bench.component.scss',
})
export class PlayerBenchComponent {
  @Input() localPlayers: any;
  @Input() visitorPlayers: any;

  selectedPlayer: any;
  localOrVisitor: string = '';

  @Output() sendPlayerVorL = new EventEmitter<{id: any, lorv: string}>();
  
  btn(playerId: any, localOrVisitor: string) {
    this.selectedPlayer = playerId;
    this.localOrVisitor = localOrVisitor;

    const id = this.selectedPlayer;
    const lorv = this.localOrVisitor;

    this.sendPlayerVorL.emit({id, lorv})
  }
}
