import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      AuthRoutingModule
    ],
    declarations: [
      AuthComponent
    ],
    providers: [
    ]
})

export class AuthModule { }