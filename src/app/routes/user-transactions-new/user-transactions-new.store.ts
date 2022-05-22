import { Injectable } from '@angular/core';

import { TransactionCreateDto } from '../../models/transaction-create.dto';
import { TransactionType } from '../../models/transaction-type';
import { Store } from '../../shared/store/store';

export interface UserTransactionsNewState {
  dto: TransactionCreateDto;
  idUser: string | null;
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
      persist: {
        specialKeys: [
          {
            type: 'date',
            get: state => state.dto.date,
            set: (state, value) => ({ ...state, dto: { ...state.dto, date: value } }),
          },
        ],
      },
    });
  }
}
