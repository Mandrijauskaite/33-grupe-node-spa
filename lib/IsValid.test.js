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

describe('correctStringSize', () => {
    describe('parametru tipai', () => {
        test('empty string', () => {
            expect(IsValid.correctStringSize('')).toStrictEqual([false, 'OK']);
        })
        test('max not a number', () => {
            expect(IsValid.correctStringSize('', '', true)).toStrictEqual([true, 'Max simboliu kiekis turi buti sveikasis skaicius']);
        })
        test('min not a number', () => {
            expect(IsValid.correctStringSize('', '', 1, true)).toStrictEqual([true, 'Min simboliu kiekis turi buti sveikasis skaicius']);
        })
    })

    describe('parametru reiksmes', () => {
        test('max: desimtainis', () => {
            expect(IsValid.correctStringSize('', 'Tekstas', 5.5)).toStrictEqual([true, 'Max simboliu kiekis turi buti sveikasis skaicius']);
        })
        test('max maziau uz min', () => {
            expect(IsValid.correctStringSize('', 'Tekstas', 5, 7)).toStrictEqual([true, 'Max negali buti maziau uz Min']);
        })
        test('max maziau uz nuli', () => {
            expect(IsValid.correctStringSize('', 'Tekstas', -2)).toStrictEqual([true, 'Max negali buti maziau uz Min']);
        })
        test('min maziau uz nuli', () => {
            expect(IsValid.correctStringSize('', 'Tekstas', 10, -2)).toStrictEqual([true, 'Minimali Min reiksme yra nulis']);
        })
    })

    describe('geri rezultatai', () => {
        test('max ir min yra vienodi - konkretus ilgis', () => {
            expect(IsValid.correctStringSize('labas', 'Tekstas', 5, 5)).toStrictEqual([false, 'OK']);
        })
        test('tekstas minimalaus ilgio (default)', () => {
            expect(IsValid.correctStringSize('', 'Tekstas', 5)).toStrictEqual([false, 'OK']);
        })
        test('tekstas minimalaus ilgio (5)', () => {
            expect(IsValid.correctStringSize('labas', 'Tekstas', 10, 5)).toStrictEqual([false, 'OK']);
        })
        test('tekstas maksimalaus ilgio (10)', () => {
            expect(IsValid.correctStringSize('labasrytas', 'Tekstas', 10, 5)).toStrictEqual([false, 'OK']);
        })
        test('kai negrizta klaidos pranesimas, context reiksme niekur nefiguruoja', () => {
            expect(IsValid.correctStringSize('labasrytas', 'asd', 10, 5)).toStrictEqual([false, 'OK']);
        })
    })
})

describe('containsAllowedSymbols', () => {
    describe('parametru tipai', () => {
        test('papildomi parametrai ne objektas', () => {
            expect(IsValid.containsAllowedSymbols('labas', '', 3)).toStrictEqual([true, 'Parametrai turi buti objektas']);
        })
        test('papildomi parametrai ne objektas', () => {
            expect(IsValid.containsAllowedSymbols('labas', '', {})).toStrictEqual([false, 'OK']);
        })
    })

    describe('parametru reiksmes', () => {
        test('tikrinamas tekstas yra tuscias', () => {
            expect(IsValid.containsAllowedSymbols('')).toStrictEqual([false, 'OK']);
        })
        test('duotas context, bet nera klaidos, todel jis neturi itakos', () => {
            expect(IsValid.containsAllowedSymbols('', 'asd')).toStrictEqual([false, 'OK']);
        })
        test('neleistinos mazosios raides', () => {
            expect(IsValid.containsAllowedSymbols('labas', 'Username', { lowercase: false })).toStrictEqual([true, 'Username rastas neleistinas simbolis "l"']);
        })
        test('neleistinos mazosios raides, bet pirma gera', () => {
            expect(IsValid.containsAllowedSymbols('Labas', 'Username', { lowercase: false })).toStrictEqual([true, 'Username rastas neleistinas simbolis "a"']);
        })
        test('neleistinos mazosios ir didziosios raides, bet pirma gera', () => {
            expect(IsValid.containsAllowedSymbols('2Labas', 'Username', {
                lowercase: false,
                uppercase: false,
            })).toStrictEqual([true, 'Username rastas neleistinas simbolis "L"']);
        })
        test('neleistinas joks simbolis', () => {
            expect(IsValid.containsAllowedSymbols('2Labas', 'Username', {
                lowercase: false,
                uppercase: false,
                numbers: false,
            })).toStrictEqual([true, 'Username rastas neleistinas simbolis "2"']);
        })
        test('neleistinos joks specialusis simbolis', () => {
            expect(IsValid.containsAllowedSymbols('_2Labas', 'Username', {}))
                .toStrictEqual([true, 'Username rastas neleistinas simbolis "_"']);
        })
        test('leistinas specialusis simbolis', () => {
            expect(IsValid.containsAllowedSymbols('_2Labas', 'Username', { special: '_' }))
                .toStrictEqual([false, 'OK']);
        })
    })
})

describe('email', () => {
    describe('parametru tipai', () => {
        test('netinkamas tipas: number', () => {
            expect(IsValid.email(1)).toStrictEqual([true, 'Email turi buti tekstinis'])
        })
        test('netinkamas tipas: boolean', () => {
            expect(IsValid.email(true)).toStrictEqual([true, 'Email turi buti tekstinis'])
        })
        test('netinkamas tipas: array', () => {
            expect(IsValid.email([])).toStrictEqual([true, 'Email turi buti tekstinis'])
        })
        test('netinkamas tipas: object', () => {
            expect(IsValid.email({})).toStrictEqual([true, 'Email turi buti tekstinis'])
        })
        test('netinkamas tipas: function', () => {
            expect(IsValid.email(function () { })).toStrictEqual([true, 'Email turi buti tekstinis'])
        })
        test('tinkamas tipas: string', () => {
            expect(IsValid.email('vardenis@pastas.xyz')).toStrictEqual([false, 'OK'])
        })
    })

    describe('parametru reiksmes: ilgis', () => {
        test('per trumpas', () => {
            expect(IsValid.email('asd')).toStrictEqual([true, 'Email turi buti daugiau arba lygu 6 simboliai']);
        })
        test('per ilgas', () => {
            expect(IsValid.email('a'.repeat(100))).toStrictEqual([true, 'Email turi buti ne daugiau 30 simboliu']);
        })
        test('minimalus ilgis', () => {
            expect(IsValid.email('x@x.xx')).toStrictEqual([false, 'OK']);
        })
        test('maksimalus ilgis', () => {
            expect(IsValid.email('xxxxxxxxxx@xxxxxxxxxx.xxxxxxxx')).toStrictEqual([false, 'OK']);
        })
    })

    describe('parametru reiksmes: formatas', () => {
        test('blogai: tarpas', () => {
            expect(IsValid.email('v ardenis@pastas.lt')).toStrictEqual([true, 'Email rastas neleistinas simbolis " "']);
        })
        test('blogai: kablelis', () => {
            expect(IsValid.email('v,ardenis@pastas.lt')).toStrictEqual([true, 'Email rastas neleistinas simbolis ","']);
        })
        test('blogai: du taskai', () => {
            expect(IsValid.email('v..ardenis@pastas.lt')).toStrictEqual([true, 'Email negali tureti dvieju tasku is eiles']);
        })
        test('blogai: du @ simboliai', () => {
            expect(IsValid.email('vardenis@@pastas.lt')).toStrictEqual([true, 'Email turi tureti tik viena @ simboli']);
            expect(IsValid.email('vard@enis@pastas.lt')).toStrictEqual([true, 'Email turi tureti tik viena @ simboli']);
            expect(IsValid.email('@vardenis@pastas.lt')).toStrictEqual([true, 'Email turi tureti tik viena @ simboli']);
            expect(IsValid.email('vardenis@pastas.lt@')).toStrictEqual([true, 'Email turi tureti tik viena @ simboli']);
            expect(IsValid.email('@vardenispastas.lt@')).toStrictEqual([true, 'Email turi tureti tik viena @ simboli']);
        })
        test('blogai: nera @ simbolio', () => {
            expect(IsValid.email('vardenis.pastas.lt')).toStrictEqual([true, 'Email truksta viena @ simbolio']);
        })
        test('blogai: nera local dalies', () => {
            expect(IsValid.email('@pastas.lt')).toStrictEqual([true, 'Email neturi adreso pries @ simboli']);
        })
        test('blogai: nera domeno dalies', () => {
            expect(IsValid.email('vardenis@')).toStrictEqual([true, 'Email neturi domeno uz @ simbolio']);
        })
        test('blogai: domenas neturi savo TLD', () => {
            expect(IsValid.email('vardenis@pastas')).toStrictEqual([true, 'Email domenas neturi galunes (pvz.: lt, com, net...)']);
        })
        test('blogai: domenas turi per daug daliu', () => {
            expect(IsValid.email('vardenis@a.b.c.d.e')).toStrictEqual([true, 'Email domenas turi per daug daliu']);
        })
        test('blogai: domenas su tasku priekyje', () => {
            expect(IsValid.email('vardenis@.pastas.lt')).toStrictEqual([true, 'Email domenas priekyje negali tureti tasko']);
        })
        test('blogai: domenas su tasku gale', () => {
            expect(IsValid.email('vardenis@pastas.lt.')).toStrictEqual([true, 'Email domenas gale negali tureti tasko']);
        })
    })
})