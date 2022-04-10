import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteParamEnum } from './models/route-param.enum';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
  },
  {
    path: `user/:${RouteParamEnum.idUser}`,
    children: [
      {
        path: '',
        loadChildren: () => import('./routes/user/user.module').then(m => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
