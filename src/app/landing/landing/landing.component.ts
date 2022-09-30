import { Component, OnInit } from '@angular/core';
import {ANIMATIONS} from "../../config/animations";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class LandingComponent implements OnInit {

  navbarOptions = [
    {label: 'Login', route: '/HMS/auth/login'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
