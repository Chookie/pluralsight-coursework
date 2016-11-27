'use strict';
function getAllBooks() {
    var books = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: category.fiction },
        { id: 2, title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: category.fiction },
        { id: 3, title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', available: true, category: category.poetry },
        { id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: category.fiction }
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
var category;
(function (category) {
    category[category["biography"] = 0] = "biography";
    category[category["poetry"] = 1] = "poetry";
    category[category["fiction"] = 2] = "fiction";
    category[category["history"] = 3] = "history";
    category[category["children"] = 4] = "children";
})(category || (category = {}));
;
function getBookTitlesByCategory(categoryFilter) {
    if (categoryFilter === void 0) { categoryFilter = category.fiction; }
    console.log("Getting books in category: " + category[categoryFilter]);
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
//***********************************************
var hermansBooks = getTitles('Herman Melville');
hermansBooks.forEach(function (t) { return console.log(t); });
var checkedOutBooks = getTitles(false);
checkedOutBooks.forEach(function (t) { return console.log(t); });
// let myBooks: string[] = checkOutBooks('Alison', 1, 2, 3);
// myBooks.forEach(t => console.log(t));
// logFirstAvailable();
// let poetryBooks = getBookTitlesByCategory();
// poetryBooks.forEach(b => console.log(b));
// createCustomer('Alison', 42, 'London');
// let x: number;
// x = 5;
// let idGenerator: (chars: string, nums: number) => string;
// idGenerator = createCustomerId;
// // Inline function
// idGenerator = (name: string, id: number) => {return id + name};
// let myID: string = idGenerator('alison', x);
// console.log(myID);
// const fictionBooks = getBookTitlesByCategory(category.fiction);
// fictionBooks.forEach( (v, i, a) => console.log(`${++i} - ${v}`)); 
//# sourceMappingURL=app.js.map