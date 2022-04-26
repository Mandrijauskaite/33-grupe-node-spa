import { server } from "./lib/server.js";

const app = {};

app.init = () => {
    // pasiruosti pradinius folderius
    // pasiruosti pradinius failus
    // prisijungti prie DB
    // pasileisti serverio logika (jai duoti prieiga prie DB)
    server.init();

    // reguliariu procesu paleidimas
}

app.init();

export { app };
