import { Store, StoreValue } from '@ngneat/elf';
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export function includeKeys<S extends Store, State extends StoreValue<S>, K extends keyof State>(
  keys: K[]
): OperatorFunction<State, Pick<State, K>> {
  if (!keys.length) {
    return pipe();
  }
  const keysSet = new Set(keys);
  return map(state =>
    Object.entries(state).reduce((entity, [key, value]) => {
      if (keysSet.has(key as never)) {
        entity[key] = value;
      }
      return entity;
    }, {} as State)
  );
}
