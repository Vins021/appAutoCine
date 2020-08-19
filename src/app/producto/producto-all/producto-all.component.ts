import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css']
})
export class ProductoAllComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio','estado','accion'];
  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }




  ngOnInit(): void {
    this , this.listaProducto();
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  listaProducto() {
    this.gService
      .list('/AutoCine/Producto/all')
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

actualizarProducto(id:number){
  this.router.navigate(['/AutoCine/Producto/Update',id],{relativeTo:this.route})
}

}
