import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { uniqBy } from 'st-utils';

import { IdName } from '../../models/id-name';
import { IdNameChecked } from '../../models/id-name-checked';
import { TransactionCard } from '../../models/transaction-card';

import { UserTransactionsStore } from './user-transactions.store';

// TODO add guard to reset state

@Injectable({ providedIn: 'root' })
export class UserTransactionsStoreService {
  constructor(private readonly store: UserTransactionsStore) {}

  readonly transactionsFiltered$ = this.store.select().pipe(
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
    this.store.select('transactions'),
    this.store.select('peopleSelected'),
  ]).pipe(
    map(([transactions, peopleSelected]) =>
      uniqBy(
        transactions.reduce(
          (people, transaction) => [...people, { name: transaction.personName, id: transaction.idPerson }],
          [] as IdName[]
        ),
        'id'
      ).map(person => ({ ...person, checked: peopleSelected.has(person.id) }))
    )
  );

  readonly showSettled$ = this.store.select('showSettled');

  setTransactions(transactions: TransactionCard[]): void {
    this.store.set('transactions', transactions);
  }

  setShowSettled(showSettled: boolean): void {
    this.store.set('showSettled', showSettled);
  }

  togglePerson(id: string): void {
    this.store.update('peopleSelected', peopleSelected => {
      const newPeopleSelected = new Set([...peopleSelected]);
      if (newPeopleSelected.has(id)) {
        newPeopleSelected.delete(id);
      } else {
        newPeopleSelected.add(id);
      }
      return newPeopleSelected;
    });
  }

  clearPeopleSelected(): void {
    this.store.set('peopleSelected', new Set());
  }
}
