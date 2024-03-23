document.addEventListener("DOMContentLoaded", function() {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');
    const undoButton = document.getElementById('undoButton');
    const redoButton = document.getElementById('redoButton');
    
    let books = [];
    let currentIndex = -1;

    bookForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('bookTitle').value;
        const content = document.getElementById('bookContent').value;

        if (title.trim() === '' || content.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        addBook(title, content);
        currentIndex++;
        books.splice(currentIndex + 1);
        books.push({title, content});

        bookForm.reset();
        updateUndoRedoButtons();
    });

   function addBook(title, content) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;

    const contentElement = document.createElement('p');
    contentElement.textContent = content;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', function() {
        // Remove the parent div of the delete button, which is the book entry
        bookDiv.remove();
        // Adjust index accordingly if needed
        currentIndex--;
        // Remove the corresponding entry from the books array
        books.splice(currentIndex + 1, 1);
        // Update undo/redo buttons
        updateUndoRedoButtons();
    });

    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(contentElement);
    bookDiv.appendChild(deleteButton);

    bookList.appendChild(bookDiv);
}


    function updateUndoRedoButtons() {
        undoButton.disabled = currentIndex === -1;
        redoButton.disabled = currentIndex === books.length - 1;
    }

    undoButton.addEventListener('click', function() {
        if (currentIndex >= 0) {
            currentIndex--;
            renderBooks();
        }
        updateUndoRedoButtons();
    });

    redoButton.addEventListener('click', function() {
        if (currentIndex < books.length - 1) {
            currentIndex++;
            renderBooks();
        }
        updateUndoRedoButtons();
    });

    function renderBooks() {
        bookList.innerHTML = '';
        for (let i = 0; i <= currentIndex; i++) {
            addBook(books[i].title, books[i].content);
        }
    }

    updateUndoRedoButtons();
});
