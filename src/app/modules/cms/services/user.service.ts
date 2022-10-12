import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.API_URL + '/user';
  constructor(
    private http: HttpClient
  ) { }

  addUser(user: User) {
    return this.http.post(this.apiUrl, user);
  }

  getUserById(id: string) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  updateUser(email: string, user: User) {
    return this.http.put(this.apiUrl + '/' + email, user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
