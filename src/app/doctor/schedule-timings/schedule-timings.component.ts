import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UtilService} from "../../services/util.service";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'app-schedule-timings',
  templateUrl: './schedule-timings.component.html',
  styleUrls: ['./schedule-timings.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ScheduleTimingsComponent implements OnInit {

  form: FormGroup;
  timeSlots: FormArray;
  showLoader = false;
  editTimeSlots = false;
  timeSlotsOptions = [];
  appointmentsSlotDurationOptions = [
    {label: '15 Minutes', value: 15},
    {label: '30 Minutes', value: 30},
    {label: '45 Minutes', value: 45},
    {label: '1 Hour', value: 60},
  ];
  appointmentDaysOptions = [
    {label: 'Sunday', value: '', disabled: false},
    {label: 'Monday', value: '', disabled: false},
    {label: 'Tuesday', value: '', disabled: false},
    {label: 'Wednesday', value: '', disabled: false},
    {label: 'Thursday', value: '', disabled: false},
    {label: 'Friday', value: '', disabled: false},
    {label: 'Saturday', value: '', disabled: false},
  ];

  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.setAvailableDaysOfWeek();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      slotDuration: new FormControl(null, [Validators.required]),
      day: new FormControl(null, [Validators.required]),
      timeSlots: new FormArray([], [Validators.required]),
    });

    this.timeSlots = this.form.get('timeSlots') as FormArray;
  }

  onDayChanged(): void {
    this.form.get('slotDuration').setValue(null);
    this.timeSlots.clear();
  }

  onAppointmentSlotDurationChanged(): void {
    this.timeSlots.clear();

    let startTime = moment('00:00', 'HH:mm A');
    let endTime = moment('23:45', 'HH:mm A');

    while (startTime <= endTime) {
      const slot = moment(startTime).format('HH:mm A');
      this.timeSlotsOptions.push({label: slot, value: slot});
      startTime.add(this.form.get('slotDuration').value, 'minutes');
    }
  }

  setAvailableDaysOfWeek(): void {
    const date = new Date();
    const day = date.getDay();

    this.appointmentDaysOptions.forEach((item, index) => {
      if (index < day - 1) {
        item.disabled = true;
      }

      item.value = new Date(date.setDate(date.getDate() - date.getDay() + index)).toISOString().slice(0, 10)
    });

    this.form.get('day').setValue(this.appointmentDaysOptions[0].value);
  }

  onEditClicked(): void {
    if (!this.form.get('slotDuration').value) {
      this.toastService.error('Please select appointment slot duration');
      return;
    }

    this.editTimeSlots = true;
  }

  removeTimeSlot(index): void {
    this.timeSlots.removeAt(index);
  }


  setTimeSlots(timeSlots): void {
    if (timeSlots && timeSlots.length > 0) {
      timeSlots.forEach(slot => {
        this.timeSlots.push(this.formBuilder.group({
          startTime: new FormControl(slot.startTime),
          endTime: new FormControl(slot.endTime),
        }));
      });
    }

    this.editTimeSlots = false
  }

  onSaveClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'))._id;

    const params = {
      ...this.form.value,
      user
    };

    this.apiService.scheduleTimings(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
    }, error => {
      this.toastService.error(error.error.message);
    })
  }
}
