import { distinctUntilChanged, MonoTypeOperatorFunction } from 'rxjs';
import { isObjectEqualShallow } from 'st-utils';

export function distinctUntilObjectChanged<T extends Record<string, unknown>>(): MonoTypeOperatorFunction<T> {
  return distinctUntilChanged((objectA, objectB) => isObjectEqualShallow(objectA, objectB));
}
