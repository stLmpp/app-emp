import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserWithValues } from '../models/user-with-values';

import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsersWithValuesResolver implements Resolve<UserWithValues[]> {
  constructor(private readonly userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserWithValues[]> | Promise<UserWithValues[]> | UserWithValues[] {
    return this.userService.getAllWithValues();
  }
}
