import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {ROLES} from "../../config/constant";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hospitals;
  doctors;
  patients;
  totalHospitals;
  totalDoctors;
  totalPatients;
  user;
  roles = ROLES;
  isAnalyticsResponseReceived = false;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.hospitals = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Hospitals',
          backgroundColor: '#0ce0ff',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };

    this.doctors = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Doctors',
          backgroundColor: '#1b5a90',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };

    this.patients = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Patients',
          backgroundColor: '#ffbc00',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };

    this.user && this.user.role === ROLES.SUPER_ADMIN ? this.getSuperAdminAnalytics(): this.getAdminAnalytics();
  }

  getSuperAdminAnalytics(): void {
    this.apiService.getSuperAdminAnalytics().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.totalDoctors = response.doctors;
      this.totalPatients = response.patients;
      this.doctors.datasets[0].data = response.chartData.doctors;
      this.patients.datasets[0].data = response.chartData.patients;
      this.totalHospitals = response.hospitals;
      this.hospitals.datasets[0].data = response.chartData.hospitals;
      this.isAnalyticsResponseReceived = true;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  getAdminAnalytics(): void {
    this.apiService.getAdminAnalytics().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.totalDoctors = response.doctors;
      this.totalPatients = response.patients;
      this.doctors.datasets[0].data = response.chartData.doctors;
      this.patients.datasets[0].data = response.chartData.patients;
      this.isAnalyticsResponseReceived = true;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

}
