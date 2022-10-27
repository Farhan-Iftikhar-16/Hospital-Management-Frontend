import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {environment} from "../../../../environments/environment";
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {ToastService} from "../../../services/toast.service";
import * as moment from "moment";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user;
  message;
  selectedUser;
  messages = [];
  suggestions = [];
  userRecentChats =[];
  API_URL = environment.API_URL;
  private componentInView = new Subject();

  constructor(
    private chatService: ChatService,
    private apiService: ApiService,
    private toastService: ToastService,
  ){
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.getUserRecentChats();

    this.chatService.newUserJoined()
      .subscribe(data => console.log(data));


    this.chatService.userLeftRoom()
      .subscribe(data => console.log(data));

    this.chatService.newMessageReceived().subscribe(data => {
      this.messages.push(data);
    });
  }

  getUserRecentChats(): void {
    this.apiService.getUserRecentChats().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.userRecentChats = response.chats.map(chats => {
        return {...chats, messages: chats.messages.reverse()}
      });
      console.log(this.userRecentChats);
    }, error => {
      this.toastService.error(error.error.message);
    })
  }

  searchUser(event): void {
    if (event && event.query) {
      this.apiService.getUsers(event.query).pipe(takeUntil(this.componentInView)).subscribe(response => {
        this.suggestions = response.users;
      }, error => {
        this.toastService.error(error.error.message);
      });
    }
  }


  joinChat(): void{
    if (this.user.role === 'DOCTOR') {
      this.chatService.joinRoom({
        doctor: this.user._id,
        patient: this.selectedUser._id,
        name: `${this.selectedUser._id}/${this.user._id}`,
        messages: []
      });

      return;
    }

    if (this.user.role === 'PATIENT') {
      this.chatService.joinRoom({
        doctor: this.selectedUser._id,
        patient: this.user._id,
        name: `${this.user._id}/${this.selectedUser._id}`,
        messages: []
      });

      return;
    }
  }

  leave(): void{
    this.chatService.leaveRoom({user: 'abc', room: '633811d259ee8307ad901866/633811d259ee8307ad901866'});
  }

  sendMessage(): void {
    if (this.user.role === 'DOCTOR') {
      this.chatService.sendMessage({user: this.user._id, room: `${this.selectedUser._id}/${this.user._id}`, message: this.message});
    }

    if (this.user.role === 'PATIENT') {
      this.chatService.sendMessage({user: this.user._id, room: `${this.user._id}/${this.selectedUser._id}`, message: this.message});
    }

    this.message = '';
  }

  getMessageTime(date): string {
    return moment(date, 'HH:mm A').format('HH:mm A');
  }
}
