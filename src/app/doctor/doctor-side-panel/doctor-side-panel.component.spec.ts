import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSidePanelComponent } from './doctor-side-panel.component';

describe('DoctorSidePanelComponent', () => {
  let component: DoctorSidePanelComponent;
  let fixture: ComponentFixture<DoctorSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
