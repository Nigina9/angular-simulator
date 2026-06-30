import { CanActivateFn } from '@angular/router';
import { Router } from "@angular/router";
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { IAuthUser } from './IAuthUser';

export const authGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAutorizedUser: IAuthUser | null = authService.getCurrentUser();

  if (isAutorizedUser) {
    return true;
  }
  return router.createUrlTree(['/login']);

};
