import { isNil, isNotNil } from 'st-utils';

import { StorePersist } from './store-persist';

export class LocalStorageStorePersist<T extends Record<any, any>> extends StorePersist<T> {
  has(): boolean {
    return isNotNil(localStorage.getItem(this._key));
  }

  get(): T | undefined {
    const item = localStorage.getItem(this._key);
    if (!item) {
      return undefined;
    }
    let object = JSON.parse(item);
    for (const { getFromPersist, setToStore } of this._options.specialKeys ?? []) {
      object = setToStore(object, getFromPersist(object));
    }
    return object;
  }

  set(value: T | null | undefined): this {
    if (isNil(value)) {
      localStorage.removeItem(this._key);
    } else {
      for (const { getFromStore, setToPersist } of this._options.specialKeys ?? []) {
        value = setToPersist(value, getFromStore(value));
      }
      let object: any = value;
      for (const key of this._options.ignoreKeys ?? []) {
        object = { ...value, [key]: undefined };
      }
      localStorage.setItem(this._key, JSON.stringify(object));
    }
    return this;
  }
}
