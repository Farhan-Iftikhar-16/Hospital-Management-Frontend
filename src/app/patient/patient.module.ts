import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientWrapperComponent} from './patient-wrapper/patient-wrapper.component';
import {PatientDashboardComponent} from './patient-dashboard/patient-dashboard.component';
import {PatientSidePanelComponent} from './patient-side-panel/patient-side-panel.component';
import {SharedModule} from "../shared/shared.module";
import {PatientRoutingModule} from "./patient-routing.module";
import {PatientDoctorsListComponent} from './patient-doctors-list/patient-doctors-list.component';

@NgModule({
  declarations: [
    PatientWrapperComponent,
    PatientDashboardComponent,
    PatientSidePanelComponent,
    PatientDoctorsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule
  ]
})
export class PatientModule {
}
