/* eslint-env mocha */

import { Some, None, Ok, Err } from '../index';
import { Some as SomeFromModule, None as NoneFromModule } from '../lib/Maybe';
import { Ok as OkFromModule, Err as ErrFromModule } from '../lib/Result';

import expect from 'expect';

describe('Index', function () {
    it('should be able to import all classes', () => {
        expect(Some).toBe(SomeFromModule);
        expect(None).toBe(NoneFromModule);
        expect(Ok).toBe(OkFromModule);
        expect(Err).toBe(ErrFromModule);
    });
});
