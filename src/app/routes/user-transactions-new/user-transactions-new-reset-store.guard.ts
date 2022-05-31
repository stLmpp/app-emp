import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isNotNil } from 'st-utils';

import { UserTransactionsNewStoreService } from './user-transactions-new-store.service';

import { RouteParamEnum } from '@model/route-param.enum';

@Injectable({ providedIn: 'root' })
export class UserTransactionsNewResetStoreGuard implements CanActivate {
  constructor(private readonly userTransactionNewStoreService: UserTransactionsNewStoreService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idUserParam = route.paramMap.get(RouteParamEnum.idUser)!;
    const idUser = this.userTransactionNewStoreService.getIdUser();
    if (idUser !== idUserParam) {
      if (isNotNil(idUser)) {
        this.userTransactionNewStoreService.reset();
      }
      this.userTransactionNewStoreService.setIdUser(idUserParam);
    }
    return true;
  }
}
