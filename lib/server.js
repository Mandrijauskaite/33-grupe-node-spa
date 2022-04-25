import http from 'http';

const server  = {};

server.httpServer = http.createServer((reqest, responsiv) => {
    console.log('gauta uzklausa is kliento');
    responsiv.end('atsakymas :P')
});

server.API = {};

server.init = () => {
    const PORT = 3018;
    server.httpServer.listen(PORT, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:$(PORT)`);
    });
    // console.log('pasileidinejame serveri...');
    // console.log(http);
}

export { server };