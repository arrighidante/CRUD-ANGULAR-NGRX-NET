import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { BaseService } from './base.service';
import { apiConfig } from 'src/assets/config/products-api-configuration';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private baseService: BaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === apiConfig.authentication.url) {
      return next.handle(req);
    }

    const token = this.baseService.getToken();
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
