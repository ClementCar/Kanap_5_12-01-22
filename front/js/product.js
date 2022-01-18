// Récupere l'id produit de la page et recherche dans l'api les données du produit
const retrieveProductsData = () => {
    var string = window.location.href
    var url = new URL(string)
    const $idProducts = url.searchParams.get('id')
    fetch(`http://127.0.0.1:3000/api/products/${$idProducts}`)
    .then(res => res.json())
    .then(function(data) {
        main(data)
    })
    .catch(err => console.log("erreur", err))
}

// Récupere le produit de la page
const findProduct = () => {
    var string = window.location.href
    var url = new URL(string)
    const $idProducts = url.searchParams.get('id')

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

    $productImage.setAttribute('src', `${product.imageUrl}`)
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
    var $option = new Array()
    for (let numberColor = 0 ; numberColor < product.colors.length ; numberColor++) {
        $option[numberColor] = document.createElement('option')
        $option[numberColor].setAttribute('value', product.colors[numberColor])
        $option[numberColor].textContent = product.colors[numberColor]
        $itemColors.appendChild($option[numberColor])
    }
}


// Affichage informations du produit
const main = async (products) => {
    console.table(products)
    addingImage(products)
    addingTitle(products)
    addingPrice(products)
    addingDescription(products)
    addingColors(products)
    
}

retrieveProductsData()

// ajout d'élément dans le panier 
const addCart = document.getElementById('addToCart')
addCart.addEventListener('click', event => {
    var count = localStorage.length
    count++; 
    var cart = {
        id : findProduct(),
        quantity : document.getElementById('quantity').value,
        colors : document.getElementById('colors').value 
    }
    for ( element = 0 ; element < localStorage.length ; element++) {
        if ((cart[id] === element[id])&&(element[colors] === cart[colors])){
            element[quantity] += cart[quantity]
        } else {
            localStorage.setItem(`cartStorage${count}`, JSON.stringify(cart))
        }
    }
    console.log(localStorage)
})