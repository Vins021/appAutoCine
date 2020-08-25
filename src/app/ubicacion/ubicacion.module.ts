import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { UbicacionIndexComponent } from './ubicacion-index/ubicacion-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [UbicacionIndexComponent],
  imports: [
    CommonModule,
    UbicacionRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [UbicacionIndexComponent]
})
export class UbicacionModule { }
