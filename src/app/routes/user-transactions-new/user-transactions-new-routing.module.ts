import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTransactionsNewComponent } from './user-transactions-new.component';

const routes: Routes = [
  {
    path: '',
    component: UserTransactionsNewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsNewRoutingModule {}
