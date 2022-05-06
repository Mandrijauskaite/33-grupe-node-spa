import { router } from './components/router.js';
import { PageHome } from "./pages/PageHome.js";
import { Page404 } from "./pages/Page404.js";
import { PageLogin } from "./pages/PageLogin.js";
import { PageRegister } from "./pages/PageRegister.js";

(async () => {
    router.notFoundRoute = Page404;

    router.addRoute('', PageHome);
    router.addRoute('404', Page404);
    router.addRoute('register', PageRegister);
    router.addRoute('login', PageLogin);

    await router.goToRoute(location.pathname);
    router.init();
})();