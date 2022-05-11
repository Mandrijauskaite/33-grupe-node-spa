class IsValid {
    static nonEmptyString(text, context = 'Tekstas') {
        if (typeof text !== 'string') {
            return [true, `${context} turi buti tekstinis`];
        }
        if (text === '') {
            return [true, `${context} negali buti tuscias tekstas`];
        }
        return [false, 'OK'];
    }

    static correctStringSize(text, context = 'Tekstas', max = 100, min = 0) {
        if (!Number.isInteger(max)) {
            return [true, `Max simboliu kiekis turi buti sveikasis skaicius`];
        }
        if (!Number.isInteger(min)) {
            return [true, `Min simboliu kiekis turi buti sveikasis skaicius`];
        }
        if (max < min) {
            return [true, `Max negali buti maziau uz Min`];
        }
        if (min < 0) {
            return [true, `Minimali Min reiksme yra nulis`];
        }
        if (text.length > max) {
            return [true, `${context} turi buti ne daugiau ${max} simboliu`];
        }
        if (text.length < min) {
            return [true, `${context} turi buti daugiau arba lygu ${min} simboliai`];
        }
        return [false, 'OK'];
    }

    static trueObject(obj) {
        if (typeof obj !== 'object'
            || obj === null
            || Array.isArray(obj)) {
            return [true, 'Parametrai turi buti objektas'];
        }
        return [false, 'OK'];
    }

    static containsAllowedSymbols(text, context = 'Tekstas', abc = {}) {
        const isObject = IsValid.trueObject(abc);
        if (isObject[0]) {
            return isObject;
        }
        const params = {
            lowercase: abc.lowercase ?? true,
            uppercase: abc.uppercase ?? true,
            numbers: abc.numbers ?? true,
            special: abc.special ?? '',
        };
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';

        let allowedABC = '';
        if (params.lowercase === true) {
            allowedABC += lowercase;
        }
        if (params.uppercase === true) {
            allowedABC += uppercase;
        }
        if (params.numbers === true) {
            allowedABC += numbers;
        }
        if (typeof params.special === 'string') {
            allowedABC += params.special;
        }

        for (const letter of text) {
            if (!allowedABC.includes(letter)) {
                return [true, `${context} rastas neleistinas simbolis "${letter}"`];
            }
        }
        return [false, 'OK'];
    }

    static username(text) {
        const minLength = 4;
        const maxLength = 12;

        const isEmpty = IsValid.nonEmptyString(text, 'Username');
        if (isEmpty[0]) {
            return isEmpty;
        }
        const isCorrectSize = IsValid.correctStringSize(text, 'Username', maxLength, minLength);
        if (isCorrectSize[0]) {
            return isCorrectSize;
        }
        const hasAllowedSymbols = IsValid.containsAllowedSymbols(text, 'Username');
        if (hasAllowedSymbols[0]) {
            return hasAllowedSymbols;
        }

        return [false, 'OK'];
    }

    static email(text) {
        const minLength = 6;
        const maxLength = 30;

        const isEmpty = IsValid.nonEmptyString(text, 'Email');
        if (isEmpty[0]) {
            return isEmpty;
        }
        const isCorrectSize = IsValid.correctStringSize(text, 'Email', maxLength, minLength);
        if (isCorrectSize[0]) {
            return isCorrectSize;
        }
        const hasAllowedSymbols = IsValid.containsAllowedSymbols(text, 'Email', { special: '@.' });
        if (hasAllowedSymbols[0]) {
            return hasAllowedSymbols;
        }

        if (text.includes('..')) {
            return [true, 'Email negali tureti dvieju tasku is eiles'];
        }

        const emailParts = text.split('@');
        if (emailParts.length < 2) {
            return [true, 'Email truksta viena @ simbolio'];
        }
        if (emailParts.length > 2) {
            return [true, 'Email turi tureti tik viena @ simboli'];
        }
        if (emailParts[0] === '') {
            return [true, 'Email neturi adreso pries @ simboli']
        }
        if (emailParts[1] === '') {
            return [true, 'Email neturi domeno uz @ simbolio']
        }

        const domainParts = emailParts[1].split('.');
        if (domainParts[0] === '') {
            return [true, 'Email domenas priekyje negali tureti tasko'];
        }
        if (domainParts[domainParts.length - 1] === '') {
            return [true, 'Email domenas gale negali tureti tasko'];
        }
        if (domainParts.length < 2) {
            return [true, 'Email domenas neturi galunes (pvz.: lt, com, net...)'];
        }
        if (domainParts.length > 4) {
            // vardenis@pastas.lt +
            // vardenis@pastas.co.uk +
            // vardenis@super.pastas.lt +
            // vardenis@super.pastas.co.uk +
            return [true, 'Email domenas turi per daug daliu'];
        }

        return [false, 'OK'];
    }

    static password(text) {
        const minNumbersCount = 1;
        const minLowercaseCount = 1;
        const minUppercaseCount = 1;
        const minSpecialSymbolsCount = 1;
        const minLength = minNumbersCount + minLowercaseCount + minUppercaseCount + minSpecialSymbolsCount;
        const maxLength = 12;

        const isEmpty = IsValid.nonEmptyString(text, 'Password');
        if (isEmpty[0]) {
            return isEmpty;
        }
        const isCorrectSize = IsValid.correctStringSize(text, 'Password', maxLength, minLength);
        if (isCorrectSize[0]) {
            return isCorrectSize;
        }

        const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (const letter of text) {
            if (!abc.includes(letter)) {
                return [true, `Password rastas neleistinas simbolis "${letter}"`];
            }
        }
        return [false, 'OK'];
    }
}

export { IsValid }