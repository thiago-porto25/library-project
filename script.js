let myLibrary = []


function Book(id, title, author, pages, read) {
  (this.id = id),
  (this.title = title),
  (this.author = author),
  (this.pages = pages),
  (this.read = read)
}


const addBook = document.querySelector('#newBookButton')
addBook.addEventListener('click', openModal)


function openModal() {
  const modal = document.querySelector('#myModal')
  const closeBtn = document.querySelector('.close')
  const submitBtn = document.querySelector('#submitBtn')

  modal.style.display = 'block'

  closeBtn.addEventListener('click', closeModal)
  window.addEventListener('click', (event) => {
    if(event.target == modal) {
      modal.style.display = 'none'
    }
  })

  submitBtn.addEventListener('click', closeModal)
  submitBtn.addEventListener('click', takeInput)
}


function closeModal() {
  const modal = document.querySelector('#myModal')
  modal.style.display = 'none'
}


function takeInput() {
  const inputTitle = document.querySelector('#inputTitle')
  const inputAuthor =  document.querySelector('#inputAuthor')
  const inputPages =  document.querySelector('#inputPages')
  const inputRead =  document.querySelector('#inputReadYes')

  const id = myLibrary.length
  const title = inputTitle.value
  const author = inputAuthor.value
  const pages = inputPages.value
  let read = ''

  if(document.querySelector('#inputReadYes') == false) {
    read = false
  } else {
    read = true
  }

  addBookToLibrary(id, title, author, pages, read)
  
  inputTitle.value = ''
  inputAuthor.value = ''
  inputPages.value = ''
  inputRead.checked = false
}


function addBookToLibrary(id, title, author, pages, read) {
  const newBook = new Book(id, title, author, pages, read)
  myLibrary.push(newBook)
  createCard(id)
}


function createCard(id) {
  const libContainer = document.querySelector('#libraryContainer')
  const templateCard = document.querySelector('#libraryContainer #templateCard')

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


// change the Hobbit div so that it is hidden and not accessible but we can still copy it for the new divs.