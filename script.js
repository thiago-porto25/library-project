let myLibrary = []

function Book(id, title, author, pages, read) {
  ;(this.id = id),
    (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read)
}

const toggleReadStatus = function() {
  this.read = !this.read
}

Book.prototype.toggleReadStatus = toggleReadStatus

const addBook = document.querySelector('#newBookButton')
addBook.addEventListener('click', openModal)

function openModal() {
  if (myLibrary.length > 30) return
  else {
    const modal = document.querySelector('#myModal')
    const closeBtn = document.querySelector('.close')
    const submitBtn = document.querySelector('#submitBtn')
    const inputTitle = document.querySelector('#inputTitle')
    const inputAuthor = document.querySelector('#inputAuthor')
    const inputPages = document.querySelector('#inputPages')
    const inputRead = document.querySelector('#inputReadYes')

    inputTitle.value = ""
    inputAuthor.value = ""
    inputPages.value = ""
    inputRead.value = ""

    modal.style.display = 'block'

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none'
    })

    window.addEventListener('click', event => {
      if (event.target == modal) {
        modal.style.display = 'none'
      }
    })
    submitBtn.addEventListener('click', validateInput)
  }
}

function validateInput() {
  const inputTitle = document.querySelector('#inputTitle')
  const inputAuthor = document.querySelector('#inputAuthor')
  const inputPages = document.querySelector('#inputPages')

  switch (inputTitle.value) {
    case "":
      inputTitle.setAttribute('class', 'invalid')
      inputTitle.setAttribute('placeholder', 'Please, fill the form')
      break
    default: 
      inputTitle.setAttribute('class', '')
      inputTitle.setAttribute('placeholder', 'What is the Title?')
  }

  switch (inputAuthor.value) {
    case "":
      inputAuthor.setAttribute('class', 'invalid')
      inputAuthor.setAttribute('placeholder', 'Please, fill the form')
      break
    default: 
      inputAuthor.setAttribute('class', '')
      inputAuthor.setAttribute('placeholder', 'Who is the Author?')
  }

  switch (inputPages.value) {
    case "":
      inputPages.setAttribute('class', 'invalid')
      inputPages.setAttribute('placeholder', 'Please, fill the form')
      break
    default: 
      inputPages.setAttribute('class', '')
      inputPages.setAttribute('placeholder', 'How many pages?')
  }

  if (inputTitle.value == "" ||
    inputAuthor.value == "" ||
    inputPages.value == "") {
      return
    } else {
      getInput()
      closeModal()
    }
}

function closeModal() {
  const modal = document.querySelector('#myModal')
  modal.style.display = 'none'
}

function getInput() {
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

  if (myLibrary[id].read == false) {
    xButton = newCard.querySelector('button')
    newCard.setAttribute('class', 'notRead')
    xButton.setAttribute('class', 'notRead')
  }

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

        myLibrary.splice(deleteId, 1)

        const cardDeleted = document.querySelector(
          `[data-delete="${deleteId}"]`
        )
        cardDeleted.remove()

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

