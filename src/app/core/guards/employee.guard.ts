import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  private user$: Observable<User | null>;
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = authService.loggedUser;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin().then(() => {
      return true;
    }).catch(() => {
      this.router.navigate(['/']);
      return false;
    })

  }

  checkLogin() {
    return new Promise((resolve, reject) => {
      this.user$ = this.authService.loggedUser;
      this.user$.subscribe(user => {
        this.user = user
      });
      if (!this.user || this.user._id == 'none') {
        this.authService.getProfile().subscribe(user => {
          this.user = user;
          if (['admin','employee'].includes(user.role)) {
            resolve(true);
          }
        }, () => {
          reject(false);
        });
      } else {
        resolve(true);
      }
    })

  }

}
