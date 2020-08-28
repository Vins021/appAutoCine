import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';
import { HeaderComponent } from '../../core/header/header.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent implements OnInit {
  datos: any;
  error: any;
  contador: any;
  total: any = 5;
  votos: any[] = [];
  formulario: FormGroup;
  producto_id = new FormControl('', [Validators.required]);
  calificacion = new FormControl('', [Validators.required]);
  destroy$: Subject<boolean> = new Subject<boolean>();
  autoTicks = false;
  showTicks = true;
  tickInterval = 1;
  thumbLabel = true;
  votacion: any;

  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    this.listaProducto();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      calificacion: ['', [Validators.required]],
      producto_id: ['', [Validators.required]],
    });
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  actualizaVoto(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
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

  listaVotos(id: any) {
    this.gService
      .get('/AutoCine/VotoProducto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.votos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
    console.log(this.votos.length);
    for (let i = 1; i < this.votos.length; i++) {
      this.total = this.votos[i].calificacion;
      this.contador = i;
    }
    this.total = this.total / this.contador;
    return true;
  }
  submitForm() {
    console.log(this.formulario.value);
    this.gService
      .create('/AutoCine/VotoProducto', this.formulario.value)
      .subscribe(
        (respuesta: any) => {
          this.votacion = respuesta;
        },
        (error) => {
          this.error = error;
          this.notificacion.msjValidacion(this.error);
        }
      );
  }
}
