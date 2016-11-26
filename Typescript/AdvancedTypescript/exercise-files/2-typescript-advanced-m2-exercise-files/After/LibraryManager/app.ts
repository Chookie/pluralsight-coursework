import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, ReferenceItem, Employee, Researcher } from './classes';
import * as util from './lib/utilityFunctions';

function PrintBookInfo({title: booktitle, author: bookauthor}: Book): void {
    console.log(`${booktitle} was authored by ${bookauthor}`);
}

let [book1, book2] = util.GetAllBooks();

function LogFavoriteBooks([book1, book2, ...others]: Book[]) {
    PrintBookInfo(book1);
    PrintBookInfo(book2);
    console.log(others);
}

// LogFavoriteBooks(util.GetAllBooks());

// let { title: booktitle, author: bookauthor } = book1;
// console.log(booktitle);
// console.log(bookauthor);

// PrintBookInfo(book1);

let schoolBooks: Book[] = [
    { id: 10, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true, category: Category.Fiction },
    { id: 11, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', available: true, category: Category.Fiction },
    { id: 12, title: 'Clear Light of Day', author: 'Anita Desai', available: true, category: Category.Fiction }
];

let booksRead: Book[] = util.GetAllBooks();
booksRead.push(...schoolBooks);
// console.log(booksRead);

let poets: string[] = ['Shelley', 'Collins', 'Hughes'];
let authors: string[] = ['Tolstoy', 'Fitzgerald', ...poets];
// console.log(authors);

// let catalogLocation: [string, Book] = ['A 123.456', book1];
// catalogLocation[2] = 'some string';

interface KeyValuePair<K, V> extends Array<K | V> {
    0: K;
    1: V;
}

let catalogLocation: KeyValuePair<string, Book> = ['A 123.456', book1];
catalogLocation[2] = 'some string';


let allBooks: Book[] = util.GetAllBooks();
let allMagazines: Magazine[] = util.GetAllMagazines();

let readingMaterial: PrintMaterial = allBooks[0];

function PrintTitle(item: PrintMaterial): void {
    console.log(item.title);
}

// PrintTitle(allBooks[0]);
// PrintTitle(allMagazines[0]);

let serialNovel: Serial = {
    id: 100,
    title: 'The Gradual Tale',
    author: 'Occasional Pen',
    available: true,
    category: Category.Fiction,
    publisher: 'Serial Press'
};

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

applyMixins(UniversityLibrarian, [Employee, Researcher]);

let newLibrarian = new UniversityLibrarian();
// newLibrarian.doResearch('Economics');


//let frequency: 'monthly' | 'annually' = 'annually';

type Frequency = 'monthly' | 'annually';

function GetMagazineByFrequency(preferredFrequency: Frequency) {
    // do something here
}

type PrintMaterial = Book | Magazine;
type Serial = Book & Magazine;