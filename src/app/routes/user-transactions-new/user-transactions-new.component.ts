import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-transactions-new',
  templateUrl: './user-transactions-new.component.html',
  styleUrls: ['./user-transactions-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewComponent {}
