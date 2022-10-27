import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {

  analytics;
  upcomingAppointments = [];
  todayAppointments = [];
  showLoader = false;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getDoctorsAnalytics();
    this.getAppointments();
  }

  getDoctorsAnalytics(): void {
    this.showLoader = true;
    this.apiService.getDoctorAnalytics().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.analytics = response.analytics;
    }, error => {
      this.showLoader = false
      this.toastService.error(error.error.message);
    });
  }

  getAppointments(): void {
    this.showLoader = true;
    this.apiService.getAppointments().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      if (response && response.appointments && response.appointments.length > 0) {
        const appointments = response.appointments;
        this.upcomingAppointments = appointments.filter(appointment =>  moment(new Date()).isAfter(new Date(appointment.dateAndTime)));
        this.todayAppointments = appointments.filter(appointment => moment(new Date(), 'DD-MMM-YYYY') === moment(new Date(appointment.dateAndTime), 'DD-MMM-YYYY'));
      }
    }, error => {
      this.showLoader = false
      this.toastService.error(error.error.message);
    });
  }
}
