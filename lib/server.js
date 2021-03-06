import http from 'http';
import { file } from './file.js';
import { utils } from './utils.js';
import { StringDecoder } from 'string_decoder';

import accountAPI from '../api/account.js';
import tokenAPI from '../api/token.js';
import booksAPI from '../api/books.js';

const server = {};

const [htmlErr, HTML] = await file.read('pages', 'index.html');

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();
    const trimmedPath = parsedURL.pathname.replace(/^\/+|\/+$/g, '');
    const headers = req.headers;

    const textFileExtensions = ['css', 'js', 'txt', 'svg', 'webmanifest'];
    const binaryFileExtensions = ['eot', 'ttf', 'woff', 'woff2', 'otf', 'png', 'jpg', 'ico'];
    const fileExtension = utils.fileExtension(trimmedPath);

    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.split('/')[0] === 'api';
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    const MIMES = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        txt: 'text/plaint',
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        otf: 'font/otf',
        eot: 'application/vnd.ms-fontobject',
        webmanifest: 'application/manifest+json',
        pdf: 'application/pdf',
        json: 'application/json',
    };

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();
        const payload = utils.parseJSONtoObject(buffer);

        const CSP = `base-uri ${baseURL};`
            + `connect-src 'self' ${baseURL};`
            + `default-src 'self' ${baseURL};`
            + `frame-ancestors 'self' ${baseURL};`
            + `media-src 'self' ${baseURL};`
            + `script-src 'self' ${baseURL};`
            + `style-src 'self' ${baseURL};`
            + `font-src 'self' ${baseURL};`
            + `img-src 'self' ${baseURL};`
            + `object-src 'none';`;
        const commonHeaders = {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Control-Allow-Origin': baseURL,
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
            'Content-Security-Policy': CSP,
            'X-Content-Security-Policy': CSP,
            'X-XSS-Protection': '1; mode=block',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'no-referrer',
            'Cache-Control': 'max-age=86400, private, must-revalidate',
        };

        const dataForHandlers = {
            httpMethod: httpMethod,
            payload: payload,
        };

        let responseContent = 'API endpoint i kuri kreipeisi neegzistuoja';

        if (isTextFile) {
            const [err, content] = await file.readPublic(trimmedPath);
            if (err) {
                responseContent = 'ERROR: problema bandant gauti norima faila';
                res.writeHead(404);
            } else {
                responseContent = content;
                res.writeHead(200, {
                    ...commonHeaders,
                    'Content-Type': MIMES[fileExtension],
                    'Cache-Control': 'max-age=63072000, private, must-revalidate',
                });
            }
        }

        if (isBinaryFile) {
            const [err, content] = await file.readBinaryPublic(trimmedPath);
            if (err) {
                responseContent = 'ERROR: problema bandant gauti norima faila';
                res.writeHead(404);
            } else {
                responseContent = content;
                res.writeHead(200, {
                    ...commonHeaders,
                    'Content-Type': MIMES[fileExtension],
                    'Cache-Control': 'max-age=63072000, private, must-revalidate',
                });
            }
        }   


// KAIP VEIKIA TRUMPAI: turime defolt?? - let responseContent = 'API endpoint i kuri kreipeisi neegzistuoja'; i??kvie??iame f-j?? - await APIhandler(dataForHandlers, apiCallback); kai ji baigia darb?? i??kvie??ia - apiCallback; apiCallback overaidina responseContent; tada responseContent i??siun??iamas

        if (isAPI) { //
            const APIroute = trimmedPath.split('/')[1]; // APIroute

            if (server.API[APIroute] && server.API[APIroute][APIroute]) { // [APIroute][APIroute] - du leveliai atgal; // 
                const APIhandler = server.API[APIroute][APIroute]; //  APIhandler - F-JA kuri?? susirandame i?? apatinio server.API {} pagal tinkam?? rakt?? (account, token, books) ??iuo atveju APIroute, viduje i??sikvie??iame t?? pa??i?? pagrindin?? bazin?? f-j?? ([APIroute][APIroute]), jai paduosime du dalykus dataForHandlers - duomenis (??r. await APIhandler) ir apiCallback - funkcij??, kuri?? i??kvies kai baigsime darb??. Ji tur??s tur??ti prieig?? prie res.end(responseContent)

                const apiCallback = (statusCode, payload = '', headers = {}) => { // U??klausos: statusCode -kaip tau sek??si? // payload = ''- gal reikia ka nors vartotojui i??si??sti pvz.:stringas, klaidos prane??imas arba objektas // headers = {} - gal reikia k?? nors nar??yklei pasi??lyti, kad padaryt??
                    statusCode = typeof statusCode === 'number' ? statusCode : 200; // statusCode patikrinamas: jeigu nr. id??tas tai jis ir gr????, jei ne??d??tas tai bus defoult 200 arba 418 ir .t.t.
                    responseContent = typeof payload === 'string' ? payload : JSON.stringify(payload); // jei ateina stringas bus viskas paruo??ta, jei ne stringas dar reik??s JSON.stringify

                    res.writeHead(statusCode, { // headers = {} tas pat kaip statusCode, payload = '', - papildomos komandos nar??yklei yra ??ra??omos su res.writeHead, kur nusirodom status?? (statusCode) ir tip?? ('Content-Type': MIMES.json), nes i??eidin??s visada JSON ir papildomas (...headers) instrukcijas
                        ...commonHeaders,
                        'Content-Type': MIMES.json,
                        ...headers,
                    })
                }

                await APIhandler(dataForHandlers, apiCallback);
            } else {
                responseContent = JSON.stringify({
                    status: 'error',
                    msg: 'ERROR: no such API endpoint found'
                });

                res.writeHead(404, {
                    'Content-Type': MIMES.json,
                })
            }
        }

        if (isPage) {
            responseContent = HTML;
            res.writeHead(200, {
                ...commonHeaders,
                'Content-Type': MIMES['html'],
            });
        }

        res.end(responseContent);
    })
});

server.API = {
    account: accountAPI,
    token: tokenAPI,
    books: booksAPI,
};

server.init = () => {
    const PORT = 3018;
    server.httpServer.listen(PORT, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${PORT}`);
    });
}

export { server };