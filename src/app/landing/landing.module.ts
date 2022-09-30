import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing/landing.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {LandingRoutingModule} from "./landing-routing.module";
import {LandingPageComponent} from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    LandingComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LandingRoutingModule
  ]
})

// @ts-ignore
export class LandingModule {}// @ts-ignore
