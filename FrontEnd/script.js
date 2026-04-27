/* 
    1- Récupérer tous les works
    2- Stock les works
    3- filtres pour afficher les travaux par catégorie
*/

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
        let buttonHTML = '<button data-id="0">Tous</button>'
        for (category of data) {
            buttonHTML += `<button data-id="${category.id}">${category.name}</button>`
        }
        document.querySelector(".category").insertAdjacentHTML("beforeend", buttonHTML)

        document.querySelectorAll(".category button").forEach(button => {
            button.addEventListener('click', () => {
                let filterId = button.getAttribute('data-id')
                filterId = parseInt(filterId)
                console.log("Click bouton", filterId)
            })
        })
    })
    .catch(err => console.log(err))
