import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { MovieDetailsComponent } from './pages/movie/movie-details/movie-details.component';
import { ShowComponent } from './pages/show/show.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieComponent } from './pages/movie/movie.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientsComponent,
    MovieDetailsComponent,
    ShowComponent,
    PurchaseComponent,
    NavbarComponent,
    MovieComponent,
    HomeComponent,
    MovieCardComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
