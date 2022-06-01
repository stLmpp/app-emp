import { InjectionToken } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { TransactionCard } from '@model/transaction-card';
import { LocalStorageStateStorage } from '@shared/store/local-storage-state-storage';

export interface UserTransactionsState {
  showSettled: boolean;
  peopleSelected: Set<string>;
  idUser: string | null;
}

const store = createStore(
  {
    name: 'user-transactions',
  },
  withProps<UserTransactionsState>({
    showSettled: false,
    peopleSelected: new Set(),
    idUser: null,
  }),
  withEntities<TransactionCard, 'idTransaction'>({ idKey: 'idTransaction' })
);

LocalStorageStateStorage.persistStore(store, {
  ignoreKeys: ['ids', 'entities'],
  specialKeys: [
    {
      key: 'peopleSelected',
      type: 'set',
    },
  ],
});

export type UserTransactionsStore = typeof store;
export const UserTransactionsStoreToken = new InjectionToken<UserTransactionsStore>(store.name, {
  providedIn: 'root',
  factory: () => store,
});
