import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
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

  readonly form = this.formBuilder.group<Form>({
    name: this.formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(TransactionCreateDto.nameMaxLength)],
    }),
    description: this.formBuilder.control<string | null | undefined>(null, {
      validators: [Validators.maxLength(TransactionCreateDto.descriptionMaxLength)],
    }),
  });

  readonly transactionCreateDto = TransactionCreateDto;

  ngOnInit(): void {
    const { name, description } = this.userTransactionNewStoreService.get();
    this.form.patchValue({ name, description });
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
