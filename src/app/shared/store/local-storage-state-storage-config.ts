export type LocalStorageStateStorageConfigSpecialKeyType = 'set' | 'date';

export interface LocalStorageStateStorageConfigSpecialKey<T extends Record<string, unknown>> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  get?: (state: T) => any;
  set?: (state: T, value: any) => T;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  type?: LocalStorageStateStorageConfigSpecialKeyType;
  key?: keyof T;
}

export interface LocalStorageStateStorageConfig<T extends Record<string, unknown>> {
  ignoreKeys?: Array<keyof T>;
  specialKeys?: Array<LocalStorageStateStorageConfigSpecialKey<T>>;
}

export interface StorePersistConfigSpecialKeysInternal<T extends Record<string, unknown>>
  extends LocalStorageStateStorageConfigSpecialKey<T> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getFromStore: (state: T) => any;
  setToStore: (state: T, value: any) => T;
  getFromPersist: (state: T) => any;
  setToPersist: (state: T, value: any) => T;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export interface StorePersistConfigInternal<T extends Record<string, unknown>>
  extends Pick<LocalStorageStateStorageConfig<T>, 'ignoreKeys'> {
  specialKeys?: Array<StorePersistConfigSpecialKeysInternal<T>>;
}
