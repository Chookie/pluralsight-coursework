'use strict';
var enums_1 = require('./enums');
function getAllBooks() {
    var books = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: enums_1.category.fiction },
        { id: 2, title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: enums_1.category.fiction },
        { id: 3, title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', available: true, category: enums_1.category.poetry },
        { id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: enums_1.category.fiction }
    ];
    return books;
}
function logFirstAvailable(books) {
    if (books === void 0) { books = getAllBooks(); }
    var numberOfBooks = books.length;
    var firstAvailable = '';
    for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
        var currentBook = books_1[_i];
        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log("Total Books: " + numberOfBooks);
    console.log("First available: " + firstAvailable);
}
function getBookTitlesByCategory(categoryFilter) {
    if (categoryFilter === void 0) { categoryFilter = enums_1.category.fiction; }
    console.log("Getting books in category: " + enums_1.category[categoryFilter]);
    var allBooks = getAllBooks();
    var filteredBooks = allBooks
        .filter(function (b) { return b.category === categoryFilter; })
        .map(function (b) { return b.title; });
    return filteredBooks;
}
function logBookTitles(titles) {
    titles;
}
function getBookById(id) {
    var allBooks = getAllBooks();
    return allBooks.filter(function (b) { return b.id === id; })[0];
}
function createCustomerId(name, id) {
    return name + id;
}
function createCustomer(name, age, city) {
    console.log("Creating customer " + name);
    if (age) {
        console.log("Age " + age);
    }
    if (city) {
        console.log("City " + city);
    }
}
function checkOutBooks(customer) {
    var bookIds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        bookIds[_i - 1] = arguments[_i];
    }
    console.log("Checking out books for " + customer);
    return bookIds.map(getBookById)
        .filter(function (b) { return b.available; })
        .map(function (b) { return b.title; });
}
function getTitles(bookProperty) {
    var allBooks = getAllBooks();
    if (typeof bookProperty === 'string') {
        return allBooks.filter(function (b) { return b.author === bookProperty; })
            .map(function (b) { return b.title; });
    }
    return allBooks.filter(function (b) { return b.available === bookProperty; })
        .map(function (b) { return b.title; });
}
function printBook(book) {
    console.log(book.title + " by " + book.author);
}
// ************************
var myBook = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    available: true,
    category: enums_1.category.fiction,
    year: '1813',
    copies: 3
};
printBook(myBook);
var myBook2 = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    available: true,
    category: enums_1.category.fiction,
    markDamaged: function (reason) { return console.log("Damaged: " + reason); }
};
printBook(myBook2);
myBook2.markDamaged('missing back cover');
//# sourceMappingURL=app.js.map