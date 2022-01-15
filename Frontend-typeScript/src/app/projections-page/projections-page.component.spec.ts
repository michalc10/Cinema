import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionsPageComponent } from './projections-page.component';

describe('ProjectionsPageComponent', () => {
  let component: ProjectionsPageComponent;
  let fixture: ComponentFixture<ProjectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
