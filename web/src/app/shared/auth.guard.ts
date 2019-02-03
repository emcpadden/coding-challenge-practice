import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    return this.checkLogin(state.url);
  }

  private checkLogin(url: string): boolean {
    if(this.authenticationService.isAuthenticated) {
      return true;
    }

    // Navigate to the login page with extras
    this.router.navigate(['/login'], { queryParams: { redirectUrl: url } });
    return false;
  }
}
