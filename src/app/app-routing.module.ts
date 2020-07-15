import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { AcercaDeComponent } from './home/acerca-de/acerca-de.component';


const routes: Routes = [{
  path:'home',component: InicioComponent},
  {path:'home/acercade',component:AcercaDeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
