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
import { LoaderService } from './components/loader/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public useSession!: UseSession;

  constructor(private router: Router, private loader: LoaderService) {
    this.useSession = new UseSession();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let tokenString: string = this.useSession.getToken();

    let url = request.url;

    if (tokenString && !url.endsWith('/oauth/token')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: tokenString,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.useSession.clear();
          this.router.navigate(['/login']);
          this.loader.hide();
        }
        return throwError(() => error);
      })
    );
  }
}
