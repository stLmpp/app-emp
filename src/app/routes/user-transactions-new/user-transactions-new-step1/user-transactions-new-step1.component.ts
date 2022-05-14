import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';

import { BaseComponent } from '../../../components/base-component';
import { TransactionCreateDto } from '../../../models/transaction-create.dto';
import { UserTransactionsNewStoreService } from '../user-transactions-new-store.service';

interface Form {
  name: FormControl<string>;
  description: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-user-transactions-new-step1',
  templateUrl: './user-transactions-new-step1.component.html',
  styleUrls: ['./user-transactions-new-step1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewStep1Component extends BaseComponent implements OnInit {
  constructor(
    private readonly userTransactionNewStoreService: UserTransactionsNewStoreService,
    private readonly formBuilder: NonNullableFormBuilder
  ) {
    super();
  }

  readonly form = this._getForm();

  readonly transactionCreateDto = TransactionCreateDto;

  private _getForm(): FormGroup<Form> {
    const { name, description } = this.userTransactionNewStoreService.getDto();
    return this.formBuilder.group<Form>({
      name: this.formBuilder.control(name, {
        validators: [
          Validators.required,
          Validators.minLength(TransactionCreateDto.nameMinLength),
          Validators.maxLength(TransactionCreateDto.nameMaxLength),
        ],
      }),
      description: this.formBuilder.control<string | null | undefined>(description, {
        validators: [Validators.maxLength(TransactionCreateDto.descriptionMaxLength)],
      }),
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        this.untilDestroy(),
        map(() => this.form.getRawValue())
      )
      .subscribe(state => {
        this.userTransactionNewStoreService.setStep1(state);
      });
  }
}
