import { InjectionToken } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

import { TransactionCreateDto } from '@model/transaction-create.dto';
import { TransactionType } from '@model/transaction-type';
import { LocalStorageStateStorage } from '@shared/store/local-storage-state-storage';

export interface TransactionAddState {
  dto: TransactionCreateDto;
  idUser: string | null;
}

const store = createStore(
  {
    name: 'transaction-add',
  },
  withProps<TransactionAddState>({
    dto: {
      total: 1,
      name: '',
      date: new Date(),
      type: TransactionType.Loan,
    },
    idUser: null,
  })
);

LocalStorageStateStorage.persistStore(store, {
  specialKeys: [
    {
      type: 'date',
      get: state => state.dto.date,
      set: (state, value) => ({ ...state, dto: { ...state.dto, date: value } }),
    },
  ],
});
export type TransactionAddStore = typeof store;
export const TransactionAddStoreToken = new InjectionToken<typeof store>(store.name, {
  providedIn: 'root',
  factory: () => store,
});
