let myLibrary = []

function Book(id, title, author, pages, read) {
  ;(this.id = id),
    (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read)
}

const addBook = document.querySelector('#newBookButton')
const clearAllBooks = document.querySelector('#clearAllBooks')

function openModal() {
  if (myLibrary.length > 25) return
  else {
    const modal = document.querySelector('#myModal')
    const closeBtn = document.querySelector('.close')
    const submitBtn = document.querySelector('#submitBtn')
    const inputTitle = document.querySelector('#inputTitle')
    const inputAuthor = document.querySelector('#inputAuthor')
    const inputPages = document.querySelector('#inputPages')
    const inputRead = document.querySelector('#inputReadYes')

    modal.style.display = 'block'

    closeBtn.addEventListener('click', () => {
      inputTitle.setAttribute('placeholder', 'What is the Title?')
      inputTitle.setAttribute('class', '')
      inputAuthor.setAttribute('placeholder', 'Who is the Author?')
      inputAuthor.setAttribute('class', '')
      inputPages.setAttribute('placeholder', 'How many Pages?')
      inputPages.setAttribute('class', '')
      inputRead.checked = false
      modal.style.display = 'none'
    })

    window.addEventListener('click', event => {
      if (event.target == modal) {
        inputTitle.setAttribute('placeholder', 'What is the Title?')
        inputTitle.setAttribute('class', '')
        inputAuthor.setAttribute('placeholder', 'Who is the Author?')
        inputAuthor.setAttribute('class', '')
        inputPages.setAttribute('placeholder', 'How many Pages?')
        inputPages.setAttribute('class', '')
        inputRead.checked = false
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
    case '':
      inputTitle.setAttribute('class', 'invalid')
      inputTitle.setAttribute('placeholder', 'Please, fill the form')
      break
    default:
      inputTitle.setAttribute('class', '')
      inputTitle.setAttribute('placeholder', 'What is the Title?')
  }

  switch (inputAuthor.value) {
    case '':
      inputAuthor.setAttribute('class', 'invalid')
      inputAuthor.setAttribute('placeholder', 'Please, fill the form')
      break
    default:
      inputAuthor.setAttribute('class', '')
      inputAuthor.setAttribute('placeholder', 'Who is the Author?')
  }

  switch (inputPages.value) {
    case '':
      inputPages.setAttribute('class', 'invalid')
      inputPages.setAttribute('placeholder', 'Please, fill the form')
      break
    default:
      inputPages.setAttribute('class', '')
      inputPages.setAttribute('placeholder', 'How many pages?')
  }

  if (
    inputTitle.value == '' ||
    inputAuthor.value == '' ||
    inputPages.value == ''
  ) {
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

  const readCheckbox = newCard.querySelector('.checkbox')
  const xButton = newCard.querySelector('button')

  if (myLibrary[id].read == false) {
    newCard.setAttribute('class', 'notRead')
    xButton.setAttribute('class', 'notRead')
    readCheckbox.checked = false
  } else {
    readCheckbox.checked = true
  }

  const title = newCard.querySelector('header')
  const author = newCard.querySelector('#author')
  const pages = newCard.querySelector('#pages')
  title.textContent = myLibrary[id].title
  author.textContent = `Author: ${myLibrary[id].author}`
  pages.textContent = `${myLibrary[id].pages} pages`

  libContainer.appendChild(newCard)

  trackAddTotals()

  const allToggles = document.querySelectorAll('#libraryContainer div label')

  allToggles.forEach(toggle =>
    toggle.addEventListener('click', () => {
      const checkBox = toggle.querySelector('.checkbox')
      const card = toggle.parentElement.parentElement
      const close = card.querySelector('button')
      const id = card.getAttribute('data-delete')

      if (checkBox.checked == true) {
        card.setAttribute('class', 'notRead')
        close.setAttribute('class', 'notRead')
        myLibrary[id].read = false
        checkBox.checked = false
        trackAddTotals()
        return
      } else {
        card.setAttribute('class', '')
        close.setAttribute('class', '')
        myLibrary[id].read = true
        checkBox.checked = true
        trackAddTotals()
        return
      }
    })
  )

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
  totalRead.textContent = 0
  totalNotRead.textContent = 0

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

clearAllBooks.addEventListener('click', clearAll)
addBook.addEventListener('click', openModal)

function clearAll() {
  myLibrary = []
  document.querySelector('#libraryContainer').innerHTML = ''
  totalBooks.textContent = '0'
  totalRead.textContent = '0'
  totalNotRead.textContent = '0'
}
