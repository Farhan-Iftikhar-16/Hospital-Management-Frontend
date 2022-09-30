import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWrapperComponent } from './doctor-wrapper.component';

describe('DoctorWrapperComponent', () => {
  let component: DoctorWrapperComponent;
  let fixture: ComponentFixture<DoctorWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
