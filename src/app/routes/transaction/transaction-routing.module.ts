import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteDataEnum } from '../../models/route-data.enum';
import { TransactionWithItemsResolver } from '../../resolvers/transaction-with-items.resolver';

import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    resolve: {
      [RouteDataEnum.transactionWithItems]: TransactionWithItemsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
