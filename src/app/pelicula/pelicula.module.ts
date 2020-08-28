import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaShowComponent } from './pelicula-show/pelicula-show.component';
import { PeliculaAllComponent } from './pelicula-all/pelicula-all.component';
import { PeliculaCreateComponent } from './pelicula-create/pelicula-create.component';
import { PeliculaUpdateComponent } from './pelicula-update/pelicula-update.component';
import { PeliculaInactivoComponent } from './pelicula-inactivo/pelicula-inactivo.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    PeliculaIndexComponent,
    PeliculaShowComponent,
    PeliculaAllComponent,
    PeliculaCreateComponent,
    PeliculaUpdateComponent,
    PeliculaInactivoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PeliculaRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDividerModule,
  ],
  exports: [
    PeliculaIndexComponent,
    PeliculaShowComponent,
    PeliculaCreateComponent,
    PeliculaAllComponent,
    PeliculaUpdateComponent,
  ],
})
export class PeliculaModule {}
