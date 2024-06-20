const books = [];
let isComplete = false;
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  })
})

function addBook() {
  const titleBook = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;

  const id = generatedID();
  const isComplete = isCompleted();
  const bookObject = generateBookObject(id, titleBook, author, year, isComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('filter-mobile-color-1');

  checkbox.addEventListener('change', function() {
    if (this.checked) {
      isComplete = true;
    } else {
      isComplete = false;
    }
  });
});

function isCompleted() {
  return isComplete;
}

function generatedID() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
})

function addBooks(bookObject) {
  const title = document.createElement('h2');
  title.classList.add('text-xl', 'font-bold', 'mb-2');
  title.innerText = bookObject.title;

  const author = document.createElement('p');
  author.classList.add('text-gray-700');
  author.innerText = bookObject.author;

  const year = document.createElement('p');
  author.classList.add('text-gray-700');
  year.innerText = bookObject.year;

  const container = document.createElement('div');
  container.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg');
  container.append(title, author, year);
  container.setAttribute('id', `book-${bookObject.id}`);

  return container;

}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById('not-finished');
  uncompletedBookList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = addBooks(bookItem);
    uncompletedBookList.append(bookElement);
  }
});
