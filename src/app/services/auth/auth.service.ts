import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Replace this with your backend API URL

  private loggedinemail="";
  private tokenKey = 'auth_token';
  private loggedInUsernameSubject = new BehaviorSubject<string | null>(null);
  loggedInUsername = this.loggedInUsernameSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      const storedToken = sessionStorage.getItem(this.tokenKey);
      const storedUsername = sessionStorage.getItem('loggedInUsername');
      if (storedToken) {
        this.loggedInUsernameSubject.next(storedUsername);
      }
    }
  }
  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/users/forgot-password', { email });
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    const resetUrl = `${this.apiUrl}/users/reset-password?token=`+ token;
    const requestBody = { newPassword };

    return this.http.post(resetUrl, requestBody);
  }
  login(email: any, password: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          this.loggedInUsernameSubject.next(response.userName);
          sessionStorage.setItem(this.tokenKey, response.token);
          sessionStorage.setItem('loggedInUsername', response.user);
          sessionStorage.setItem('user_id', response.id);

          this.loggedinemail=response.email;
          // Add this line
         
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  getLoggedInUsernameFromStorage(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  register(name: any,lastName:any,email:any,phone:any,password:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, {name,lastName,email,password,phone}).pipe(
      tap(response => console.log('Register response:', response)),
      catchError(error => {
        console.error('Register error:', error);
        return throwError(error);
      })
    );
  }
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  }
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem('auth_token');
    }
    return false;
  }
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem('loggedInUsername');
      this.loggedInUsernameSubject.next(null);
    }
  }


}
