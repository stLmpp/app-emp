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

  addButton(): [id: number, show$: Observable<boolean>] {
    const id = this._uniqueId++;
    this._store.update(state => ({ ...state, buttons: [...state.buttons, id] }));
    const show$ = this._store.select('buttons').pipe(
      map(buttons => Math.max(...buttons) === id),
      distinctUntilChanged()
    );
    return [id, show$];
  }

  removeButton(id: number): void {
    this._store.update('buttons', buttons => buttons.filter(button => button !== id));
  }
}
