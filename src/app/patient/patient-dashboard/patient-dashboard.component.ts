import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import * as moment from "moment";

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  analytics;
  appointments = [];
  upcomingAppointments = [];
  todayAppointments = [];
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.apiService.getAppointments().pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response && response.appointments && response.appointments.length > 0) {
        this.appointments = response.appointments;
        this.upcomingAppointments = this.appointments.filter(appointment =>  moment(new Date()).isAfter(new Date(appointment.dateAndTime)));
        this.todayAppointments = this.appointments.filter(appointment => moment(new Date(), 'DD-MMM-YYYY') === moment(new Date(appointment.dateAndTime), 'DD-MMM-YYYY'));
      }
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

}
