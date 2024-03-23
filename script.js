document.addEventListener("DOMContentLoaded", function() {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');

    bookForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('bookTitle').value;
        const content = document.getElementById('bookContent').value;

        if (title.trim() === '' || content.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        addBook(title, content);

        bookForm.reset();
    });

    function addBook(title, content) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const contentElement = document.createElement('p');
        contentElement.textContent = content;

        bookDiv.appendChild(titleElement);
        bookDiv.appendChild(contentElement);

        bookList.appendChild(bookDiv);
    }
});
