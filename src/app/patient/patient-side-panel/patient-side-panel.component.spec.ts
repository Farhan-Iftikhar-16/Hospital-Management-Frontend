import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSidePanelComponent } from './patient-side-panel.component';

describe('PatientSidePanelComponent', () => {
  let component: PatientSidePanelComponent;
  let fixture: ComponentFixture<PatientSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
