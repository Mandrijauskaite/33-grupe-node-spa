import { PageTemplate } from "../components/PageTemplate.js";

class Page404 extends PageTemplate {
    mainHTML() {
        return `
        <section class="container">
            <div class="row">
                404
            </div>
        </section>`;
    }
}

export { Page404 }