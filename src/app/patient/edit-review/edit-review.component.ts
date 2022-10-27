import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {

  user;
  form: FormGroup;
  RecommendedOptions = [
    {label: 'Yes', value: true, disabled: false},
    {label: 'No', value: false, disabled: false},
  ];
  componentInView = new Subject();
  @Input() doctor;
  @Output() hideDialog = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      doctor: new FormControl(this.doctor.user, [Validators.required]),
      patient: new FormControl(this.user._id, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
      recommended: new FormControl(false),
      rating: new FormControl(0),
    });
  }

  onAddReviewClicked(): void {
    const params = {
      ...this.form.value
    }
    this.apiService.addReview(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastService.success(response.message);
      this.hideDialog.emit();
    }, error => {
      this.toastService.error(error.error.message);
    });
  }

}
