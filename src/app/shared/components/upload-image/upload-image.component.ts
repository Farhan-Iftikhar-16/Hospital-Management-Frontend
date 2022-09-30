import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../services/api.service";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  showLoader = false;
  API_URL = environment.API_URL;
  uploadedImage = {
    _id: '',
    name: ''
  };
  componentInView = new Subject();
  @Input() icon;
  @Input() set setImageName(name) {
    if (name) {
      this.uploadedImage.name = name;
    }
  }
  @Output() profileImage = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
  }

  onImageUpload(event): void {
    if (event && event.target.files[0]) {
      const hospitalLogo = event.target.files[0];

      const params = {
        image: hospitalLogo,
        name: hospitalLogo.name
      };

      this.showLoader = true;

      this.apiService.uploadImage(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
        this.showLoader = false;
        this.uploadedImage = response.image;
        this.profileImage.emit(response.image.name);
      }, error => {
        this.showLoader = false;
        this.toastService.error(error.error.message);
      });
    }
  }

}
