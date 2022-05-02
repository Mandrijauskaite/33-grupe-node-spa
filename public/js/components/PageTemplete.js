class PageTemplate {
    constructor() {
        this.selector = '#app';
        this.isHomePage = false;
        this.year = 2022;
        this.DOM = document.querySelector(this.selector);
    }

    logoHTML() {
        if (this.isHomePage) {
            return `<img src="/img/logo.png" alt="Logo" class="logo">`;
        } else {
            return `<a href="/">
                        <img src="/img/logo.png" alt="Logo" class="logo">
                    </a>`;
        }
    }

    headerHTML() {
        const publicLinks = `<a href="/register/">Register</a>
                            <a href="/login/">Log in</a>`;
        const userLinks = `<a href="/create-blog-post/">Create post</a>
                            <a href="/logout/">Logout</a>`;

        return `<header class="container header">
                    <div class="row">
                        ${this.logoHTML()}
                        <nav>
                            ${false ? userLinks : publicLinks}
                        </nav>
                    </div>
                </header>`;
    }

    footerHTML() {
        return `<footer class="container">
                    <div class="row">
                        &copy; Copyrights ${this.year} <a href="https://github.com/front-end-by-rimantas" target="_blank">Front-end-by-Rimantas</a>.
                    </div>
                </footer>`;
    }

    mainHTML() {
        return 'MAIN CONTENT';
    }

    render() {
        this.DOM.innerHTML = `
            ${this.headerHTML()}
            <main>
                ${this.mainHTML()}
            </main>
            ${this.footerHTML()}`;
    }
}

export { PageTemplate }