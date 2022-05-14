import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteDataEnum } from '../../models/route-data.enum';
import { TransactionCardsResolver } from '../../resolvers/transaction-cards.resolver';

import { UserTransactionsTitleResolver } from './user-transactions-title.resolver';
import { UserTransactionsComponent } from './user-transactions.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsRoutingModule {}
