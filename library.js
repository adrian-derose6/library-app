
class Book {
    constructor(title, author, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }

    generateHash = () => {

    }

    renderBook = () => {
        let bookCard = document.createElement('div');
    
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <div class="book-title">${this.title}</div>
                <div class="book-author">By ${this.author}</div>
                <div class="book-pages">${this.pages} pages</div>
                <div class="switch-wrapper">
                    I Have Read This Book:
                    <label class="switch">
                        <input type="checkbox" ${this.read ? "checked" : ""}>
                        <span class="slider round"></span>
                    </label>
                </div>
                <button>Remove Book</button>
            `;
        
        return bookCard;
    }
}

class Library {
    constructor() {
        this.state = [
            new Book('TKAMB', 'Harper Lee', 281, false), 
            new Book('1984', 'George Orwell', 328, false),
            new Book('The Catcher in the Rye', 'J. D. Salinger', 234, false),
            new Book('The Great Gatsby', 'F. Scott Fitzgerald', 218, false)
        ];
    }

    addBookToLibrary = (book) => {
        this.state = [...this.state, book];
    }

    removeBookFromLibrary = (book) => {
        
    }

    renderBooks = () => {
        let libraryGrid = document.getElementById('library-grid');

        libraryGrid.innerHTML = '';

        this.state.forEach((book) => {
            console.log(book)
            libraryGrid.appendChild(book.renderBook());
        });
    }
}

function renderBookModal() {
    let modal = document.getElementById('modal-book');
    let modalButton = document.getElementById('new-book-button');

    modalButton.onclick = () => modal.style.display = "block";

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function handleNewBookForm() {
    var form = document.getElementById('new-book-form');

    form.addEventListener("submit", function(event) {
        document.getElementById('modal-book').style.display = "none"

        let title = form.elements.title.value;
        let author = form.elements.author.value;
        let pages = form.elements.pages.value
        let read = form.elements.read.value;
        let newBook = new Book(title, author, pages, read);

        library.addBookToLibrary(newBook);
        library.renderBooks();

        form.reset();
        event.preventDefault();
    });
}

let library = new Library();

library.renderBooks();

handleNewBookForm();
renderBookModal();