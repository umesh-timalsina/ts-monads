import { Err, Ok, Result } from './Result';

export interface Maybe<T> {
    isNone(): boolean;
    isSome(): boolean;
    unwrap(): T;
    unwrapOr(defaultValue: T): T;
    unwrapOrElse(fn: () => T): T;
    okOr<E>(err: E): Result<T, E>;
    okOrElse<E>(fn: () => E): Result<T, E>;
    map<U>(fn: (val: T) => U): Maybe<U>;
    mapAsync<U>(fn: (val: T) => Promise<U>): Promise<Maybe<U>>;
    mapOr<U>(defaultValue: U, fn: (val: T) => U): U;
    mapAsyncOr<U>(defaultValue: U, fn: (val: T) => Promise<U>): Promise<U>;
    mapOrElse<U>(defaultFn: () => U, mapFn: (val: T) => U): U;
    mapAsyncOrElse<U>(
        defaultFn: () => U,
        mapFn: (val: T) => Promise<U>
    ): Promise<U>;
}

export class Some<T> implements Maybe<T> {
    constructor(private readonly value: T) {
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

    map<U>(fn: (val: T) => U): Maybe<U> {
        return new Some(fn(this.value));
    }

    async mapAsync<U>(fn: (val: T) => Promise<U>): Promise<Maybe<U>> {
        return new Some(await fn(this.value));
    }

    mapOr<U>(defaultValue: U, fn: (val: T) => U): U {
        return fn(this.value);
    }

    async mapAsyncOr<U>(
        defaultValue: U,
        fn: (val: T) => Promise<U>
    ): Promise<U> {
        return await fn(this.value);
    }

    mapOrElse<U>(defaultFn: () => U, mapFn: (val: T) => U): U {
        return mapFn(this.value);
    }

    async mapAsyncOrElse<U>(
        defaultFn: () => U,
        mapFn: (val: T) => Promise<U>
    ): Promise<U> {
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

    map<U>(fn: (val: T) => U): Maybe<U> {
        return new None<U>();
    }

    async mapAsync<U>(fn: (val: T) => Promise<U>): Promise<Maybe<U>> {
        return new None<U>();
    }

    mapOr<U>(defaultValue: U, fn: (val: T) => U): U {
        return defaultValue;
    }

    async mapAsyncOr<U>(
        defaultValue: U,
        fn: (val: T) => Promise<U>
    ): Promise<U> {
        return defaultValue;
    }

    mapOrElse<U>(defaultFn: () => U, mapFn: (val: T) => U): U {
        return defaultFn();
    }

    async mapAsyncOrElse<U>(
        defaultFn: () => U,
        mapFn: (val: T) => Promise<U>
    ): Promise<U> {
        return defaultFn();
    }

    unwrap(): T {
        throw new Error('cannot unwrap a none');
    }

    unwrapOr(defaultValue: T): T {
        return defaultValue;
    }

    unwrapOrElse(fn: () => T): T {
        return fn();
    }
}
