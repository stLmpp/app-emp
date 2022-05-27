import { Store } from '@ngneat/elf';
import { excludeKeys, persistState, StateStorage } from '@ngneat/elf-persist-state';
import { auditTime } from 'rxjs';

import {
  LocalStorageStateStorageConfig,
  LocalStorageStateStorageConfigSpecialKey,
  LocalStorageStateStorageConfigSpecialKeyType,
  StorePersistConfigInternal,
  StorePersistConfigSpecialKeysInternal,
} from './local-storage-state-storage-config';

const typeMap = new Map<
  LocalStorageStateStorageConfigSpecialKeyType | 'default',
  { toStore: (value: any) => any; toPersist: (value: any) => any }
>()
  .set('set', {
    toStore: (value: any[] | undefined | null) => new Set(value ?? []),
    toPersist: (value: Set<any> | undefined | null) => value && [...value],
  })
  .set('date', {
    toStore: (value: string | null | undefined) => value && new Date(value),
    toPersist: value => value,
  })
  .set('default', {
    toStore: value => value,
    toPersist: value => value,
  });

function filterSpecialKeys<T extends Record<any, any>>(
  specialKey: Partial<StorePersistConfigSpecialKeysInternal<T>>
): specialKey is StorePersistConfigSpecialKeysInternal<T> {
  return (
    !specialKey.setToPersist && !!specialKey.setToStore && !!specialKey.getFromPersist && !!specialKey.getFromStore
  );
}

export class LocalStorageStateStorage<T extends Record<string, any>> implements StateStorage {
  private constructor(options: LocalStorageStateStorageConfig<T>) {
    this._options = {
      ...options,
      specialKeys: this._parseSpecialKeys(options.specialKeys),
    };
  }

  protected readonly _options: StorePersistConfigInternal<T>;

  private _parseSpecialKeys(
    specialKeys: LocalStorageStateStorageConfigSpecialKey<T>[] | undefined
  ): StorePersistConfigSpecialKeysInternal<T>[] | undefined {
    let newSpecialKeys = specialKeys?.map((specialKey, index) => {
      let getFromStore: ((state: T) => any) | undefined;
      let setToStore: ((state: T, value: any) => T) | undefined;
      let getFromPersist: ((state: T) => any) | undefined;
      let setToPersist: ((state: T, value: any) => T) | undefined;
      const typeFunctions = typeMap.get(specialKey.type ?? 'default')!;
      if (specialKey.key) {
        getFromStore = state => state[specialKey.key!];
        setToStore = (state, value) => ({ ...state, [specialKey.key!]: value });
      }
      if (specialKey.get) {
        getFromStore = specialKey.get;
      }
      if (specialKey.set) {
        setToStore = specialKey.set;
      }
      if (getFromStore) {
        getFromPersist = state => typeFunctions.toStore(getFromStore!(state));
      }
      if (setToStore) {
        setToPersist = (state, value) => setToStore!(state, typeFunctions.toPersist(value));
      }
      if (!getFromStore || !getFromPersist) {
        if (ngDevMode) {
          throw new Error(
            `Could not set the getters functions for Store at specialKeys[${index}]. "get" or "key" is required`
          );
        }
      }
      if (!setToStore || !setToPersist) {
        if (ngDevMode) {
          throw new Error(
            `Could not set the setter functions for Store at specialKeys[${index}]. "set" of "key" is required`
          );
        }
      }
      return {
        ...specialKey,
        getFromPersist,
        getFromStore,
        setToPersist,
        setToStore,
      };
    });
    if (!ngDevMode) {
      newSpecialKeys = newSpecialKeys?.filter(filterSpecialKeys);
    }
    return newSpecialKeys as StorePersistConfigSpecialKeysInternal<T>[];
  }

  async getItem<U extends Record<string, any>>(key: string): Promise<U | undefined> {
    const item = localStorage.getItem(key);
    if (!item) {
      return undefined;
    }
    let object = JSON.parse(item);
    for (const { getFromPersist, setToStore } of this._options.specialKeys ?? []) {
      object = setToStore(object, getFromPersist(object));
    }
    return object;
  }

  async setItem(key: string, value: T): Promise<boolean> {
    for (const { getFromStore, setToPersist } of this._options.specialKeys ?? []) {
      value = setToPersist(value, getFromStore(value));
    }
    let object: any = value;
    for (const ignoreKey of this._options.ignoreKeys ?? []) {
      object = { ...value, [ignoreKey]: undefined };
    }
    localStorage.setItem(key, JSON.stringify(object));
    return true;
  }

  async removeItem(key: string): Promise<boolean> {
    localStorage.removeItem(key);
    return true;
  }

  static persistStore<S extends Store>(
    store: S,
    options: LocalStorageStateStorageConfig<S['state']>
  ): ReturnType<typeof persistState> {
    return persistState(store, {
      storage: new LocalStorageStateStorage(options),
      source: () => store.pipe(auditTime(500), excludeKeys(options.ignoreKeys ?? [])),
    });
  }
}
