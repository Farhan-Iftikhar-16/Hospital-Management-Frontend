import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  reviews = [];
  showLoader = false;
  componentInView = new Subject();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.showLoader = true;

    this.apiService.getReviews().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.reviews = response.reviews;
    }, error => {
      this.showLoader = true;
      this.toastService.error(error.error.message);
    })
  }

}
