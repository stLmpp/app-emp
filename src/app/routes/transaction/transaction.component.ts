import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackByFactory } from '@stlmpp/utils';

import { trackById } from '../../shared/utils/track-by';

import {
  TransactionItemDay,
  TransactionItemMonth,
  TransactionItemYear,
  TransactionStoreService,
} from './transaction-store.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {
  constructor(private readonly transactionStoreService: TransactionStoreService) {}

  readonly transaction$ = this.transactionStoreService.transaction$;

  readonly trackByMonth = trackById<TransactionItemMonth>();
  readonly trackByYear = trackByFactory<TransactionItemYear>('year');
  readonly trackByItem = trackById<TransactionItemDay>();

  onAfterExpand(id: string): void {
    this.transactionStoreService.setOpened(id);
  }
}
