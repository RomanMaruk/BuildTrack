import { HttpErrorResponse, HttpHandler, HttpInterceptorFn } from '@angular/common/http';
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
      if (error.status === 401) {
        authService.logout();
        route.navigate(['/auth/login']);
      }

      return throwError(() => error);
    }),
  );
};
