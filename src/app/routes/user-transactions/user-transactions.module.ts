import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import { CardNewComponent } from '../../components/card-new/card-new.component';
import { GoBackButtonComponent } from '../../components/go-back-button/go-back-button.component';
import { DateBrPipe } from '../../pipes/date-br-pipe/date-br.pipe';

import { UserTransactionCardComponent } from './user-transaction-card/user-transaction-card.component';
import { UserTransactionsRoutingModule } from './user-transactions-routing.module';
import { UserTransactionsComponent } from './user-transactions.component';

@NgModule({
  declarations: [UserTransactionsComponent, UserTransactionCardComponent],
  imports: [
    CommonModule,
    UserTransactionsRoutingModule,
    MatCardModule,
    MatRippleModule,
    CardNewComponent,
    GoBackButtonComponent,
    DateBrPipe,
  ],
})
export class UserTransactionsModule {}
