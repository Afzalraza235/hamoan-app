import { NgModule } from '@angular/core';

import { AuthPageRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthPageModule {}
