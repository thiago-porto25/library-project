let myLibrary = []

function Book(id, title, author, pages, read) {
  ;(this.id = id),
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
  window.addEventListener('click', event => {
    if (event.target == modal) {
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
  const inputAuthor = document.querySelector('#inputAuthor')
  const inputPages = document.querySelector('#inputPages')
  const inputRead = document.querySelector('#inputReadYes')

  const id = myLibrary.length // find a new way
  const title = inputTitle.value
  const author = inputAuthor.value
  const pages = inputPages.value
  let read = ''

  if (document.querySelector('#inputReadYes') == false) {
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
  console.log(myLibrary)
  createCard(id)
}

function createCard(id) {
  const libContainer = document.querySelector('#libraryContainer')
  const templateCard = document.querySelector('#libraryContainer #templateCard')

  let newCard = document.createElement('div')
  newCard.innerHTML = templateCard.innerHTML
  newCard.setAttribute('data-delete', `${id}`)

  const title = newCard.querySelector('header')
  const author = newCard.querySelector('#author')
  const pages = newCard.querySelector('#pages')
  title.textContent = myLibrary[id].title
  author.textContent = `Author: ${myLibrary[id].author}`
  pages.textContent = `${myLibrary[id].pages} pages`

  libContainer.appendChild(newCard)

  const deleteCardBtns = document.querySelectorAll(`#libraryContainer div[data-delete="${id}"] button`)
  deleteCardBtns.forEach(button => button.addEventListener('click', (event) => {
    if(event.target == button){
      deleteId = id
      console.log(deleteId)
      myLibrary.splice(deleteId, 1)
      const cardDeleted = document.querySelector(`[data-delete="${deleteId}"]`)
      cardDeleted.remove()
      console.log(myLibrary)
      if(myLibrary.length == 1) myLibrary = []
    }
  }))
}

// if the queryselector works we can use the data-delete to delete the in the library. when the delete button is pressed
// we select the div that was pressed
