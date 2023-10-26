import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
import { ProfileProductsComponent } from '../shared';
import { ProfileFavoritesComponent } from '../shared/profile-favorites/profile-favorites.component';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      { path: '', 
      component: ProfileProductsComponent 
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/home'
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProfileRoutingModule {}