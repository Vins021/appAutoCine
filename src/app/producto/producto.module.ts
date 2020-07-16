import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [ProductoShowComponent, ProductoIndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
  ],
  exports: [ProductoIndexComponent],
})
export class ProductoModule {}
