import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthRole } from './AuthRole';

export const adminGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAdminUser: boolean = authService.getCurrentUser()?.role === AuthRole.ADMIN;

  if (isAdminUser) {
    return true;
  }
  return router.createUrlTree(['']);
};

