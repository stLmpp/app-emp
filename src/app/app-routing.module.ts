import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteParamEnum } from './models/route-param.enum';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
  },
  {
    path: `users/:${RouteParamEnum.idUser}`,
    children: [
      {
        path: 'transactions',
        loadChildren: () => import('./routes/user/user-transactions.module').then(m => m.UserTransactionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
