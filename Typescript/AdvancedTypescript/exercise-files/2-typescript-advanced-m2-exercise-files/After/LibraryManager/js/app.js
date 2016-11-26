"use strict";
var enums_1 = require('./enums');
var classes_1 = require('./classes');
var util = require('./lib/utilityFunctions');
function PrintBookInfo(_a) {
    var booktitle = _a.title, bookauthor = _a.author;
    console.log(booktitle + " was authored by " + bookauthor);
}
var _a = util.GetAllBooks(), book1 = _a[0], book2 = _a[1];
function LogFavoriteBooks(_a) {
    var book1 = _a[0], book2 = _a[1], others = _a.slice(2);
    PrintBookInfo(book1);
    PrintBookInfo(book2);
    console.log(others);
}
// LogFavoriteBooks(util.GetAllBooks());
// let { title: booktitle, author: bookauthor } = book1;
// console.log(booktitle);
// console.log(bookauthor);
// PrintBookInfo(book1);
var schoolBooks = [
    { id: 10, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true, category: enums_1.Category.Fiction },
    { id: 11, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', available: true, category: enums_1.Category.Fiction },
    { id: 12, title: 'Clear Light of Day', author: 'Anita Desai', available: true, category: enums_1.Category.Fiction }
];
var booksRead = util.GetAllBooks();
booksRead.push.apply(booksRead, schoolBooks);
// console.log(booksRead);
var poets = ['Shelley', 'Collins', 'Hughes'];
var authors = ['Tolstoy', 'Fitzgerald'].concat(poets);
var catalogLocation = ['A 123.456', book1];
catalogLocation[2] = 'some string';
var allBooks = util.GetAllBooks();
var allMagazines = util.GetAllMagazines();
var readingMaterial = allBooks[0];
function PrintTitle(item) {
    console.log(item.title);
}
// PrintTitle(allBooks[0]);
// PrintTitle(allMagazines[0]);
var serialNovel = {
    id: 100,
    title: 'The Gradual Tale',
    author: 'Occasional Pen',
    available: true,
    category: enums_1.Category.Fiction,
    publisher: 'Serial Press'
};
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
applyMixins(classes_1.UniversityLibrarian, [classes_1.Employee, classes_1.Researcher]);
var newLibrarian = new classes_1.UniversityLibrarian();
function GetMagazineByFrequency(preferredFrequency) {
    // do something here
}
//# sourceMappingURL=app.js.map