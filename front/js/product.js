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
    listen(products)
}

retrieveProductsData()

const listen = (data) => {
    const addCart = document.getElementById('addToCart')
    addCart.addEventListener('click', event => {

        // recherche si le panier est vide 
        if (localStorage.length == 0) {
            var count = 0
        } else {
            var count = localStorage.length 
        }
        console.log(count)
        var cart = {
            id : findProduct(),
            quantity : document.getElementById('quantity').value,
            colors : document.getElementById('colors').value,
            name : data.name,
            image : data.imageUrl,
            description : data.description,
            altTxt : data.altTxt
        }
        var same = false
        // Si le panier n'est pas vide on recherche si le produit qu'on veut ajouter est deja dedans
        if ( count > 0) {
            for ( element = 0 ; element < localStorage.length ; element++) {
                var storage = JSON.parse(localStorage.getItem(`cartStorage${element}`))
                console.log(storage)

                // Si le produit est déja dans le panier, on le remplace avec la nouvelle quantité
                if ((cart.id === storage.id)&&(storage.colors === cart.colors)) {
                    same = true
                    console.log(same)
                    console.log(cart.quantity)
                    console.log(storage.quantity)
                    var newQuantity = parseInt(cart.quantity) + parseInt(storage.quantity)
                    console.log(newQuantity)
                    cart.quantity = newQuantity
                    console.log(cart.quantity)
                    localStorage.removeItem(`cartStorage${element}`)
                    localStorage.setItem(`cartStorage${element}`, JSON.stringify(cart))
                }
            }
            // Si le produit n'est pas dans le panier alors on l'ajoute
            if (same == false) {
                console.log(same)
                localStorage.setItem(`cartStorage${count}`, JSON.stringify(cart))
            }
        } else {
            localStorage.setItem(`cartStorage${count}`, JSON.stringify(cart))
        }
        // console.log(localStorage)
    })
}