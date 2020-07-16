import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-pelicula-index',
  templateUrl: './pelicula-index.component.html',
  styleUrls: ['./pelicula-index.component.css']
})
export class PeliculaIndexComponent implements OnInit {
datos:any;
error:any;
destroy$:Subject<boolean>=new Subject<boolean>();

  constructor(
    private gService:GenericService,
    private notificacion:NotificacionService) { }

  ngOnInit(): void {
    this,this.listaPeliculas();
    }

    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

  listaPeliculas(){
  this.gService.list('/AutoCine/Pelicula').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{console.log(data);
  this.datos=data;},(error:any)=>{this.notificacion.mensaje(error.message,error.name,'error');})
  }
}
