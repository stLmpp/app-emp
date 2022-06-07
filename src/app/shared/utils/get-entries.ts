import { Entries } from 'type-fest';

export function getEntries<T extends Record<string | number | symbol, unknown>>(object: T): Entries<T> {
  return Object.entries(object) as Entries<T>;
}
