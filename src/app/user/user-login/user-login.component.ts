import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {

  infoUsuario: any;
  error: any;
  formulario: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

//Material Forms
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    //Si esta logueado que lo redireccione
/*      if (authService.currentUserValue) {
       this.router.navigate(['/']);
     } */
    this.reactiveForm();
  }
  /* Definir formulario y la validación */
  reactiveForm() {
    /*https://angular.io/guide/reactive-forms
   https://angular.io/api/forms/Validators */
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email requerido';
    }

    return this.email.hasError('email') ? 'No es un correo Valido' : 't';
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
  ngOnInit(): void {
    this.mensajes();
  }
  submitForm() {
    //Reglas de validación de Angular inválidas
    if (this.formulario.invalid) {
      return;
    }
    //console.log(this.formulario.value);
    this.authService.loginUser(this.formulario.value).subscribe(
      (respuesta: any) => {
        (this.infoUsuario = respuesta), this.router.navigate(['/']);
      },
      (error: any) => {
        console.log(this.formulario.value);
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  onReset() {
    this.formulario.reset();
  }
  /* Manejar errores de formulario en Angular */
  public errorHandling = (control: string, error: string) => {
    return this.formulario.controls[control].hasError(error);
  };
}
