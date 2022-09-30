import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ROLES, STATUS, STATUS_VALUE_SET} from "../../config/constant";
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit {

  user;
  admins = [];
  filteredAdmins = [];
  showLoader = false;
  API_URL = environment.API_URL;
  status = STATUS;
  roles = ROLES;
  statusValueSet = STATUS_VALUE_SET;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.getAdmins();
  }

  getAdmins(): void {
    this.showLoader = true;

    this.apiService.getAdmins().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.admins = response.admins;
      this.filteredAdmins = [...this.admins];
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  filterAdminsList(event): void {
    const value = event.value;

    if (value === 'ALL') {
      this.filteredAdmins = [...this.admins];
      return;
    }

    if (value === 'ACTIVE') {
      this.filteredAdmins = this.admins.filter(doctor => doctor.status === 'ACTIVE');
      return;
    }

    this.filteredAdmins = this.admins.filter(doctor => doctor.status === 'INACTIVE');
  }

  updateAdminStatus(doctor): void {
    this.showLoader = true;

    const params = {
      status: doctor.status === this.status.ACTIVE ? this.status.INACTIVE : this.status.ACTIVE
    };

    this.apiService.updateAdminStatus(params, doctor._id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.getAdmins();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
      this.getAdmins();
    });
  }
}
