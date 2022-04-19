import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteDataEnum } from '../../models/route-data.enum';
import { TransactionCardsResolver } from '../../services/transaction-cards.resolver';

import { UserTransactionsComponent } from './user-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: UserTransactionsComponent,
    resolve: {
      [RouteDataEnum.transactionCards]: TransactionCardsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsRoutingModule {}
