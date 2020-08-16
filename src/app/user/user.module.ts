import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [UserCreateComponent, UserIndexComponent, UserLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
  ],exports:[]
})
export class UserModule {}
