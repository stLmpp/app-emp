import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-transactions-new-summary',
  templateUrl: './user-transactions-new-summary.component.html',
  styleUrls: ['./user-transactions-new-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewSummaryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

// TODO change step1 step2 step3 to name person date-and-value
// TODO change guards names to reflect the route changes
// TODO change component names to reflect the route changes
