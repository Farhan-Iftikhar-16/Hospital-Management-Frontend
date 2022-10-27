import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {ApiService} from "../../services/api.service";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})
export class EditHospitalComponent implements OnInit {

  user;
  form: FormGroup;
  API_URL = environment.API_URL;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilService,
    private apiService: ApiService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params && params.id) {
        this.getHospitalDetails(params.id);
      }
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(''),
      profileImage: new FormControl(''),
      name: new FormControl('', Validators.required),
      createdBy: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      location: new FormControl('', Validators.required),
    });
  }

  getHospitalDetails(id): void {
    this.apiService.getHospitalDetails(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response && response.hospital) {
        this.form.patchValue(response.hospital);
        this.form.get('id').setValue(response.hospital._id);
        this.form.get('email').disable();
        return;
      }

      this.form.get('createdBy').setValue(this.user._id);
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  onProfileImageUpload(event): void {
    this.form.get('profileImage').setValue(event);
  }

  saveHospital(): void {
    if (this.form.invalid) {
      this.utilsService.validateAllFormFields(this.form);
      return;
    }

    const params = {
      ...this.form.value,
    }


    params.id ? this.updateHospital(params) : this.addHospital(params);
  }

  updateHospital(params): void {
    this.apiService.updateHospital(params).pipe(takeUntil(this.componentInView)).subscribe((response) => {
      this.toastService.success(response.message);
      this.utilsService.hospitalDetailsUpdated.next(null);
      this.router.navigate(['/admin/hospitals']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  addHospital(params): void {
    this.apiService.addHospital(params).pipe(takeUntil(this.componentInView)).subscribe((response) => {
      this.toastService.success(response.message);
      this.router.navigate(['/admin/hospitals']).then();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }
}
