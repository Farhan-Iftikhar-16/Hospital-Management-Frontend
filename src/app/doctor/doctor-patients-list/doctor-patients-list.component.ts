import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {Subject, takeUntil} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-doctor-patients-list',
  templateUrl: './doctor-patients-list.component.html',
  styleUrls: ['./doctor-patients-list.component.scss']
})
export class DoctorPatientsListComponent implements OnInit {

  showLoader = false;
  showGuestPatients = false;
  API_URL = environment.API_URL;
  patients = [];
  guestPatients = [];
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.showLoader = false;
    this.apiService.getRecentPatients().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.patients = response.patients;
      this.guestPatients = response.guestPatients;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  getAge(patient): number {
    return moment(new Date()).diff(moment(patient.DOB).format('MM/DD/YYYY'), 'years');
  }

}
