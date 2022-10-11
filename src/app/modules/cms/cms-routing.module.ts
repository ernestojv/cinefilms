import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsComponent } from './cms/cms.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AddmovieComponent } from './pages/movie/addmovie/addmovie.component';
import { MovieDetailComponent } from './pages/movie/movie-detail/movie-detail.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
