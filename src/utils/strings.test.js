import { toId } from './strings';
import { describe, it } from '@jest/globals'
describe('Utils: strings', () => {
    it('should lower case the string', () => {
        expect(toId('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual('abcdefghijklmnopqrstuvwxyz');
    });

    it('should replace norwegian letters', () => {
        expect(toId('æøåÆØÅ')).toEqual('aoaaoa');
    });

    it('should replace spaces with underscore', () => {
        expect(toId('æøå ÆØÅ')).toEqual('aoa_aoa');
    });

    it('should allow numbers', () => {
        expect(toId('123Asd')).toEqual('123asd');
    });

    it('should allow dashes', () => {
        expect(toId('123-Asd')).toEqual('123-asd');
    });

    it('should ignore non word symbols', () => {
        expect(toId('%<>/:.?,;!"=(){}[]$&#£@^')).toEqual('');
    });

    it('should ignore non latin', () => {
        expect(toId('Ĉ')).toEqual('');
    });
});
