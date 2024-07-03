import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.isLoggedIn() && this.authService.isAuthenticated()) {
        return true;
      }else{
        this.router.navigate(['/']);
        return false;
      }
    }
    return false
  }
}
