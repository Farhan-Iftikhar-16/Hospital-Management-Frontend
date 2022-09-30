import { Component, OnInit } from '@angular/core';
import {ROLES} from "../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {NavigationStart, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";
import {ANIMATIONS} from "../../config/animations";

@Component({
  selector: 'app-patient-wrapper',
  templateUrl: './patient-wrapper.component.html',
  styleUrls: ['./patient-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class PatientWrapperComponent implements OnInit {

  user;
  subHeading;
  navbarOptions = [];
  showLoader = false;
  roles = ROLES;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private utilsService: UtilService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    if (this.user && this.user.role === ROLES.PATIENT) {
      this.getPatientDetailsByUserId('patient/get-patient-details-by-user-id');
    }


    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.subHeading = this.utilsService.getSubHeader(event);
      }
    }).then();
  }

  getPatientDetailsByUserId(api): void {
    this.showLoader = true;

    this.apiService.getUserDetailsByUserId(api).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.user = response.patient;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

}
