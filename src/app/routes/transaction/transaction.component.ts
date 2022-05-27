import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouteDataEnum } from '../../models/route-data.enum';
import { TransactionWithItems } from '../../models/transaction-with-items';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  readonly transaction: TransactionWithItems = this.activatedRoute.snapshot.data[RouteDataEnum.transactionWithItems];
}
