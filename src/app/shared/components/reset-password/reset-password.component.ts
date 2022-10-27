import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {UtilService} from "../../../services/util.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../services/toast.service";
import {PATTERNS} from "../../../config/constant";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user;
  form: FormGroup;
  showLoader = false;
  componentInView = new Subject();

  constructor(
    public apiService: ApiService,
    private utilService: UtilService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();
    this.form.get('id').setValue(this.user._id);

    if (this.user && !this.user.isTemporaryPassword) {
      this.form.get('recentPassword').setValidators(Validators.pattern(PATTERNS.PASSWORD));
      this.form.updateValueAndValidity();
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      recentPassword: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(PATTERNS.PASSWORD)]),
      confirmPassword: new FormControl(null, [Validators.required, , Validators.pattern(PATTERNS.PASSWORD)]),
    });
  }

  onResetPasswordClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    if (this.form.get('recentPassword').value === this.form.get('password').value) {
      this.toastService.error('Recent password and new password are same');
      return;
    }

    if (this.form.get('password').value !== this.form.get('confirmPassword').value) {
      this.toastService.error('Password does not match.');
      return;
    }

    const params = {
      ...this.form.value,
    }

    delete params.confirmPassword;

    this.showLoader = true;

    this.apiService.resetPassword(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.logout();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  logout(): void {
    localStorage.clear();

    this.router.navigate(['/HMS/auth/login']).then();
  }

}
