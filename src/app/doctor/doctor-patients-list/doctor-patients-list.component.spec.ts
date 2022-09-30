import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientsListComponent } from './doctor-patients-list.component';

describe('DoctorPatientsListComponent', () => {
  let component: DoctorPatientsListComponent;
  let fixture: ComponentFixture<DoctorPatientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPatientsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
