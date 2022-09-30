import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {

  appointments = [];
  showLoader = false;
  API_URL = environment.API_URL;
  componentInView = new Subject();
  @Input() set setAppointments(appointments) {
    this.appointments = appointments;
  }
  @Input() hideMainHeading = false;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (!this.hideMainHeading) {
      this.getAppointments();
    }
  }

  getAppointments(): void {
    this.apiService.getAppointments().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.appointments = response.appointments
    }, error => {
      this.showLoader = false
      this.toastService.error(error.error.message);
    });
  }
}
