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
    {label: 'Appointments', icon: 'pi pi-calendar', route: '/doctor/appointments-list/131321323'},
    {label: 'Patients', icon: 'pi pi-user-plus', route: '/doctor/patients-list/12313213'},
    {label: 'Schedule Timings', icon: 'pi pi-clock', route: '/doctor/schedule-timings/1231231'},
    {label: 'Reviews', icon: 'pi pi-star-fill', route: '/doctor/reviews/3213231'},
    {label: 'Messages', icon: 'pi pi-comments', route: '/doctor/messages'},
    {label: 'Change Password', icon: 'pi pi-lock', route: '/doctor/change-password'},
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
