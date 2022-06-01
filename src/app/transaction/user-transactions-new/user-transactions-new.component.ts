import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TransactionFlowPort } from '../transaction-flow.port';

@Component({
  selector: 'app-user-transactions-new',
  templateUrl: './user-transactions-new.component.html',
  styleUrls: ['./user-transactions-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewComponent {
  constructor(private readonly transactionFlowPort: TransactionFlowPort) {}

  readonly messages = this.transactionFlowPort.messages;
}
