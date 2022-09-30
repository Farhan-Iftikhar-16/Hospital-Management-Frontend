import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import * as moment from "moment";

@Component({
  selector: 'app-patient-side-panel',
  templateUrl: './patient-side-panel.component.html',
  styleUrls: ['./patient-side-panel.component.scss']
})
export class PatientSidePanelComponent implements OnInit {

  user;
  API_URL = environment.API_URL;
  sidePanelOptions = [
    {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/patient/dashboard'},
    {label: 'Appointments', icon: 'pi pi-calendar', route: '/patient/appointments-list/:id'},
    {label: 'Doctors', icon: 'pi pi-user-plus', route: '/patient/doctors'},
    {label: 'Messages', icon: 'pi pi-comments', route: '/patient/messages/:id'},
    {label: 'Change Password', icon: 'pi pi-lock', route: '/patient/change-password/:id'},
  ];
  @Input() set setUser(user) {
    if (user) {
      this.user = user;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  getPatientAge(): number {
    return moment(new Date()).diff(moment(this.user.DOB).format('MM/DD/YYYY'), 'years');
  }
}
