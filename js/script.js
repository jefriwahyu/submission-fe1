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
