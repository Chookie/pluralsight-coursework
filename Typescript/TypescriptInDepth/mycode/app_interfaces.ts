'use strict';

import { category } from './enums';
import { Book } from './interfaces';

function getAllBooks(): Book[] {
    let books = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: category.fiction },
        { id: 2, title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: category.fiction },
        { id: 3, title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', available: true, category: category.poetry },
        { id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: category.fiction }
    ];

    return books;
}

function logFirstAvailable(books = getAllBooks()) : void {
    let numberOfBooks: number = books.length;
    let firstAvailable: string = '';

    for (let currentBook of books) {

        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`First available: ${firstAvailable}`);
}

function getBookTitlesByCategory(categoryFilter: category = category.fiction): Array<string> {
    console.log(`Getting books in category: ${category[categoryFilter]}`);

    const allBooks = getAllBooks(); 
    const filteredBooks: string[] = allBooks
        .filter(b => b.category === categoryFilter)
        .map(b => b.title);

    return filteredBooks;
}

function logBookTitles(titles: string[]) {
    titles
}

function getBookById(id: number): Book {
    const allBooks = getAllBooks();
    return allBooks.filter(b => b.id === id)[0];
}

function createCustomerId(name: string, id: number): string {
    return name + id;
}

function createCustomer(name: string, age?: number, city?: string) {
    console.log(`Creating customer ${name}`);
    if (age) {
        console.log(`Age ${age}`);
    }
    if (city) {
        console.log(`City ${city}`);
    }
}

function checkOutBooks(customer: string, ...bookIds: number[]): string[] {
    console.log(`Checking out books for ${customer}`);

    return bookIds.map(getBookById)
            .filter(b => b.available)
            .map(b => b.title);    
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(bookProperty: any): string[] {
    const allBooks = getAllBooks();
    if (typeof bookProperty === 'string') {
        return allBooks.filter(b => b.author === bookProperty)
            .map(b => b.title);
    }
    return allBooks.filter(b => b.available === bookProperty)
            .map(b => b.title);
}

function printBook(book: Book) {
    console.log(`${book.title} by ${book.author}`);
}


// ************************

let myBook = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    available: true,
    category: category.fiction,
    year: '1813',
    copies: 3
};

printBook(myBook);

let myBook2: Book = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    available: true,
    category: category.fiction,
    markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
}

printBook(myBook2);
myBook2.markDamaged('missing back cover');