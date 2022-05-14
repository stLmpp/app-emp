import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserTransactionsNewResetStoreGuard } from './user-transactions-new-reset-store.guard';
import { UserTransactionsNewStep1Component } from './user-transactions-new-step1/user-transactions-new-step1.component';
import { UserTransactionsNewStep2Guard } from './user-transactions-new-step2.guard';
import { UserTransactionsNewStep2Component } from './user-transactions-new-step2/user-transactions-new-step2.component';
import { UserTransactionsNewStep3Guard } from './user-transactions-new-step3.guard';
import { UserTransactionsNewStep3Component } from './user-transactions-new-step3/user-transactions-new-step3.component';
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
        redirectTo: '1',
      },
      {
        path: '1',
        component: UserTransactionsNewStep1Component,
        title: 'New transaction - Step 1',
      },
      {
        path: '2',
        component: UserTransactionsNewStep2Component,
        canActivate: [UserTransactionsNewStep2Guard],
        title: 'New transaction - Step 2',
      },
      {
        path: '3',
        component: UserTransactionsNewStep3Component,
        canActivate: [UserTransactionsNewStep3Guard],
        title: 'New transaction - Step 3',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsNewRoutingModule {}
