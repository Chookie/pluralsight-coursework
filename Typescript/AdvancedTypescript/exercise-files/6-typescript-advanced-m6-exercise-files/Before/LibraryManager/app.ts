import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { PublicLibrarian, UniversityLibrarian, ReferenceItem, Employee, Researcher } from './classes';
import * as util from './lib/utilityFunctions';

// demo code from "Implementing Asynchronous Patters" module
//show how to use async/await
function getBooksByCategory(cat: Category): Promise<string[]> {

	let p: Promise<string[]> = new Promise((resolve, reject) => {

		setTimeout(() => {
			let foundBooks: string[] = util.GetBookTitlesByCategory(cat)

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