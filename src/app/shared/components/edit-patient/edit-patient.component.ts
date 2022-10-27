import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BLOOD_GROUP_VALUE_SET, GENDERS, ROLES} from "../../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {UtilService} from "../../../services/util.service";
import {ApiService} from "../../../services/api.service";
import {ToastService} from "../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  user;
  form: FormGroup;
  genderOptions = GENDERS;
  bloodGroupOptions = BLOOD_GROUP_VALUE_SET;
  showLoader = false;
  maxDate = new Date();
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params.id && params.id !== '0' && (this.user.role === ROLES.ADMIN || this.user.role === ROLES.SUPER_ADMIN)) {
        this.getPatientDetails(params.id);
      }

      if (params.id && params.id !== '0' && this.user.role === ROLES.PATIENT) {
        this.getPatientDetailsByUserID();
      }

      if (params.id && params.id === '0') {
        this.form.get('createdBy').setValue(this.user._id);
      }
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      profileImage: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      DOB: ['', Validators.required],
      createdBy: ['', Validators.required],
      addressDetails: this.formBuilder.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        postalCode: [''],
      }),
    });
  }

  getPatientDetails(id): void {
    this.showLoader = true;

    this.apiService.getPatientDetails(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.setPatientDetails(response);
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  getPatientDetailsByUserID(): void {
    this.showLoader = true;

    this.apiService.getPatientDetailsByUserID().pipe(takeUntil(this.componentInView)).subscribe((response) => {
      this.showLoader = false;
      this.setPatientDetails(response);
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  setPatientDetails(response): void {
    if (response && response.patient) {
      this.form.patchValue(response.patient);
      this.form.get('id').setValue(response.patient._id);
    }
  }

  onProfileImageUpload(event): void {
    this.form.get('profileImage').setValue(event);
  }

  onSaveChangesClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    if (!this.form.get('id').value && (this.user.role === ROLES.ADMIN || this.user.role === ROLES.SUPER_ADMIN)) {
      this.form.get('createdBy').setValue(this.user._id);
    }

    this.showLoader = true;

    let params = {
      ...this.form.value,
    };

    !params.id ? this.addPatient(params) : this.updatePatient(params);
  }

  addPatient(params): void {
    this.apiService.addPatient(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);

      if (this.user.role === ROLES.ADMIN || this.user.role === ROLES.SUPER_ADMIN) {
        this.router.navigate(['./admin/patients']).then();
        return;
      }

      this.router.navigate(['./patient/dashboard']).then();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  updatePatient(params): void {
    this.apiService.updatePatient(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      if (this.user.role === ROLES.ADMIN || this.user.role === ROLES.SUPER_ADMIN) {
        this.router.navigate(['./admin/patients']).then();
        return;
      }

      this.router.navigate(['./patient/dashboard']).then();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
