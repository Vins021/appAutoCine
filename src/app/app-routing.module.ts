import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { AcercaDeComponent } from './home/acerca-de/acerca-de.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PeliculaIndexComponent } from './pelicula/pelicula-index/pelicula-index.component';
import { ProductoIndexComponent } from './producto/producto-index/producto-index.component';
import { ProductoShowComponent } from './producto/producto-show/producto-show.component';
import { PeliculaShowComponent } from './pelicula/pelicula-show/pelicula-show.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { ProductoAllComponent } from './producto/producto-all/producto-all.component';
import { ProductoCreateComponent } from './producto/producto-create/producto-create.component';
import { ProductoUpdateComponent } from './producto/producto-update/producto-update.component';
import { UbicacionIndexComponent } from './ubicacion/ubicacion-index/ubicacion-index.component';
import { FuncionIndexComponent } from './funcion/funcion-index/funcion-index.component';
import { FuncionUbicacionComponent } from './funcion/funcion-ubicacion/funcion-ubicacion.component';
import { ProductoInactivoComponent } from './producto/producto-inactivo/producto-inactivo.component';
import { FuncionCreateComponent } from './funcion/funcion-create/funcion-create.component';


const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'pelicula', component: PeliculaIndexComponent },
  { path: 'producto', component: ProductoIndexComponent },
  { path: 'ubicacion', component: UbicacionIndexComponent },
  { path: 'funcion', component: FuncionIndexComponent },
  { path: 'producto/all', component: ProductoAllComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/registrar', component: UserCreateComponent },
  { path: 'funcion/create', component: FuncionCreateComponent },
  { path: 'producto/create', component: ProductoCreateComponent },
  { path: 'home/acercade', component: AcercaDeComponent },
  { path: 'producto/inactivo', component: ProductoInactivoComponent },
  { path: 'pelicula/:id', component: PeliculaShowComponent },
  { path: 'funcion/:id', component: FuncionUbicacionComponent },
  { path: 'producto/:id', component: ProductoShowComponent },
  { path: 'producto/update/:id', component: ProductoUpdateComponent },
  { path: 'funcion/create/:id', component: FuncionCreateComponent },

  /*   { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component:PageNotFoundComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
