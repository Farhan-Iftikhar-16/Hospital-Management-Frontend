import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {DoctorWrapperComponent} from './doctor-wrapper/doctor-wrapper.component';
import {SharedModule} from "../shared/shared.module";
import {DoctorRoutingModule} from "./doctor-routing.module";
import {DoctorSidePanelComponent} from './doctor-side-panel/doctor-side-panel.component';
import {DoctorPatientsListComponent} from './doctor-patients-list/doctor-patients-list.component';
import {ScheduleTimingsComponent} from './schedule-timings/schedule-timings.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {EditTimeSlotComponent} from './edit-time-slot/edit-time-slot.component';

@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorWrapperComponent,
    DoctorSidePanelComponent,
    DoctorPatientsListComponent,
    ScheduleTimingsComponent,
    ReviewsComponent,
    ChangePasswordComponent,
    EditTimeSlotComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DoctorRoutingModule,
  ]
})

export class DoctorModule {
}
