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
  if (myLibrary.length > 30) return
  else {
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

  let id = myLibrary.length
  const title = inputTitle.value
  const author = inputAuthor.value
  const pages = inputPages.value
  let read = ''

  if (inputRead.checked == false) {
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
  const templateCard = document.querySelector('#templateCard')

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
  trackAddTotals()

  const deleteCardBtns = document.querySelectorAll(
    `#libraryContainer div[data-delete="${id}"] button`
  )
  deleteCardBtns.forEach(button =>
    button.addEventListener('click', event => {
      if (event.target == button) {
        let deleteId = button.parentElement.getAttribute('data-delete')

        console.log(deleteId)

        myLibrary.splice(deleteId, 1)

        const cardDeleted = document.querySelector(
          `[data-delete="${deleteId}"]`
        )
        cardDeleted.remove()

        console.log(myLibrary)

        totalRead.textContent = 0
        totalNotRead.textContent = 0

        trackAddTotals()
      }
      const cards = document.querySelectorAll('#libraryContainer div')
        let counter = 0
        cards.forEach(card => {
          card.setAttribute('data-delete', `${counter}`)
          counter += 1
        })

      for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].id = i
      }
    })
  )
}

function checkLibrary() {
  if (myLibrary == []) return
  else {
    myLibrary.forEach(book => {
      const id = book.id
      createCard(id)
    })
  }
}

const totalBooks = document.querySelector('#totalBooks')
const totalRead = document.querySelector('#totalRead')
const totalNotRead = document.querySelector('#totalNotRead')

function trackAddTotals() {
  totalBooks.textContent = myLibrary.length

  let numberRead = 0
  let numberNotRead = 0

  myLibrary.forEach(book => {
    if (book.read == true) {
      numberRead += 1
      totalRead.textContent = numberRead
    } else {
      numberNotRead += 1
      totalNotRead.textContent = numberNotRead
    }
  })
}

// if the queryselector works we can use the data-delete to delete the in the library. when the delete button is pressed
// we select the div that was pressed
