import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

@NgModule({
  declarations: [InicioComponent, AcercaDeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatGridListModule,
    BrowserAnimationsModule,
  ],
  exports: [InicioComponent]
})
export class HomeModule { }
