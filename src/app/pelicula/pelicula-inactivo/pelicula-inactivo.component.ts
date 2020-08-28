import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-inactivo',
  templateUrl: './pelicula-inactivo.component.html',
  styleUrls: ['./pelicula-inactivo.component.css'],
})
export class PeliculaInactivoComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['nombre', 'sinopsis', 'estado','accion'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) { }

  ngOnInit(): void {
    this.listaPeliculas();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  listaPeliculas() {
    this.gService
      .list('/AutoCine/Pelicula/inactivos')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.datos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.name, error.message, 'error');
        }
      );
  }
}
