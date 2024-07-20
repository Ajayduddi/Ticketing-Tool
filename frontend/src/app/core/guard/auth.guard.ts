import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const data = localStorage.getItem('user');
  if (data) {
    console.log(data);
    return true;
  }

  console.log(false);
  router.navigateByUrl('login');
  return false;
};
