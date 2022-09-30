import { Component, OnInit } from '@angular/core';
import {ROLES} from "../../../config/constant";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarItems = [];

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('role')) {
      const role = JSON.parse(localStorage.getItem('role'))

      if (role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN) {
        this.sidebarItems = [
          {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/admin/dashboard'},
          {label: 'Hospitals', icon: 'pi pi-chart-line', route: '/admin/hospitals'},
          {label: 'Doctors', icon: 'pi pi-user-plus', route: '/admin/doctors'},
          {label: 'Patients', icon: 'pi pi-users', route: '/admin/patients'}
        ];
      }

      if (role === ROLES.ADMIN) {
        this.sidebarItems = [
          {label: 'Dashboard', icon: 'pi pi-chart-line', route: '/admin/dashboard'},
          {label: 'Doctors', icon: 'pi pi-user-plus', route: '/admin/doctors'},
          {label: 'Patients', icon: 'pi pi-users', route: '/admin/patients'}
        ];
      }
    }

  }

}
