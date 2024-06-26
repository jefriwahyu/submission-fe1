const books = [];
let isComplete = false;
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();

    document.getElementById('form').reset();
    alert('Successfully added the book..');
  });

})

//menambahkan buku
function addBook() {
  const titleBook = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = parseInt(document.getElementById('year').value);

  const id = generatedID();
  const isComplete = isCompleted();
  const bookObject = generateBookObject(id, titleBook, author, year, isComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

//memberikan nilai pada checkbox, jika tidak terceklis maka nilai nya ada false dan jika terceklis maka nilai nya true
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('filter-mobile-color-1');

  checkbox.addEventListener('change', function() {
    if (this.checked) {
      isComplete = true;
    } else {
      isComplete = false;
    }
  });

  if (isStorageExist()) {
    loadDatafromStorage();
  }

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

//dom menampilkan buku yang ditambahkan
function addBooks(bookObject) {
  const title = document.createElement('h2');
  title.classList.add('text-xl', 'font-bold', 'mb-2');
  title.innerText = bookObject.title;

  const author = document.createElement('p');
  author.classList.add('text-stone-800');
  author.innerHTML = `Author : <span class="text-blue-500">${bookObject.author}</span>`;

  const year = document.createElement('p');
  year.classList.add('text-stone-800', 'mb-3', 'text-sm');
  year.innerText = `Year : ${bookObject.year}`;

  const container = document.createElement('div');
  container.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg');
  container.append(title, author, year);
  container.setAttribute('id', `book-${bookObject.id}`);

  if (bookObject.isComplete) {
    const unfinishedBtn = document.createElement('button');
    unfinishedBtn.classList.add('unfinishBtn', 'text-sm', 'py-2', 'px-2', 'rounded-full');

    unfinishedBtn.addEventListener('click', function () {
      changeFinishtoUnfinish(bookObject.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn', 'ml-2', 'bg-red-500', 'hover:bg-red-700', 'text-white', 'text-sm', 'py-2', 'px-2', 'rounded-full');

    deleteBtn.addEventListener('click', function () {
      removeBookFromFinish(bookObject.id);
    });

    container.append(unfinishedBtn, deleteBtn);

  } else {
    const finishedBtn = document.createElement('button');
    finishedBtn.classList.add('finishBtn', 'text-sm', 'py-2', 'px-2', 'rounded-full');

    finishedBtn.addEventListener('click', function () {
      addBooktoFinish(bookObject.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn', 'ml-2', 'bg-red-500', 'hover:bg-red-700', 'text-white', 'text-sm', 'py-2', 'px-2', 'rounded-full');

    deleteBtn.addEventListener('click', function () {
      removeBookFromFinish(bookObject.id);
    });

    container.append(finishedBtn, deleteBtn);
  }
  
  return container;

};

//memindahkan buku dari rak yang belum dibaca ke rak yang sudah dibaca
function addBooktoFinish(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
};

//menghapus buku
function removeBookFromFinish(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

//memindahkan buku dari rak yang sudah dibaca ke rak yang belum dibaca
function changeFinishtoUnfinish(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
};

//menyimpan data pada localstorage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser yang anda gunakan saat ini tidak mendukung local storage');
    return FileSystemWritableFileStream;
  }
  return true;
}

function loadDatafromStorage() {
  const serializeData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializeData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(RENDER_EVENT, function () {
  const unfinishedBookList = document.getElementById('not-finished');
  unfinishedBookList.innerHTML = '';

  const finishedBookList = document.getElementById('finished');
  finishedBookList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = addBooks(bookItem);
    if (!bookItem.isComplete) {
      unfinishedBookList.append(bookElement);
    } else {
      finishedBookList.append(bookElement);
    }
  }
});
