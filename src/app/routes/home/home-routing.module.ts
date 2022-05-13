import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteDataEnum } from '../../models/route-data.enum';
import { UsersWithValuesResolver } from '../../services/users-with-values.resolver';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      [RouteDataEnum.usersWithValues]: UsersWithValuesResolver,
    },
    title: 'Home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
