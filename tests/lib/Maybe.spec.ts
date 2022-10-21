/* eslint-env mocha */

import expect from 'expect';
import { Maybe, None, Some } from '../../lib/Maybe';

describe('Maybe', function () {
    it('should return correct values for isNone checks', () => {
        const noneString = new None();
        const someString = new Some<string>('my string');
        expect(noneString.isNone()).toEqual(true);
        expect(someString.isNone()).toEqual(false);
    });

    it('should return correct values for isSome checks', () => {
        const noneString = new None();
        const someString = new Some<string>('my string');
        expect(noneString.isSome()).toEqual(false);
        expect(someString.isSome()).toEqual(true);
    });

    it('should unwrap if some or throw error if none', () => {
        const maybeNone = new None();
        expect(() => {
            maybeNone.unwrap();
        }).toThrowError('');

        const maybeSome = new Some('Some Value');
        expect(maybeSome.unwrap()).toEqual('Some Value');
    });

    it('should return default value for unwrapOr if none else return its value', () => {
        const maybeNone = new None<string>();
        const unwrappedNone = maybeNone.unwrapOr('My String');
        expect(unwrappedNone).toEqual('My String');

        const maybeSome = new Some<string>('My String');
        const unwrappedSome = maybeSome.unwrapOr('Custom String');
        expect(unwrappedSome).toEqual('My String');
    });

    it('should return Ok/Err result for okOr with some/none respectively', () => {
        const maybeNone = new None<string>();
        const okOrResultNone = maybeNone.okOr(
            new Error('Value should be a string, found none')
        );
        expect(() => okOrResultNone.unwrap()).toThrowError('');

        const maybeSome = new Some<string>('My String');
        const okOrResultSome = maybeSome.okOr(
            new Error('Value should be a string, found none')
        );
        expect(okOrResultSome.ok()).toEqual(new Some('My String'));
    });

    it('should throw return Ok/Err result from a function for okOrElse with some/none respectively', () => {
        const maybeNone = new None<string>();
        const okOrElseResultNone = maybeNone.okOrElse(
            () => new Error('Value should be a string, found none')
        );
        expect(() => okOrElseResultNone.unwrap()).toThrowError('');

        const maybeSome = new Some<string>('My String');
        const okOrElseResultSome = maybeSome.okOrElse(
            () => new Error('Value should be a string, found none')
        );
        expect(okOrElseResultSome.ok()).toEqual(new Some('My String'));
    });

    it('should return some/none of new types for map with some/none', () => {
        const maybeNone = new None<number>();
        const mappedNone = maybeNone.map((val) => val.toString());
        expect(mappedNone).toEqual(new None<string>());

        const maybeSome = new Some<number>(25);
        const mappedSome = maybeSome.map((val) => val.toString());
        expect(mappedSome).toEqual(new Some('25'));
    });

    it('should return some/none of new types for mapAsync with some/none', async () => {
        const maybeNone = new None<number>();
        const mappedNone = await maybeNone.mapAsync(async (val) =>
            val.toString()
        );
        expect(mappedNone).toEqual(new None<string>());

        const maybeSome = new Some<number>(25);
        const mappedSome = await maybeSome.mapAsync(async (val) =>
            val.toString()
        );
        expect(mappedSome).toEqual(new Some('25'));
    });

    it('should return default/transformed values of new types for mapOr with some/none', () => {
        const maybeNone = new None<number>();
        const mappedNone = maybeNone.mapOr('my custom string', (val) =>
            val.toString()
        );
        expect(mappedNone).toEqual('my custom string');

        const maybeSome = new Some<number>(25);
        const mappedSome = maybeSome.mapOr('my custom string', (val) =>
            val.toString()
        );
        expect(mappedSome).toEqual('25');
    });

    it('should return default/transformed values of new types for mapAsyncOr with some/none', async () => {
        const maybeNone = new None<number>();
        const mappedNone = await maybeNone.mapAsyncOr(
            'my custom string',
            async (val) => val.toString()
        );
        expect(mappedNone).toEqual('my custom string');

        const maybeSome = new Some<number>(25);
        const mappedSome = await maybeSome.mapAsyncOr(
            'my custom string',
            async (val) => val.toString()
        );
        expect(mappedSome).toEqual('25');
    });

    it('should return default/transformed values of new types from function for mapOrElse with some/none', () => {
        const maybeNone = new None<number>();
        const mappedNone = maybeNone.mapOrElse(
            () => 'my custom string',
            (val) => val.toString()
        );
        expect(mappedNone).toEqual('my custom string');

        const maybeSome = new Some<number>(25);
        const mappedSome = maybeSome.mapOrElse(
            () => 'my custom string',
            (val) => val.toString()
        );
        expect(mappedSome).toEqual('25');
    });

    it('should return default/transformed values of new types from function for mapAsyncOrElse with some/none', async () => {
        const maybeNone = new None<number>();
        const mappedNone = await maybeNone.mapAsyncOrElse(
            () => 'my custom string',
            async (val) => val.toString()
        );
        expect(mappedNone).toEqual('my custom string');

        const maybeSome = new Some<number>(25);
        const mappedSome = await maybeSome.mapAsyncOrElse(
            () => 'my custom string',
            async (val) => val.toString()
        );
        expect(mappedSome).toEqual('25');
    });
});
