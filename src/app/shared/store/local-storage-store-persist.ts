import { isNil, isNotNil } from 'st-utils';

import { StorePersist } from './store-persist';

export class LocalStorageStorePersist<T extends Record<any, any>> extends StorePersist<T> {
  has(): boolean {
    return isNotNil(localStorage.getItem(this._key));
  }

  get(): T | undefined {
    const item = localStorage.getItem(this._key);
    return item ? JSON.parse(item) : undefined;
  }

  set(value: T | null | undefined): this {
    if (isNil(value)) {
      localStorage.removeItem(this._key);
    } else {
      localStorage.setItem(this._key, JSON.stringify(value));
    }
    return this;
  }
}
