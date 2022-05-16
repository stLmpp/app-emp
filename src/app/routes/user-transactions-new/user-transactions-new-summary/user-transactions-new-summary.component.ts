import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-transactions-new-summary',
  templateUrl: './user-transactions-new-summary.component.html',
  styleUrls: ['./user-transactions-new-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewSummaryComponent {}
