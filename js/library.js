
let library = [];

class Book {
    constructor(title, author, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
        this.id = "book-" + create_UUID();
    }
}

function addBookToLibrary(book) {
    library.push(book);

    renderLibrary(library);
}

function removeBookFromLibrary(book) {
    let index = library.indexOf(book);
    if (index > -1) {
        library.splice(index, 1);
    }

    renderLibrary(library);
}

function toggleRead(event) {
    const { checkboxId } = event.target.dataset;
    let targetBook = library.find(book => book.id === checkboxId);

    targetBook.read = !targetBook.read;
}

function renderBook (book) {
    let bookCard = document.createElement('div');
    const { title, author, pages, read, id } = book;

    bookCard.className = 'book-card';
    bookCard.innerHTML = `
        <div class="book-title">${title}</div>
        <div class="book-author">By ${author}</div>
        <div class="book-pages">${pages} pages</div>
        <div class="switch-wrapper">
            I Have Read This Book:
            <label class="switch">
                <input type="checkbox" ${read ? "checked" : ""} data-checkbox-id="${id}" onclick="toggleRead(event)">
                <span class="slider round"></span>
            </label>
        </div>
        <button onclick="handleRemoveButton(event)" data-remove-id="${id}">Remove Book</button>
    `;
    
    return bookCard;
}

function renderLibrary(library) {
    let libraryGrid = document.getElementById('library-grid');

    libraryGrid.innerHTML = '';

    library.forEach((book) => {
        libraryGrid.appendChild(renderBook(book));
    });
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
    let form = document.getElementById('new-book-form');

    form.addEventListener("submit", function(event) {
        document.getElementById('modal-book').style.display = "none"

        const { title, author, pages, read } = form.elements;
        let newBook = new Book(title.value, author.value, pages.value, read.value);

        addBookToLibrary(newBook);

        form.reset();
        event.preventDefault();
    });
}

function handleRemoveButton(event) {
    const { removeId } = event.target.dataset;
    let targetBook = library.find(book => book.id === removeId);

    removeBookFromLibrary(targetBook);
}

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

renderLibrary(library);
handleNewBookForm();
renderBookModal();