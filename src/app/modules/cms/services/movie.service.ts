import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = environment.API_URL + '/movie';

  constructor(
    private http: HttpClient
  ) { }

  addMovie(movie: Movie) {
    return this.http.post(this.apiUrl, movie);
  }

  getMovies() {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  getMoviesByName(name: string) {
    return this.http.get<Movie[]>(`${this.apiUrl}/name/${name}`);
  }

  getMoviesByCategory(categoryId: string) {
    return this.http.get<Movie[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  updateMovie(id: string, movie: Movie) {
    return this.http.put(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
