import { IsValid } from "../lib/IsValid.js";

const handler = {} // 1. kuriame handler ir eksportuojame default handler.// 2. server.js suimportuoti account.js

handler.account = async (data, callback) => { // 3. dedame saugikli kitiems nenumatytiems metodams 
    const allowedHttpMethods = ['get', 'post', 'put', 'delete']; // suteikia leidimus dirbti vartotojui

    if (allowedHttpMethods.includes(data.httpMethod)) {
        return handler._method[data.httpMethod](data, callback);
    } // kreipiamės į handler ir ._ į method; []-dinaminis paėmimas data.httpMethod (dasikapstome iki vienos iš 4 metodų apačioje logikos);  paleidžiame (); kad f-jos galėtų atlikti savo darbą turime perduoti info, kurią perdavė vartotojas (data) ir kokią f-ją iškviesti kai baigsime darbą (callback)

    return callback(400, {
        msg: `Account API endpoint nepalaiko "${data.httpMethod}" http metodo`
    });
}

handler._method = {}

handler._method.get = (data, callback) => { // 2. darome f-ja kuri grazina(return) atsakyma 
    return callback(200, {
        msg: 'STAI TAU VISA PASKYROS INFO',
    });
}

handler._method.post = (data, callback) => {
    const requiredKeys = ['username', 'email', 'password'];
    const { payload } = data;

    // viso objekto struktura
    if (!payload) {
        return callback(400, {
            msg: 'Nevalidus JSON',
        });
    }


    const keys = Object.keys(payload);
    if (keys.length !== requiredKeys.length) {
        return callback(400, {
            msg: 'Atejes objektas nesutampa su privaloma struktura: email, password, username',
        });
    }
    for (const key of keys) {
        if (!requiredKeys.includes(key)) {
            return callback(400, {
                msg: `Atejes objektas turi raktazodi, kurio nereikia "${key}"`,
            });
        }
    }

    // tipai ir logine reiksme
    const [usernameErr, usernameMsg] = IsValid.username(payload.username);
    if (usernameErr) {
        return callback(400, {
            msg: usernameMsg,
        });
    }

    const [emailErr, emailMsg] = IsValid.email(payload.email);
    if (emailErr) {
        return callback(400, {
            msg: emailMsg,
        });
    }

    const [passwordErr, passwordMsg] = IsValid.password(payload.password);
    if (passwordErr) {
        return callback(400, {
            msg: passwordMsg,
        });
    }

    // patikrinti, ar toks vartotojas jau registruotas (email)
    // slaptazodzio hash'inimas
    // irasome gautus duomenis (aka - uzregistruojame) JSON formatu (failas)

    // graziname pranesima apie sekminga registracija
    return callback(200, {
        msg: 'PASKYRA SUKURTA',
    });
}

handler._method.put = (data, callback) => {
    return callback(200, {
        msg: 'PASKYRA ATNAUJINTA',
    });
}

handler._method.delete = (data, callback) => {
    return callback(200, {
        msg: 'PASKYRA ISTRINTA',
    });
}

export default handler;