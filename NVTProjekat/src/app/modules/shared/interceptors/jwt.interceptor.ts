import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../auth/services/currrent-user-service/current-user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private currentUserService: CurrentUserService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.currentUserService.getCurrentUser();
    if (user) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${user.jwt}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
