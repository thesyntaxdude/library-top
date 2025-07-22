const dialogBox = document.querySelector("dialog");
const addBookBtn = document.querySelector("#new-book-btn");
const closeBtn = document.querySelector("#close-btn");
addBookBtn.addEventListener("click", (e) => dialogBox.showModal());
closeBtn.addEventListener("click", (e) => dialogBox.close());

const myLibrary = JSON.parse(localStorage.getItem("libraryBooks")) || [];

renderBooks();

const deleteBtn = document.querySelectorAll(".delete-btn");
deleteBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const showcaseContainer = document.querySelector(".showcase-container");
    const removeBook = e.target.parentElement;
    showcaseContainer.removeChild(removeBook);
    myLibrary.forEach((book) => {
      if (book.uId === removeBook.getAttribute("data-Id")) {
        const bookIndex = myLibrary.indexOf(book);
        myLibrary.splice(bookIndex, 1);
        localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
      }
    });
    renderBooks();
  });
});

function Book(title, author, pages, status, uId) {
  if (!new.target) {
    throw Error(`You should use the "NEW" operator!`);
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.uId = uId;
}

function generateBookId() {
  const bookId = crypto.randomUUID();
  return bookId;
}

function addBookToLibrary() {
  const uId = generateBookId();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = checkStatus();

  const bookItem = new Book(title, author, pages, status, uId);

  myLibrary.push(bookItem);
  localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
  renderBooks();

  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status-off").value = "";
}

const saveBtn = document.querySelector("#submit");
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

function checkStatus() {
  // const statusOn = document.querySelector("#status-on").value;
  const statusOff = document.querySelector("#status-off").value;
  if (!statusOff) {
    document.querySelector("#status-on").value= "";
    return "read";
  }
  document.querySelector("#status-off").value = "";
  return "not read";
}

function renderBooks() {
  const showcaseContainer = document.querySelector(".showcase-container");
  showcaseContainer.textContent = "";
  myLibrary.forEach((book) => {
    const bookField = document.createElement("div");
    bookField.classList.add("book");
    bookField.setAttribute("data-id", book.uId);
    const titleField = document.createElement("h2");
    titleField.textContent = book.title;
    titleField.classList.add("book-title");
    const authorField = document.createElement("h3");
    authorField.textContent = `Author: ${book.author}`;
    authorField.classList.add("book-author");
    const pagesField = document.createElement("p");
    pagesField.textContent = `Number Of Pages: ${book.pages}`;
    pagesField.classList.add("book-pages");
    const statusField = document.createElement("p");
    statusField.textContent = `Status: ${book.status}`;
    statusField.classList.add("book-status");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = `X`;
    deleteBtn.classList.add("delete-btn");
    showcaseContainer.appendChild(bookField);
    bookField.appendChild(titleField);
    bookField.appendChild(authorField);
    bookField.appendChild(pagesField);
    bookField.appendChild(statusField);
    bookField.appendChild(deleteBtn);
  });
}
