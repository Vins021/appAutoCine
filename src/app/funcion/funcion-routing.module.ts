import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionIndexComponent } from './funcion-index/funcion-index.component';
import { FuncionCreateComponent } from './funcion-create/funcion-create.component';
import { FuncionUbicacionComponent } from './funcion-ubicacion/funcion-ubicacion.component';


const routes: Routes = [
  { path: 'funcion', component: FuncionIndexComponent },
  { path: 'funcion', component: FuncionIndexComponent },
  { path: 'funcion/create', component: FuncionCreateComponent },
  { path: 'funcion/:id', component: FuncionUbicacionComponent },
  { path: 'funcion/create/:id', component: FuncionCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionRoutingModule { }
