import { Component, OnInit } from '@angular/core';
import {ROLES} from "../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {ANIMATIONS} from "../../config/animations";
import {NavigationStart, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-doctor-wrapper',
  templateUrl: './doctor-wrapper.component.html',
  styleUrls: ['./doctor-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class DoctorWrapperComponent implements OnInit {

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

    if (this.user && this.user.role === ROLES.DOCTOR) {
      this.getDoctorDetailsByUserId('doctor/get-doctor-details-by-user-id');
    }


    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.subHeading = this.utilsService.getSubHeader(event);
      }
    }).then();
  }

  getDoctorDetailsByUserId(api): void {
    this.showLoader = true;

    this.apiService.getUserDetailsByUserId(api).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.user = response.doctor;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
