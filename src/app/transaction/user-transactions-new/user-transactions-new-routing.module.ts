import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionFlowDateAndTotalTitleResolver } from './transaction-flow-date-and-total-title.resolver';
import { TransactionFlowNameAndDescriptionTitleResolver } from './transaction-flow-name-and-description-title.resolver';
import { TransactionFlowPersonTitleResolver } from './transaction-flow-person-title.resolver';
import { TransactionFlowSummaryTitleResolver } from './transaction-flow-summary-title.resolver';
import { UserTransactionsNewDateAndTotalGuard } from './user-transactions-new-date-and-total.guard';
import { UserTransactionsNewDateAndTotalComponent } from './user-transactions-new-date-and-total/user-transactions-new-date-and-total.component';
import { UserTransactionsNewNameAndDescriptionGuard } from './user-transactions-new-name-and-description.guard';
import { UserTransactionsNewNameAndDescriptionComponent } from './user-transactions-new-name-and-description/user-transactions-new-name-and-description.component';
import { UserTransactionsNewPersonGuard } from './user-transactions-new-person.guard';
import { UserTransactionsNewPersonComponent } from './user-transactions-new-person/user-transactions-new-person.component';
import { UserTransactionsNewResetStoreGuard } from './user-transactions-new-reset-store.guard';
import { UserTransactionsNewSummaryComponent } from './user-transactions-new-summary/user-transactions-new-summary.component';
import { UserTransactionsNewComponent } from './user-transactions-new.component';

const routes: Routes = [
  {
    path: '',
    component: UserTransactionsNewComponent,
    canActivate: [UserTransactionsNewResetStoreGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'name-and-description',
      },
      {
        path: 'name-and-description',
        component: UserTransactionsNewNameAndDescriptionComponent,
        title: TransactionFlowNameAndDescriptionTitleResolver,
      },
      {
        path: 'person',
        component: UserTransactionsNewPersonComponent,
        canActivate: [UserTransactionsNewNameAndDescriptionGuard],
        title: TransactionFlowPersonTitleResolver,
      },
      {
        path: 'date-and-total',
        component: UserTransactionsNewDateAndTotalComponent,
        canActivate: [UserTransactionsNewPersonGuard],
        title: TransactionFlowDateAndTotalTitleResolver,
      },
      {
        path: 'summary',
        component: UserTransactionsNewSummaryComponent,
        canActivate: [UserTransactionsNewDateAndTotalGuard],
        title: TransactionFlowSummaryTitleResolver,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsNewRoutingModule {}
