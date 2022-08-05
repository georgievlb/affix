import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return from(this.authService.isAuthenticated()).pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)));
    return this.authService.IsAdmin()
    .pipe(tap(isAdmin => this.handleAuthorization(isAdmin, state)))
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      this.router.navigate(['/admin/login'], {
        queryParams: {
          ReturnUrl: state.url
        }
      });
    }
  }
}
