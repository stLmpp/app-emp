import { Injectable } from '@angular/core';

import { TransactionCreateDto } from '../../models/transaction-create.dto';
import { TransactionType } from '../../models/transaction-type';
import { LocalStorageStorePersist } from '../../shared/store/local-storage-store-persist';
import { Store } from '../../shared/store/store';

class UserTransactionsNewStorePersist extends LocalStorageStorePersist<TransactionCreateDto> {
  override get(): TransactionCreateDto | undefined {
    let value = super.get();
    if (!value) {
      return value;
    }
    if (value.date) {
      value = { ...value, date: new Date(value.date) };
    }
    if (value.name.length > TransactionCreateDto.nameMaxLength) {
      value = { ...value, name: value.name.substring(0, TransactionCreateDto.nameMaxLength) };
    }
    if (value.description && value.description.length > TransactionCreateDto.descriptionMaxLength) {
      value = { ...value, description: value.description.substring(0, TransactionCreateDto.descriptionMaxLength) };
    }
    if (value.personName && value.personName.length > TransactionCreateDto.personNameMaxLength) {
      value = { ...value, personName: value.personName.substring(0, TransactionCreateDto.personNameMaxLength) };
    }
    if (value.total > TransactionCreateDto.totalMax) {
      value = { ...value, total: TransactionCreateDto.totalMax };
    }
    if (value.total < TransactionCreateDto.totalMin) {
      value = { ...value, total: 1 };
    }
    return value;
  }
}

function newTransactionStoreInitialState(): TransactionCreateDto {
  return {
    total: 1,
    name: '',
    date: new Date(),
    type: TransactionType.Loan,
  };
}

@Injectable({ providedIn: 'root' })
export class UserTransactionsNewStore extends Store<TransactionCreateDto> {
  constructor() {
    super({
      name: 'new-transaction',
      initialState: newTransactionStoreInitialState(),
      persistAdapter: UserTransactionsNewStorePersist,
      persist: true,
    });
  }
}
