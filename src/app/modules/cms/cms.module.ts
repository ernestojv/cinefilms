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
import { UpdateMovieComponent } from './pages/movie/update-movie/update-movie.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './pages/category/update-category/update-category.component';
import { TheaterComponent } from './pages/theater/theater.component';
import { AddTheaterComponent } from './pages/theater/add-theater/add-theater.component';
import { UpdateTheaterComponent } from './pages/theater/update-theater/update-theater.component';
import { ShowComponent } from './pages/show/show.component';
import { AddShowComponent } from './pages/show/add-show/add-show.component';
import { UpdateShowComponent } from './pages/show/update-show/update-show.component';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { UpdateProductComponent } from './pages/product/update-product/update-product.component';
import { UserComponent } from './pages/user/user.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CmsComponent,
    NavbarComponent,
    MovieComponent,
    MovieCardComponent,
    AddmovieComponent,
    MovieDetailComponent,
    UpdateMovieComponent,
    CategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    TheaterComponent,
    AddTheaterComponent,
    UpdateTheaterComponent,
    ShowComponent,
    AddShowComponent,
    UpdateShowComponent,
    ProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
