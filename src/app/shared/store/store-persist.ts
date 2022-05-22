import { StorePersistConfig, StorePersistConfigSpecialKeys, StorePersistConfigSpecialKeysType } from './store-config';

interface StorePersistConfigSpecialKeysInternal<T extends Record<any, any>> extends StorePersistConfigSpecialKeys<T> {
  getFromStore: (state: T) => any;
  setToStore: (state: T, value: any) => T;
  getFromPersist: (state: T) => any;
  setToPersist: (state: T, value: any) => T;
}

interface StorePersistConfigInternal<T extends Record<any, any>> extends Pick<StorePersistConfig<T>, 'ignoreKeys'> {
  specialKeys?: StorePersistConfigSpecialKeysInternal<T>[];
}

const typeMap = new Map<
  StorePersistConfigSpecialKeysType | 'default',
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

export abstract class StorePersist<T extends Record<any, any>> {
  constructor(protected readonly name: string, options: Pick<StorePersistConfig<T>, 'ignoreKeys' | 'specialKeys'>) {
    this._key = `__STORE__${name}`;
    this._options = {
      ...options,
      specialKeys: this._parseSpecialKeys(options.specialKeys),
    };
  }

  protected readonly _key: string;
  protected readonly _options: StorePersistConfigInternal<T>;

  private _parseSpecialKeys(
    specialKeys: StorePersistConfigSpecialKeys<T>[] | undefined
  ): StorePersistConfigSpecialKeysInternal<T>[] | undefined {
    let newSpecialKeys = specialKeys?.map((specialKey, index) => {
      let getFromStore: ((state: T) => any) | undefined;
      let setToStore: ((state: T, value: any) => T) | undefined;
      let getFromPersist: ((state: T) => any) | undefined;
      let setToPersist: ((state: T, value: any) => T) | undefined;
      const typeFunctions = typeMap.get(specialKey.type ?? 'default')!;
      if (specialKey.key) {
        getFromStore = state => state[specialKey.key];
        setToStore = (state, value) => ({ ...state, [specialKey.key as any]: value });
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
            `Could not set the getters functions for Store ${this.name} at specialKeys[${index}]. "get" or "key" is required`
          );
        }
      }
      if (!setToStore || !setToPersist) {
        if (ngDevMode) {
          throw new Error(
            `Could not set the setter functions for Store ${this.name} at specialKeys[${index}]. "set" of "key" is required`
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

  abstract has(): boolean;
  abstract get(): T | undefined;
  abstract set(value: T | null | undefined): this;
}
