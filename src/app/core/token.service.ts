import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { Tokens } from '../shared/tokens';


const ACCESS_TOKEN: string = 'access_token';
const REFRESH_TOKEN: string = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  removeTokens(): void{
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  saveTokens(tokens: Tokens): void{
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
  }

  getUserId(): any{
    if(localStorage.getItem(ACCESS_TOKEN) == null){return false;}
    return jwt_decode<any>(localStorage.getItem(ACCESS_TOKEN)).sub;
  }

  getTokens(): Tokens{
    return {accessToken: localStorage.getItem(ACCESS_TOKEN), refreshToken: localStorage.getItem(REFRESH_TOKEN)};
  }

  hasToken(): boolean{
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  refreshTokenExpired(): boolean{
    if(localStorage.getItem(REFRESH_TOKEN) == null){return false;}
    let refreshToken = jwt_decode<any>(localStorage.getItem(REFRESH_TOKEN));
    return refreshToken.exp < Date.now() / 1000;
  }
}
