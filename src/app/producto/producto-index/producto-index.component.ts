import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';
import { HeaderComponent } from '../../core/header/header.component';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  ngOnInit(): void {
    this, this.listaProducto();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listaProducto() {
    this.gService
      .list('/AutoCine/Producto')
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


  agregaCarrito(id: number) {
    HeaderComponent.listaCarrito.push(id);
    console.log(HeaderComponent.listaCarrito);
  }



}
