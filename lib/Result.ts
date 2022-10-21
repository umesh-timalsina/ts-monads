import { Maybe, None, Some } from './Maybe';

export interface Result<V, E> {
    map<V2>(fn: (item: V) => V2): Result<V2, E>;
    mapError<E2>(errFn: (err: E) => E2): Result<V, E2>;
    mapAsync<V2>(fn: (item: V) => Promise<V2>): Promise<Result<V2, E>>;
    mapErrorAsync<E2>(errFn: (item: E) => Promise<E2>): Promise<Result<V, E2>>;
    unwrap(): V;
    ok(): Maybe<V>;
}

export class Ok<V> implements Result<V> {
    _value: V;

    constructor(private value: V) {
        this._value = value;
    }

    map<V2>(fn: (item: V) => V2): Result<V2, E> {
        try {
            return new Ok(fn(this._value));
        } catch (err) {
            return new Err(err as E);
        }
    }

    mapError<E2>(errFn: (err: E) => E2): Result<V, E2> {
        return this;
    }

    async mapAsync<V2>(fn: (item: V) => Promise<V2>): Promise<Result<V2, E>> {
        try {
            const result = await fn(this._value);
            return new Ok(result);
        } catch (err) {
            return new Err(err as E);
        }
    }

    async mapErrorAsync<E2>(
        errFn: (item: E) => Promise<E2>
    ): Promise<Result<V, E2>> {
        return this;
    }

    ok(): Maybe<V> {
        return new Some<V>(this.value);
    }

    unwrap(): V {
        return this._value;
    }
}

export class Err<E> implements Result<V, E> {
    _error: E;

    constructor(err: E) {
        this._error = err;
    }

    map<V2>(fn: (item: V) => V2): Result<V2, E> {
        return this;
    }

    mapError<E2>(errFn: (err: E) => E2): Result<V, E2> {
        return new Err(errFn(this._error));
    }

    async mapAsync<V2>(fn: (item: V) => Promise<V2>): Promise<Result<V2, E>> {
        return this;
    }

    async mapErrorAsync<E2>(
        errFn: (item: E) => Promise<E2>
    ): Promise<Result<V, E2>> {
        try {
            const newErr = await errFn(this._error);
            return new Err(newErr);
        } catch (err) {
            return new Err(err as E);
        }
    }

    ok(): Maybe<V> {
        return new None<V>();
    }

    unwrap(): V {
        throw this._error;
    }
}
