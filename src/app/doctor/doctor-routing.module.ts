import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DoctorWrapperComponent} from "./doctor-wrapper/doctor-wrapper.component";
import {DoctorDashboardComponent} from "./doctor-dashboard/doctor-dashboard.component";
import {AppointmentsListComponent} from "../shared/components/appointments-list/appointments-list.component";
import {DoctorPatientsListComponent} from "./doctor-patients-list/doctor-patients-list.component";
import {ScheduleTimingsComponent} from "./schedule-timings/schedule-timings.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {EditDoctorComponent} from "../shared/components/edit-doctor/edit-doctor.component";
import {ResetPasswordComponent} from "../shared/components/reset-password/reset-password.component";
import {ChatComponent} from "../shared/components/chat/chat.component";

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
        path: 'appointments-list',
        component: AppointmentsListComponent
      },
      {
        path: 'patients-list',
        component: DoctorPatientsListComponent
      },
      {
        path: 'schedule-timings',
        component: ScheduleTimingsComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      },
      {
        path: 'edit-profile/:id',
        component: EditDoctorComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'messages',
        component: ChatComponent
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
