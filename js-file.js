/* 
To do list:
- Validate input data (titles must be unique)
- Add so its visible in the form if the inputdata is correct (dynamic)
- Improve style
*/

//Constructor for making book objects.
class Book {
    constructor(title, author, pages, read){
        this.title = title,
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor(){
        this.myLibrary = [];
    }

    addBooktoLibrary(title, author, pages, read){
        this.myLibrary.push(new Book(title,author,pages,read));
    }

    removeBookFromLibrary(title){
        const bookIndex = this.getBookIndex(title);
        if (bookIndex > -1){
            this.myLibrary.splice(bookIndex,1);
        }
    }


    editBookFromLibrary(title){
        const bookIndex = this.getBookIndex(title);
        if (bookIndex > -1){
            if (this.myLibrary[bookIndex].read === "Read"){
                this.myLibrary[bookIndex].read = "Not read";
            } else {
                this.myLibrary[bookIndex].read = "Read";
            }
        }
    }

    getBookIndex(title){
        let bookIndex;
        for (let i = 0; i < this.myLibrary.length; i++){
            if (this.myLibrary[i].title.toLowerCase() === title.toLowerCase()){
                bookIndex = i;
            }
        }
        return bookIndex;
    }

    getAllBooks(){
        return this.myLibrary;
    }
}


const form = (() => {
    let gettingFormData = () => {
        const bookName = document.getElementById("bookName").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const readingStatus = document.getElementById("readingStatus").value;

        if (bookName===""){
            alert("Empty title");
            return;
        }
        if (author==""){
            alert("Empty author");
            return;
        }
        
        if (pages<0){
            alert("Negative pages inserted")
            return;
        }
        return {bookName, author, pages, readingStatus};
    }

    let resetFormData = () => {
        document.getElementById("bookName").value = ""
        document.getElementById("author").value = ""
        document.getElementById("pages").value = ""
    };

    const submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener("click", () => logic.newBook());

    return{gettingFormData, resetFormData}
})();

const table = (() => {

    const updateBookTable = (myLibrary) => {
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
        });
        oldBodyTable.parentNode.replaceChild(newBodyTable, oldBodyTable);
    }

    const deleteBook = (e) => {
        logic.removeBook(e.target.parentNode.id);
    }
    
    const editBook = (e) => {
        logic.editBook(e.target.parentNode.id);
    }

    return{updateBookTable, deleteBook, editBook};
})();


const logic = (() => {
    let myLibrary = new Library();
    let newBook = () => {
        try {
            let {bookName, author, pages, readingStatus} = form.gettingFormData();
            myLibrary.addBooktoLibrary(bookName, author, pages, readingStatus);
            updateTable();
            form.resetFormData();
        } catch (TypeError){console.log(TypeError)}

    }
    let removeBook = (bookName) => {
        myLibrary.removeBookFromLibrary(bookName);
        updateTable();
    }

    let editBook = (bookName) => {
        myLibrary.editBookFromLibrary(bookName);
        updateTable();
    }

    let updateTable = () => {
        table.updateBookTable(myLibrary.getAllBooks());
    }

    return {newBook, removeBook, editBook}
})();
