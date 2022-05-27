import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RouteParamEnum } from '../models/route-param.enum';
import { TransactionWithItems } from '../models/transaction-with-items';
import { TransactionService } from '../services/transaction.service';

@Injectable({ providedIn: 'root' })
export class TransactionWithItemsResolver implements Resolve<TransactionWithItems> {
  constructor(
    private readonly transactionService: TransactionService
  ) {
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TransactionWithItems> | Promise<TransactionWithItems> | TransactionWithItems {
    const idUser = route.paramMap.get(RouteParamEnum.idUser)!;
    const idTransaction = route.paramMap.get(RouteParamEnum.idTransaction)!;
    return this.transactionService.getWithItems(idUser, idTransaction)
  }
}
