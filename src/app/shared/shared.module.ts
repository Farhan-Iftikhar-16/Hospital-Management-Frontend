import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlComponent} from './components/form-control/form-control.component';
import {TruncatePipe} from './pipes/truncate.pipe';
import {EmptyValuePipe} from './pipes/empty-value.pipe';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {SkeletonModule} from 'primeng/skeleton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AvatarModule} from 'primeng/avatar';
import {RatingModule} from 'primeng/rating';
import {TreeModule} from 'primeng/tree';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {RouterModule} from '@angular/router';
import {PasswordModule} from "primeng/password";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AutoCompleteModule} from "primeng/autocomplete";
import {RadioButtonModule} from "primeng/radiobutton";
import {UploadImageComponent} from './components/upload-image/upload-image.component';
import {ProgressBarModule} from "primeng/progressbar";
import {MenuModule} from "primeng/menu";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ChartModule} from "primeng/chart";
import {InputSwitchModule} from "primeng/inputswitch";
import {ChipsModule} from "primeng/chips";
import {TabViewModule} from "primeng/tabview";
import {SelectButtonModule} from "primeng/selectbutton";
import {PaginatorModule} from 'primeng/paginator';
import {EditPatientComponent} from "./components/edit-patient/edit-patient.component";
import {EditDoctorComponent} from "./components/edit-doctor/edit-doctor.component";

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  TableModule,
  InputTextModule,
  ButtonModule,
  DropdownModule,
  TooltipModule,
  DynamicDialogModule,
  ToastModule,
  ConfirmPopupModule,
  SkeletonModule,
  InputTextareaModule,
  AvatarModule,
  RatingModule,
  TreeModule,
  PasswordModule,
  DialogModule,
  CalendarModule,
  ConfirmDialogModule,
  ProgressSpinnerModule,
  AutoCompleteModule,
  RadioButtonModule,
  ProgressBarModule,
  MenuModule,
  ChartModule,
  InputSwitchModule,
  ChipsModule,
  TabViewModule,
  SelectButtonModule,
  RatingModule,
  PaginatorModule
];

const PROVIDERS = [];

const PIPES = [
  TruncatePipe,
  EmptyValuePipe
];

const COMPONENTS = [
  FormControlComponent,
  NavBarComponent,
  UploadImageComponent,
  SidebarComponent,
  EditPatientComponent,
  EditDoctorComponent
];

const DIRECTIVES = [];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  imports: [CommonModule, ...MODULES, RouterModule],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: [...PROVIDERS]
})
export class SharedModule {
}
