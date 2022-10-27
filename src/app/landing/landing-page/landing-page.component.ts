import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {SelectItem} from "primeng/api";
import {SPECIALISTS} from "../../config/constant";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  selectedDoctor;
  form: FormGroup;
  isSchedulingAppointment = false;
  doctors: any[] = [];
  topRankedDoctors: any[] = [];
  specialities: SelectItem[] = SPECIALISTS;
  API_URL = environment.API_URL;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getTopRatedDoctors();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      speciality: [''],
      city: [''],
    });
  }

  getTopRatedDoctors(): void {
    this.apiService.getTopRatedDoctors().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.topRankedDoctors = response.doctors;
      console.log(this.topRankedDoctors);
    }, error =>  {
      this.toastService.error(error.error.message);
    })
  }

  searchDoctors(): void {
    this.isSchedulingAppointment = true;

    const params = {
      ...this.form.value
    }

    this.apiService.getDoctors(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.doctors = response.doctors;
    }, error =>  {
      this.toastService.error(error.error.message);
    });
  }
}
