import {Maybe} from './Maybe';

export class Result<V, E> {
    _value: Maybe<V>;
    _error: Maybe<E>;

    constructor(value: Maybe<V>, error: Maybe<E>) {
        this._value = value;
        this._error = error;
    }

    map<V2>(fn: (item: V) => Maybe<V2>): Result<V2, E> {
        if(this._value.isSome()) {
            const result = this._value.flatMap(fn);
            return new Result<V2, E>(result, Maybe.none());
        } else {
            return new Result<V2, E>(Maybe.none(), this._error);
        }
    }

    mapError<E2>(errFn: (err: E) => Maybe<E2>): Result<V, E2> {
        if (this._error.isSome()) {
            const result = this._error.flatMap<E2>(errFn);
            return new Result(Maybe.none<V>(), result);
        } else {
            return new Result(this._value, Maybe.none());
        }
    }

    unwrap() {
        if(this._error.isSome()) {
            throw this._error.unwrap();
        } else {
            return this._value.unwrap();
        }
    }

    static Ok<V, E>(value: V) {
        return new Result(
            Maybe.some<V>(value),
            Maybe.none<E>()
        )
    }

    static Error<V, E>(err: E) {
        return new Result(
            Maybe.none<V>(),
            Maybe.some<E>(err),
        )
    }
}
