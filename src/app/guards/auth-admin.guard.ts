import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if (localStorage.getItem("id_restaurant") == null ||  localStorage.getItem("id_restaurant") != "0"){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
