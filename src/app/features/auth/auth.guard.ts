import { CanActivateFn } from '@angular/router';
import { Router } from "@angular/router";
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLoggeIn: string | null = authService.getToken();

  if (isLoggeIn) {
    return true
  }
  return router.createUrlTree(['/login']);

};
