import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserAuthenticated$.pipe(
    tap((isUserAuthenticated) => {
      if (!isUserAuthenticated) router.navigateByUrl('/auth/login');
    })
  );
};
