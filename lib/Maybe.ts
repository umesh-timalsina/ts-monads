import { Err, Ok, Result } from "./Result";

export interface Maybe<T> {
  isNone(): boolean;
  isSome(): boolean;
  unwrap(): T;
  unwrapOr(defaultValue: T): T;
  unwrapOrElse(fn: () => T): T;
  okOr<E>(err: E): Result<T, E>;
  okOrElse<E>(fn: () => E): Result<T, E>;
  map<E>(fn: (val: T) => E): Maybe<E>;
  mapAsync<E>(fn: (val: T) => Promise<E>): Promise<Maybe<E>>;
  mapOr<E>(defaultValue: E, fn: (val: T) => E): E;
  mapAsyncOr<E>(defaultValue: E, fn: (val: T) => Promise<E>): Promise<E>;
  mapOrElse<E>(defaultFn: () => E, mapFn: (val: T) => E): E;
  mapAsyncOrElse<E>(
    defaultFn: () => E,
    mapFn: (val: T) => Promise<E>
  ): Promise<E>;
}

export class Some<T> implements Maybe<T> {
  constructor(private value: T) {
    this.value = value;
  }

  isNone(): boolean {
    return false;
  }

  isSome(): boolean {
    return true;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(defaultValue: T): T {
    return this.value;
  }

  unwrapOrElse(fn: () => T): T {
    return this.value;
  }

  okOr<E>(err: E): Ok<T> {
    return new Ok(this.value);
  }

  okOrElse<E>(fn: () => E): Ok<T> {
    return new Ok(this.value);
  }

  map<E>(fn: (val: T) => E): Maybe<E> {
    return new Some(fn(this.value));
  }

  async mapAsync<E>(fn: (val: T) => Promise<E>): Promise<Maybe<E>> {
    return new Some(await fn(this.value));
  }

  mapOr<E>(defaultValue: E, fn: (val: T) => E): E {
    return fn(this.value);
  }

  async mapAsyncOr<E>(defaultValue: E, fn: (val: T) => Promise<E>): Promise<E> {
    return await fn(this.value);
  }

  mapOrElse<E>(defaultFn: () => E, mapFn: (val: T) => E): E {
    return mapFn(this.value);
  }

  async mapAsyncOrElse<E>(
    defaultFn: () => E,
    mapFn: (val: T) => Promise<E>
  ): Promise<E> {
    return await mapFn(this.value);
  }
}

export class None<T> implements Maybe<T> {
  okOr<E>(err: E): Err<E> {
    return new Err(err);
  }

  okOrElse<E>(fn: () => E): Err<E> {
    return new Err(fn());
  }

  isNone(): boolean {
    return true;
  }

  isSome(): boolean {
    return false;
  }

  map<E>(fn: (val: T) => E): Maybe<E> {
    return new None<E>();
  }

  async mapAsync<E>(fn: (val: T) => Promise<E>): Promise<Maybe<E>> {
    return new None<E>();
  }

  mapOr<E>(defaultValue: E, fn: (val: T) => E): E {
    return defaultValue;
  }

  async mapAsyncOr<E>(defaultValue: E, fn: (val: T) => Promise<E>): Promise<E> {
    return defaultValue;
  }

  mapOrElse<E>(defaultFn: () => E, mapFn: (val: T) => E): E {
    return defaultFn();
  }

  async mapAsyncOrElse<E>(
    defaultFn: () => E,
    mapFn: (val: T) => Promise<E>
  ): Promise<E> {
    return defaultFn();
  }

  unwrap(): T {
    throw new Err("cannot unwrap a none");
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  unwrapOrElse(fn: () => T): T {
    return fn();
  }
}
