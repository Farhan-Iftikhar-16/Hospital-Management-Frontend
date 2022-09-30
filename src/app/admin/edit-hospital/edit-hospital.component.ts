import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {ApiService} from "../../services/api.service";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})
export class EditHospitalComponent implements OnInit {

  user;
  form: FormGroup;
  showLoader = false;
  editMode = false;
  API_URL = environment.API_URL;
  componentInView = new Subject();
  @Input() hospital;
  @Output() closeDialog = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilService,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    if (this.hospital) {
      this.editMode = true;
      this.form.patchValue(this.hospital);
      this.form.get('email').disable();
    }


  }

  createForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(''),
      profileImage: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      location: new FormControl('', Validators.required),
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
      createdBy: this.user._id
    }


    this.editMode ? this.updateHospital(params) : this.addHospital(params);
  }

  updateHospital(params): void {
    this.showLoader = true;

    this.apiService.updateHospital(params).pipe(takeUntil(this.componentInView)).subscribe((response) => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.closeDialog.emit();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  addHospital(params): void {
    this.showLoader = true;

    this.apiService.addHospital(params).pipe(takeUntil(this.componentInView)).subscribe((response) => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.closeDialog.emit();
      // this.sendLoginCredentialsEmail(response.hospital);
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  // sendLoginCredentialsEmail(hospital): void {
  //   this.apiService.sendLoginCredentialsEmail(hospital._id).pipe(takeUntil(this.componentInView)).subscribe(response => {
  //     this.showLoader= false;
  //     this.toastService.success(response.message);
  //     this.closeDialog.emit();
  //   }, () => {
  //     this.sendLoginCredentialsEmail(hospital);
  //   });
  // }


}
