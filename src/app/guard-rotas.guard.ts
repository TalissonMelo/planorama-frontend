import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserService } from './components/login/user/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class GuardRotasGuard implements CanActivate {
  constructor(private service: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let authentication = this.service.usuarioAltenticado();

    if (authentication) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
