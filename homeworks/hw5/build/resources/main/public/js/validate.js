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
    const authorName = document.getElementById("name");
    console.log('authorName: ', authorName.value);
    const letters = /^[A-Za-z]+$/;
    if (authorName.value.contains(" ") && authorName.value.match(letters)) {
        return true;
    } else {
        alert("Invalid author name! Please enter an author name that has more than two parts without any special characters/digits.");
        return false;
    }
}

function validateISBN() {
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
    return ten_isbn || thirteenth_isbn;
}

