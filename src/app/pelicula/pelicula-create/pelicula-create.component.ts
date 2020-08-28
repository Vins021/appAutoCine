import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-pelicula-create',
  templateUrl: './pelicula-create.component.html',
  styleUrls: ['./pelicula-create.component.css'],
})
export class PeliculaCreateComponent implements OnInit {
  pelicula: any;
  generos: any;
  formulario: FormGroup;
  error: any;
  clasPel: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  nombre = new FormControl('', [Validators.required]);
  sinopsis = new FormControl('', [Validators.required]);
  estado_id = new FormControl('', [Validators.required]);
  genero_id = new FormControl('', [Validators.required]);
  clasificacion_id = new FormControl('', [Validators.required]);

  //Control toggle
  color: ThemePalette = 'accent';
  checked = true;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificacion: NotificacionService,
    private gService: GenericService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      sinopsis: ['', [Validators.required]],
      estado_id: ['', [Validators.required]],
      genero_id: ['', [Validators.required]],
      clasificacion_id: ['', [Validators.required]],
    });
    this.getGeneros();
    this.getClasificacion();
  }
  ngOnInit(): void {
    this.mensajes();
  }
  getGeneros() {
    this.gService
      .list('/AutoCine/Pelicula/Genero')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.generos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
  getClasificacion() {
    this.gService
      .list('/AutoCine/Pelicula/Clasificacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.clasPel = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  onreset() {
    this.formulario.reset();
  }
  onBack() {
    this.router.navigate(['/pelicula/all']);
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

    this.gService.create('/AutoCine/Pelicula', this.formulario.value).subscribe(
      (respuesta: any) => {
        this.pelicula = respuesta;
        this.router.navigate(['/pelicula/all'], {
          queryParams: { register: 'true' },
        });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  getErrorMessage() {
    if (this.nombre.hasError('required')) {
      return 'Nombre requerido';
    }
  }
}
