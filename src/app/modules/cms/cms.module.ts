import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CmsComponent } from './cms/cms.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieComponent } from './pages/movie/movie.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { AddmovieComponent } from './pages/movie/addmovie/addmovie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './pages/movie/movie-detail/movie-detail.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CmsComponent,
    NavbarComponent,
    MovieComponent,
    MovieCardComponent,
    AddmovieComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
