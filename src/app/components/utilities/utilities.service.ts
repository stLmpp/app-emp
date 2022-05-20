import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { arrayUtil, isNotNil } from 'st-utils';

import { Store } from '../../shared/store/store';

export interface Utility {
  id: number;
  style: Partial<CSSStyleDeclaration>;
}

interface UtilitiesState {
  utilities: Utility[];
}

function getLeft(index: number): string {
  return `calc(${index * 56}px + ${index > 0 ? 2 : 1}rem)`;
}

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  private readonly _store = new Store<UtilitiesState>({ name: 'utilities', initialState: { utilities: [] } });
  private _uniqueId = 0;

  add(): [number, Observable<Utility>] {
    const id = this._uniqueId++;
    const utility$ = this._store
      .update('utilities', utilities =>
        arrayUtil(utilities)
          .append({
            id,
            style: {
              left: getLeft(utilities.length),
              position: 'fixed',
              top: 'calc(1rem + var(--navbar-height))',
            },
          })
          .toArray()
      )
      .select('utilities')
      .pipe(
        map(utilities => utilities.find(util => util.id === id)),
        filter(isNotNil)
      );
    return [id, utility$];
  }

  remove(id: number): this {
    this._store.update('utilities', utilities =>
      arrayUtil(utilities)
        .remove(id)
        .map((util, index) => ({
          ...util,
          style: {
            ...util.style,
            left: getLeft(index),
          },
        }))
        .toArray()
    );
    return this;
  }
}
