import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cloudMatch-player-bench',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule],
  templateUrl: './player-bench.component.html',
  styleUrl: './player-bench.component.scss',
})
export class PlayerBenchComponent implements OnInit {
  @Input() benchLocal: any;
  @Input() benchVisitor: any;
  @Input() activeUser: any;

  selectedPlayer: any;
  localOrVisitor: string = '';

  inGameLocal: any = [];
  inGameVisitor: any = [];

  ngOnInit(): void {
    const storageLocal = localStorage.getItem('inGameLocal');
    if (storageLocal) {
      this.inGameLocal = JSON.parse(storageLocal);
    }
    const storageVisitor = localStorage.getItem('inGameVisitor');
    if (storageVisitor) {
      this.inGameVisitor = JSON.parse(storageVisitor);
    }
    const storageBenchLocal = localStorage.getItem('benchLocal');
    if (storageBenchLocal) {
      this.benchLocalStorage = JSON.parse(storageBenchLocal);
    }
    const storageBenchVisitor = localStorage.getItem('benchVisitor');

    if (storageBenchVisitor) {
      this.benchVisitorStorage = JSON.parse(storageBenchVisitor);
    }
  }

  benchLocalStorage: any = null;
  benchVisitorStorage: any = null;


  @Output() sendPlayerVorL = new EventEmitter<{ id: any; lorv: string }>();

  btn(playerId: any, localOrVisitor: string) {
    this.selectedPlayer = playerId;
    this.localOrVisitor = localOrVisitor;

    const id = this.selectedPlayer;
    const lorv = this.localOrVisitor;

    this.sendPlayerVorL.emit({ id, lorv });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const whatsInLocal = localStorage.getItem('benchLocal');
    const whatsInVisitor = localStorage.getItem('benchVisitor');

    if (whatsInLocal) {
      localStorage.setItem(
        'benchLocal',
        JSON.stringify(this.benchLocalStorage)
      );
    } else {
      localStorage.setItem('benchLocal', JSON.stringify(this.benchLocal));
      const localCheck = localStorage.getItem('benchLocal');
      if (localCheck) {
        this.benchLocalStorage = JSON.parse(localCheck);
      }
    }

    if (whatsInVisitor) {
      localStorage.setItem(
        'benchVisitor',
        JSON.stringify(this.benchVisitorStorage)
      );
    } else {
      localStorage.setItem('benchVisitor', JSON.stringify(this.benchVisitor));
      const visitorCheck = localStorage.getItem('benchVisitor');
      if (visitorCheck) {
        this.benchVisitorStorage = JSON.parse(visitorCheck);

      }
      
    }

    localStorage.setItem('inGameLocal', JSON.stringify(this.inGameLocal));
    localStorage.setItem('inGameVisitor', JSON.stringify(this.inGameVisitor));
  }
}
