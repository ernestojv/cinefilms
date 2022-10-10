import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { Auth } from 'src/app/core/models/auth.model';
import { User } from 'src/app/core/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL + '/auth';

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(username: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
        }
        )
      );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => {
          this.user.next(user)
        },
          () => {
            this.user.next({
              _id: 'none',
              email: 'none',
              name: 'none',
              role: 'none'
            });

          })
      );
  }

  get loggedUser() {
    return this.user.asObservable();
  }

  logOut() {
    this.tokenService.removeToken();
    this.user.next(null);
  }

}
