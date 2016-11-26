import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { CLASS_INFO, PublicLibrarian, UniversityLibrarian, ReferenceItem, Employee, Researcher } from './classes';
import * as util from './lib/utilityFunctions';
import './LibrarianExtension';

class LibraryBook {
	Checkout(): this {
        // do checkout stuff
        console.log('Checking out a book.');
        return this;
    }

    Checkin(): this {
        // do checkin stuff
        //console.log('Checking in a book.');
		if (this instanceof ChildrensBook) {
            console.log('Checking in a ChildrensBook.');
        }

        if (this instanceof ElectronicBook) {
            console.log('Checking in an ElectronicBook.');
        }        
        return this;
    }    
}

class ChildrensBook extends LibraryBook {
    Clean(): this {
        // clean the crayon marks
        console.log('Cleaning a book.');
        return this;
    }
}

class ElectronicBook extends LibraryBook {
    RemoveFromCustomerDevice(): this {
        console.log('Removing book from device.');
        return this;
    }
}

// let kidbook = new ChildrensBook();
// kidbook.Checkin()
//     .Clean()
//     .Checkout();

// let ebook = new ElectronicBook();
// ebook.Checkin()
//     .RemoveFromCustomerDevice()
//     .Checkout();

// let mergedBook: Book;
// mergedBook.publisher = 'Programming Press';

// let newLibrarian = new UniversityLibrarian();
// newLibrarian.phone = '555-6789';
// newLibrarian.hostSeminar('British Literature');

function logVisitor(param: number | string) {
    if (typeof param === 'number') {
        console.log(`${param} new visitors arrived.`);
    }
    else {
        console.log(`${param.toUpperCase()} visited.`);
    }
}

// logVisitor(5);
// logVisitor('Leigh Ann');

// let lib: Librarian = new PublicLibrarian();

// if (lib instanceof UniversityLibrarian) {
//     lib.assistFaculty();
// }
// if (lib instanceof PublicLibrarian) {
//     lib.teachCommunity();
// }

// function isBook(text: Book | Magazine): text is Book {
//     return (<Book>text).author !== undefined;
// }

// let readingMaterial: Book | Magazine = util.GetAllBooks()[0];

// if(isBook(readingMaterial)) {
//     console.log(`The book's author is ${readingMaterial.author}.`);
// }
// else {
//     console.log(`The magazine's publisher is ${readingMaterial.publisher}.`);
// }

let mySymbol = Symbol('first_symbol');
let anotherSymbol = Symbol('first_symbol');

// console.log(mySymbol === anotherSymbol);
// console.log(typeof mySymbol);

let myObject = {
    [mySymbol]: 'value for my symbol key'
}

// console.log(myObject[mySymbol]);

let librarian = new UniversityLibrarian();
// librarian[CLASS_INFO]();

let libraryCustomer = {
    name: 'Thorne',
    assistCustomer: (custName: string) => console.log(`Assisting ${custName}`)
}

if (libraryCustomer instanceof UniversityLibrarian) {
    console.log('A helpful librarian.');
}
else {
    console.log('Not a librarian.');
}