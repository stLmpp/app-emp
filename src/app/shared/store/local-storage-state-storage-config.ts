export type LocalStorageStateStorageConfigSpecialKeyType = 'set' | 'date';

export interface LocalStorageStateStorageConfigSpecialKey<T extends Record<string, any>> {
  get?: (state: T) => any;
  set?: (state: T, value: any) => T;
  type?: LocalStorageStateStorageConfigSpecialKeyType;
  key?: keyof T;
}

export interface LocalStorageStateStorageConfig<T extends Record<string, any>> {
  ignoreKeys?: (keyof T)[];
  specialKeys?: LocalStorageStateStorageConfigSpecialKey<T>[];
}

export interface StorePersistConfigSpecialKeysInternal<T extends Record<any, any>>
  extends LocalStorageStateStorageConfigSpecialKey<T> {
  getFromStore: (state: T) => any;
  setToStore: (state: T, value: any) => T;
  getFromPersist: (state: T) => any;
  setToPersist: (state: T, value: any) => T;
}

export interface StorePersistConfigInternal<T extends Record<any, any>>
  extends Pick<LocalStorageStateStorageConfig<T>, 'ignoreKeys'> {
  specialKeys?: StorePersistConfigSpecialKeysInternal<T>[];
}
