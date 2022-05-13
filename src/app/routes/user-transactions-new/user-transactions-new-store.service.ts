import { Injectable } from '@angular/core';

import { TransactionCreateDto } from '../../models/transaction-create.dto';

import { UserTransactionsNewStore } from './user-transactions-new.store';

@Injectable({ providedIn: 'root' })
export class UserTransactionsNewStoreService {
  constructor(private readonly newTransactionStore: UserTransactionsNewStore) {}

  state$ = this.newTransactionStore.select();

  start(): void {
    this.newTransactionStore.reset();
  }

  setStep1(step1: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this.newTransactionStore.update(step1);
  }

  setStep2(step2: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this.newTransactionStore.update(step2);
  }

  setStep3(step3: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this.newTransactionStore.update(step3);
  }

  isStep1Valid(): boolean {
    const name = this.newTransactionStore.get('name');
    return !!name && name.length <= TransactionCreateDto.nameMaxLength;
  }

  isStep2Valid(): boolean {
    const { personName, idPerson } = this.newTransactionStore.get();
    const isStep1Valid = this.isStep1Valid();
    return (
      (isStep1Valid && !!idPerson) ||
      (isStep1Valid && !!personName && personName.length <= TransactionCreateDto.personNameMaxLength)
    );
  }

  isStep3Valid(): boolean {
    const { total, date } = this.newTransactionStore.get();
    return (
      this.isStep2Valid() && !!date && total >= TransactionCreateDto.totalMin && total <= TransactionCreateDto.totalMax
    );
  }

  get(): TransactionCreateDto {
    return this.newTransactionStore.get();
  }
}
