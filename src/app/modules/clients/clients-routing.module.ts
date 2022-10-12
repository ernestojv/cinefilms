import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuard } from 'src/app/core/guards/client.guard';
import { ClientsComponent } from './clients/clients.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie/movie-details/movie-details.component';
import { MovieComponent } from './pages/movie/movie.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { ShowComponent } from './pages/show/show.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'purchase',
        component: PurchaseComponent,
        canActivate: [ClientGuard]
      },
      {
        path: 'movie',
        component: MovieComponent
      },
      {
        path: 'movie/:id',
        component: MovieDetailsComponent
      },
      {
        path: 'show',
        component: ShowComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
