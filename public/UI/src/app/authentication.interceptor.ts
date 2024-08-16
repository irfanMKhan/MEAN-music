import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const service = inject(AuthenticationService);

  if (service.hasToken()) {
    return next(
      request.clone({
        setHeaders: {
          authorization: `Bearer ` + service.getToken(),
        },
      })
    );
  } else {
    return next(request);
  }
};
