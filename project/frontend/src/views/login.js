export function login(username, password, role) {
    fetch(`http://localhost:8080/login?username=${username}&password=${password}&role=${role}`, {
        method: 'GET'
        }   
    ).then(res => window.location.reload());
}

let btn = document.getElementById("login");
let user = document.getElementById("input_email");
let pw = document.getElementById("input_pw");
let role = "student";
if (document.getElementById("instructor").checked) {
    role = "instructor";
}
btn.addEventListener('click', () => login(user.value, pw.value, role));