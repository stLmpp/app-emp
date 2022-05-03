import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import { CardNewModule } from '../../components/card-new/card-new.module';
import { DateBrPipeModule } from '../../pipes/date-br-pipe/date-br-pipe.module';

import { UserTransactionCardComponent } from './user-transaction-card/user-transaction-card.component';
import { UserTransactionsRoutingModule } from './user-transactions-routing.module';
import { UserTransactionsComponent } from './user-transactions.component';
import { GoBackButtonModule } from '../../components/go-back-button/go-back-button.module';

@NgModule({
  declarations: [UserTransactionsComponent, UserTransactionCardComponent],
  imports: [
    CommonModule,
    UserTransactionsRoutingModule,
    MatCardModule,
    DateBrPipeModule,
    MatRippleModule,
    CardNewModule,
    GoBackButtonModule,
  ],
})
export class UserTransactionsModule {}
