import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';


const routes: Routes = [
  { path: 'producto', component: ProductoIndexComponent },
  { path: 'producto/:id', component: ProductoShowComponent },
  { path: 'producto/all', component: ProductoAllComponent },
  { path: 'producto/create', component: ProductoCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
