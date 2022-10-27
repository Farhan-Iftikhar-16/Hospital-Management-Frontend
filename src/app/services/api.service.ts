import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  resetPassword(params): Observable<any> {
    return this.httpClient.put(`${this.apiURL}auth/reset-password`, params);
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
    return this.httpClient.put(`${this.apiURL}hospital/update-hospital/${params.id}`, params);
  }

  getHospitals(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}hospital/get-hospitals`);
  }

  getHospitalDetails(id): Observable<any> {
    return this.httpClient.get(`${this.apiURL}hospital/get-hospital-details/${id}`);
  }

  getHospitalDetailsAdminId(adminId): Observable<any> {
    return this.httpClient.get(`${this.apiURL}hospital/get-hospital-details-by-admin/${adminId}`);
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
    return this.httpClient.put(`${this.apiURL}doctor/update-doctor/${params.id}`, params)
  }

  getDoctors(queryParams = null): Observable<any> {
    if (!queryParams) {
      return this.httpClient.get(`${this.apiURL}doctor/get-doctors`);
    }

    let params = new HttpParams()

    for (const param in queryParams) {
      if (queryParams && queryParams[param]) {
        params = params.set(param, queryParams[param]);
      }
    }

    return this.httpClient.get(`${this.apiURL}doctor/get-doctors`, {params});
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

  getTopRatedDoctors(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}doctor/get-top-rated-doctors`);
  }

  addPatient(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}patient/add-patient`, params)
  }

  updatePatient(params): Observable<any> {
    return this.httpClient.put(`${this.apiURL}patient/update-patient/${params.id}`, params)
  }

  getPatients(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}patient/get-patients`);
  }

  getRecentPatients(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}get-recent-patients-or-doctors/get-patients`);
  }

  getRecentDoctors(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}get-recent-patients-or-doctors/get-doctors`);
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

  scheduleAppointment(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}appointment/schedule-appointment`, params);
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

  getUserRecentChats(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}chat/get-user-recent-chats`);
  }

  getUsers(query): Observable<any> {
    const params = new HttpParams().set('searchText',query);

    return this.httpClient.get(`${this.apiURL}chat/get-users`, {params})
  }

  addReview(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}review/add-review`, params);
  }

  getSignature(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}signature`);
  }

  getSuperAdminAnalytics(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}analytics/super-admin`);
  }

  getAdminAnalytics(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}analytics/admin`);
  }

}
