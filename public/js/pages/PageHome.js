import { PageTemplate } from "../components/PageTemplate.js";

class PageHome extends PageTemplate {
    constructor() {
        super();
        this.isHomePage = true;
    }

    mainHTML() {
        return `
        <section class="container">
            <div class="row">
                HOME CONTENT
            </div>
        </section>`;
    }
}

export { PageHome }