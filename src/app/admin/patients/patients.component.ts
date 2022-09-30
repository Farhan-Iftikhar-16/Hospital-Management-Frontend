import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Subject, takeUntil} from "rxjs";
import {ROLES, STATUS, STATUS_VALUE_SET} from "../../config/constant";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import * as moment from "moment";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  user;
  patients = [];
  filteredPatients = [];
  showLoader = false;
  status = STATUS;
  roles = ROLES;
  statusValueSet = STATUS_VALUE_SET;
  API_URL = environment.API_URL;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.getPatients();
  }

  getPatients(): void {
    this.showLoader = true;

    this.apiService.getPatients().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.patients = response.patients;
      this.filteredPatients = [...this.patients];
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  getPatientAge(patient): number {
    return moment(new Date()).diff(moment(patient.DOB).format('MM/DD/YYYY'), 'years');
  }

  filterPatientsList(event): void {
    const value = event.value;

    if (value === 'ALL') {
      this.filteredPatients = [...this.patients];
      return;
    }

    if (value === 'ACTIVE') {
      this.filteredPatients = this.patients.filter(patient => patient.status === 'ACTIVE');
      return;
    }

    this.filteredPatients = this.patients.filter(patient => patient.status === 'INACTIVE');
  }

  updatePatientStatus(patient): void {
    this.showLoader = true;

    const params = {
      status: patient.status === this.status.ACTIVE ? this.status.INACTIVE : this.status.ACTIVE
    };

    this.apiService.updatePatientStatus(params, patient._id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.getPatients();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
      this.getPatients();
    });
  }
}
