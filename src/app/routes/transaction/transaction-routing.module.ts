import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { map, Observable } from 'rxjs';

import { RouteDataEnum } from '../../models/route-data.enum';

import { TransactionStoreService } from './transaction-store.service';
import { TransactionWithItemsResolver } from './transaction-with-items.resolver';
import { TransactionComponent } from './transaction.component';

@Injectable({ providedIn: 'root' })
export class TransactionTitleResolver implements Resolve<string> {
  constructor(private readonly transactionStoreService: TransactionStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    return this.transactionStoreService.transactionName$.pipe(map(name => `Transaction - ${name}`));
  }
}

const routes: Routes = [
  {
    path: '',
    resolve: {
      [RouteDataEnum.transactionWithItems]: TransactionWithItemsResolver,
    },
    children: [
      {
        path: '',
        component: TransactionComponent,
        title: TransactionTitleResolver,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
