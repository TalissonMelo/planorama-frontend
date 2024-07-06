import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UseSession } from './util/useSession';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public useSession!: UseSession;

  constructor() {
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
          Authorization: 'Bearer ' + tokenString,
        },
      });
    }

    return next.handle(request);
  }
}
