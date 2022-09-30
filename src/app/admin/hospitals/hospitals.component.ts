import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../../environments/environment";
import {ROLES, STATUS, STATUS_VALUE_SET} from "../../config/constant";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

  user;
  selectedHospital;
  hospitals = [];
  filteredHospitals = []
  showEditHospital = false;
  showLoader = false;
  roles = ROLES;
  status = STATUS;
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
    this.getHospitals();
  }

  getHospitals(): void {
    this.showLoader = true;

    this.apiService.getHospitals().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.hospitals = response.hospitals;
      this.filteredHospitals = [...this.hospitals];
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  filterHospitalsList(event): void {
    const value = event.value;

    if (value === 'ALL') {
      this.filteredHospitals = [...this.hospitals];
      return;
    }

    if (value === 'ACTIVE') {
      this.filteredHospitals = this.hospitals.filter(Hospital => Hospital.status === 'ACTIVE');
      return;
    }

    this.filteredHospitals = this.hospitals.filter(Hospital => Hospital.status === 'INACTIVE');
  }

  updateHospitalStatus(hospital): void {
    this.showLoader = true;

    const params = {
      status: hospital.status === this.status.ACTIVE ? this.status.INACTIVE : this.status.ACTIVE
    };

    this.apiService.updateHospitalStatus(params, hospital._id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.getHospitals();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
      this.getHospitals();
    });
  }

}
