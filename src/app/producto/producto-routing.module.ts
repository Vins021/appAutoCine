import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';
import { ProductoInactivoComponent } from './producto-inactivo/producto-inactivo.component';

const routes: Routes = [
  { path: 'producto', component: ProductoIndexComponent },
  { path: 'producto/all', component: ProductoAllComponent },
  { path: 'producto/inactivo', component: ProductoInactivoComponent },
  { path: 'producto/create', component: ProductoCreateComponent },
  { path: 'producto/update', component: ProductoUpdateComponent },
  { path: 'producto/:id', component: ProductoShowComponent },
  { path: 'producto/update/:id', component: ProductoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
