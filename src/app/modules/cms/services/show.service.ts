import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Show } from 'src/app/core/models/show.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  apiUrl = environment.API_URL + '/show';

  constructor(
    private http: HttpClient
  ) { }

  addShow(show: Show) {
    return this.http.post(this.apiUrl, show);
  }

  getShows() {
    return this.http.get(this.apiUrl);
  }

  getShowById(id: string) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  getShowsByMovie(movieId: string) {
    return this.http.get(this.apiUrl + '/movie/' + movieId);
  }

  getShowsByTheater(theaterId: string) {
    return this.http.get(this.apiUrl + '/theater/' + theaterId);
  }

  getShowsByDate(date: string) {
    return this.http.get(this.apiUrl + '/date/' + date);
  }

  updateShow(id: string, show: Show) {
    return this.http.put(this.apiUrl + '/' + id, show);
  }

  deleteShow(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
