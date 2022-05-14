import { Injectable } from '@angular/core';

import { TransactionCreateDto } from '../../models/transaction-create.dto';
import { TransactionType } from '../../models/transaction-type';
import { LocalStorageStorePersist } from '../../shared/store/local-storage-store-persist';
import { Store } from '../../shared/store/store';

export interface UserTransactionsNewState {
  dto: TransactionCreateDto;
  idUser: string | null;
}

class UserTransactionsNewStorePersist extends LocalStorageStorePersist<UserTransactionsNewState> {
  override get(): UserTransactionsNewState | undefined {
    const state = super.get();
    if (!state?.dto) {
      return state;
    }
    let dto = state.dto;
    if (dto.date) {
      dto = { ...dto, date: new Date(dto.date) };
    }
    if (dto.name.length > TransactionCreateDto.nameMaxLength) {
      dto = { ...dto, name: dto.name.substring(0, TransactionCreateDto.nameMaxLength) };
    }
    if (dto.description && dto.description.length > TransactionCreateDto.descriptionMaxLength) {
      dto = { ...dto, description: dto.description.substring(0, TransactionCreateDto.descriptionMaxLength) };
    }
    if (dto.personName && dto.personName.length > TransactionCreateDto.personNameMaxLength) {
      dto = { ...dto, personName: dto.personName.substring(0, TransactionCreateDto.personNameMaxLength) };
    }
    if (dto.total > TransactionCreateDto.totalMax) {
      dto = { ...dto, total: TransactionCreateDto.totalMax };
    }
    if (dto.total < TransactionCreateDto.totalMin) {
      dto = { ...dto, total: 1 };
    }
    return { ...state, dto };
  }
}

function newTransactionStoreInitialState(): UserTransactionsNewState {
  return {
    dto: {
      total: 1,
      name: '',
      date: new Date(),
      type: TransactionType.Loan,
    },
    idUser: null,
  };
}

@Injectable({ providedIn: 'root' })
export class UserTransactionsNewStore extends Store<UserTransactionsNewState> {
  constructor() {
    super({
      name: 'user-transactions-new',
      initialState: newTransactionStoreInitialState(),
      persistAdapter: UserTransactionsNewStorePersist,
      persist: true,
    });
  }
}
