import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiServidor } from './url-api-servidor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlAPI: string;
  urlAPIServidor: UrlApiServidor;

  constructor(private http: HttpClient) {
    this.urlAPIServidor = new UrlApiServidor();
    this.urlAPI = this.urlAPIServidor.getURLAPI();
  }

  login(usuario: any): Observable<any> {
    const encode64 = btoa(usuario.password);
    usuario.password = encode64;
    const body = JSON.stringify(usuario);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.urlAPI + 'Auth/login', body, {
      headers: headers
    });
  }

  logout(usuario: any): Observable<any> {
    const headers = this.urlAPIServidor.getHeaders();
    const body = JSON.stringify(usuario);

    return this.http.post(this.urlAPI + 'Auth/logout', body, {
      headers: headers
    });
  }
}