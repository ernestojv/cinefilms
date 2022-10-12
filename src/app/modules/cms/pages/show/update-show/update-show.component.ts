import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.model';
import { Show } from 'src/app/core/models/show.model';
import { Theater } from 'src/app/core/models/theater.model';
import Swal from 'sweetalert2';
import { MovieService } from '../../../services/movie.service';
import { ShowService } from '../../../services/show.service';
import { TheaterService } from '../../../services/theater.service';

@Component({
  selector: 'app-update-show',
  templateUrl: './update-show.component.html',
  styleUrls: ['./update-show.component.css']
})
export class UpdateShowComponent implements OnInit {

  show: Show | null = null;

  showForm = this.formBuilder.group({
    dateTime: ['', [Validators.required]],
    theaterId: ['', [Validators.required]],
    movieId: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });

  theaters: Theater[] = [];
  movies: Movie[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private showService: ShowService,
    private theaterService: TheaterService,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTheaters();
    this.getMovies();

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        let id = params.get('id') || '';
        this.getShow(id);
      }
    });
  }

  getShow(id: string) {
    this.showService.getShowById(id).subscribe(
      (show: any) => {
        this.show = show.data;
        if (this.show) {
          this.showForm.setValue({
            dateTime: this.show.dateTime,
            theaterId: this.show.theaterId._id,
            movieId: this.show.movieId._id,
            price: this.show.price.toString(),
          });
        }
      }
    );
  }

  updateShow() {
    if (!this.showForm.invalid && this.show) {
      const show: Show = {
        dateTime: this.showForm.value.dateTime || '',
        theaterId: this.showForm.value.theaterId || '',
        movieId: this.showForm.value.movieId || '',
        price: +(this.showForm.value.price || 0),
      }

      try {
        this.showService.updateShow(this.show._id || '', show).subscribe(
          (show: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'Se ha actualizó la función correctamente',
              icon: 'success'
            }).then(() => {
              this.router.navigate(['/cms/show']);
            });
          }
        );
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos',
      });
    }
  }

  getTheaters() {
    this.theaterService.getTheaters().subscribe(
      (theaters: any) => {
        this.theaters = theaters.data;
      }
    );
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      (movies: any) => {
        this.movies = movies.data;
      }
    );
  }

}
