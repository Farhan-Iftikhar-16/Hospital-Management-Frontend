import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ROLES} from "../../config/constant";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  user;
  form: FormGroup;
  showLoader = false;
  API_URL = environment.API_URL;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params.id && params.id !== '0') {
        if (this.user && this.user.role === ROLES.SUPER_ADMIN) {
          this.getAdminProfileDetails(params.id);
        }

        if (this.user && this.user.role === ROLES.ADMIN) {
          this.getUserDetailsByUserId('admin/get-profile-details-by-user-id');
        }
      }
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      _id: [''],
      profileImage: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressDetails: this.formBuilder.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        postalCode: [''],
      })
    });
  }

  getAdminProfileDetails(id): void {
    this.showLoader = true;

    this.apiService.getAdminProfileDetails(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.form.patchValue(response.profile);
      this.form.get('email').disable();

    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  getUserDetailsByUserId(api): void {
    this.showLoader = true;

    this.apiService.getUserDetailsByUserId(api).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.form.patchValue(response.profile);
      this.form.get('email').disable();

    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  onProfileImageUpload(event): void {
    this.form.get('profileImage').setValue(event);
  }

  onSaveChangesClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    this.showLoader = true;

    const params = {
      ...this.form.value
    };

    !params._id ? this.addAdmin(params) : this.updateAdmin(params);
  }

  addAdmin(params): void {
    this.apiService.addAdmin(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.navigateTo();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  updateAdmin(params): void {
    this.apiService.updateAdminProfile(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.navigateTo();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  onCancelClicked(): void {
    this.navigateTo();
  }

  navigateTo(): void {
    if (this.user && this.user.role === ROLES.SUPER_ADMIN) {
      this.router.navigate(['./admin/admins-list']).then();
    }

    if (this.user && this.user.role === ROLES.ADMIN) {
      this.router.navigate(['./admin/dashboard']).then();
    }
  }

}
