import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { WebSocketService } from './websocket.service';
import { IAuthenticationData } from '../forms/shared/authenticationData';

import { Tokens } from '../shared/tokens';
import { User } from '../shared/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private appUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router, private webSocketService: WebSocketService) { }

  registerUser(userData: User): Observable<number> {
    return this.http.post<number>(this.appUrl + "security/register", userData).pipe(
      catchError(this.handleError)
    );
  }

  login(authenticationData: IAuthenticationData): Observable<Tokens> {
    return this.http.post<Tokens>(this.appUrl + "login", authenticationData);
  }

  refreshTokens(): Observable<Tokens> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const refreshToken = {token: this.tokenService.getTokens().refreshToken};
    return this.http.post<Tokens>(this.appUrl + "security/refresh-token", JSON.stringify(refreshToken), {headers: headers}).pipe(
      tap((tokens: Tokens) => this.tokenService.saveTokens(tokens))
    );
  }

  logout(): void {
    this.tokenService.removeTokens();
    this.webSocketService.deactivateRxStomp();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }

  getTokens(): Tokens {
    return this.tokenService.getTokens();
  }

  getAuthenticatedUserId(): number{
    return this.tokenService.getUserId() ? this.tokenService.getUserId() : -1;
  } 

  userSessionExpires(): boolean{
    return this.tokenService.refreshTokenExpired();
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
