import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { UserTransactionCardComponent } from './user-transaction-card/user-transaction-card.component';
import { UserTransactionsRoutingModule } from './user-transactions-routing.module';
import { UserTransactionsComponent } from './user-transactions.component';

@NgModule({
  declarations: [UserTransactionsComponent, UserTransactionCardComponent],
  imports: [CommonModule, UserTransactionsRoutingModule, MatCardModule],
})
export class UserTransactionsModule {}
