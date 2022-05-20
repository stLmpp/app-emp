import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { arrayUtil, uniqBy } from 'st-utils';

import { IdName } from '../../models/id-name';
import { IdNameChecked } from '../../models/id-name-checked';
import { TransactionCard } from '../../models/transaction-card';
import { Store } from '../../shared/store/store';

export interface UserTransactionsState {
  showSettled: boolean;
  peopleSelected: string[];
  transactions: TransactionCard[];
}

// TODO add guard to reset state

@Injectable({ providedIn: 'root' })
export class UserTransactionsStoreService {
  private readonly _store = new Store<UserTransactionsState>({
    name: 'user-transactions',
    initialState: {
      showSettled: false,
      transactions: [],
      peopleSelected: [],
    },
    persist: true,
  });

  readonly transactionsFiltered$ = this._store.select().pipe(
    map(({ transactions, showSettled, peopleSelected }) => {
      const peopleSet = new Set(peopleSelected);
      if (!showSettled) {
        transactions = transactions.filter(transaction => transaction.total !== transaction.totalReceived);
      }
      if (peopleSet.size) {
        transactions = transactions.filter(transaction => peopleSet.has(transaction.idPerson));
      }
      return transactions;
    })
  );

  readonly people$: Observable<IdNameChecked[]> = combineLatest([
    this._store.select('transactions'),
    this._store.select('peopleSelected'),
  ]).pipe(
    map(([transactions, peopleSelected]) =>
      uniqBy(
        transactions.reduce(
          (people, transaction) => [...people, { name: transaction.personName, id: transaction.idPerson }],
          [] as IdName[]
        ),
        'id'
      ).map(person => ({ ...person, checked: peopleSelected.includes(person.id) }))
    )
  );

  readonly showSettled$ = this._store.select('showSettled');

  setTransactions(transactions: TransactionCard[]): void {
    this._store.set('transactions', transactions);
  }

  setShowSettled(showSettled: boolean): void {
    this._store.set('showSettled', showSettled);
  }

  togglePerson(id: string): void {
    this._store.update('peopleSelected', peopleSelected => {
      const index = peopleSelected.findIndex(person => person === id);
      const newPeopleSelected = [...peopleSelected];
      if (index > -1) {
        newPeopleSelected.splice(index, 1);
      } else {
        newPeopleSelected.push(id);
      }
      return newPeopleSelected;
    });
  }

  clearPeopleSelected(): void {
    this._store.set('peopleSelected', []);
  }
}
