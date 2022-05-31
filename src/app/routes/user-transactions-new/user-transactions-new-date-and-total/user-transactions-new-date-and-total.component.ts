import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMaskConfig } from 'ngx-currency/src/currency-mask.config';
import { map } from 'rxjs';

import { BaseComponent } from '../../../components/base-component';
import { TransactionCreateDto } from '../../../models/transaction-create.dto';
import { UserTransactionsNewStoreService } from '../user-transactions-new-store.service';

interface Form {
  date: FormControl<Date>;
  total: FormControl<number>;
}

@Component({
  selector: 'app-user-transactions-new-date-and-total',
  templateUrl: './user-transactions-new-date-and-total.component.html',
  styleUrls: ['./user-transactions-new-date-and-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewDateAndTotalComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly userTransactionsNewStoreService: UserTransactionsNewStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  readonly form = this._getForm();

  readonly currencyMaskOptions: Partial<CurrencyMaskConfig> = {
    allowNegative: false,
    max: TransactionCreateDto.totalMax,
  };

  private _getForm(): FormGroup<Form> {
    const { date, total } = this.userTransactionsNewStoreService.getDto();
    return this.formBuilder.group({
      date: this.formBuilder.control(date, { validators: [Validators.required] }),
      total: this.formBuilder.control(total, {
        validators: [
          Validators.required,
          Validators.min(TransactionCreateDto.totalMin),
          Validators.max(TransactionCreateDto.totalMax),
        ],
      }),
    });
  }

  onEnter(): void {
    if (this.form.invalid) {
      return;
    }
    this.router.navigate(['../', 'summary'], { relativeTo: this.activatedRoute });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        this.untilDestroy(),
        map(() => this.form.getRawValue())
      )
      .subscribe(state => {
        this.userTransactionsNewStoreService.setDateAndValue(state);
      });
  }
}
