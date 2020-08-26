import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { ProductoModule } from './producto/producto.module';
import { PeliculaModule } from './pelicula/pelicula.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { FuncionModule } from './funcion/funcion.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    UserModule,
    ProductoModule,
    PeliculaModule,
    UbicacionModule,
    FuncionModule,

    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
