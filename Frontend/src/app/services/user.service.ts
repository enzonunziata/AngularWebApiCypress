import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { UserLogin } from '../models/user-login.model';
import { User } from '../models/user.model';
import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly STORAGE_AUTH_KEY = 'auth';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _currentUser$ = new BehaviorSubject<User | null>(null);
  public currentUser$ = this._currentUser$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.STORAGE_AUTH_KEY);

    if (token != null && !this.tokenIsExpired(token)) {
      this._isLoggedIn$.next(true);
      this._currentUser$.next(this.parseToken(token));
    } else {
      localStorage.removeItem(this.STORAGE_AUTH_KEY);
      this._currentUser$.next(null);
      this._isLoggedIn$.next(false);
    }
  }

  login(user: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/user/login', user).pipe(
      tap((response) => {
        if (!this.tokenIsExpired(response.token)) {
          this._isLoggedIn$.next(true);
          this._currentUser$.next(this.parseToken(response.token));
          localStorage.setItem(this.STORAGE_AUTH_KEY, response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.STORAGE_AUTH_KEY);
    this._isLoggedIn$.next(false);
    this._currentUser$.next(null);
  }

  get token(): string {
    return localStorage.getItem(this.STORAGE_AUTH_KEY) || '';
  }

  private parseToken(token: string): User {
    const tokens = token.split('.');
    return JSON.parse(Base64.atob(tokens[1])) as User;
  }

  private tokenIsExpired(token: string) {
    const user = this.parseToken(token);
    return Math.floor(new Date().getTime() / 1000) >= user.exp;
  }
}
