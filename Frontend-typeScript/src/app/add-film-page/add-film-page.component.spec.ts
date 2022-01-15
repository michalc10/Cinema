import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmPageComponent } from './add-film-page.component';

describe('AddFilmPageComponent', () => {
  let component: AddFilmPageComponent;
  let fixture: ComponentFixture<AddFilmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilmPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFilmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
