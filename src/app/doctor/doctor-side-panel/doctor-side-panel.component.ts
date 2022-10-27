import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-doctor-side-panel',
  templateUrl: './doctor-side-panel.component.html',
  styleUrls: ['./doctor-side-panel.component.scss']
})
export class DoctorSidePanelComponent implements OnInit {

  user;
  API_URL = environment.API_URL;
  sidePanelOptions = [
    {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/doctor/dashboard'},
    {label: 'Appointments', icon: 'pi pi-calendar', route: '/doctor/appointments-list'},
    {label: 'Patients', icon: 'pi pi-user-plus', route: '/doctor/patients-list'},
    {label: 'Schedule Timings', icon: 'pi pi-clock', route: '/doctor/schedule-timings'},
    {label: 'Reviews', icon: 'pi pi-star-fill', route: '/doctor/reviews'},
    {label: 'Messages', icon: 'pi pi-comments', route: '/doctor/messages'},
    {label: 'Reset Password', icon: 'pi pi-lock', route: '/doctor/reset-password'},
  ];
  @Input() set setUser(user) {
    if (user) {
      this.user = user;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
