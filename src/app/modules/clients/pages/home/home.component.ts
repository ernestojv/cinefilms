import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import { Product } from 'src/app/core/models/product.model';
import { MovieService } from 'src/app/modules/cms/services/movie.service';
import { ProductService } from 'src/app/modules/cms/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  products: any[] = [];

  constructor(
    private movieService: MovieService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getProducts();
  }

  getMovies() {
    this.movieService.getMovies().subscribe((movies: any) => {
      this.movies = movies.data;
      this.movies.length = 5;
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products.data;
      this.products.length = 5;
    });
  }

}
