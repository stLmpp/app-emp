import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { RouteParamEnum } from '../models/route-param.enum';
import { TransactionCard } from '../models/transaction-card';
import { UserTransactionsStoreService } from '../routes/user-transactions/user-transactions-store.service';
import { TransactionService } from '../services/transaction.service';

@Injectable({ providedIn: 'root' })
export class TransactionCardsResolver implements Resolve<TransactionCard[]> {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userTransactionsStoreService: UserTransactionsStoreService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TransactionCard[]> | Promise<TransactionCard[]> | TransactionCard[] {
    const idUser = route.paramMap.get(RouteParamEnum.idUser) ?? '';
    return this.transactionService.getCards(idUser).pipe(
      tap(transactions => {
        this.userTransactionsStoreService.setTransactions(transactions);
      })
    );
  }
}
