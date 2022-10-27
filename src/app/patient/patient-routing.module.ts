import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PatientWrapperComponent} from "./patient-wrapper/patient-wrapper.component";
import {PatientDashboardComponent} from "./patient-dashboard/patient-dashboard.component";
import {PatientDoctorsListComponent} from "./patient-doctors-list/patient-doctors-list.component";
import {EditPatientComponent} from "../shared/components/edit-patient/edit-patient.component";
import {ScheduleAppointmentComponent} from "../shared/components/schedule-appointment/schedule-appointment.component";
import {AppointmentsListComponent} from "../shared/components/appointments-list/appointments-list.component";
import {ResetPasswordComponent} from "../shared/components/reset-password/reset-password.component";
import {ChatComponent} from "../shared/components/chat/chat.component";

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
        path: 'appointments-list',
        component: AppointmentsListComponent
      },
      {
        path: 'doctors',
        component: PatientDoctorsListComponent
      },
      {
        path: 'edit-profile/:id',
        component: EditPatientComponent
      },
      {
        path: 'schedule-appointment/:id',
        component: ScheduleAppointmentComponent
      },
      {
        path: 'messages',
        component: ChatComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
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
