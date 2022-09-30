import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminWrapperComponent} from "./admin-wrapper/admin-wrapper.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {DoctorsComponent} from './doctors/doctors.component';
import {PatientsComponent} from './patients/patients.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {AdminsListComponent} from './admins-list/admins-list.component';
import {HospitalsComponent} from "./hospitals/hospitals.component";
import {EditHospitalComponent} from "./edit-hospital/edit-hospital.component";

@NgModule({
  declarations: [
    AdminWrapperComponent,
    DashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    AdminProfileComponent,
    AdminsListComponent,
    HospitalsComponent,
    EditHospitalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})

export class AdminModule {
}
