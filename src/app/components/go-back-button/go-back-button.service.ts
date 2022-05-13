import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { Store } from '../../shared/store/store';

export interface GoBackButtonState {
  buttons: number[];
}

@Injectable({ providedIn: 'root' })
export class GoBackButtonService {
  private readonly _store = new Store<GoBackButtonState>({ name: 'go-back-name', initialState: { buttons: [] } });

  private _uniqueId = 0;

  addButton(): Observable<boolean> {
    const id = this._uniqueId++;
    this._store.update(state => ({ ...state, buttons: [...state.buttons, id] }));
    return this._store.select('buttons').pipe(
      map(buttons => Math.max(...buttons) === id),
      distinctUntilChanged()
    );
  }
}
