import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hospitals;
  doctors;
  patients;
  showLoader = false;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    // this.getHospitals();
    // this.getPatients();
    // this.getDoctors();
    this.hospitals = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Hospitals',
          backgroundColor: '#0ce0ff',
          data: [65, 59, 80, 81, 56, 55, 40, 50 ,49 ,40 , 43, 100]
        }
      ]
    };

    this.doctors = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Doctors',
          backgroundColor: '#1b5a90',
          data: [65, 59, 80, 81, 56, 55, 40, 50 ,49 ,40 , 43, 100]
        }
      ]
    };

    this.patients = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Patients',
          backgroundColor: '#ffbc00',
          data: [65, 59, 80, 81, 56, 55, 40, 50 ,49 ,40 , 43, 100]
        }
      ]
    };
  }

  // getHospitals(): void {
  //   this.showLoader = true;
  //
  //   this.apiService.getHospitals().pipe(takeUntil(this.componentInView)).subscribe(response => {
  //     this.showLoader = false;
  //     this.doctors = response.doctors;
  //   }, error => {
  //     this.showLoader = false;
  //     this.toastService.error(error.error.message);
  //   });
  // }

  getPatients(): void {
    // this.showLoader = true;
    //
    // this.apiService.getPatients().pipe(takeUntil(this.componentInView)).subscribe(response => {
    //   this.showLoader = false;
    //   this.doctors = response.doctors;
    // }, error => {
    //   this.showLoader = false;
    //   this.toastService.error(error.error.message);
    // });
  }

  getDoctors(): void {
    // this.showLoader = true;
    //
    // this.apiService.getDoctors().pipe(takeUntil(this.componentInView)).subscribe(response => {
    //   this.showLoader = false;
    //   this.doctors = response.doctors;
    // }, error => {
    //   this.showLoader = false;
    //   this.toastService.error(error.error.message);
    // });
  }

}
