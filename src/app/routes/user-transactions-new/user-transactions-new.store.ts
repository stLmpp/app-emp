import { InjectionToken } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

import { TransactionCreateDto } from '../../models/transaction-create.dto';
import { TransactionType } from '../../models/transaction-type';
import { LocalStorageStateStorage } from '../../shared/store/local-storage-state-storage';

export interface UserTransactionsNewState {
  dto: TransactionCreateDto;
  idUser: string | null;
}

const store = createStore(
  {
    name: 'user-transactions-new',
  },
  withProps<UserTransactionsNewState>({
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
export type UserTransactionsNewStore = typeof store;
export const UserTransactionsNewStoreToken = new InjectionToken<typeof store>(store.name, {
  providedIn: 'root',
  factory: () => store,
});
