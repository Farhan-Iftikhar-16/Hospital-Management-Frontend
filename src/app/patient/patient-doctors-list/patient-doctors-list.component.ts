import { Component, OnInit } from '@angular/core';
import {GENDERS, SPECIALISTS} from "../../config/constant";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {environment} from "../../../environments/environment";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-patient-doctors-list',
  templateUrl: './patient-doctors-list.component.html',
  styleUrls: ['./patient-doctors-list.component.scss']
})
export class PatientDoctorsListComponent implements OnInit {

  currentPage = 0;
  doctors = [];
  API_URL = environment.API_URL;
  genderOptions = GENDERS;
  specialistOptions = SPECIALISTS;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.apiService.getDoctors().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.doctors = response.doctors;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  getDoctorDegrees(doctor): string[] {
    return doctor.education.map(education => education.degree);
  }

  onPageChange(event): void {
    this.currentPage = event.page;
  }
}
