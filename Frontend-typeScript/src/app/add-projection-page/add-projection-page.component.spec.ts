import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectionPageComponent } from './add-projection-page.component';

describe('AddProjectionPageComponent', () => {
  let component: AddProjectionPageComponent;
  let fixture: ComponentFixture<AddProjectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
