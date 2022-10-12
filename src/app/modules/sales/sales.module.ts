import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales/sales.component';
import { MovieComponent } from './pages/movie/movie.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { NewSaleComponent } from './pages/new-sale/new-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SalesComponent,
    MovieComponent,
    NavbarComponent,
    NewSaleComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SalesModule { }
