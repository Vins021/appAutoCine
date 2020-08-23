import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { UbicacionIndexComponent } from './ubicacion-index/ubicacion-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [UbicacionIndexComponent],
  imports: [
    CommonModule,
    UbicacionRoutingModule,
    MatGridListModule,
    MatCardModule,
  ],
  exports: [UbicacionIndexComponent]
})
export class UbicacionModule { }
