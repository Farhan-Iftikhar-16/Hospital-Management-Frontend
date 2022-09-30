import { Component, OnInit } from '@angular/core';
import {ANIMATIONS} from "../../config/animations";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {ROLES} from "../../config/constant";

@Component({
  selector: 'app-admin-wrapper',
  templateUrl: './admin-wrapper.component.html',
  styleUrls: ['./admin-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class AdminWrapperComponent implements OnInit {

  user;
  navbarOptions = [];
  showLoader = false;
  roles = ROLES;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    if (this.user && this.user.role === ROLES.ADMIN) {
      this.getAdminDetailsByUserId('admin/get-profile-details-by-user-id');
    }
  }

  getAdminDetailsByUserId(api): void {
    this.showLoader = true;

    this.apiService.getUserDetailsByUserId(api).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.user = response.profile;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

}
