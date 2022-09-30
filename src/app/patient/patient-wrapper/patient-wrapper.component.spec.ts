import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientWrapperComponent } from './patient-wrapper.component';

describe('PatientWrapperComponent', () => {
  let component: PatientWrapperComponent;
  let fixture: ComponentFixture<PatientWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
