import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import { CategoryService } from 'src/app/modules/cms/services/category.service';
import { MovieService } from 'src/app/modules/cms/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      (movies: any) => {
        this.movies = movies.data;
      }
    );
  }

}
