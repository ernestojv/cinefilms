import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSaleComponent } from './pages/new-sale/new-sale.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: '',
        redirectTo: 'new-sale',
        pathMatch: 'full'
      },
      {
        path: 'new-sale',
        component: NewSaleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
