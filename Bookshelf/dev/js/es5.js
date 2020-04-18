// init vars
const submitBtn = document.querySelector('#submitBtn');
const UITitle = document.querySelector('#title');
const UIAuthor = document.querySelector('#author');
const UIIsbn = document.querySelector('#isbn');
const UXBookList = document.querySelector('#book-list');
// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI consntructor
function UI() {}

// LS constructor
function Store() {}
Store.prototype.getBooks = function () {

	let books;
	if (localStorage.getItem('books') === null) {
		books = [];
	} else {
		books = JSON.parse(localStorage.getItem('books'));
	}
	return books;

}
Store.prototype.addBook = function (book) {

	const books = Store.prototype.getBooks();
	books.push(book);

	localStorage.setItem('books', JSON.stringify(books));
}
Store.prototype.displayBooks = function () {

	const books = Store.prototype.getBooks();

	books.forEach(book => {
		const ui = new UI();
		ui.addBookList(book);
	});

}
Store.prototype.removeBook = function (isbn) {

	const books = Store.prototype.getBooks();

	books.forEach((book, ind) => {
		if (book.isbn === isbn) {
			books.splice(ind, 1)
		}
	});
	localStorage.setItem('books', JSON.stringify(books));


}


// add book proto
UI.prototype.addBookList = function (book) {

	// create tr
	const row = document.createElement('tr');
	// insert cols
	row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href='#' class='delete'>x</td>`
	// append list
	UXBookList.appendChild(row);
}

// ui clear fields
UI.prototype.clearFields = function () {
	UITitle.value = '';
	UIAuthor.value = '';
	UIIsbn.value = '';
}

// UI show alert
UI.prototype.showAlert = function (msg, className) {
	//create div
	const div = document.createElement('div');
	// add class
	div.className = `alert ${className}`;
	// add text
	div.appendChild(document.createTextNode(msg));
	// get h1
	const h1 = document.querySelector('h1');
	// append
	h1.appendChild(div);
	// clear after 2 sec
	setTimeout(function () {
		document.querySelector('.alert').remove();
	}, 2000);
}

// UI delete book
UI.prototype.deleteBook = function (target) {
	if (target.parentElement.firstElementChild) {
		target.parentElement.parentElement.remove()
	}
}

// Dom load event
document.addEventListener('DOMContentLoaded', Store.prototype.displayBooks);

// Event add book
submitBtn.addEventListener('click', function (e) {

	// get values
	const title = UITitle.value;
	const author = UIAuthor.value;
	const isbn = UIIsbn.value;

	// init book
	const book = new Book(title, author, isbn);

	// init Ui
	const ui = new UI();

	const store = new Store();
	// validate
	if (title === '' || author === '' || isbn === '') {
		//error alert
		ui.showAlert('Please, fill in all fields', 'error');
	} else {

		// add book to list
		ui.addBookList(book);
		// LS add
		store.addBook(book);
		ui.showAlert('Book Added!', 'success');
		// clear fields
		ui.clearFields();
	}
	e.preventDefault();
})

// event delete book
UXBookList.addEventListener('click', function (e) {
	// init Ui
	const ui = new UI();

	ui.deleteBook(e.target);
	//remove LS
	Store.prototype.removeBook(e.target.parentElement.previousElementSibling.textContent);
	ui.showAlert('Book  removed!', 'success');

	e.preventDefault();
});