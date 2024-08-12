import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UseSession } from './util/useSession';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public useSession!: UseSession;

  constructor(private router: Router) {
    this.useSession = new UseSession();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let tokenString: string = this.useSession.getToken();
    let userId: string = this.useSession.getUser().id;

    let url = request.url;

    if (tokenString && !url.endsWith('/oauth/token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + tokenString,
          'X-UserID': userId,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.useSession.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
