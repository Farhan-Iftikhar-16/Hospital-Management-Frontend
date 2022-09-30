import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PatientWrapperComponent} from "./patient-wrapper/patient-wrapper.component";
import {DashboardComponent} from "../admin/dashboard/dashboard.component";
import {PatientDashboardComponent} from "./patient-dashboard/patient-dashboard.component";
import {PatientDoctorsListComponent} from "./patient-doctors-list/patient-doctors-list.component";
import {EditPatientComponent} from "../shared/components/edit-patient/edit-patient.component";

const routes: Routes = [
  {
    path: '',
    component: PatientWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: PatientDashboardComponent
      },
      {
        path: 'doctors',
        component: PatientDoctorsListComponent
      },
      {
        path: 'edit-profile/:id',
        component: EditPatientComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PatientRoutingModule {
}
