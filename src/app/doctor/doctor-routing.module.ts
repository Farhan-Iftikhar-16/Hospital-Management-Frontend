import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DoctorWrapperComponent} from "./doctor-wrapper/doctor-wrapper.component";
import {DoctorDashboardComponent} from "./doctor-dashboard/doctor-dashboard.component";
import {AppointmentsListComponent} from "./appointments-list/appointments-list.component";
import {DoctorPatientsListComponent} from "./doctor-patients-list/doctor-patients-list.component";
import {ScheduleTimingsComponent} from "./schedule-timings/schedule-timings.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {EditDoctorComponent} from "../shared/components/edit-doctor/edit-doctor.component";

const routes: Routes = [
  {
    path: '',
    component: DoctorWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DoctorDashboardComponent
      },
      {
        path: 'appointments-list/:id',
        component: AppointmentsListComponent
      },
      {
        path: 'patients-list/:id',
        component: DoctorPatientsListComponent
      },
      {
        path: 'schedule-timings/:id',
        component: ScheduleTimingsComponent
      },
      {
        path: 'reviews/:id',
        component: ReviewsComponent
      },
      {
        path: 'edit-profile/:id',
        component: EditDoctorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DoctorRoutingModule {
}
