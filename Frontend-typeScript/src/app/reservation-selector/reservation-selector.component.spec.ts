import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSelectorComponent } from './reservation-selector.component';

describe('ReservationSelectorComponent', () => {
  let component: ReservationSelectorComponent;
  let fixture: ComponentFixture<ReservationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
