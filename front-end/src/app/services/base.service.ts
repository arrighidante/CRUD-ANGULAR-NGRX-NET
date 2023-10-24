import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../data/interfaces/api.interface';
import { apiConfig } from 'src/assets/config/products-api-configuration';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable()
export class BaseService {
  private _apiConfig = apiConfig;
  private APIState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(private _http: HttpClient) {}

  get api(): ApiSettings | undefined {
    return this._apiConfig;
  }

  get http() {
    return this._http;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.APIState.next(true);
  }

  getAPIState() {
    return this.APIState.asObservable();
  }

  doAuthenticate(
    username: string = 'username',
    password: string = 'password'
  ): any {
    const url = apiConfig.authentication.url;
    const body = { username, password };
    return this.http
      .post(url, body, { responseType: 'text' })
      .subscribe((data: any) => {
        this.setToken(data);
      });
  }
}