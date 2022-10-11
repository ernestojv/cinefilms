import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { Movie } from 'src/app/core/models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

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
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  addMovie() {
    if (!this.movieForm.invalid) {
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
        this.movieService.addMovie(movie).subscribe(
          (movie: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'Pelicula agregada correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.router.navigate(['/cms/movie']);
          });

      } catch (error: any) {
        Swal.fire({
          title: 'Error al agregar pelicula',
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

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categories: any) => {
        this.categories = categories.data;
      }
    );
  }

}
