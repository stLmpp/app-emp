import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TransactionType } from '../../models/transaction-type';
import { TransactionService } from '../../services/transaction.service';

interface TransactionCreateForm {
  name: FormControl<string>;
  description: FormControl<string | null>;
  idPerson: FormControl<string | null>;
  personName: FormControl<string | null>;
  date: FormControl<Date>;
  type: FormControl<TransactionType>;
  total: FormControl<number>;
}

@Component({
  selector: 'app-user-transactions-new',
  templateUrl: './user-transactions-new.component.html',
  styleUrls: ['./user-transactions-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewComponent {
  constructor(private readonly transactionService: TransactionService) {}

  readonly form = new FormGroup<TransactionCreateForm>({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(40)],
      initialValueIsDefault: true,
    }),
    date: new FormControl(new Date(), { validators: [Validators.required], initialValueIsDefault: true }),
    idPerson: new FormControl(null, { validators: [], initialValueIsDefault: true }),
    type: new FormControl(TransactionType.Loan, { validators: [Validators.required], initialValueIsDefault: true }),
    description: new FormControl(null, { validators: [Validators.maxLength(500)], initialValueIsDefault: true }),
    personName: new FormControl(null, { validators: [], initialValueIsDefault: true }),
    total: new FormControl(0, { validators: [Validators.required, Validators.min(0)], initialValueIsDefault: true }),
  });
}
