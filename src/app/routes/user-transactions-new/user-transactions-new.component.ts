import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TransactionType } from '../../models/transaction-type';
import { TransactionService } from '../../services/transaction.service';

interface TransactionCreateForm {
  name: FormControl<string>;
  description: FormControl<string | null>;
  idPerson: FormControl<string | null>;
  personName: FormControl<string>;
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

  readonly nameMaxLength = 40;
  readonly descriptionMaxLength = 500;
  readonly personNameMaxLength = 150;

  readonly form = new FormGroup<TransactionCreateForm>({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(this.nameMaxLength)],
      initialValueIsDefault: true,
    }),
    date: new FormControl(new Date(), { validators: [Validators.required], initialValueIsDefault: true }),
    idPerson: new FormControl(null, { validators: [], initialValueIsDefault: true }),
    type: new FormControl(TransactionType.Loan, { validators: [Validators.required], initialValueIsDefault: true }),
    description: new FormControl(null, {
      validators: [Validators.maxLength(this.descriptionMaxLength)],
      initialValueIsDefault: true,
    }),
    personName: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(this.personNameMaxLength)],
      initialValueIsDefault: true,
    }),
    total: new FormControl(1, {
      validators: [Validators.required, Validators.min(Number.EPSILON), Validators.max(Number.MAX_SAFE_INTEGER)],
      initialValueIsDefault: true,
    }),
  });

  readonly nameControl = this.form.get('name')!;
  readonly dateControl = this.form.get('date')!;
  readonly idPersonControl = this.form.get('idPerson')!;
  readonly typeControl = this.form.get('type')!;
  readonly descriptionControl = this.form.get('description')!;
  readonly personNameControl = this.form.get('personName')!;
  readonly totalControl = this.form.get('total')!;
}
