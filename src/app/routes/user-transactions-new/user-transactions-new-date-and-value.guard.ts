import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { RouteParamEnum } from '../../models/route-param.enum';

import { UserTransactionsNewStoreService } from './user-transactions-new-store.service';

@Injectable({ providedIn: 'root' })
export class UserTransactionsNewDateAndValueGuard implements CanActivate {
  constructor(
    private readonly userTransactionNewStoreService: UserTransactionsNewStoreService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idUser = route.paramMap.get(RouteParamEnum.idUser)!;
    return (
      this.userTransactionNewStoreService.isDateAndValueValid() ||
      this.router.createUrlTree(['/users', idUser, 'transactions', 'new', 'date-and-value'])
    );
  }
}
