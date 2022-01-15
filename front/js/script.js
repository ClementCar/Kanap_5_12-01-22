// Récupere les produits de l'API
const retrieveProductsData = () => {
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        main(data);
    })
    .catch(err => console.log("erreur", err))
}


// Récupere la section où s'affichera les liens des canapés
const $items = document.querySelector('.items')  

// Création des images produits
const createProductImg = product => {
    const $productImg = document.createElement('img')

    $productImg.setAttribute('src', `${product.imageUrl}`)
    $productImg.setAttribute('alt', `${product.altTxt}`)
    
    return $productImg
}


// Création des Titre produits
const createProductTitle = product => {
    const $productTitle = document.createElement('h3')

    $productTitle.textContent(`${product.name}`)
    $productTitle.classList.add('ProductName')

    return $productTitle
}


// Création des descriptions produits
const createProductDescription = product => {
    const $productDescription = document.createElement('p')

    $productDescription.textContent(`${product.description}`)
    $productDescription.classList.add('productDescription')

    return $productDescription
}

// Création des liens produits complets
const createProductCard = product => {
    const $productLinks = document.createElement('a')
    $productLinks.setAttribute('href', `./product.html?id=${product._id}`)

    const $productArticle = document.createElement('article')

    $productLinks.appendChild($productArticle)
    $productArticle.appendChild(createProductImg(product))
    $productArticle.appendChild(createProductTitle(product))
    $productArticle.appendChild(createProductDescription(product))

    return $productLinks
}

// Affichage des Produits
const main = (products) => {
    // const products = await retrieveProductsData()
    for ( let product of products) {
        $items.appendChild(createProductCard(product))
    }
}

retrieveProductsData()