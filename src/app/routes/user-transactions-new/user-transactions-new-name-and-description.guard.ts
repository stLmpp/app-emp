import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserTransactionsNewStoreService } from './user-transactions-new-store.service';

import { RouteParamEnum } from '@model/route-param.enum';

@Injectable({ providedIn: 'root' })
export class UserTransactionsNewNameAndDescriptionGuard implements CanActivate {
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
      this.userTransactionNewStoreService.isNameAndDescriptionValid() ||
      this.router.createUrlTree(['/users', idUser, 'transactions', 'new', 'name-and-description'])
    );
  }
}
