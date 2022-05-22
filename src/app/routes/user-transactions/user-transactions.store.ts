import { Injectable } from '@angular/core';

import { TransactionCard } from '../../models/transaction-card';
import { Store } from '../../shared/store/store';

export interface UserTransactionsState {
  showSettled: boolean;
  peopleSelected: Set<string>;
  transactions: TransactionCard[];
}

@Injectable({ providedIn: 'root' })
export class UserTransactionsStore  extends Store<UserTransactionsState> {
  constructor() {
    super({
      name: 'user-transactions',
      initialState: {
        showSettled: false,
        transactions: [],
        peopleSelected: new Set(),
      },
      persist: {
        ignoreKeys: ['transactions'],
        specialKeys: [
          {
            key: 'peopleSelected',
            type: 'set',
          },
        ],
      },
    });
  }
}
