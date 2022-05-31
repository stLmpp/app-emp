import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserTransactionsTitleResolver } from './user-transactions-title.resolver';
import { UserTransactionsComponent } from './user-transactions.component';

import { RouteDataEnum } from '@model/route-data.enum';
import { RouteParamEnum } from '@model/route-param.enum';
import { TransactionCardsResolver } from '@shared/resolvers/transaction-cards.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserTransactionsComponent,
    resolve: {
      [RouteDataEnum.transactionCards]: TransactionCardsResolver,
    },
    title: UserTransactionsTitleResolver,
  },
  {
    path: 'new',
    loadChildren: () =>
      import('../user-transactions-new/user-transactions-new.module').then(m => m.UserTransactionsNewModule),
  },
  {
    path: `:${RouteParamEnum.idTransaction}`,
    loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsRoutingModule {}
