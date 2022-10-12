import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import { Product } from 'src/app/core/models/product.model';
import { Purchase } from 'src/app/core/models/purchase.model';
import { Show } from 'src/app/core/models/show.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MovieService } from 'src/app/modules/cms/services/movie.service';
import { ProductService } from 'src/app/modules/cms/services/product.service';
import { ShowService } from 'src/app/modules/cms/services/show.service';
import { PurchaseService } from 'src/app/modules/sales/services/purchase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  movieForm = this.formBuilder.group({
    movie: ['', [Validators.required]],
  });

  showForm = this.formBuilder.group({
    show: ['', [Validators.required]],
  });

  productForm = this.formBuilder.group({
    product: ['', [Validators.required]],
  });

  movies: Movie[] = [];
  shows: Show[] = [];
  seats: any[] = [];
  products: Product[] = [];

  purchase: Purchase = {
    showId: null,
    userId: null,
    seats: [],
    productsId: [],
    date: ''
  }

  movie: Movie | null = null;

  private user$: Observable<User | null>;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private showService: ShowService,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private authService: AuthService,
    @Inject(DOCUMENT) document: Document
  ) {
    this.user$ = this.authService.loggedUser;
  }

  ngOnInit(): void {
    this.getMovies();
    this.user$.subscribe(user => {
      if (user && user._id != 'none') {
        this.user = user;
      } else {
        this.authService.getProfile().subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  getMovies() {
    this.movieService.getMovies().subscribe((movies: any) => {
      this.movies = movies.data;
    });
  }

  selectMovie() {
    if (!this.movieForm.invalid) {
      let movie = this.movies.find((movie: Movie) => movie._id === this.movieForm.value.movie);
      this.movie = movie || null;
      this.getShows();
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debe seleccionar una película',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }

  }

  getShows() {
    if (this.movie) {
      this.showService.getShowsByMovie(this.movie._id || '').subscribe((shows: any) => {
        this.shows = shows.data;
      });
    }
  }

  selectShow() {
    if (!this.showForm.invalid) {
      this.purchase.showId = this.shows.find((show: Show) => show._id === this.showForm.value.show) || '';
      this.setSeats();
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debe seleccionar una función',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  setSeats() {
    let rows = this.purchase.showId.theaterId.rows;
    let columns = this.purchase.showId.theaterId.columns;
    let letter = 'A';
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        this.seats.push({
          seat: letter + j,
          available: true
        });
      }
      letter = String.fromCharCode(letter.charCodeAt(0) + 1);
    }
    this.getPurchases();
  }

  getPurchases() {
    this.purchaseService.getPurchasesByShowId(this.purchase.showId._id || '').subscribe((purchases: any) => {
      let data = purchases.data;
      data.forEach((purchase: any) => {
        let seats = purchase.seats;
        seats.forEach((seat: any) => {
          let anSeat = document.getElementById(seat);
          if (anSeat) {
            anSeat.parentElement?.classList.add('bg-red-200');
            anSeat.setAttribute('disabled', 'true');
          }
        });
      });
    });
  }

  selectSeat(seat: any) {
    this.seats.find((s: any) => s.seat == seat.seat)!.available = !seat.available;
  }

  selectSeats() {
    let seats = this.seats.filter((seat: any) => !seat.available);
    this.purchase.seats = seats.map((seat: any) => seat.seat);
    this.seats = [];
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products.data;
    });
  }

  selectProduct() {
    if (!this.productForm.invalid) {
      let product = this.products.find((product: Product) => product._id === this.productForm.value.product);
      this.purchase.productsId.push(product);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debe seleccionar un producto',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  addPurchase() {

    this.purchase.userId = this.user?.email;
    this.purchase.date = new Date().toISOString();
    this.purchaseService.addPurchase(this.purchase).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito!',
          text: 'La compra se realizó con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        window.location.reload();
      },
      error: (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
