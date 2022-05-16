import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-transactions-new-date-and-value',
  templateUrl: './user-transactions-new-date-and-value.component.html',
  styleUrls: ['./user-transactions-new-date-and-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewDateAndValueComponent {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  readonly form = this.formBuilder.group({});
}
