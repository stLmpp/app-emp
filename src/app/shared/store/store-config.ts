import { Class } from 'type-fest';

import { StorePersist } from './store-persist';

export interface StoreConfig<T extends Record<any, any>> {
  initialState: T;
  name: string;
  persist?: boolean | StorePersistConfig<T>;
}

export type StorePersistConfigSpecialKeysType = 'set' | 'date';

export interface StorePersistConfigSpecialKeys<T extends keyof T> {
  get?: (state: T) => any;
  set?: (state: T, value: any) => T;
  type?: StorePersistConfigSpecialKeysType;
  key?: keyof T;
}

export interface StorePersistConfig<T extends Record<any, any>> {
  adapter?: Class<StorePersist<T>>;
  ignoreKeys?: (keyof T)[];
  specialKeys?: StorePersistConfigSpecialKeys<T>[];
}
