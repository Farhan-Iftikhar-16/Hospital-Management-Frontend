import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ROLES} from "../config/constant";

@Injectable({
  providedIn: 'root'
})
export class AdminInterceptorService implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('role'))  {
      const role = JSON.parse(localStorage.getItem('role'));
      const user = JSON.parse(localStorage.getItem('user'));

      if (role !== ROLES.SUPER_ADMIN && req.method === 'GET') {
        let params = new HttpParams();

        params = params.set('id', user._id);
        params = params.set('role', role);

        const clonedHttpRequest = req.clone({params: params});

        return next.handle(clonedHttpRequest);
      }
    }

    return next.handle(req);
  }
}
