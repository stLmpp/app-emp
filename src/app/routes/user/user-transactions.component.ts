import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trackByFactory } from '@stlmpp/utils';

import { RouteDataEnum } from '../../models/route-data.enum';
import { TransactionCard } from '../../models/transaction-card';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  readonly transactions: TransactionCard[] = this.activatedRoute.snapshot.data[RouteDataEnum.transactionCards] ?? [];
  readonly trackByTransaction = trackByFactory<TransactionCard>('idTransaction');
}
