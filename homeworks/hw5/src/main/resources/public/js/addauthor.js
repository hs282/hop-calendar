function addAuthor(authorName, numOfBooks, nationality) {
    console.log("wjfw");
    //fetch(`http://localhost:7000/addauthor?name=' + authorName?numOfBooks=${numOfBooks}?nationality=${nationality}` {
      //      method: 'POST',
       // }
    //).then(res => window.location.reload(true));
}

let addButtons = document.querySelectorAll("button2")
var check_button = document.getElementById("check");

//Array.prototype.forEach.call(addButtons, function(button) {
    var authorName = document.getElementById('input_name');
    var authorNationality = document.getElementById('input_nationality');
    var authorNumOfBooks = document.getElementById('input_numOfBooks');
    check_button.addEventListener('click', addAuthor(authorName,authorNationality,authorNumOfBooks));
//});