/* eslint-env mocha */


import expect from 'expect';
import {Result} from '../lib/Result';
import {Maybe} from "../lib/Maybe";

describe('Result', function () {
    it('should create result object with success value', () => {
        const result = Result.Ok('My String');
        expect(result._value.isSome()).toBe(true);
        expect(result._error.isSome()).toBe(false);
    });

    it('should create result object with error value', () => {
        const result = Result.Error(new Error('custom error message'));
        expect(result._value.isSome()).toBe(false);
        expect(result._error.isSome()).toBe(true);
    });

    it('should create result object with error value', () => {
        const result = Result.Error(new Error('custom error message'));
        expect(result._value.isSome()).toBe(false);
        expect(result._error.isSome()).toBe(true);
    });

    it('should map error', () => {
        const result = Result.Error(new Error('custom error message'));

        const errObj = result.mapError(err => {
            return Maybe.some({
                statusCode: 400,
                message: err.message
            });
        });

        expect(() => errObj.unwrap()).toThrowError('');
    });

    it('should map value', () => {
        const result = Result.Ok('custom error message');

        const value = result.map(value => {
            return Maybe.some({
                statusCode: 200,
                message: value
            });
        });

        expect(value.unwrap()).toEqual({
            statusCode: 200,
            message: 'custom error message'
        });
    });


});