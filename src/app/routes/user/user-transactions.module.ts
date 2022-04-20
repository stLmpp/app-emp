import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import { DateBrPipeModule } from '../../pipes/date-br-pipe/date-br-pipe.module';

import { UserTransactionCardComponent } from './user-transaction-card/user-transaction-card.component';
import { UserTransactionsRoutingModule } from './user-transactions-routing.module';
import { UserTransactionsComponent } from './user-transactions.component';

@NgModule({
  declarations: [UserTransactionsComponent, UserTransactionCardComponent],
  imports: [CommonModule, UserTransactionsRoutingModule, MatCardModule, DateBrPipeModule, MatRippleModule],
})
export class UserTransactionsModule {}
