import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
    console.log('gauta uzklausa is kliento');

    res.end('Va tau atsakymas is musu serverio :P');
});

server.API = {};

server.init = () => {
    const PORT = 3018;
    server.httpServer.listen(PORT, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${PORT}`);
    });
}

export { server };