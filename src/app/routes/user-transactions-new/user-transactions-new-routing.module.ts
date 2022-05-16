import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserTransactionsNewDateAndValueGuard } from './user-transactions-new-date-and-value.guard';
import { UserTransactionsNewDateAndValueComponent } from './user-transactions-new-date-and-value/user-transactions-new-date-and-value.component';
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
        path: 'date-and-value',
        component: UserTransactionsNewDateAndValueComponent,
        canActivate: [UserTransactionsNewPersonGuard],
        title: 'New transaction - Date and value',
      },
      {
        path: 'summary',
        component: UserTransactionsNewSummaryComponent,
        canActivate: [UserTransactionsNewDateAndValueGuard],
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
