import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../data/interfaces/api.interface';
import { apiConfig } from 'src/assets/config/products-api-configuration';
import { map } from 'rxjs';

@Injectable()
export class BaseService {
  private _apiConfig = apiConfig;

  constructor(private _http: HttpClient) {}

  get api(): ApiSettings | undefined {
    return this._apiConfig;
  }

  get http() {
    return this._http;
  }

  getToken(
    username: string = 'username',
    password: string = 'password'
  ): string {
    let token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return this.doAuthenticate(username, password).pipe(
        map((response: any) => {
          console.log('Token obtenido', response);
          localStorage.setItem('token', response);
          return response;
        })
      );
    }
  }

  doAuthenticate(
    username: string = 'username',
    password: string = 'password'
  ): any {
    const url = apiConfig.authentication.url;
    const body = { username, password };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((response: any) => {
        localStorage.setItem('token', response);
        return response;
      })
    );
  }
}
