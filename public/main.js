import { router } from "./components/router.js";
import { PageHome } from "./pages/PageHome.js";
import { Page404 } from "./pages/Page404.js";
import { PageLogin } from "./pages/PageLogin.js";
import { PageRegister } from "./pages/PageRegister.js";

// '' -> PageHome
// '404' -> Page404
// 'ewarstr' -> Page404
// 'login' -> PageLogin
// 'register' -> PageRegister

const pageObj = new PageHome();
pageObj.render();

router.notFoundRoute = Page404;

router.addRoute('', PageHome);
router.addRoute('404', Page404);
router.addRoute('login', PageLogin);
router.addRoute('register', PageRegister);

router.init();