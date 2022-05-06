import { PageTemplate } from "../components/PageTemplate.js";

class PageHome extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.isHomePage = true;
        this.books = [];
    }

    async getBooksData() {
        // const booksResponse = await fetch('/api/book/all', {
        //     method: 'GET'
        // });

        // return await booksResponse.json();

        return [];
    }

    emptyList() {
        return 'EMPTY LIST';
    }

    isValidBook(book) {
        return true;
    }

    async booksList() {
        const response = await this.getBooksData();
        const data = response.msg;
        if (response.status !== 'Success') {
            return 'Nepavyko gauti informacijos apie knygas :(';
        }

        if (!Array.isArray(data)
            || data.length === 0) {
            return this.emptyList();
        }

        let HTML = '';
        for (const book of data) {
            if (!this.isValidBook(book)) {
                continue;
            }
            HTML += `<div class="card book">
                        <img class="book-img" src="/img/book-covers/${book.cover}" alt="Book cover">
                        <h2 class="book-title">${book.title}</h2>
                        <div class="book-description">${book.author}</div>
                        <div class="book-description">${book.price} ${book.currency}</div>
                        <div class="book-description">${book.rating} (${book.reviewsCount} reviews)</div>
                        <a class="read-more" href="${book.url}" target="_blank">Link</a>
                    </div>`;
        }

        if (HTML === '') {
            return this.emptyList();
        }

        return HTML;
    }

    async mainHTML() {
        return `<section class="container">
                    <div class="row book-list">
                        <div class="col-12 list">
                            ${await this.booksList()}
                        </div>
                    </div>
                </section>`;
    }
}

export { PageHome };