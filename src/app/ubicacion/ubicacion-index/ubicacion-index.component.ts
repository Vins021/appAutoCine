import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ubicacion-index',
  templateUrl: './ubicacion-index.component.html',
  styleUrls: ['./ubicacion-index.component.css']
})
export class UbicacionIndexComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'estado', 'accion'];

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this, this.listaUbicacion();
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  listaUbicacion() {
    this.gService
      .list('/AutoCine/Ubicacion')
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
