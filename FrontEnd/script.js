/* 
    Pour chaque objet Figure en HTML
    Injecter dans le DOM

    Récuper les catégories de l'API
    Pour chaque catégories créer des parragraphes
    Injecter dans le DOM

    Pouvoir clique un filtre
    Récuper l'id du filtre (catérogies)
    Trouver 

*/
fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(categories => {
        console.log(categories)
        let b = '<p>Tous</p>'
        for(categorie of categories) {
            b+= `<p>${categorie.name}</p>`
        }
        document.querySelector("#categories").innerHTML = b
    })
    .catch(err => console.log(err))


fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(works => {
        console.log(works)
        let a = ''
        for(work of works) {
            console.log(work)
            a+= `<figure>
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
			    </figure>`
        }
        document.querySelector(".gallery").innerHTML = a
        console.log(a)
    })
    .catch(err => console.log(err))