import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TransactionFlowPort } from '../transaction-flow.port';

import { TransactionEditRoutingModule } from './transaction-edit-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TransactionEditRoutingModule],
  providers: [
    {
      provide: TransactionFlowPort,
      useValue: { edit: 1 },
    },
  ],
})
export class TransactionEditModule {}
