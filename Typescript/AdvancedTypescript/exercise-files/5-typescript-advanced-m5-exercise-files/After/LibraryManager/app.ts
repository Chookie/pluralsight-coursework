import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { PublicLibrarian, UniversityLibrarian, ReferenceItem, Employee, Researcher } from './classes';
import * as util from './lib/utilityFunctions';

//**********************************************************
// Callbacks demo

// interface LibMgrCallback {
// 	(err: Error, titles: string[]): void;
// }

// function getBooksByCategory(cat: Category, callback: LibMgrCallback): void {

// 	setTimeout(() => {
// 		try {
// 			let foundBooks: string[] = util.GetBookTitlesByCategory(cat);

// 			if(foundBooks.length > 0) {
// 				callback(null, foundBooks);
// 			}
// 			else {
// 				throw new Error('No books found.');
// 			}			
// 		} catch (error) {
// 			callback(error, null);
// 		}
// 	}, 2000);
// }

// function logCategorySearch(err: Error, titles: string[]): void {
// 	if(err) {
// 		console.log(`Error message: ${err.message}`);
// 	}
// 	else {
// 		console.log(`Found the following titles:`);
// 		console.log(titles);
// 	}	
// }

//**********************************************************
// Promises demo

// console.log('Beginning search...');
// getBooksByCategory(Category.Biography, logCategorySearch);
// console.log('Search submitted...');


// function getBooksByCategory(cat: Category): Promise<string[]> {

// 	let p: Promise<string[]> = new Promise((resolve, reject) => {

// 		setTimeout(() => {
// 			let foundBooks: string[] = util.GetBookTitlesByCategory(cat);

// 			if(foundBooks.length > 0) {
// 				resolve(foundBooks);
// 			}
// 			else {
// 				reject('No books found for that category.');
// 			}
// 		}, 2000);
// 	});
// 	return p;
// }

// console.log('Beginning search...');
// getBooksByCategory(Category.Fiction)
// 	.then(titles => {
// 		console.log(`Found titles: ${titles}`);
// 		throw 'something bad happened';
// 		return titles.length;
// 	}, reason => { return 0; })
// 	.then(numOfBooks => console.log(`Number of books found: ${numOfBooks}`))
// 	.catch(reason => console.log(`Error: ${reason}`));
// console.log('Search submitted...');

//**********************************************************
// async/await demo

function getBooksByCategory(cat: Category): Promise<string[]> {

	let p: Promise<string[]> = new Promise((resolve, reject) => {

		setTimeout(() => {
			let foundBooks: string[] = util.GetBookTitlesByCategory(cat);

			if(foundBooks.length > 0) {
				resolve(foundBooks);
			}
			else {
				reject('No books found for that category.');
			}
		}, 2000);
	});
	return p;
}

async function logSearchResults(bookCategory: Category) {
	let foundBooks = await getBooksByCategory(bookCategory);
	console.log(foundBooks);
}

console.log('Beginning search...');
logSearchResults(Category.Biography)
	.catch(reason => console.log(reason));
console.log('Search submitted...');