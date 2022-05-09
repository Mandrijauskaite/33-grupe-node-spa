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
        if (text.length > max) {
            return [true, `${context} turi buti ne daugiau ${max} simboliu`];
        }
        if (text.length < min) {
            return [true, `${context} turi buti daugiau arba lygu ${min} simboliai`];
        }
        return [false, 'OK'];
    }

    static containsAllowedSymbols(text, context = 'Tekstas', abc = {}) {
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
        const minLength = 7;
        const maxLength = 30;

        const isEmpty = IsValid.nonEmptyString(text, 'Email');
        if (isEmpty[0]) {
            return isEmpty;
        }
        const isCorrectSize = IsValid.correctStringSize(text, 'Email', maxLength, minLength);
        if (isCorrectSize[0]) {
            return isCorrectSize;
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