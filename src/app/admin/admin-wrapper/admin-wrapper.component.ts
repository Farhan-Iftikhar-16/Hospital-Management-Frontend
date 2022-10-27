import { Component, OnInit } from '@angular/core';
import {ANIMATIONS} from "../../config/animations";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {ROLES} from "../../config/constant";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-admin-wrapper',
  templateUrl: './admin-wrapper.component.html',
  styleUrls: ['./admin-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class AdminWrapperComponent implements OnInit {

  user;
  profileDetails;
  hospital;
  navbarOptions = [];
  roles = ROLES;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    if (this.user && this.user.role === ROLES.ADMIN) {
      this.getAdminDetailsByUserId('admin/get-profile-details-by-user-id');
      this.getHospitalDetailsAdminId();

      this.utilService.hospitalDetailsUpdated.pipe(takeUntil(this.componentInView)).subscribe(() => {
        this.getHospitalDetailsAdminId();
      });
    }
  }

  getAdminDetailsByUserId(api): void {
   this.apiService.getUserDetailsByUserId(api).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.profileDetails = response.profile;
   }, error => {
      this.toastService.error(error.error.message);
    });
  }

  getHospitalDetailsAdminId(): void {
    this.apiService.getHospitalDetailsAdminId(this.user._id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.hospital = response.hospital;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
