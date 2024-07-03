import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { AddCartComponent } from '../add-cart/add-cart.component';
import { UpdatedCartComponent } from '../updated-cart/updated-cart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: AddCartComponent },
      { path: 'update-cart', component: UpdatedCartComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
