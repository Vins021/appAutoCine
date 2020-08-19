import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ProductoShowComponent, ProductoIndexComponent, ProductoCreateComponent, ProductoAllComponent],
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
  ],
  exports: [ProductoIndexComponent, ProductoCreateComponent, ProductoAllComponent],
})
export class ProductoModule {}
