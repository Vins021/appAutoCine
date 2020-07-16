import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-show',
  templateUrl: './pelicula-show.component.html',
  styleUrls: ['./pelicula-show.component.css'],
})
export class PeliculaShowComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Obtener Identificador
    let id=+this.route.snapshot.paramMap.get('id');
    //Obtener Pelicula
    this.obtenerPelicula(id);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  obtenerPelicula(id:any){
    this.gService
      .get('/AutoCine/Pelicula', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
}
