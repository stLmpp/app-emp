export abstract class StorePersist<T extends Record<any, any>> {
  constructor(name: string) {
    this._key = `__STORE__${name}`;
  }

  protected readonly _key: string;

  abstract has(): boolean;
  abstract get(): T | undefined;
  abstract set(value: T | null | undefined): this;
}
