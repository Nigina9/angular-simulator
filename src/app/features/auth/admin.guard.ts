import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from './UserRole';

export const adminGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAdmin: boolean = authService.getCurrentUser()?.role === UserRole.ADMIN;

  if (isAdmin) {
    return true;
  }
  return router.createUrlTree(['']);
};
