import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        title: 'New transaction - Name and description',
      },
      {
        path: 'person',
        component: UserTransactionsNewPersonComponent,
        canActivate: [UserTransactionsNewNameAndDescriptionGuard],
        title: 'New transaction - Person',
      },
      {
        path: 'date-and-total',
        component: UserTransactionsNewDateAndTotalComponent,
        canActivate: [UserTransactionsNewPersonGuard],
        title: 'New transaction - Date and total',
      },
      {
        path: 'summary',
        component: UserTransactionsNewSummaryComponent,
        canActivate: [UserTransactionsNewDateAndTotalGuard],
        title: 'New transactions - Summary',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsNewRoutingModule {}
