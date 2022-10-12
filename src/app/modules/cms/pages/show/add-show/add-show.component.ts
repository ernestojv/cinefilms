import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.model';
import { Theater } from 'src/app/core/models/theater.model';
import { MovieService } from '../../../services/movie.service';
import { ShowService } from '../../../services/show.service';
import { TheaterService } from '../../../services/theater.service';
import Swal from 'sweetalert2';
import { Show } from 'src/app/core/models/show.model';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTheaters();
    this.getMovies();
  }

  addShow() {
    if (!this.showForm.invalid) {
      const show : Show = {
        dateTime: this.showForm.value.dateTime || '',
        theaterId: this.showForm.value.theaterId || '',
        movieId: this.showForm.value.movieId || '',
        price: +(this.showForm.value.price || 0),
      }

      try {
        this.showService.addShow(show).subscribe(
          (show: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'Se ha agregado la función correctamente',
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
