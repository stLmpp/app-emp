import { Class } from 'type-fest';

import { StorePersist } from './store-persist';

export interface StoreConfig<T extends Record<any, any>> {
  initialState: T;
  name: string;
  persist?: boolean;
  persistAdapter?: Class<StorePersist<T>>;
}
