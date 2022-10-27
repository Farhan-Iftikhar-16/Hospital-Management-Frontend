import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../../environments/environment";
import * as moment from "moment/moment";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  reviews = [];
  API_URL = environment.API_URL;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.apiService.getReviews().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.reviews = response.reviews;
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

  getDays(createdAt): Number {
    const createdAtDate = moment(createdAt);
    const todayDate = moment(new Date);

    return todayDate.diff(createdAtDate, 'days');
  }

}
