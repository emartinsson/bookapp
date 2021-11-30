/* 
To do list:
- Validate input data (titles must be unique)
- Add so its visible in the form if the inputdata is correct (dynamic)
- Improve style
- 
*/

//Array to store book objects.
let myLibrary = [];

//Constructor for making book objects.
function Book(title, author, pages, read){
    this.title = title,
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Functions to add and edit books in myLibrary.
function addBooktoLibrary(title, author, pages, read){
    myLibrary.push(new Book(title,author,pages,read));
}

function removeBookFromLibrary(title){
    console.log(title);
    const bookIndex = getBookIndex(title);
    console.log(bookIndex);
    if (bookIndex > -1){
        myLibrary.splice(bookIndex,1);
    }
}

function editBookFromLibrary(title){
    const bookIndex = getBookIndex(title);
    if (bookIndex > -1){
        if (myLibrary[bookIndex].read === "Read"){
            myLibrary[bookIndex].read = "Not read";
        } else {
            myLibrary[bookIndex].read = "Read";
        }
    }
}

function getBookIndex(title){
    let bookIndex;
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title.toLowerCase() === title.toLowerCase()){
            bookIndex = i;
        }
    }
    return bookIndex;
}

//Functions to add, remove and edit books to, from and in table.
function deleteBook(e){
    removeBookFromLibrary(e.target.parentNode.id);
    updateBookTable();
}

function editBook(e){
    editBookFromLibrary(e.target.parentNode.id);
    updateBookTable();
}

function newBook(){
    gettingFormData();
    resetFormData();
    updateBookTable();
}

//Retrieves data from the form
function gettingFormData(){
    const bookName = document.getElementById("bookName").value;
    if (bookName===""){
        alert("Empty title");
        return;
    }
    if (getBookIndex(bookName) > -1){
        alert("Already a title with this name");
        return;
    }

    const author = document.getElementById("author").value;
    if (author==""){
        alert("Empty author");
        return;
    }


    const pages = document.getElementById("pages").value;
    if (pages<0){
        alert("Negative pages inserted")
        return;
    }
    const readingStatus = document.getElementById("readingStatus").value;
    addBooktoLibrary(bookName, author, pages, readingStatus);
}





//Resets the form data
function resetFormData(){
    document.getElementById("bookName").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
}


//Updates the table
function updateBookTable(){
    let newBodyTable = document.createElement("tbody");
    let oldBodyTable = document.querySelector(".bookTable tbody");

    myLibrary.forEach(book => {
        let row = document.createElement("tr");

        let cellOne = document.createElement("td");
        let cellTwo = document.createElement("td");
        let cellThree = document.createElement("td");
        let cellFour = document.createElement("td");
        let edits = document.createElement("td");
        edits.id = book.title;
        
        cellOne.textContent = book.title;
        cellTwo.textContent = book.author;
        cellThree.textContent = book.pages;
        cellFour.textContent = book.read;

        let deleteimage = document.createElement("i");
        deleteimage.className = "far fa-trash-alt";
        deleteimage.addEventListener("click", deleteBook);

        let editImage = document.createElement ("i")
        editImage.className = "far fa-edit";
        editImage.addEventListener("click", editBook);

        edits.append(deleteimage);
        edits.append(editImage);

        row.append(cellOne);
        row.append(cellTwo);
        row.append(cellThree);
        row.append(cellFour);
        row.append(edits);
        
        newBodyTable.append(row);
    })

    oldBodyTable.parentNode.replaceChild(newBodyTable, oldBodyTable);
}

//Listeners
const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", () => newBook());