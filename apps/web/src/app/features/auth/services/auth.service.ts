import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IAuthResponse, IUserData, IUserRegister, ILoginCredentials } from '@build-track/types';

const TOKEN_KEY = 'buildtrack_access_token';
const USER_KEY = 'buildtrack_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly apiUrl = '/api/auth';
  readonly currentUser = signal<IUserData | null>(null);

  constructor(private readonly http: HttpClient) {
    const storedUser = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser) as IUserData);
    }
  }

  login(credentials: ILoginCredentials): Observable<IAuthResponse> {
    const { rememberMe, ...payload } = credentials;

    return this.http.post<IAuthResponse>(`${this.baseUrl}${this.apiUrl}/login`, payload).pipe(
      tap((response) => this.saveAuth(response, rememberMe === true)),
    );
  }

  register(data: IUserRegister): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.baseUrl}${this.apiUrl}/register`, data).pipe(
      tap((response) => this.saveAuth(response, true)),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
  }

  private saveAuth(response: IAuthResponse, rememberMe: boolean): void {
    this.logout();
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, response.accessToken);
    storage.setItem(USER_KEY, JSON.stringify(response.user));
    this.currentUser.set(response.user);
  }
}
