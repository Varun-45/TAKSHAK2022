
const form = document.getElementById("login-form")
const btn = document.getElementById("btn")
form.onsubmit = (e) => {
    e.preventDefault()
    var name = e.target[0].value
    var mail = e.target[1].value
    var query = e.target[2].value

    var end = mail.slice(-9)

    console.log(end)
    if (end === "@iiits.in") {

        window.location.replace(`/query?name=${name}&email=${mail}&query=${query}&accepting=true`)
        // window.location.reload(1)

        // document.getElementById("nil").style.display = "none"
        // document.getElementById("note").innerText = "Query Noted!"
        // document.getElementById("note").style.display = "block";

        // setTimeout(function () {
        //     window.location.reload(1);
        // }, 5000);
    }
    else {
        document.getElementById("maill").style.color = "red"
        document.getElementById("maill").innerText = "Enter  Valid Mail"
    }
}
