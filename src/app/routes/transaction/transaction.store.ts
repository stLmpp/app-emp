import { InjectionToken } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

import { TransactionWithItems } from '@model/transaction-with-items';
import { LocalStorageStateStorage } from '@shared/store/local-storage-state-storage';

export interface TransactionWithItemsState extends TransactionWithItems {
  opened?: string | null;
}

const store = createStore(
  { name: 'transaction' },
  withProps<TransactionWithItemsState>({
    name: '',
    date: new Date(),
    description: '',
    idPerson: '',
    idTransaction: '',
    personName: '',
    total: 0,
    items: [],
  })
);

LocalStorageStateStorage.persistStore(store, {
  includeKeys: ['opened'],
});

export type TransactionStore = typeof store;
export const TransactionStoreToken = new InjectionToken<TransactionStore>(store.name, {
  providedIn: 'root',
  factory: () => store,
});
