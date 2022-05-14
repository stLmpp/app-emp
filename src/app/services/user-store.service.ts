import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { Store } from '../shared/store/store';

export interface UserState {
  user: User | null;
}

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private readonly _store = new Store<UserState>({
    name: 'user',
    initialState: {
      user: null,
    },
  });

  getUser(): User | null {
    return this._store.get('user');
  }

  setUser(user: User | null): void {
    this._store.set('user', user);
  }
}
