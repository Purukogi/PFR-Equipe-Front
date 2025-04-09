import { CanActivateFn } from '@angular/router';

export const authAdminGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem("id_restaurant") != null && localStorage.getItem("id_restaurant") == "0";
};
