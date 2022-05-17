import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserTransactionsNewStoreService } from '../user-transactions-new-store.service';

@Component({
  selector: 'app-user-transactions-new-summary',
  templateUrl: './user-transactions-new-summary.component.html',
  styleUrls: ['./user-transactions-new-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewSummaryComponent {
  constructor(private readonly userTransactionsNewStoreService: UserTransactionsNewStoreService) {}

  readonly dto = this.userTransactionsNewStoreService.getDto();
}
