import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();
    const trimmedPath = parsedURL.pathname.replace(/^\/+|\/+$/g, '');
    const headers = req.headers;

    req.on('data', () => {
        console.log('- klientas atsiunte duomenu');
    })

    req.on('end', () => {
        const HTML = '';

        res.end(HTML);
    })
});

server.API = {};

server.init = () => {
    const PORT = 3018;
    server.httpServer.listen(PORT, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${PORT}`);
    });
}

export { server };