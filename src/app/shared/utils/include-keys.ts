import { Store, StoreValue } from '@ngneat/elf';
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export function includeKeys<S extends Store, State extends StoreValue<S>>(
  keys: Array<keyof State>
): OperatorFunction<State, Partial<State>> {
  if (!keys.length) {
    return pipe();
  }
  const keysSet = new Set(keys);
  return pipe(
    map(state =>
      Object.entries(state).reduce((entity, [key, value]) => {
        if (keysSet.has(key)) {
          entity[key] = value;
        }
        return entity;
      }, {} as State)
    )
  );
}
