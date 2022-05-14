import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RouteParamEnum } from '../models/route-param.enum';
import { TransactionCard } from '../models/transaction-card';
import { TransactionService } from '../services/transaction.service';

@Injectable({ providedIn: 'root' })
export class TransactionCardsResolver implements Resolve<TransactionCard[]> {
  constructor(private readonly transactionService: TransactionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TransactionCard[]> | Promise<TransactionCard[]> | TransactionCard[] {
    const idUser = route.paramMap.get(RouteParamEnum.idUser) ?? '';
    return this.transactionService.getCards(idUser);
  }
}
