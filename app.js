const dialogBox = document.querySelector("dialog");
const addBookBtn = document.querySelector("#new-book-btn");
const closeBtn = document.querySelector("#close-btn");
addBookBtn.addEventListener("click", (e) => dialogBox.showModal());
closeBtn.addEventListener("click", (e) => dialogBox.close());

const myLibrary = [];

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
    return "read";
  }
  return "not read";
}

console.log(myLibrary);
