import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profileDropdown: boolean = false;

  mobileDropdown: boolean = false;

  private user$: Observable<User | null>;
  user: User | null = null;

  constructor(
    public router: Router,
    private authService: AuthService
  ) {
    this.user$ = this.authService.loggedUser;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user && user._id != 'none') {
        this.user = user;
      }
    });
  }

  logOut() {
    this.user = null;
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
