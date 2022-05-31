import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { PageTitleStrategy } from './page-title-strategy';

import { RouteParamEnum } from '@model/route-param.enum';
import { UserExistsGuard } from '@shared/guards/user-exists.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
  },
  {
    path: `users/:${RouteParamEnum.idUser}`,
    canActivate: [UserExistsGuard],
    children: [
      {
        path: 'transactions',
        loadChildren: () =>
          import('./routes/user-transactions/user-transactions.module').then(m => m.UserTransactionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: PageTitleStrategy }],
})
export class AppRoutingModule {}
