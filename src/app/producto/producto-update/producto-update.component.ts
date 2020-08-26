import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css'],
})
export class ProductoUpdateComponent implements OnInit {
  producto: any;
  datos: any;
  error: any;
  tipoProd: any;
  clasProd: any;
  estadoInt: any;
  idArray: any []=[];
  formUpdate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required]);
  precio = new FormControl('', [Validators.required]);
  estado_id = new FormControl('', [Validators.required]);
  tipo_producto_id = new FormControl('', [Validators.required]);
  clasificacionp = new FormControl('', [Validators.required]);
  temp: [1,2];
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
    //Obtener Identificador
    let id = +this.route.snapshot.paramMap.get('id');
    //Obtener Pelicula
    this.obtenerProducto(id);
  }

  obtenerProducto(id: any) {
    this.gService
      .get('/AutoCine/Producto', id)
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
    this.getTipo_producto();
    this.getClasificacionp();
    if (this.datos) {
      //valida si estado es 1 para poner el controlador en True
      if(this.datos.estado_id==1){
      this.checked = true;
      }
      //Crea un array de IDs de la base de datos para seleccionarlos en la lista
      for (let i = 0; i < this.datos.clasificacionp.length; i++) {
        this.idArray.push(this.datos.clasificacionp[i].id);
      }

      this.formUpdate = this.fb.group({
        id: [this.datos.id, [Validators.required]],
        nombre: [this.datos.nombre, [Validators.required]],
        descripcion: [this.datos.descripcion, [Validators.required]],
        precio: [this.datos.precio, [Validators.required, Validators.min(0)]],
        tipo_producto_id: [
          this.datos.tipo_producto_id,
          [Validators.required, Validators.min(0)],
        ],
        estadoInt: [this.datos.estado_id, [Validators.required]],
        estado_id: [this.checked, [Validators.required]],
        //Asigna el Array de la DB para cargarlo en el Formulario
        clasificacionp: [this.idArray, [Validators.required]],
      });
      console.log('Checked: ' + this.checked);
    }
  }

  /*   reactiveForm() {
    this.getTipo_producto();
    this.getClasificacionp();
    if(this.datos){
      if (this.datos.estado_id == 1){
        this.checked=true;
      }
      console.log(this.datos.tipo_producto_id);
      this.formUpdate = this.fb.group({                                                                                                                                                                                                                                                                                                                                                                   = this.fb.group({
      id: [this.datos.id, [Validators.required]],
      nombre: [this.datos.nombre, [Validators.required]],
      descripcion: [this.datos.descripcion, [Validators.required]],
      precio: [this.datos.precio, [Validators.required, Validators.min(0)]],
      tipo_producto_id: [this.datos.tipo_producto_id, [Validators.required, Validators.min(0)]],
      estadoInt: [this.datos.estado_id, [Validators.required]],
      estado_id: [this.checked, [Validators.required]],
      clasificacionp: [this.datos.clasificacionp, [Validators.required]],
    })
    if (this.estadoInt == 1) {
      this.checked = true;
    }
    }
  } */

  public errorHandling = (control: string, error: string) => {
    return this.formUpdate.controls[control].hasError(error);
  };

  submitForm() {
    console.log(this.formUpdate.value);

    this.gService.update('/AutoCine/Producto', this.formUpdate.value).subscribe(
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

  getTipo_producto() {
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
}
