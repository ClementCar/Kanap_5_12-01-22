// Récupere les produits de l'API
const retrieveProductsData = () => {
    fetch('http://localhost:3000/api/products')
    .then(res = res.json())
    .then(data = data.products)
    console.log(data)
    .catch(err = console.log("erreur", err))
}

// Récupere le produit de la page
const findProduct = () => {
    const $url = window.location.pathname
    const $idProducts = $url.searchParams.get('id')

    return $idProducts
}

// Récupere les emplacements des différentes informations du produit
const $itemImg = document.querySelector('.item__img')
const $itemTitle = document.getElementById('title')
const $itemPrice = document.getElementById('price')
const $itemDescription = document.getElementById('description')
const $itemColors = document.getElementById('colors')

// ajout image produit
const addingImage = product => {
    const $productImage = document.createElement('img')

    $productImage.setAttribute('src', `../../back/images/${product.imageUrl}`)
    $productImage.setAttribute('alt', `${product.altTxt}`)

    return $itemImg.appendChild($productImage)
}

// ajout titre produit
const addingTitle = product => {
    $itemTitle.textContent = `${product.name}`

    return $itemTitle
}

// ajour prix produit
const addingPrice = product => {
    $itemPrice.textContent = `${product.price}`

    return $itemPrice
}

// ajout description produit
const addingDescription = product => {
    $itemDescription.textContent = `${product.description}`

    return $itemDescription
}

// ajout option couleurs produit 
const addingColors = product => {
    var $option = document.createElement('option')
    for ( let color of product.colors){
        $option = document.setAttribute('value', color)
        $option.textContent = color
        $itemColors.appendChild($option)
    }
}


// Affichage informations du produit
const main = async () => {
    const products = await retrieveProductsData()
    const $idProducts = await findProduct()
    for (let product of products ) {
        if ( product._id === $idProducts) {
            addingImage(product)
            addingTitle(product)
            addingPrice(product)
            addingDescription(product)
            addingColors(product)
        }
    }
}