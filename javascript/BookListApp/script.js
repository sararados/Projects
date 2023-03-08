// BOOK Class: REPRESENTS A BOOK
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class: Handle Tasks
class UI {
    static displayBooks() {
       
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");

        const row = document.createElement("tr");
        
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>`;

        list.appendChild(row);
    }
    static deleteBook (element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove(); // gets the parentElement of td and that is tr 
        }
    }
    //<div class = 'alert alert-success'>Whatever the messag is </div>
    static showAlert (message, className) { //Using className to change tne color when we added something or failed
        const div= document.createElement('div');
        div.className = `alert alert-${className}`;

        div.appendChild(document.createTextNode (message));
        
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);   // adds a js element between two html elements
        //vanish in 5 seconds
        setTimeout(()=> document.querySelector('.alert').remove(), 5000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
// Store Class: Handle storage
class Store {
    static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        try {
            books = JSON.parse(localStorage.getItem('books'));
        } catch(e) {
            console.log('Error parsing books from local storage', e);
            books = [];
        }
    }
    return Array.isArray(books) ? books : [];
}

    static addBooks(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1); // delete one book
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Events: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks); // DOMcontentLoaded event fires when the HTML has been completely parsed and all defered scripts had been downloaded and executed.It doesnt wait for img, subframes.

// Events: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();
    // get the values frpm the form inputs
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn =document.querySelector('#isbn').value;

    //Validation
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in the fields', 'danger');
    } else {

 

const book = new Book(title, author, isbn); //creates a object by calling the constructor
    
    // success message
    UI.showAlert('Book Added', 'success');
    //console.log(book);

    //Add book to UI
    UI.addBookToList(book);
    // Clear field after pressing submit
    // Add Book to Store
    Store.addBooks(book);

    UI.clearFields();
       }
});

// Events: Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    
    UI.deleteBook(e.target);

Store.removeBook(e.target.parentElement.previousElementSibling.textContent
        );
    UI.showAlert('Book Removed', 'success');
})

