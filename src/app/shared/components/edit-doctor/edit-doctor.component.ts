import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../services/util.service";
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {ToastService} from "../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GENDERS, ROLES} from "../../../config/constant";

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit {

  user;
  form: FormGroup;
  educations: FormArray;
  experiences: FormArray;
  maxDate = new Date();
  genders = GENDERS;0
  showLoader = false;
  readMode = false;
  componentInView = new Subject();
  @Input() doctor;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params.id && params.id !== '0' && (this.user.role === ROLES.ADMIN || this.user.role === ROLES.SUPER_ADMIN)) {
        this.getDoctorDetails(params.id);
      }

      if (params.id && params.id !== '0' && this.user.role === ROLES.DOCTOR) {
        this.getDoctorDetailsByUserID();
      }

      if (params.id && params.id === '0') {
        this.addEducation();
        this.addExperience();
        this.form.get('createdBy').setValue(this.user._id);
      }
    });

    if (this.doctor) {
      this.form.patchValue(this.doctor);
      this.readMode = true;
      for (let controlsKey in this.form.controls) {
        this.form.controls[controlsKey].disable();
      }
    }
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
      DOB: ['', Validators.required],
      biography: [''],
      services: [''],
      specializations: [''],
      createdBy: ['', Validators.required],
      addressDetails: this.formBuilder.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        postalCode: [''],
      }),
      education: new FormArray([]),
      experience: new FormArray([])
    });
  }

  getDoctorDetails(id): void {
    this.showLoader = true;

    this.apiService.getDoctorDetails(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.setDoctorDetails(response);
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  getDoctorDetailsByUserID(): void {
    this.showLoader = true;

    this.apiService.getDoctorDetailsByUserID().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.setDoctorDetails(response);
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  setDoctorDetails(response): void {
    if (response && response.doctor) {
      const doctor = response.doctor;
      this.form.patchValue(doctor);
      this.form.get('id').setValue(response.doctor._id);

      if (doctor && doctor.education && doctor.education.length > 0) {
        doctor.education.forEach(education => {
          this.addEducation(education);
        });
      }

      if (doctor && doctor.experience && doctor.experience.length > 0) {
        doctor.experience.forEach(experience => {
          this.addExperience(experience);
        });
      }
    }
  }

  addEducation(education = null): void {
    this.educations = this.form.get('education') as FormArray;
    this.educations.push(
      this.formBuilder.group({
        degree: [education ? education.degree : ''],
        institute: [education ? education.institute : ''],
        completionYear: [education ? education.completionYear : '']
      })
    );
  }

  addExperience(experience = null): void {
    this.experiences = this.form.get('experience') as FormArray;
    this.experiences.push(
      this.formBuilder.group({
        hospitalName: [experience ? experience.hospitalName : ''],
        from: [experience ? experience.from : ''],
        to: [experience ? experience.to : ''],
        designation: [experience ? experience.designation : '']
      })
    );
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

    !params.id ? this.addDoctor(params) : this.updateDoctor(params);
  }

  addDoctor(params): void {
    this.apiService.addDoctor(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      if (this.user.role === ROLES.ADMIN || this.user.role === ROLES.SUPER_ADMIN) {
        this.router.navigate(['./admin/doctors']).then();
        return;
      }

      this.router.navigate(['./doctor/dashboard']).then();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  updateDoctor(params): void {
    this.apiService.updateDoctor(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      if (this.user.role === ROLES.ADMIN || this.user.role === ROLES.SUPER_ADMIN) {
        this.router.navigate(['./admin/doctors']).then();
        return;
      }

      this.router.navigate(['./doctor/dashboard']).then();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
