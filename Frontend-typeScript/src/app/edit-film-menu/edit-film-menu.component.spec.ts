import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFilmMenuComponent } from './edit-film-menu.component';

describe('EditFilmMenuComponent', () => {
  let component: EditFilmMenuComponent;
  let fixture: ComponentFixture<EditFilmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFilmMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFilmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
