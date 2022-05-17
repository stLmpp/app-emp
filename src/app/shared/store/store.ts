import { BehaviorSubject, filter, Observable, observeOn, pluck, queueScheduler, Subject, takeUntil } from 'rxjs';
import { isFunction, isObject } from 'st-utils';

import { LocalStorageStorePersist } from './local-storage-store-persist';
import { StoreConfig } from './store-config';

export type UpdateQueueType<T extends Record<any, any>> = ((state: T) => T)[];

declare global {
  interface Window {
    ngStores: Store<any>[];
    ngStoresGetSnapshot: () => Record<string, any>;
  }
}

if (ngDevMode) {
  window.ngStores = [];
  window.ngStoresGetSnapshot = () => {
    const snapshot: Record<string, any> = {};
    for (const store of window.ngStores) {
      snapshot[store.name] = store.get();
    }
    return snapshot;
  };
}

export class Store<T extends Record<any, any>> {
  constructor(config: StoreConfig<T>) {
    if (ngDevMode) {
      window.ngStores.push(this);
    }
    const persist = !!config.persist;
    if (persist) {
      this._storePersist = config.persistAdapter
        ? new config.persistAdapter(config.name)
        : new LocalStorageStorePersist(config.name);
    }
    this._initialState = config.initialState;
    const startState = { ...config.initialState, ...this._storePersist?.get() };
    this._storePersist?.set(startState);
    this.name = config.name;
    this._state$ = new BehaviorSubject(startState);
    this._updateQueue$
      .pipe(
        observeOn(queueScheduler),
        takeUntil(this._destroy$),
        filter(updates => !!updates.length)
      )
      .subscribe(updates => {
        const state = this._getState();
        const newState = updates.reduce((acc, item) => item(acc), state);
        this._state$.next(newState);
        this._storePersist?.set(newState);
        this._updateQueue$.next([]);
      });
  }

  private readonly _storePersist?: LocalStorageStorePersist<T>;
  private readonly _initialState: T;
  private readonly _destroy$ = new Subject<void>();
  private readonly _updateQueue$ = new BehaviorSubject<UpdateQueueType<T>>([]);
  private readonly _state$: BehaviorSubject<T>;

  private _isDestroyed = false;

  readonly name: string;

  private _getState(): T {
    return { ...this._state$.value };
  }

  private _assertNotDestroyed(): void {
    if (this._isDestroyed) {
      throw new Error(`Store ${this.name} is already destroyed`);
    }
  }

  private _updateQueue(update: (state: Readonly<T>) => T): this {
    this._updateQueue$.next([...this._updateQueue$.value, update]);
    return this;
  }

  select(): Observable<T>;
  select<K extends keyof T>(key: K): Observable<T[K]>;
  select<K extends keyof T>(key?: K): Observable<T | T[K]> {
    let state$: Observable<T | T[K]> = this._state$.asObservable();
    if (key) {
      state$ = state$.pipe(pluck(key));
    }
    return state$;
  }

  get(): Readonly<T>;
  get<K extends keyof T>(key: K): Readonly<T[K]>;
  get<K extends keyof T>(key?: K): Readonly<T> | Readonly<T[K]> {
    this._assertNotDestroyed();
    const state = this._getState();
    return key ? state[key] : state;
  }

  set(state: T): this;
  set<K extends keyof T>(key: K, state: T[K]): this;
  set<K extends keyof T>(keyOrState: K | T, state?: T[K]): this {
    this._assertNotDestroyed();
    if (isObject(keyOrState)) {
      this._updateQueue(() => keyOrState);
    } else if (state) {
      this._updateQueue(oldState => ({ ...oldState, [keyOrState]: state }));
    }
    return this;
  }

  update(update: Partial<T> | ((state: Readonly<T>) => T)): this;
  update<K extends keyof T>(key: K, update: T[K] | ((state: Readonly<T[K]>) => T[K])): this;
  update<K extends keyof T>(
    keyOrStateOrCallback: Partial<T> | ((state: Readonly<T>) => T) | K,
    stateOrCallback?: T[K] | ((state: Readonly<T[K]>) => T[K])
  ): this {
    const isUpdateCallback = isFunction(keyOrStateOrCallback);
    if (isUpdateCallback || isObject(keyOrStateOrCallback)) {
      const callback = isUpdateCallback ? keyOrStateOrCallback : (state: T) => ({ ...state, ...keyOrStateOrCallback });
      this._updateQueue(callback);
    } else if (stateOrCallback) {
      const callback = isFunction(stateOrCallback) ? stateOrCallback : () => stateOrCallback;
      this._updateQueue(oldState => ({
        ...oldState,
        [keyOrStateOrCallback]: callback(oldState[keyOrStateOrCallback]),
      }));
    }
    return this;
  }

  reset(): this {
    this._updateQueue$.next([() => this._initialState]);
    return this;
  }

  destroy(): void {
    this._assertNotDestroyed();
    this._destroy$.next();
    this._destroy$.complete();
    this._isDestroyed = true;
  }
}
