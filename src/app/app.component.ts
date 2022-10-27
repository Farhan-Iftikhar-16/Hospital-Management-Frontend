import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ANIMATIONS} from "./config/animations";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { ZoomMtg } from '@zoomus/websdk'
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: ANIMATIONS.routesAnimation

})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'Hospital-Management-System-Frontend';

  API = 'https://api.zoom.us/v2/users/'

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    // this.apiService.getSignature().subscribe(response => {
    //
    //   // ZoomMtg.join({
    //   //   signature: response.signature,
    //   //   meetingNumber: '12345566',
    //   //   userName: 'Farhan',
    //   //   sdkKey: 'dPvXOTuFIwUx7qwODtfr063INNXqNFJsiWWI',
    //   //   userEmail: 'farhaniftikhar16f16@gmail.com',
    //   //   passWord: '',
    //   //   success: (success) => {
    //   //     console.log(success)
    //   //   },
    //   //   error: (error) => {
    //   //     console.log(error)
    //   //   }
    //   // })
    //
    //   // ZoomMtg.init({
    //   //   leaveUrl: 'http:localhost:4300',
    //   //   success: (success) => {
    //   //     console.log(success)
    //   //   },
    //   //   error: (error) => {
    //   //     console.log(error)
    //   //   }
    //   // });
    // });
  }

  ngAfterViewInit(): void {

    // const client = ZoomMtgEmbedded.createClient()
    //
    // let meetingSDKElement = document.getElementById('meetingSDKElement')
    //
    // client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US' });
  }
}
