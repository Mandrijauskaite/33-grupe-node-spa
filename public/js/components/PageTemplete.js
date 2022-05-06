class PageTemplate {
    constructor(data) {
        this.data = data;
        this.selector = '#app';
        this.title = 'Server';
        this.isHomePage = false;
        this.isLogoutPage = false;
        this.yearStarted = 2022;
        this.DOM = document.querySelector(this.selector);
    }

    /**
     * Generuojamas puslapio `<header>` dalyje esancio logotipo HTML kodas.
     * @returns {string} HTML kodas
     */
    logoHTML() {
        if (this.isHomePage) {
            return `<img src="/img/logo.png" alt="Logo" class="logo">`;
        } else {
            return `<a href="/">
                        <img src="/img/logo.png" alt="Logo" class="logo">
                    </a>`;
        }
    }

    /**
     * Generuojamas puslapio `<header>` dalies HTML kodas.
     * @returns {string} HTML kodas
     */
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

    /**
     * Generuojamas puslapio `<footer>` dalies HTML kodas.
     * 
     * Copyright daliai yra automatiskai apskaiciuojamas ir suformatuojamas metu tekstas
     * @returns {string} HTML kodas
     */
    footerHTML() {
        const d = new Date();
        const currentYear = d.getFullYear();

        let year = this.yearStarted;
        if (this.yearStarted !== currentYear) {
            year += `-${currentYear}`;
        }

        return `<footer class="container">
                    <div class="row">
                        &copy; Copyrights ${year} <a href="https://github.com/front-end-by-rimantas" target="_blank">Front-end-by-Rimantas</a>.
                    </div>
                </footer>`;
    }

    /**
     * Generuojamas puslapio `<main>` dalies HTML kodas.
     * @returns {Promise<string>} HTML kodas
     */
    async mainHTML() {
        return `PAGE CONTENT`;
    }

    /**
     * Po puslapio turinio sugeneravimo, reikiamos Front-end'ines logikos paleidimas
     */
    addListeners() {
    }

    /**
     * Generuojamas viso puslapio HTML kodas.
     * @returns {Promise<string>} HTML kodas
     */
    async render() {
        this.DOM.innerHTML = `
            ${this.headerHTML()}
            <main>
                ${await this.mainHTML()}
            </main>
            ${this.footerHTML()}`;
        this.addListeners();
    }
}

export { PageTemplate }