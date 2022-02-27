import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthentcationService } from '../service/authentcation.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthentcationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return next.handle(req);
  }
}
