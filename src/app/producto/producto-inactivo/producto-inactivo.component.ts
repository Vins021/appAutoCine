import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-producto-inactivo',
  templateUrl: './producto-inactivo.component.html',
  styleUrls: ['./producto-inactivo.component.css']
})
export class ProductoInactivoComponent implements OnInit {
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
    this, this.listaProducto();
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  listaProducto() {
    this.gService
      .list('/AutoCine/Producto/inactivos')
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
