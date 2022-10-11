import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Theater } from 'src/app/core/models/theater.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  private apiUrl = environment.API_URL + '/theater';

  constructor(
    private http: HttpClient
  ) { }

  addTheater(theater: Theater) {
    return this.http.post(this.apiUrl, theater);
  }

  getTheaters() {
    return this.http.get<Theater[]>(this.apiUrl);
  }

  getTheaterById(id: string) {
    return this.http.get<Theater>(`${this.apiUrl}/${id}`);
  }

  updateTheater(id: string, theater: Theater) {
    return this.http.put(`${this.apiUrl}/${id}`, theater);
  }

  deleteTheater(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
