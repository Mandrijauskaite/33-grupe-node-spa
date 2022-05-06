const router = {};

router.routes = {};

router.domain = 'localhost';

router.notFoundRoute = null;

router.formatedURL = (pathname) => {
    let link = pathname;
    let start = 0;
    let end = link.length;
    if (link[start] === '/') {
        start = 1;
    }
    if (link[end - 1] === '/') {
        end = -1;
    }
    return link.slice(start, end);
}

router.addRoute = (link, handler) => {
    const formatedLink = router.formatedURL(link);
    router.routes[formatedLink] = handler;
}

router.goToRoute = async (link) => {
    const formatedLink = router.formatedURL(link);
    const handler = router.routes[formatedLink];
    if (handler) {
        await (new handler()).render();
        return router.init();
    }
    if (router.notFoundRoute) {
        await (new router.notFoundRoute()).render();
        return router.init();
    }
    throw new Error('No route to go to');
}

router.init = () => {
    const allLinks = document.querySelectorAll('a');

    for (const link of allLinks) {
        link.addEventListener('click', e => {
            if (link.hostname === router.domain) {
                e.stopPropagation();
                e.preventDefault();
                const { pathname } = link;
                history.pushState({ pathname }, '', pathname);
                router.goToRoute(pathname);
            }
        })
    }

    // grizimo i pries tai buvusi puslapi mechanizmas
    window.onpopstate = e => {
        router.goToRoute(e.state);
    }
}

export { router }