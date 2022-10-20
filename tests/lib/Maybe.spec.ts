/* eslint-env mocha */

import expect from 'expect';
import { Maybe } from '../../lib/Maybe';

describe('Maybe', function () {
    it('should create none type for maybe', () => {
        const noneString = Maybe.none<string>();
        expect(noneString.isNone()).toEqual(true);
    });

    it('should throw error if value missing', () => {
        const maybeNone = Maybe.none();
        expect(() => {
            maybeNone.valueOrThrow(new Error('value is required'));
        }).toThrowError('');

        const maybeSome = Maybe.some('Some Value');
        expect(maybeSome.valueOrThrow(new Error())).toEqual('Some Value');
    });

    it('should map if value present', () => {
        const value = Maybe.some<string>('My String');
        const upperCase = value.flatMap((value) =>
            Maybe.some(value.toUpperCase())
        );
        expect(upperCase.unwrap()).toEqual('MY STRING');
    });

    it('should resolve values using from value', () => {
        const none = Maybe.fromValue(null);
        const some = Maybe.fromValue<number>(5);
        expect(none.isNone()).toBe(true);
        expect(some.isNone()).toBe(false);
    });

    it('should return default value for getorelse', () => {
        const none = Maybe.fromValue<number>(null);
        const five = none.getOrElse(5);
        expect(five).toEqual(5);
    });
});
