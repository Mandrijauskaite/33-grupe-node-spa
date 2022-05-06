import { PageTemplate } from "../components/PageTemplate.js";
import { IsValid } from '../components/is-valid/IsValid.js';

class PageRegister extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
    }

    mainHTML() {
        return `<section class="container">
                    <div class="row">
                        <div class="left">
                            <h1 class="title">Register</h1>
                            <form class="form" action="/api/account">
                                <div class="form-errors"></div>
                                <div class="form-row">
                                    <label for="username">Username</label>
                                    <input id="username" data-validation="username" type="text" placeholder="Type username" required value="Chuck">
                                </div>
                                <div class="form-row">
                                    <label for="email">Email</label>
                                    <input id="email" data-validation="email" type="email" placeholder="Type email" required value="chuck@norris.com">
                                </div>
                                <div class="form-row">
                                    <label for="password">Password</label>
                                    <input id="password" data-validation="password" type="password" placeholder="Type password" required value="chuckchuckchuck">
                                </div>
                                <div class="form-row">
                                    <label for="repass">Repeat password</label>
                                    <input id="repass" data-validation="password" type="password" placeholder="Type password" required value="chuckchuckchuck2">
                                </div>
                                <div class="form-row">
                                    <button type="submit" class="btn">Create account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>`;
    }

    addListeners() {
        const formDOM = document.querySelector('.form');
        const errorsDOM = formDOM.querySelector('.form-errors');
        const allInputsDOM = formDOM.querySelectorAll('input');
        const submitDOM = formDOM.querySelector('button');

        submitDOM.addEventListener('click', (e) => {
            e.preventDefault();

            const errors = [];
            const formData = new FormData();

            // formData.append('username', allInputsDOM[0].value);
            // formData.append('email', allInputsDOM[1].value);
            // formData.append('password', allInputsDOM[2].value);
            // formData.append('file', allInputsDOM[4].files[0]);

            for (const inputDOM of allInputsDOM) {
                const { id, value, dataset, type } = inputDOM;

                if (dataset.validation) {
                    const validationRule = IsValid[dataset.validation];
                    const [err, status] = validationRule(value);
                    if (err) {
                        errors.push(status);
                    }
                }

                if (type !== 'file') {
                    formData.append(id, value);
                } else {
                    formData.append(id, inputDOM.files[0]);
                }
            }

            if (formData.get('password')
                && formData.get('repass')
                && formData.get('password') !== formData.get('repass')) {
                errors.push('Nesutampa slaptazodziai');
            }
            errorsDOM.innerText = errors.join('\r\n');

            if (errors.length === 0) {
                formData.delete('repass');

                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        const data = JSON.parse(this.responseText);

                        if (data.status === 'Success') {
                            if (data.action.type === 'redirect') {
                                location.href = data.action.href;
                            }
                        }

                        if (data.status === 'Error') {
                            errorsDOM.innerText = data.msg;
                        }
                    }
                };
                xhttp.open("POST", formDOM.action, true);
                xhttp.send(formData);
            }
        })
    }
}

export { PageRegister };