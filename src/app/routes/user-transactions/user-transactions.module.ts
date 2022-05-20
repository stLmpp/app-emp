import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgLetModule } from '@stlmpp/utils';

import { CardNewComponent } from '../../components/card-new/card-new.component';
import { GoBackButtonComponent } from '../../components/go-back-button/go-back-button.component';
import { UtilityDirective } from '../../components/utilities/utility.directive';
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
    MatButtonModule,
    UtilityDirective,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    NgLetModule,
  ],
})
export class UserTransactionsModule {}
