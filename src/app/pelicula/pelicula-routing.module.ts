import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaShowComponent } from './pelicula-show/pelicula-show.component';
import { PeliculaCreateComponent } from './pelicula-create/pelicula-create.component';
import { PeliculaAllComponent } from './pelicula-all/pelicula-all.component';
import { PeliculaUpdateComponent } from './pelicula-update/pelicula-update.component';
import { PeliculaInactivoComponent } from './pelicula-inactivo/pelicula-inactivo.component';

const routes: Routes = [
  { path: 'pelicula', component: PeliculaIndexComponent },
  {path: 'pelicula/all',component:PeliculaAllComponent},
  { path: 'pelicula/inactivo', component: PeliculaInactivoComponent },
  { path: 'pelicula/create', component: PeliculaCreateComponent },
  { path: 'pelicula/update', component: PeliculaUpdateComponent },
  { path: 'pelicula/:id', component: PeliculaShowComponent },
  { path: 'pelicula/update/:id', component: PeliculaUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculaRoutingModule { }
