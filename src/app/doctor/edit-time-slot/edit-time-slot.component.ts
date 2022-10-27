import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import * as moment from "moment";

@Component({
  selector: 'app-edit-time-slot',
  templateUrl: './edit-time-slot.component.html',
  styleUrls: ['./edit-time-slot.component.scss']
})
export class EditTimeSlotComponent implements OnInit {

  form: FormGroup;
  timeSlots: FormArray;
  timeSlotsOptions = []
  @Input() set setTimeSlotsOptions(options) {
    this.timeSlotsOptions = options;
  }
  @Output() emitTimeSlots = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addTimeSlot();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      timeSlots: new FormArray([], [Validators.required]),
    });

    this.timeSlots = this.form.get('timeSlots') as FormArray;
  }

  getTimeSlotFromGroup(): FormGroup {
    return this.formBuilder.group({
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
    })
  }

  shouldBeAfterStartTime(index) {
    console.log(this.form);
    const endTime = this.timeSlots.controls[index].get('endTime').value;

    if (!endTime) {
      return null;
    }

    if (this.timeSlots.controls[index].get('startTime')) {
      const startTime = this.timeSlots.controls[index].get('startTime').value;

      if (!startTime) {
        return null;
      }

      console.log(startTime, endTime);

      console.log(moment(moment(endTime)).isAfter( startTime));
    }

    return null;
  }

  addTimeSlot(): void {
   this.timeSlots.push(this.getTimeSlotFromGroup());
  }

  removeTimeSlot(index): void {
    this.timeSlots.removeAt(index);
  }

  onSaveClicked(): void {
    if (this.form.invalid) {
      this.toastService.error('Please fill out all required fields');
      return;
    }
    this.emitTimeSlots.emit(this.form.get('timeSlots').value)
  }

}
