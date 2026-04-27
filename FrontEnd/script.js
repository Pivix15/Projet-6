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
                document.querySelectorAll(".category button").forEach(b => b.classList.remove('active'))
                button.classList.add('active')

                let filterId = button.getAttribute('data-id')
                filterId = parseInt(filterId)

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
        /* console.log(work) */
        if (filterId === article.categoryId || filterId === 0) {
            display += `
            <figure>
                <img src="${article.imageUrl}" alt="${article.title}">
                <figcaption>${article.title}</figcaption>
            </figure>`
        }
    }
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ''; // Vide puis réinjecte unic les works filtrés.
    document.querySelector(".gallery").insertAdjacentHTML('beforeend', display)
}
