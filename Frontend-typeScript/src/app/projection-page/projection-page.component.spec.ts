import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionPageComponent } from './projection-page.component';

describe('ProjectionPageComponent', () => {
  let component: ProjectionPageComponent;
  let fixture: ComponentFixture<ProjectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
