import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionIndexComponent } from './funcion-index/funcion-index.component';
import { FuncionCreateComponent } from './funcion-create/funcion-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuncionUbicacionComponent } from './funcion-ubicacion/funcion-ubicacion.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    FuncionIndexComponent,
    FuncionCreateComponent,
    FuncionUbicacionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDividerModule,
  ],
  exports: [
    FuncionIndexComponent,
    FuncionCreateComponent,
    FuncionUbicacionComponent,
  ],
})
export class FuncionModule {}
