import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-funcion-ubicacion',
  templateUrl: './funcion-ubicacion.component.html',
  styleUrls: ['./funcion-ubicacion.component.css'],
})
export class FuncionUbicacionComponent implements OnInit {
  datos: any;
  error: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService){
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))}

  ngOnInit(): void {
    //Obtener Identificador
    let id = +this.route.snapshot.paramMap.get('id');
    //Obtener Producto
    this, this.listaFuncion(id);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listaFuncion(id: any) {
    this.gService
      .get('/AutoCine/Funcion', id)
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
