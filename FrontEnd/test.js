document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault() //Evite le regarchement de page

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!email || !password) {
        alert("Veuillez remplir tous les champs")
    } else {
        fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(function (reponse) {
                return reponse.json()
            })
            .then(function (data) {
                console.log(data.token)
                localStorage.setItem('token', data.token)
                window.location.href = "index.html"
            })
    }
})