function addAuthor(authorName, numOfBooks, nationality) {
    fetch(`/addauthor?name=${authorName}&numOfBooks=${numOfBooks}&nationality=${nationality}`, {
           method: 'POST',
       }
    ).then(res => window.location.reload(true));
}


let check_button = document.getElementById("check");

let authorName = document.getElementById('input_name');
let authorNationality = document.getElementById('input_nationality');
let authorNumOfBooks = document.getElementById('input_numOfBooks');
check_button.addEventListener('click', () => addAuthor(authorName.value, authorNumOfBooks.value, authorNationality.value));

