import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { RouteParamEnum } from '../models/route-param.enum';
import { User } from '../models/user';
import { UserStoreService } from '../services/user-store.service';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private readonly userService: UserService, private readonly userStoreService: UserStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const idUser = route.paramMap.get(RouteParamEnum.idUser)!;
    return this.userService.getById(idUser).pipe(
      tap(user => {
        this.userStoreService.setUser(user);
      })
    );
  }
}
