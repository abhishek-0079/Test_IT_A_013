const validUsername = "admin";
const validPassword = "admin";

document.getElementById('loginForm').addEventListener('submit', verify);

function verify(event) {
    event.preventDefault(); 

    const username = document.getElementById('uname').value;
    const password = document.getElementById('pass').value;

    if (username === validUsername && password === validPassword) {
        window.location.href = "dashBoard.html";
    } else {
        alert("Invalid username or password.");
    }
}

// from here dasboard section script starts

async function fetchData() {
    let response = await fetch("https://api.github.com/users?per_page=10");
    let data = await response.json();
    displayData(data);
}

function displayData(data) {
    let div1 = document.getElementById("div1");
    div1.innerHTML = ""; 
    data.forEach((element) => {
        
        let a = document.createElement("a");
        a.textContent = element.login;
        a.setAttribute("href", element.html_url);
        div1.appendChild(a);
        div1.appendChild(document.createElement("br"));
    });
}

document.getElementById("users").addEventListener("change", async function() {
    if (this.value === "alphabetical") {
        let response = await fetch("https://api.github.com/users?per_page=10");
        let data = await response.json();
        data.sort((a, b) => a.login.localeCompare(b.login));
        displayData(data);
    }
});