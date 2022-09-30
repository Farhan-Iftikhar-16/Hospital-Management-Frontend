import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {MenuItem} from "primeng/api";
import {ROLES} from "../../../config/constant";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user;
  items: MenuItem[] =[];
  showMobileNavbarOptions = false;
  API_URL = environment.API_URL;
  roles = ROLES;
  @Input() options: { label: string, route: string }[] = [];
  @Input() set setUser(user) {
    this.user = {...user, ...this.user};
  }

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    if (this.user && this.user.role === this.roles.ADMIN) {
      this.items = [
        {label: 'Hospital Details', icon: 'pi pi-fw pi-building', command: () => this.navigateToEditHospital()},
        {label: 'Profile', icon: 'pi pi-fw pi-user-edit', command: () => this.navigateToAdminProfile()},
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()}
      ];
    }

    if (this.user && this.user.role === this.roles.DOCTOR) {
      this.items = [
        {label: 'Profile', icon: 'pi pi-fw pi-user-edit', command: () => this.navigateToDoctorProfile()},
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()}
      ];
    }

    if (this.user && this.user.role === this.roles.SUPER_ADMIN) {
      this.items = [
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()}
      ];
    }

    if (this.user && this.user.role === this.roles.PATIENT) {
      this.items = [
        {label: 'Profile', icon: 'pi pi-fw pi-user-edit', command: () => this.navigateToPatientProfile()},
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()}
      ];
    }
  }

  logout(): void {
    localStorage.clear();

    this.router.navigate(['/HMS/home']).then();
  }

  navigateToEditHospital(): void {
    this.router.navigate(['/admin/edit-hospital/' + this.user._id]).then();
  }

  navigateToAdminProfile(): void {
    this.router.navigate(['/admin/edit-profile/' + this.user._id]).then();
  }

  navigateToDoctorProfile(): void {
    this.router.navigate(['/doctor/edit-profile/' + this.user._id]).then();
  }

  navigateToPatientProfile(): void {
    this.router.navigate(['/patient/edit-profile/' + this.user._id]).then();
  }

}
