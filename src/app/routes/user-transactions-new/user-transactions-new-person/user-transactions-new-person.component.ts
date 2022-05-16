import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, map, Observable, switchMap, tap } from 'rxjs';
import { isNotNil } from 'st-utils';

import { BaseComponent } from '../../../components/base-component';
import { Person } from '../../../models/person';
import { RouteParamEnum } from '../../../models/route-param.enum';
import { TransactionCreateDto } from '../../../models/transaction-create.dto';
import { PersonService } from '../../../services/person.service';
import { trackById } from '../../../shared/utils/track-by';
import { UserTransactionsNewStoreService } from '../user-transactions-new-store.service';

interface Form {
  personName: FormControl<string | null | undefined>;
  idPerson: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-user-transactions-new-person',
  templateUrl: './user-transactions-new-person.component.html',
  styleUrls: ['./user-transactions-new-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewPersonComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly personService: PersonService,
    private readonly userTransactionNewStoreService: UserTransactionsNewStoreService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  @ViewChild(MatAutocomplete) readonly matAutocomplete!: MatAutocomplete;

  readonly form = this._getForm();

  readonly transactionCreateDto = TransactionCreateDto;

  readonly people$ = this.form.controls.personName.valueChanges.pipe(
    this.untilDestroy(),
    debounceTime(300),
    filter(isNotNil),
    filter(value => value.length >= 3),
    tap(() => {
      if (this.matAutocomplete.isOpen) {
        this.form.controls.idPerson.setValue(null);
      }
    }),
    switchMap(value => this._getPeople(value))
  );

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return !!control && control.touched && (!!form?.errors?.atLeastOneRequired || control.invalid);
    },
  };

  readonly trackByPerson = trackById<Person>();

  private _getPeople(name: string): Observable<Person[]> {
    return this.personService.searchByName(this._getIdUser(), name).pipe(
      tap(people => {
        if (people.length && people[0].name === name) {
          this.form.controls.idPerson.setValue(people[0].id);
        } else {
          if (!this.matAutocomplete.options.some(item => item.id === this.form.controls.idPerson.value)) {
            this.form.controls.idPerson.setValue(null);
          }
        }
      })
    );
  }

  private _getIdUser(): string {
    return this.activatedRoute.snapshot.paramMap.get(RouteParamEnum.idUser)!;
  }

  private _getForm(): FormGroup<Form> {
    const { idPerson, personName } = this.userTransactionNewStoreService.getDto();
    return this.formBuilder.group<Form>(
      {
        idPerson: this.formBuilder.control(idPerson, {
          validators: [Validators.maxLength(TransactionCreateDto.idPersonMaxLength)],
        }),
        personName: this.formBuilder.control(personName, {
          validators: [
            Validators.minLength(TransactionCreateDto.personNameMinLength),
            Validators.maxLength(TransactionCreateDto.personNameMaxLength),
          ],
        }),
      },
      {
        validators: [this._validator()],
      }
    );
  }

  private _validator(): ValidatorFn {
    return formGroup => {
      const { idPerson, personName } = (formGroup as FormGroup<Form>).controls;
      if (!idPerson.value && !personName.value) {
        return { atLeastOneRequired: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        this.untilDestroy(),
        map(() => this.form.getRawValue())
      )
      .subscribe(state => {
        this.userTransactionNewStoreService.setPerson(state);
      });
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent): void {
    this.form.controls.idPerson.setValue($event.option.id);
  }
}
