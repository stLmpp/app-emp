import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { GoBackButtonComponent } from '../../components/go-back-button/go-back-button.component';
import { DateBrPipe } from '../../pipes/date-br-pipe/date-br.pipe';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';

@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    GoBackButtonComponent,
    MatExpansionModule,
    MatListModule,
    DateBrPipe,
  ],
})
export class TransactionModule {}
