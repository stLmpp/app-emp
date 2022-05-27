import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoBackButtonComponent } from '../../components/go-back-button/go-back-button.component';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';

@NgModule({
  declarations: [TransactionComponent],
  imports: [CommonModule, TransactionRoutingModule, GoBackButtonComponent],
})
export class TransactionModule {}
