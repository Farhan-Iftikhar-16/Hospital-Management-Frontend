import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {PATTERNS} from "../../config/constant";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(PATTERNS.PASSWORD)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(PATTERNS.PASSWORD)]),
    });
  }

  onSignupClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
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

    this.apiService.signup(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.router.navigate(['./HMS/auth/login']).then();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
