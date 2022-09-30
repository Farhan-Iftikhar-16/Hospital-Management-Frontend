import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ROLES} from "../../config/constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showLoader = false;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignInClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    this.showLoader = true;

    this.apiService.login(this.form.value).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', JSON.stringify(response.token));
      localStorage.setItem('role', JSON.stringify(response.user.role));

      if (response.user.role === ROLES.SUPER_ADMIN || response.user.role === ROLES.ADMIN) {
        this.router.navigate(['/admin/dashboard']).then();
        return;
      }

      if (response.user.role === ROLES.DOCTOR) {
        this.router.navigate(['/doctor/dashboard']).then();
        return;
      }

      if (response.user.role === ROLES.PATIENT) {
        this.router.navigate(['/patient/dashboard']).then();
      }
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
