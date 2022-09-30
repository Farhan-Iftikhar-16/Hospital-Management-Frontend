import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminWrapperComponent} from "./admin-wrapper/admin-wrapper.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HospitalsComponent} from "./hospitals/hospitals.component";
import {DoctorsComponent} from "./doctors/doctors.component";
import {PatientsComponent} from "./patients/patients.component";
import {AdminProfileComponent} from "./admin-profile/admin-profile.component";
import {AdminsListComponent} from "./admins-list/admins-list.component";
import {EditDoctorComponent} from "../shared/components/edit-doctor/edit-doctor.component";
import {EditPatientComponent} from "../shared/components/edit-patient/edit-patient.component";

const routes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'hospitals',
        component: HospitalsComponent
      },
      {
        path: 'doctors',
        component: DoctorsComponent
      },
      {
        path: 'patients',
        component: PatientsComponent
      },
      {
        path: 'edit-doctor/:id',
        component: EditDoctorComponent
      },
      {
        path: 'edit-patient/:id',
        component: EditPatientComponent
      },
      {
        path: 'edit-profile/:id',
        component: AdminProfileComponent
      },
      {
        path: 'admins-list',
        component: AdminsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {

}
