function validateUsername() {
    const name = document.getElementById("username");
    if (name.value.length < 1) {
        alert("Username cannot be empty!");
        return false;
    } else {
        return true;
    }
}

function validateAuthorName() {
    const authorName = document.getElementById("input_name");
    console.log('authorName: ', authorName.value);
    const letters = /^[A-Za-z]+$/;
    if (authorName.value.includes(" ")) {
        let authNameArr = authorName.value.split(/\s+/);
        if (authNameArr.length == 2 && authNameArr[0].match(letters) && authNameArr[1].match(letters)) {
            return true;
        }
    }
    alert("Invalid author name! Please enter an author name that has at least two parts without any special characters/digits.");
    return false;
}
function validateAuthor() {
    if (validateAuthorName()) {
        const authorBooks = document.getElementById("input_numOfBooks");
        if (authorBooks.value >= 1 && authorBooks.value <= 200) {
            return true;
        } else {
            alert("Invalid number of books! Please enter a valid number.");
            return false;
        }
    }
    return false;
}

function validateISBN() {
    alert('hi')
    const isbn = document.getElementById("isbn");
    var ten_isbn = false;
    var thirteenth_isbn = false;
    var numbers = /^[0-9]+$/;
    if (isbn.value.length == 10 && isbn.value.match(numbers)) {
        ten_isbn = true;
    }
    if (isbn.value.length == 14 && isbn.value.indexOf('-') == 3
        && isbn.value.substring(0, 3).match(numbers) && isbn.value.substring(4,14)) {
        thirteenth_isbn = true;
    }
    if (ten_isbn || thirteenth_isbn) {
        return true;
    } else {
        alert('Invalid ISBN');
    }
    return false;
}

