import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IToken } from './token.interface';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  tokenParseado: IToken;
  admin: boolean;

  constructor(private router: Router) {
    this.tokenParseado = {
      aud: '',
      exp: 0,
      iss: '',
      user: '',
    };
  }

  canActivate() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('jwt');
    if (token) {
      const tokenBruto = jwtHelper.decodeToken(token);
      this.tokenParseado.aud = tokenBruto.aud;
      this.tokenParseado.exp = tokenBruto.exp;
      this.tokenParseado.iss = tokenBruto.iss;
      this.tokenParseado.user = tokenBruto['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }


  isExpiredToken(): boolean {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return true;
    }
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(token);
  }

  getUserName(): string {
    const token = localStorage.getItem('jwt');
    const jwtHelper = new JwtHelperService();
    if (token && !jwtHelper.isTokenExpired(token)) {
      const tokenBruto = jwtHelper.decodeToken(token);
      this.tokenParseado.user = tokenBruto['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      return this.tokenParseado.user;
    }
  }

}