export class Maybe<T> {
    private constructor(private value: T | null) {
        this.value = value;
    }

    static some<T>(value: T) {
        if (!value) {
            throw Error('Provided value must not be empty');
        }
        return new Maybe(value);
    }

    static none<T>() {
        return new Maybe<T>(null);
    }

    static fromValue<T>(value: T | null): Maybe<T> {
        return value ? Maybe.some(value) : Maybe.none<T>();
    }

    getOrElse(defaultValue: T) {
        return this.value === null ? defaultValue : this.value;
    }

    flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R> {
        if (this.value === null) {
            return Maybe.none();
        } else {
            return f(this.value);
        }
    }

    async flatMapAsync<R>(
        f: (wrapped: T) => Promise<Maybe<R>>
    ): Promise<Maybe<R>> {
        if (this.value === null) {
            return Maybe.none();
        } else {
            return await f(this.value);
        }
    }

    public isSome(): boolean {
        return !this.isNone();
    }

    public isNone(): boolean {
        return this.value === null || this.value === undefined;
    }

    unwrap(): T | null {
        return this.value;
    }

    valueOrThrow(err: Error) {
        if (this.isNone()) {
            throw err;
        } else {
            return this.unwrap();
        }
    }
}
