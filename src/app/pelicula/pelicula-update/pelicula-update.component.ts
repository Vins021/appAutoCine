import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-update',
  templateUrl: './pelicula-update.component.html',
  styleUrls: ['./pelicula-update.component.css'],
})
export class PeliculaUpdateComponent implements OnInit {
  producto: any;
  datos: any;
  error: any;
  listaClasif: any;
  listaGener: any;
  estadoInt: any;
  idArray: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  formUpdate: FormGroup;
  id = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required]);
  sinopsis = new FormControl('', [Validators.required]);
  clasificacion_id = new FormControl('', [Validators.required]);
  estado_id = new FormControl('', [Validators.required]);
  genero = new FormControl('', [Validators.required]);

  //Control toggle
  color: ThemePalette = 'accent';
  checked = false;

  constructor(
    private gService: GenericService,
    public fb: FormBuilder,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.obtenerPelicula(id);
  }

  obtenerPelicula(id: any) {
    this.gService
      .get('/AutoCine/Pelicula', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datos = data;
          this.reactiveForm();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  reactiveForm() {
    this.obtenerClasif();
    this.obtenerGener();

    if (this.datos) {
      //valida si estado es 1 para poner el controlador en True
      if (this.datos.estado_id == 1) {
        this.checked = true;
      }
      //Crea un array de IDs de la base de datos para seleccionarlos en la lista
      console.log(this.datos.genero);
      for (let i = 0; i < this.datos.genero.length; i++) {
        this.idArray.push(this.datos.genero[i].id);
      }
      this.formUpdate = this.fb.group({
        id: [this.datos.id, [Validators.required]],
        nombre: [this.datos.nombre, [Validators.required]],
        sinopsis: [this.datos.sinopsis, [Validators.required]],
        clasificacion_id: [this.datos.clasificacion_id, [Validators.required]],
        estado_id: [this.datos.estado_id, [Validators.required]],
        genero: [this.idArray, [Validators.required]],
      });
    }
  }

  obtenerClasif() {
    this.gService
      .list('/AutoCine/Pelicula/Clasificacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.listaClasif = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  obtenerGener() {
    this.gService
      .list('/AutoCine/Pelicula/Genero')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.listaGener = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
/*
  public errorHandling = (control: string, error: string) => {
    return this.formUpdate.controls[control].hasError(error);
  };
  */

  submitForm(){

  }
}
