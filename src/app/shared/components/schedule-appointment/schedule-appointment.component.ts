import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {ToastService} from "../../../services/toast.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {SelectItem} from "primeng/api";
import {UtilService} from "../../../services/util.service";

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {

  user;
  doctor;
  availableSlots: SelectItem[] = [];
  form: FormGroup;
  showLoader = false;
  appointmentDaysOptions = [
    {label: 'Sunday', value: '', disabled: false},
    {label: 'Monday', value: '', disabled: false},
    {label: 'Tuesday', value: '', disabled: false},
    {label: 'Wednesday', value: '', disabled: false},
    {label: 'Thursday', value: '', disabled: false},
    {label: 'Friday', value: '', disabled: false},
    {label: 'Saturday', value: '', disabled: false}
  ];
  API_URL = environment.API_URL;
  componentInView = new Subject();
  @Input() set setDoctor(doctor) {
    this.doctor = doctor
  }
  @Input() isTemporaryUser = false;
  @Output() cancel = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private utilsService: UtilService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();
    this.setAvailableDaysOfWeek();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params && params.id) {
        this.getDoctorDetailsById(params.id);
      }
    });

    if (this.isTemporaryUser && this.doctor) {
      this.form.get('doctor').setValue(this.doctor.user);
      this.form.get('patient').removeValidators([Validators.required]);
      this.form.get('phoneNumber').addValidators([Validators.required]);
      this.form.updateValueAndValidity();
      this.getAvailableSlots();
    }
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      purpose: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
      patient: new FormControl(null, [Validators.required]),
      doctor: new FormControl(null, [Validators.required]),
      slot: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null)
    });
  }

  getDoctorDetailsById(id): void {
    this.showLoader = true;

    this.apiService.getDoctorDetails(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.doctor = response.doctor;
      if (this.doctor) {
        this.form.get('doctor').setValue(this.doctor.user);
        this.form.get('patient').setValue(this.user._id);
        this.getAvailableSlots();
      }

    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  getAvailableSlots(): void {
    if (this.doctor && this.doctor.scheduleTimings) {
      this.doctor.scheduleTimings.forEach(scheduleTiming => {
        if (this.form.get('date').value === scheduleTiming.day) {
          scheduleTiming.timeSlots.forEach(slot => {
            let startTime = moment(slot.startTime, 'HH:mm A');
            let endTime = moment(slot.endTime, 'HH:mm A');

            while (startTime <= endTime) {
              this.availableSlots.push({label: moment(startTime).format('HH:mm A'), value: moment(startTime).format('HH:mm')});
              startTime.add(scheduleTiming.slotDuration, 'minutes');
            }
          });
        }
      });
    }
  }

  setAvailableDaysOfWeek(): void {
    const date = new Date();
    const day = date.getDay();

    this.appointmentDaysOptions.forEach((item, index) => {
      if (index < day) {
        item.disabled = true;
      }

      item.value = new Date(date.setDate(date.getDate() - date.getDay() + index)).toISOString().slice(0, 10);
    });

    const index = this.appointmentDaysOptions.findIndex(item => item.disabled === false);

    this.form.get('date').setValue(this.appointmentDaysOptions[index].value);
  }

  onDayChange(): void {
    this.availableSlots = [];
    this.getAvailableSlots();
  }

  onSlotClicked(slot): void {
    this.form.get('slot').setValue(slot.value);
  }

  onScheduleClicked(): void {
    if (this.form.invalid) {
      this.utilsService.validateAllFormFields(this.form);
      return
    }

    this.showLoader = true;

    const params = {
      ...this.form.value,
      isTemporaryUser: this.isTemporaryUser
    }

    this.apiService.scheduleAppointment(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.isTemporaryUser ? this.cancel.emit() : this.route.navigate(['/patient/dashboard']).then();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    })
  }
}
