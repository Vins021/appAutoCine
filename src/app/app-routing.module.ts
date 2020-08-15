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


const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'home/acercade', component: AcercaDeComponent },
  { path: 'pelicula', component: PeliculaIndexComponent },
  { path: 'pelicula/:id', component: PeliculaShowComponent },
  { path: 'producto', component: ProductoIndexComponent },
  { path: 'producto/:id', component: ProductoShowComponent },
  { path: 'user/registrar', component: UserCreateComponent },
  { path: 'user/login', component: UserLoginComponent },

  /*   { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component:PageNotFoundComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
