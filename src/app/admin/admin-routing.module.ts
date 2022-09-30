import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminWrapperComponent} from "./admin-wrapper/admin-wrapper.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DoctorsComponent} from "./doctors/doctors.component";
import {PatientsComponent} from "./patients/patients.component";
import {AdminProfileComponent} from "./admin-profile/admin-profile.component";
import {EditDoctorComponent} from "../shared/components/edit-doctor/edit-doctor.component";
import {EditPatientComponent} from "../shared/components/edit-patient/edit-patient.component";
import {EditHospitalComponent} from "./edit-hospital/edit-hospital.component";
import {HospitalsComponent} from "./hospitals/hospitals.component";

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
        path: 'edit-hospital/:id',
        component: EditHospitalComponent
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
