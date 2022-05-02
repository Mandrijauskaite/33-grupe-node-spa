import { PageTemplate } from "../components/PageTemplate.js";

class PageLogin extends PageTemplate {
    mainHTML() {
        return `
        <section class="container">
            <div class="row">
                LOGIN CONTENT
            </div>
        </section>`;
    }
}

export { PageLogin }