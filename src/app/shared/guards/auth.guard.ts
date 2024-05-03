import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserAuthenticated$.pipe(
    tap((isUserAuthenticated) => {
      if (!isUserAuthenticated) router.navigateByUrl('/auth/login');
    })
  );
};
