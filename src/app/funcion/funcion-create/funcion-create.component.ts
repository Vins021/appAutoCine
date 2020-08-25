import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-funcion-create',
  templateUrl: './funcion-create.component.html',
  styleUrls: ['./funcion-create.component.css'],
})
export class FuncionCreateComponent implements OnInit {
  funcion: any;
  error: any;
  ubicaciones: any;
  peliculas: any;
  formulario: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha = new FormControl('', [Validators.required]);
  disponible = new FormControl('', [Validators.required]);
  cantidad = new FormControl('', [Validators.required]);
  estado_id = new FormControl('', [Validators.required]);
  pelicula_id = new FormControl('', [Validators.required]);
  ubicacion_id = new FormControl('', [Validators.required]);
  //Control toggle
  color: ThemePalette = 'accent';
  checked = true;
  checked2 = true;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificacion: NotificacionService,
    private gService: GenericService
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    this.mensajes();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      fecha: ['', [Validators.required]],
      disponible: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      pelicula_id: ['', [Validators.required]],
      ubicacion_id: ['', [Validators.required]],
      estado_id: ['', [Validators.required]],
    });
    this.getUbicaciones();
    this.getPeliculas();
  }

  getUbicaciones() {
    this.gService
      .list('/AutoCine/Pelicula')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.peliculas = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getPeliculas() {
    this.gService
      .list('/AutoCine/Ubicacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.ubicaciones = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  onReset() {
    this.formulario.reset();
  }

  mensajes() {
    let register = false;
    let auth = false;
    // Mensajes
    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
      auth = params.auth || false;
    });
    if (register) {
      this.notificacion.mensaje(
        'Usuario',
        'Registro de usuario satisfactorio! Por favor especifique las credenciales para ingresar!',
        'success'
      );
    }
    if (auth) {
      this.notificacion.mensaje(
        'Usuario',
        'Usuario no autorizado para ingresar al recurso solicitado',
        'warning'
      );
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.formulario.controls[control].hasError(error);
  };

  submitForm() {
    console.log(this.formulario.value);

    this.gService.create('/AutoCine/Funcion', this.formulario.value).subscribe(
      (respuesta: any) => {
        this.funcion = respuesta;
        this.router.navigate(['/funcion'], {
          queryParams: { register: 'true' },
        });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
}
