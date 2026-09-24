import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).getToken();

  if (!token || request.url.endsWith('/auth/login') || request.url.endsWith('/auth/register')) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const route = inject(Router);
  const authService = inject(AuthService);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`HTTP Error: ${error.status} ${error.statusText}`, error);
      if (error.status === 401) {
        route.navigate(['/auth/login']);
        authService.logout();
      }

      return throwError(() => error);
    }),
  );
};
