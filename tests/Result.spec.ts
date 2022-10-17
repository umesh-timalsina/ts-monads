/* eslint-env mocha */


import expect from 'expect';
import {Ok, Err} from '../lib/Result';
import {Maybe} from '../lib/Maybe';

describe('Result', function () {
    it('should create result object with success value', () => {
        const result = new Ok('My String');
        expect(result.unwrap()).toBe('My String');
    });

    it('should create result object with no value', () => {
        const result = new Ok();
        expect(result.unwrap()).toBe(undefined);
    });

    it('should create result object with error value', () => {
        const result = new Err(new Error('custom error message'));
        expect(() => result.unwrap()).toThrow();
    });

    it('should map error', () => {
        const result = new Err(new Error('custom error message'));

        const errObj = result.mapError(err => new Error('Some new error'));

        expect(() => errObj.unwrap()).toThrowError('Some new error');
    });

    it('should map value', () => {
        const result = new Ok('custom error message');

        const value = result.map(value => (
            {
                statusCode: 200,
                message: value
            })
        );

        expect(value.unwrap()).toEqual({
            statusCode: 200,
            message: 'custom error message'
        });

    });

    it('should return Err if map throws error', () => {
        const result = new Ok();
        const error = result.map(value => {
            throw new Error(value);
        });

        expect(() => error.unwrap()).toThrowError();
    });

    it('should map on with async functions', async () => {
        const result = new Ok();
        const value = await result.mapAsync(async value => 10);

        expect(value.unwrap()).toEqual(10);
    });

    it('should return Err if mapAsync rejects', async () => {
        const result = new Ok();
        const error = await result.mapAsync(async value => {
            throw new Error(value);
        });
        expect(() => error.unwrap()).toThrowError();
    });

    it('should map on error with async functions', async () => {
        const result = new Err();
        const errObj = await result.mapErrorAsync(async err => new Error('some error'));

        expect(() => errObj.unwrap()).toThrowError('some error');
    });

    it('should no-op on mapErrorAsync w/ Ok value', async () => {
        const result = new Ok();
        const errObj = await result.mapErrorAsync(async err => new Error('some error'));
        expect(() => errObj.unwrap()).not.toThrowError('some error');
    });
});
