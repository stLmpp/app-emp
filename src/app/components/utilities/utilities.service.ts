import { Inject, Injectable } from '@angular/core';
import { filterNil } from '@ngneat/elf';
import { addEntities, getAllEntities, selectEntity, setEntities } from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import { arrayUtil } from 'st-utils';

import { UtilitiesStore, UtilitiesStoreToken } from './utilities.store';
import { Utility } from './utility';

function getLeft(index: number): string {
  return `calc(${index * 56}px + ${index + 1}rem)`;
}

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  constructor(@Inject(UtilitiesStoreToken) private readonly _store: UtilitiesStore) {}

  private _uniqueId = 0;

  add(): [number, Observable<Utility>] {
    const id = this._uniqueId++;
    const utilities = this._store.query(getAllEntities());
    this._store.update(
      addEntities({
        id,
        style: {
          left: getLeft(utilities.length),
          position: 'fixed',
          top: 'calc(1rem + var(--navbar-height))',
        },
      })
    );
    const utility$ = this._store.pipe(selectEntity(id), filterNil());
    return [id, utility$];
  }

  remove(id: number): this {
    const utilities = this._store.query(getAllEntities());
    this._store.update(
      setEntities(
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
      )
    );
    return this;
  }
}
