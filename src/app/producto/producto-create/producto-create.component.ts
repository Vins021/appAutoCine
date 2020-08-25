import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css'],
})
export class ProductoCreateComponent implements OnInit {
  producto:any;
  error: any;
  tipoProd: any;
  clasProd: any;
  formulario: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  nombre = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required]);
  precio = new FormControl('', [Validators.required]);
  estado_id = new FormControl('', [Validators.required]);
  tipo_producto_id = new FormControl('', [Validators.required]);
  clasificacionp = new FormControl('', [Validators.required]);

  //Control toggle
  color: ThemePalette = 'accent';
  checked = true;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificacion: NotificacionService,
    private gService: GenericService,
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    this.mensajes();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      tipo_producto_id: ['', [Validators.required, Validators.min(0)]],
      estado_id: ['', [Validators.required]],
      clasificacionp: ['', [Validators.required]],
    });
    this.getTipo_producto();
    this.getClasificacionp();
  }


  getTipo_producto(){
    this.gService
      .list('/AutoCine/Producto/TipoProducto')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.tipoProd = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getClasificacionp() {
    this.gService
      .list('/AutoCine/Producto/Clasificacionp')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.clasProd = data;
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

    this.gService.create('/AutoCine/Producto', this.formulario.value).subscribe(
      (respuesta: any) => {
        this.producto = respuesta;
        this.router.navigate(['/producto/all'], {
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
