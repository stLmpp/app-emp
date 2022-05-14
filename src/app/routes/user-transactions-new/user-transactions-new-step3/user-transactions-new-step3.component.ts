import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-transactions-new-step3',
  templateUrl: './user-transactions-new-step3.component.html',
  styleUrls: ['./user-transactions-new-step3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewStep3Component {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  readonly form = this.formBuilder.group({});
}
