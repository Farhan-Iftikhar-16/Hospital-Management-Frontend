import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-doctor-patients-list',
  templateUrl: './doctor-patients-list.component.html',
  styleUrls: ['./doctor-patients-list.component.scss']
})
export class DoctorPatientsListComponent implements OnInit {

  showLoader = false;
  API_URL = environment.API_URL;
  patients = [
    {
      profileImage:'',
      name: 'Richard Wilson',
      addressDetails: {
        country: 'USA',
        city: 'Florida',
      },
      phoneNumber: '123456789',
      age: '38 Years',
      bloodGroup: 'B+'
    },
    {
      profileImage:'',
      name: 'Richard Wilson',
      addressDetails: {
        country: 'USA',
        city: 'Florida',
      },
      phoneNumber: '123456789',
      age: '38 Years',
      bloodGroup: 'B+'
    },
    {
      profileImage:'',
      name: 'Richard Wilson',
      addressDetails: {
        country: 'USA',
        city: 'Florida',
      },
      phoneNumber: '123456789',
      age: '38 Years',
      bloodGroup: 'B+'
    }
  ];
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.showLoader = false;
    this.apiService.getPatients().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.patients = response.patients;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    })
  }

}
