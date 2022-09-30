import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeSlotComponent } from './edit-time-slot.component';

describe('EditTimeSlotComponent', () => {
  let component: EditTimeSlotComponent;
  let fixture: ComponentFixture<EditTimeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTimeSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
