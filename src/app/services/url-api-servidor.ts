import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class UrlApiServidor {
  constructor() {}

  public getURLAPI(): string {
    return environment.urlServidor;
  }

  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return headers;
  }
}