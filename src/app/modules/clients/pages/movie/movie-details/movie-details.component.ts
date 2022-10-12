import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.model';
import { MovieService } from 'src/app/modules/cms/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        let id = params.get('id') || '';
        this.getMovie(id);
      }
    });
  }

  getMovie(id: string) {
    this.movieService.getMovieById(id).subscribe((movie: any) => {
      this.movie = movie.data;
    });
  }

}
