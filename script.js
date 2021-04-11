let myLibrary = []

function Book(title, author, pages, read) {
  (this.title = title),
  (this.author = author),
  (this.pages = pages),
  (this.read = read)
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
}

function takeInput() {
title = prompt('What is the title of the book?', '')
author = prompt('Who is the author of the book?', '')
pages = prompt('How many pages does the book have?', '')

}


const addBook = document.querySelector('#newBookButton') 
addBook.addEventListener('click', takeInput)
