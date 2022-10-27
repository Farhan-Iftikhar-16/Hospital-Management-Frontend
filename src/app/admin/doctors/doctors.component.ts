import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {ROLES, STATUS, STATUS_VALUE_SET} from "../../config/constant";
import * as moment from "moment";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  user;
  doctors = [];
  filteredDoctors = [];
  showLoader = false;
  API_URL = environment.API_URL;
  status = STATUS;
  roles = ROLES;
  statusValueSet = STATUS_VALUE_SET;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.getDoctors();
  }

  getDoctors(): void {
    this.showLoader = true;

    this.apiService.getDoctors().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.doctors = response.doctors;
      this.filteredDoctors = [...this.doctors];
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  filterDoctorsList(event): void {
    const value = event.value;

    if (value === 'ALL') {
      this.filteredDoctors = [...this.doctors];
      return;
    }

    if (value === 'ACTIVE') {
      this.filteredDoctors = this.doctors.filter(doctor => doctor.status === 'ACTIVE');
      return;
    }

    this.filteredDoctors = this.doctors.filter(doctor => doctor.status === 'INACTIVE');
  }

  getAge(doctor): number {
    return moment(new Date()).diff(moment(doctor.DOB).format('MM/DD/YYYY'), 'years');
  }

  updateDoctorStatus(doctor): void {
    this.showLoader = true;

    const params = {
      status: doctor.status === this.status.ACTIVE ? this.status.INACTIVE : this.status.ACTIVE
    };

    this.apiService.updateDoctorStatus(params, doctor._id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.getDoctors();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
      this.getDoctors();
    });
  }
}
