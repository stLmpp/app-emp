import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { TransactionFlowPort } from '../../transaction-flow.port';

import { TransactionCreateDto } from '@model/transaction-create.dto';
import { BaseComponent } from '@shared/components/base-component';

interface Form {
  name: FormControl<string>;
  description: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-user-transactions-new-name-and-description',
  templateUrl: './user-transactions-new-name-and-description.component.html',
  styleUrls: ['./user-transactions-new-name-and-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewNameAndDescriptionComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly transactionFlowPort: TransactionFlowPort,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  readonly form = this._getForm();

  readonly transactionCreateDto = TransactionCreateDto;

  private _getForm(): FormGroup<Form> {
    const { name, description } = this.transactionFlowPort.getDto();
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

  onEnter(): void {
    if (this.form.invalid) {
      return;
    }
    this.router.navigate(['../', 'person'], { relativeTo: this.activatedRoute });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        this.untilDestroy(),
        map(() => this.form.getRawValue())
      )
      .subscribe(state => {
        this.transactionFlowPort.setNameAndDescription(state);
      });
  }
}
