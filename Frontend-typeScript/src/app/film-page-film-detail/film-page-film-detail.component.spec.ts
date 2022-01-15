import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmPageFilmDetailComponent } from './film-page-film-detail.component';

describe('FilmPageFilmDetailComponent', () => {
  let component: FilmPageFilmDetailComponent;
  let fixture: ComponentFixture<FilmPageFilmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmPageFilmDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmPageFilmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
