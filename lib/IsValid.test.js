import { IsValid } from "./IsValid.js";

describe('nonEmptyString', () => {
    describe('duomenu tipas', () => {
        test('number', () => {
            expect(IsValid.nonEmptyString(1)).toStrictEqual([true, 'Tekstas turi buti tekstinis']);
        })
        test('boolean', () => {
            expect(IsValid.nonEmptyString(true)).toStrictEqual([true, 'Tekstas turi buti tekstinis']);
        })
        test('array', () => {
            expect(IsValid.nonEmptyString([])).toStrictEqual([true, 'Tekstas turi buti tekstinis']);
        })
        test('object', () => {
            expect(IsValid.nonEmptyString({})).toStrictEqual([true, 'Tekstas turi buti tekstinis']);
        })
        test('function', () => {
            expect(IsValid.nonEmptyString(function () { })).toStrictEqual([true, 'Tekstas turi buti tekstinis']);
        })
    })
    describe('reiksmes verte', () => {
        test('string', () => {
            expect(IsValid.nonEmptyString('')).toStrictEqual([true, 'Tekstas negali buti tuscias tekstas']);
        })
        test('non empty string: single letter', () => {
            expect(IsValid.nonEmptyString('a')).toStrictEqual([false, 'OK']);
        })
    })
    describe('context', () => {
        test('number, Username', () => {
            expect(IsValid.nonEmptyString(1, 'Username')).toStrictEqual([true, 'Username turi buti tekstinis']);
        })
        test('empty string, Username', () => {
            expect(IsValid.nonEmptyString('', 'Username')).toStrictEqual([true, 'Username negali buti tuscias tekstas']);
        })
        test('non empty string, Username', () => {
            expect(IsValid.nonEmptyString('a', 'Username')).toStrictEqual([false, 'OK']);
        })
    })
})