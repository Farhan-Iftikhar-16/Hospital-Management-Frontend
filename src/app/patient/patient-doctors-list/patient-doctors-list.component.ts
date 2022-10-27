import { Component, OnInit } from '@angular/core';
import {GENDERS, SPECIALISTS} from "../../config/constant";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {environment} from "../../../environments/environment";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-doctors-list',
  templateUrl: './patient-doctors-list.component.html',
  styleUrls: ['./patient-doctors-list.component.scss']
})
export class PatientDoctorsListComponent implements OnInit {

  selectedDoctor;
  currentPage = 0;
  doctors = [];
  showLoader = false;
  showReviewDialog = false;
  showDoctorProfile = false;
  API_URL = environment.API_URL;
  genderOptions = GENDERS;
  specialistOptions = SPECIALISTS;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.showLoader = true;

    this.apiService.getDoctors().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.doctors = response.doctors;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  getDoctorDegrees(doctor): string[] {
    return doctor.education.map(education => education.degree);
  }

  onPageChange(event): void {
    this.currentPage = event.page;
  }

  onReviewClick(doctor): void {
    this.selectedDoctor = doctor;
    this.showReviewDialog = true;
  }

  onScheduleAppointmentClicked(doctor): void {
    this.router.navigate(['/patient/schedule-appointment/' + doctor._id]).then();
  }
}
