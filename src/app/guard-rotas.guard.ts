import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserService } from './components/login/user/service/user.service';
import { environment } from 'src/environments/environment';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root',
})
export class GuardRotasGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    var authentication: boolean = false;

    var poolData = {
      UserPoolId: environment.userPoolId,
      ClientId: environment.clientId,
    };

    var userPool = new CognitoUserPool(poolData);
    var user = userPool.getCurrentUser();

    if (user != null) {
      user.getSession((err: any, session: any) => {
        authentication = session.isValid();
      });
    }

    if (authentication) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
