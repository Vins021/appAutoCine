import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-funcion-index',
  templateUrl: './funcion-index.component.html',
  styleUrls: ['./funcion-index.component.css']
})
export class FuncionIndexComponent implements OnInit {
  datos: any;
  error: any;
  disponibilidad:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['fecha', 'pelicula', 'ubicacion', 'cantidad', 'disponible','estado'];
  //Control toggle
  color: ThemePalette = 'accent';
  checked = false;

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this, this.listaFuncion();
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  listaFuncion() {
    this.gService
      .list('/AutoCine/Funcion')
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
