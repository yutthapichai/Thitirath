import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private objectauthService: AuthService, private router: Router) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.objectauthService.getAuth();
    if (!isAuth) { // isAuth == false
      this.router.navigate(['/login']);
    } else {
      return isAuth;
    }
  }
}
