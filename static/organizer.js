const DEFAULTS = {
    passs: "tak5hak@2022"
}

const form = document.getElementById("login-form")
const btn = document.getElementById("btn")

form.onsubmit = (e) => {
    e.preventDefault()
    var pass = e.target[0].value
    console.log(pass)
    if (pass === "tak5hak@2022") {
        window.location.replace("/organizer-portal");
    }
    else {
        document.getElementById("passlabel").style.color = "red"
        document.getElementById("passlabel").innerText = "Enter correct password"
    }
}




