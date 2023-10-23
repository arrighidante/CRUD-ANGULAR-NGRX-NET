import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private baseService: BaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.baseService.getToken();
    if (token) {
      console.log('Interceptor con token', token);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    }
    console.log('Interceptor SIN token', token);
    return next.handle(req);
  }
}
