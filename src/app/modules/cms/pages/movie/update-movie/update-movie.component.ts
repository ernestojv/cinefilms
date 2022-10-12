import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { Movie } from 'src/app/core/models/movie.model';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {

  movie: Movie | null = null;

  movieForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    realeaseDate: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    mpaaCategory: ['', [Validators.required]],
    format: ['', [Validators.required]],
    image: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        let id = params.get('id') || '';
        this.getMovie(id);
      }
    });
    this.getCategories();
  }

  getMovie(id: string) {
    this.movieService.getMovieById(id).subscribe((movie: any) => {
      this.movie = movie.data;
      this.fillForm(this.movie);
    });
  }

  fillForm(movie: any) {
    this.movieForm.setValue({
      name: movie.name,
      realeaseDate: movie.realeaseDate,
      duration: movie.duration.toString(),
      categoryId: movie.categoryId._id,
      mpaaCategory: movie.mpaaCategory,
      format: movie.format,
      image: movie.image,
      description: movie.description,
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categories: any) => {
        this.categories = categories.data;
      }
    );
  }

  updateMovie() {
    if (!this.movieForm.invalid && this.movie) {
      const movie: Movie = {
        name: this.movieForm.value.name || '',
        realeaseDate: this.movieForm.value.realeaseDate || '',
        duration: +(this.movieForm.value.duration || 0),
        categoryId: this.movieForm.value.categoryId || '',
        mpaaCategory: this.movieForm.value.mpaaCategory || '',
        format: this.movieForm.value.format || '',
        image: this.movieForm.value.image || '',
        description: this.movieForm.value.description || '',
      }


      try {
        this.movieService.updateMovie(this.movie._id || '', movie).subscribe(
          (movie: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'Pelicula actualizada correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.router.navigate(['/cms/movie/detail', this.movie?._id]);
          });

      } catch (error: any) {
        Swal.fire({
          title: 'Error al actualizar pelicula',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos',
      })
    }


  }

}
