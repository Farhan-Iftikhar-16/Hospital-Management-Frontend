import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../services/api.service";
import {ToastService} from "../../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {

  user;
  appointments = [];
  showLoader = false;
  API_URL = environment.API_URL;
  componentInView = new Subject();
  @Input() set setAppointments(appointments) {
    this.appointments = appointments;
  }
  @Input() hideMainHeading = false;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    if (!this.hideMainHeading) {
      this.getAppointments();
    }
  }

  getAppointments(): void {
    this.apiService.getAppointments().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.appointments = response.appointments
    }, error => {
      this.showLoader = false
      this.toastService.error(error.error.message);
    });
  }

  getAge(model): number {
    return moment(new Date()).diff(moment(model.DOB).format('MM/DD/YYYY'), 'years');
  }

  getAppointmentTime(time): any {
    return moment(time, 'HH:mm A').format('HH:mm A');
  }
}
