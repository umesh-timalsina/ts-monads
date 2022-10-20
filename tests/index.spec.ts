/* eslint-env mocha */

import { Maybe, Ok, Err } from '../index';
import { Maybe as MaybeFromModule } from '../lib/Maybe';
import { Ok as OkFromModule, Err as ErrFromModule } from '../lib/Result';

import expect from 'expect';

describe('Index', function () {
    it('should be able to import all classes', () => {
        expect(Maybe).toBe(MaybeFromModule);
        expect(Ok).toBe(OkFromModule);
        expect(Err).toBe(ErrFromModule);
    });
});
