import { InjectionToken } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { Utility } from './utility';

const store = createStore(
  {
    name: 'utilities',
  },
  withEntities<Utility>()
);

export type UtilitiesStore = typeof store;
export const UtilitiesStoreToken = new InjectionToken<UtilitiesStore>(store.name, {
  providedIn: 'root',
  factory: () => store,
});
