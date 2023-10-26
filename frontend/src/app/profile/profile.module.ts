import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
// import { SharedModule } from '../shared';
import { SharedModule } from '../shared/shared.module';

@NgModule({
 
  imports: [
    SharedModule,
    CommonModule,
    ProfileRoutingModule,
  ],
  declarations: [ProfileComponent],
  providers: [
  ]
})

export class ProfileModule {}