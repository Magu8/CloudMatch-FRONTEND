import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnLiveComponent } from './on-live.component';

describe('OnLiveComponent', () => {
  let component: OnLiveComponent;
  let fixture: ComponentFixture<OnLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnLiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
