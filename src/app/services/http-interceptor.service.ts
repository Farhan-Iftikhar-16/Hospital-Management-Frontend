import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ROLES} from "../config/constant";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
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

        const searchText =req.params.getAll('searchText');

        if (searchText && searchText[0]) {
          params = params.set('searchText', searchText[0]);
        }

        const clonedHttpRequest = req.clone({params: params});

        return next.handle(clonedHttpRequest);
      }
    }

    return next.handle(req);
  }
}
