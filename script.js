let myLibrary = []

function Book(title, author, pages, read) {
  (this.title = title),
  (this.author = author),
  (this.pages = pages),
  (this.read = read),
  (this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${read}`
  })
}

function takeInput() {
title = prompt('What is the title of the book?', '')
author = prompt('Who is the author of the book?', '')
pages = prompt('How many pages does the book have?', '')

}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
}

const addBook = document.querySelector('#newBookButton') 
addBook.addEventListener('click', takeInput)
