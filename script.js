let myLibrary = [];

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBook(title, author, pages, read){
    let myBook = new Book(title, author, pages, read);
    return myBook
}

const jsDiv = document.querySelector("#jsDiv");
const form = document.querySelector('form');
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const btn = document.querySelector("#submitButton");
const error = document.createElement('div');
const main = document.querySelector('#mainDiv')

error.textContent = ''
error.id = 'errorDiv';
jsDiv.appendChild(error);

let haveRead = false;

read.addEventListener('click', function(){
    if(haveRead === false){
        haveRead = true;
    }
    else if(haveRead === true){
        haveRead = false;
    }
})


btn.addEventListener('click', consoleLog, false)

function isFilled(title, author, pages){
    if(title.value.length === 0 || author.value.length === 0 || pages.value.length === 0){
        return false;
    }
    else {
        return true;
    }
}


function createCard(book){
    const carta = document.createElement('div');
    carta.classList.add('card');
    const cardTitle = document.createElement('div');
    cardTitle.textContent = book.title;
    cardTitle.classList.add('Title');
    const cardAuthor = document.createElement('div');
    cardAuthor.textContent = 'Author: ' + book.author;
    cardAuthor.classList.add('Author');
    const cardPages = document.createElement('div');
    cardPages.textContent = book.pages + ' pages';
    cardPages.classList.add('Pages');
    const cardRead = document.createElement('div');
    if(book.read === false){
        cardRead.textContent = 'Not read';
    }
    else if(book.read === true){
        cardRead.textContent = 'Read';
    }
    cardRead.classList.add('Read');
    const readButton = document.createElement('button');
    readButton.classList.add('togleButton');
    readButton.textContent = "Togle Read";

    readButton.addEventListener('click', function() {
        if (cardRead.textContent === 'Read'){
            cardRead.textContent = 'Not read';
        }
        else {
            cardRead.textContent = 'Read';
        }
    })

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', function() {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        render(myLibrary);
    })

    carta.appendChild(cardTitle);
    carta.appendChild(cardAuthor);
    carta.appendChild(cardPages);
    carta.appendChild(cardRead);
    carta.appendChild(readButton);
    carta.appendChild(deleteButton);
    main.appendChild(carta);
}

function render(Library){
    main.textContent = "";
    for(let i = 0; i < Library.length; i ++){
        createCard(Library[i], i);
    }
    title.value = "";
    author.value = "";
    pages.value= "";
    read.checked = false;
    haveRead = false;
}

function consoleLog(event){
    error.textContent = "";
    if(isFilled(title, author, pages)){
        theBook = addBook(title.value, author.value, pages.value, haveRead);
        myLibrary.push(theBook);
        render(myLibrary);
    }
    else {
        error.textContent = "Please fill out all fields.";
    }
    event.preventDefault();
}
