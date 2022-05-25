import { InjectionToken } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

export interface GoBackButtonState {
  buttons: Set<number>;
}

const store = createStore({
  name: 'go-back-button',
}, withProps<GoBackButtonState>({
  buttons: new Set(),
}));

export type GoBackButtonStore = typeof store;
export const GoBackButtonStoreToken = new InjectionToken<GoBackButtonStore>(store.name, { providedIn: 'root', factory: () => store });
