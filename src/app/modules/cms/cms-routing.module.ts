import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsComponent } from './cms/cms.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AddmovieComponent } from './pages/movie/addmovie/addmovie.component';
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
import { ShowDetailComponent } from './pages/show/show-detail/show-detail.component';
import { UpdateShowComponent } from './pages/show/update-show/update-show.component';

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'movie',
        component: MovieComponent,
      },
      {
        path: 'movie/add',
        component: AddmovieComponent,
      },
      {
        path: 'movie/detail/:id',
        component: MovieDetailComponent,
      },
      {
        path: 'movie/update/:id',
        component: UpdateMovieComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'category/add',
        component: AddCategoryComponent
      },
      {
        path: 'category/update/:id',
        component: UpdateCategoryComponent
      },
      {
        path: 'theater',
        component: TheaterComponent
      },
      {
        path: 'theater/add',
        component: AddTheaterComponent
      },
      {
        path: 'theater/update/:id',
        component: UpdateTheaterComponent
      },
      {
        path: 'show',
        component: ShowComponent
      },
      {
        path: 'show/add',
        component: AddShowComponent
      },
      {
        path: 'show/detail/:id',
        component: ShowDetailComponent
      },
      {
        path: 'show/update/:id',
        component: UpdateShowComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
