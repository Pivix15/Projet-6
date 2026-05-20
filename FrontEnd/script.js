let worksCache

fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(works => {
        worksCache = works // stocke les works dans la variable
        let display = ''
        for (let article of works) {
            display += `
                <figure>
				    <img src="${article.imageUrl}" alt="${article.title}">
				    <figcaption>${article.title}</figcaption>
			    </figure>
            `
        }
        document.querySelector(".gallery").insertAdjacentHTML("beforeend", display)
        /* console.log(display) */
    })
    .catch(err => console.log(err))

fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        let buttonHTML = '<button data-id="0" class="active">Tous</button>'
        for (let category of data) {
            buttonHTML += `<button data-id="${category.id}">${category.name}</button>`
        }
        document.querySelector(".category").insertAdjacentHTML("beforeend", buttonHTML)

        document.querySelectorAll(".category button").forEach(button => {
            button.addEventListener('click', () => {
                const activeButton = document.querySelector(".category button.active")
                const filterId = parseInt(button.getAttribute('data-id'))
                if (activeButton && parseInt(activeButton.getAttribute('data-id')) === filterId) return

                document.querySelectorAll(".category button").forEach(b => b.classList.remove('active'))
                button.classList.add('active')

                filterWorkCategory(filterId)
                console.log("Click bouton", filterId)
            })
        })
    })
    .catch(err => console.log(err))

function filterWorkCategory (filterId) {
    console.log("Filtre les categories", filterId)
    let display = ''
    for (let article of worksCache) {
        /* console.log(article) */
        if (filterId === article.categoryId || filterId === 0) {
            display += `
            <figure>
                <img src="${article.imageUrl}" alt="${article.title}">
                <figcaption>${article.title}</figcaption>
            </figure>`
        }
    }
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = '' // Vide puis réinjecte unic les works filtrés.
    document.querySelector(".gallery").insertAdjacentHTML('beforeend', display)
}

// Zone Login
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token')
    const loginBtn = document.getElementById("login")
    const logoutBtn = document.getElementById("logout")
    const modifier = document.querySelector(".modifier-btn")
    const category = document.querySelector(".category")

    function loggedIn () {
        loginBtn.classList.add("hidden")
        logoutBtn.classList.remove("hidden")
        category.classList.add("hidden")
    }
    function loggedOut () {
        loginBtn.classList.remove("hidden")
        logoutBtn.classList.add("hidden")
        modifier.classList.add("hidden")
        category.classList.remove("hidden")
    }

    if (token) {
        loggedIn()
    } else {
        loggedOut()
    }

    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('token')
        loggedOut()
    })
})

// Zone Modale
function openModal() {
    let display = ''
    for (let article of worksCache) {
        display += `
            <figure>
                <img src="${article.imageUrl}" alt="${article.title}">
                <button class="delete-btn" data-id="${article.id}"><i class="fa-solid fa-trash-can"></i></button>
            </figure>
        `
    }
    /* console.log(display) */
    const container = document.querySelector("#edit-gallery")
    container.innerHTML = ''
    container.insertAdjacentHTML('beforeend', display)
    document.querySelector(".editer").style.display = 'flex'
}
document.querySelector(".modifier-btn").addEventListener('click', openModal)

document.querySelector(".modifier-btn-close").addEventListener('click', () => {
    document.querySelector(".editer").style.display = 'none'
})