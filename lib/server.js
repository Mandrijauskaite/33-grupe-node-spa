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

        const dataForHandlers = { // žr. account.js
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
                    'Content-Type': MIMES[fileExtension],
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
                    'Content-Type': MIMES[fileExtension],
                });
            }
        }


// KAIP VEIKIA TRUMPAI: turime defoltą - let responseContent = 'API endpoint i kuri kreipeisi neegzistuoja'; iškviečiame f-ją - await APIhandler(dataForHandlers, apiCallback); kai ji baigia darbą iškviečia - apiCallback; apiCallback overaidina responseContent; tada responseContent išsiunčiamas

        if (isAPI) { //
            const APIroute = trimmedPath.split('/')[1]; // APIroute

            if (server.API[APIroute] && server.API[APIroute][APIroute]) { // [APIroute][APIroute] - du leveliai atgal; // 
                const APIhandler = server.API[APIroute][APIroute]; //  APIhandler - F-JA kurią susirandame iš apatinio server.API {} pagal tinkamą raktą (account, token, books) šiuo atveju APIroute, viduje išsikviečiame tą pačią pagrindinę bazinę f-ją ([APIroute][APIroute]), jai paduosime du dalykus dataForHandlers - duomenis (žr. await APIhandler) ir apiCallback - funkciją, kurią iškvies kai baigsime darbą. Ji turės turėti prieigą prie res.end(responseContent)

                const apiCallback = (statusCode, payload = '', headers = {}) => { // Užklausos: statusCode -kaip tau sekėsi? // payload = ''- gal reikia ka nors vartotojui išsiųsti pvz.:stringas, klaidos pranešimas arba objektas // headers = {} - gal reikia ką nors naršyklei pasiųlyti, kad padarytų
                    statusCode = typeof statusCode === 'number' ? statusCode : 200; // statusCode patikrinamas: jeigu nr. idėtas tai jis ir grįš, jei neįdėtas tai bus defoult 200 arba 418 ir .t.t.
                    responseContent = typeof payload === 'string' ? payload : JSON.stringify(payload); // jei ateina stringas bus viskas paruošta, jei ne stringas dar reikės JSON.stringify

                    res.writeHead(statusCode, { // headers = {} tas pat kaip statusCode, payload = '', - papildomos komandos naršyklei yra įrašomos su res.writeHead, kur nusirodom statusą (statusCode) ir tipą ('Content-Type': MIMES.json), nes išeidinės visada JSON ir papildomas (...headers) instrukcijas
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
                'Content-Type': MIMES['html'],
            });
        }

        res.end(responseContent);
    })
});

server.API = { 
    account: accountAPI, // kad lengviau būtų kurti funkcionalumą išsikeliame į atskirą f-lą ./api/account.js
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