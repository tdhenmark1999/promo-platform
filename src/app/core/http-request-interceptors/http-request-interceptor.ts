import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthState } from 'src/app/components/auth/store/auth.state';
import { Injectable } from '@angular/core';
import { LoaderService } from './../../services/loader.service';
import { Store } from '@ngxs/store';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  token = this.store.selectSnapshot(AuthState.getAccessToken);

  constructor(private loaderService: LoaderService, private store: Store) {}

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store
      .select((state) => state.auth.token)
      .subscribe((data) => {
        if (data) {
          req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + data),
          });
        }
      });

    if (!req.headers.has('Content-Type')) {
      if (req.url == `${environment.apiURL}/api/FileUpload/upload`) {
        delete req['Content-Type'];
      } else {
        req = req.clone({
          headers: req.headers.set('Content-Type', 'application/json'),
        });
      }
    }

    if (
      req.url == `${environment.apiURL}api/CampaignInfos/list/dashboard` ||
      req.method === 'GET'
    ) {
      /**
       * @params Temporary Comments
       * this.showLoader();
       */
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.hideLoader();
        }
      }),
      catchError((err) => this.handleAuthError(err))
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.hideLoader();
        swal
          .fire(
            'Session Expired!',
            'Sorry, your session has expired, you will be redirected to the login page',
            'warning'
          )
          .then(() => {
            // this.store.dispatch(new Logout());
          });
      }
      if (err.status == 400) {
      }

      if (err.status == 500) {
        swal
          .fire('Session Expired!', 'Sorry, something went wrong', 'error')
          .then(() => {
            // this.store.dispatch(new Logout());
          });
      }
      if (err.status == 404) {
        swal.fire('Error', err.message, 'error');
      }
    }
    return throwError(() => new Error(err.message));
  }
}
