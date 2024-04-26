import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBenchComponent } from './player-bench.component';

describe('PlayerBenchComponent', () => {
  let component: PlayerBenchComponent;
  let fixture: ComponentFixture<PlayerBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerBenchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
