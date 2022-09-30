import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
   private httpClient: HttpClient
  ) { }

  login(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}auth/login`, params);
  }

  signup(params): Observable<any> {
      return this.httpClient.post(`${this.apiURL}admin/add-admin`, params);
  }

  getUserDetailsByUserId(api): Observable<any> {
      return this.httpClient.get(`${this.apiURL}${api}`);
  }

  getAdmins(): Observable<any>{
    return this.httpClient.get(`${this.apiURL}admin/get-admins-list`);
  }

  addAdmin(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}admin/add-admin`, params);
  }

  updateAdminProfile(params): Observable<any>{
    return this.httpClient.put(`${this.apiURL}admin/update-admin-profile/${params._id}`, params);
  }

  getAdminProfileDetails(id): Observable<any> {
    return this.httpClient.get(`${this.apiURL}admin/get-profile-details/${id}`);
  }

  updateAdminStatus(params, id): Observable<any> {
    return this.httpClient.put(`${this.apiURL}admin/update-admin-status/${id}`, params);
  }

  addHospital(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}hospital/add-hospital`, params);
  }

  updateHospital(params): Observable<any> {
    return this.httpClient.put(`${this.apiURL}hospital/update-hospital/${params._id}`, params);
  }

  getHospitals(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}hospital/get-hospitals`);
  }

  getHospitalDetails(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}hospital/get-hospital-details`);
  }

  deleteHospital(id): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}hospital/delete-hospital/${id}`);
  }

  updateHospitalStatus(params, id): Observable<any> {
    return this.httpClient.put(`${this.apiURL}hospital/update-hospital-status/${id}`, params)
  }

  addDoctor(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}doctor/add-doctor`, params)
  }

  updateDoctor(params): Observable<any> {
    return this.httpClient.put(`${this.apiURL}doctor/update-doctor/${params._id}`, params)
  }

  getDoctors(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}doctor/get-doctors`);
  }

  getDoctorDetails(id): Observable<any> {
    return this.httpClient.get(`${this.apiURL}doctor/get-doctor-details/${id}`);
  }

  getDoctorDetailsByUserID(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}doctor/get-doctor-details-by-user-id`);
  }

  updateDoctorStatus(params, id): Observable<any> {
    return this.httpClient.put(`${this.apiURL}doctor/update-doctor-status/${id}`, params);
  }

  scheduleTimings(params): Observable<any> {
    return this.httpClient.put(`${this.apiURL}doctor/schedule-timings`, params);
  }

  getDoctorAnalytics(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}doctor/get-doctor-analytics`);
  }

  addPatient(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}patient/add-patient`, params)
  }

  updatePatient(params): Observable<any> {
    return this.httpClient.put(`${this.apiURL}patient/update-patient/${params._id}`, params)
  }

  getPatients(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}patient/get-patients`);
  }

  getPatientDetails(id): Observable<any> {
    return this.httpClient.get(`${this.apiURL}patient/get-patient-details/${id}`);
  }

  getPatientDetailsByUserID(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}patient/get-patient-details-by-user-id`);
  }

  updatePatientStatus(params, id): Observable<any> {
    return this.httpClient.put(`${this.apiURL}patient/update-patient-status/${id}`, params);
  }

  getAppointments(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}appointment/get-appointments`);
  }

  getReviews(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}review/get-reviews`);
  }

  sendLoginCredentialsEmail(id): Observable<any> {
    return this.httpClient.post(`${this.apiURL}hospital/send-credentials-email/${id}`, null);
  }

  uploadImage(params): Observable<any> {
    const formData = new FormData();
    for (let key in params) {
      formData.append(key, params[key]);
    }

    return this.httpClient.post(`${this.apiURL}image/upload-image`, formData);
  }
}
