let myLibrary = []

function Book(id, title, author, pages, read) {
  (this.id = id),
  (this.title = title),
  (this.author = author),
  (this.pages = pages),
  (this.read = read)
}

function addBookToLibrary(id, title, author, pages, read) {
  const newBook = new Book(id, title, author, pages, read)
  myLibrary.push(newBook)
  createCard(id)
}

const addBook = document.querySelector('#newBookButton')
addBook.addEventListener('click', takeInput)

function takeInput() {
  const title = prompt('What is the title of the book?', '')
  const author = prompt('Who is the author of the book?', '')
  const pages = prompt('How many pages does the book have?', '')
  const id = myLibrary.length
  addBookToLibrary(id, title, author, pages, true)
}

function createCard(id) {
  const libContainer = document.querySelector('#libraryContainer')
  const templateCard = document.querySelector('#libraryContainer div')

  let newCard = document.createElement('div')
  newCard.innerHTML = templateCard.innerHTML

  const title = newCard.querySelector('header')
  const author = newCard.querySelector('#author')
  const pages = newCard.querySelector('#pages')
  title.textContent = myLibrary[id].title
  author.textContent = `Author: ${myLibrary[id].author}`
  pages.textContent = `${myLibrary[id].pages} pages`

  libContainer.appendChild(newCard)

}

console.log(myLibrary)

// change the Hobbit div so that it is hidden and not accessible but we can still copy it for the new divs.