var totalQuantity = 0
var totalPrice = 0

// récupere la section du panier 
const $cart__items = document.getElementById('cart__items')

// Afficher le produit via l'API et les infos de local Storage
const showApiProduct = (product, pColor, pQuantity) => {
    const $productArticle = document.createElement('article')
    $productArticle.classList.add('cart__item')
    $productArticle.setAttribute('data-id', `${product._id}`)
    $productArticle.setAttribute('data-color', pColor)

    const $itemImage = document.createElement('div')
    $itemImage.classList.add('cart__item__img')
    const $image = document.createElement('img')
    $image.setAttribute('src', `${product.imageUrl}`)
    $image.setAttribute('alt', `${product.altTxt}`)
    $itemImage.appendChild($image)

    const $itemContent = document.createElement('div')
    $itemContent.classList.add('cart__item__content')
    const $contentDescription = document.createElement('div')
    $contentDescription.classList.add('cart__item__content__description')
    $itemContent.appendChild($contentDescription)
    const $descriptionName = document.createElement('h2')
    $descriptionName.textContent = `${product.name}`
    const $descriptionColor = document.createElement('p')
    $descriptionColor.textContent = pColor
    const $descriptionPrice = document.createElement('p')
    $descriptionPrice.textContent = `${product.price}`
    $contentDescription.appendChild($descriptionName)
    $contentDescription.appendChild($descriptionColor)
    $contentDescription.appendChild($descriptionPrice)

    const $contentSetting = document.createElement('div')
    $contentSetting.classList.add('cart__item__content__settings')
    const $settingQuantity = document.createElement('div')
    $settingQuantity.classList.add('cart__item__content__settings__quantity')
    const $quantityP = document.createElement('p')
    $quantityP.textContent = ('Qté : ')
    const $quantityInput = document.createElement('input')
    $quantityInput.setAttribute('type', 'number')
    $quantityInput.classList.add('itemQuantity')
    $quantityInput.setAttribute('name', 'itemQuantity')
    $quantityInput.setAttribute('min', '1')
    $quantityInput.setAttribute('max', '100')
    $quantityInput.setAttribute('value', `${pQuantity}`)
    $settingQuantity.appendChild($quantityP)
    $settingQuantity.appendChild($quantityInput)
    const $settingDelete = document.createElement('div')
    $settingDelete.classList.add('cart__item__content__settings__delete')
    const $deleteItem = document.createElement('p')
    $deleteItem.classList.add('deleteItem')
    $deleteItem.textContent = 'Supprimer'
    $settingDelete.appendChild($deleteItem)

    $contentSetting.appendChild($settingQuantity)
    $contentSetting.appendChild($settingDelete)

    $itemContent.appendChild($contentDescription)
    $itemContent.appendChild($contentSetting)

    $productArticle.appendChild($itemImage)
    $productArticle.appendChild($itemContent)

    $cart__items.appendChild($productArticle)
}

// Recherche le produit dans l'API et appel l'affichage du panier avec 
// l'id la couleur et la quantité contenu dans local Storage
const retrieveProduct = (id, color, quantity) => {
    fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(res => res.json())
    .then((data) => {
        console.table(data)
        showApiProduct(data, color, quantity)

        // A chaque passage, le prix * la quantité et la quantité des produit s'accumulent et s'affichent 
        totalPrice += data.price * quantity
        totalQuantity += parseInt(quantity)
        document.getElementById('totalQuantity').textContent = totalQuantity
        document.getElementById('totalPrice').textContent = totalPrice
        console.log(document.querySelectorAll('.deleteItem'))
    })
    .catch(err => console.log("erreur", err))
}

// Appel l'affichage pour chaque produit du panier 
const main = () => {
    var articleCart = localStorage.length
    if ( articleCart > 0) {
        for ( element = 0 ; element < localStorage.length ; element++) {
            var storage = JSON.parse(localStorage.getItem(`cartStorage${element}`))
            console.log(storage)
            retrieveProduct(storage.id, storage.colors, storage.quantity)
        }
    } else {
        // message de panier vide 
    }
}

async function listen() {
    await main();
    var deleteItem = document.querySelectorAll('#order')
    console.log(deleteItem)
    deleteItem.addEventListener('click', () => {
    const $deleteArticle = deleteItem.closest('article')
    const $deleteId = $deleteArticle.dataset.id
    const $deleteColor = $deleteArticle.dataset.color
    console.log($deleteId)
    console.log($deleteColor)
    // for ( element = 0 ; element < localStorage.length ; element++) {
    //     var storage = JSON.parse(localStorage.getItem(`cartStorage${element}`))
    
    //     // Si le produit est déja dans le panier, on le remplace avec la nouvelle quantité
    //     if (( $deleteId === storage.id)&&(storage.colors === $deleteColor)) {
    //         localStorage.removeItem(`cartStorage${element}`)
    //     }
    // }
    })
}

listen()

// changeQuantity.addEventListener('change', event => {
//     const changeArticle = changeQuantity.closest('article')
//     const $changeId = $deleteArticle.dataset.id
//     const $changeColor = $deleteArticle.dataset.color
//     for ( element = 0 ; element < localStorage.length ; element++) {
//         var storage = JSON.parse(localStorage.getItem(`cartStorage${element}`))

//         // Si le produit est déja dans le panier, on le remplace avec la nouvelle quantité
//         if (($changeId === storage.id)&&(storage.colors === $changeColor)) {
//             var newQuantity = parseInt(cart.quantity) + parseInt(storage.quantity)
//             storage.quantity = newQuantity
//             localStorage.removeItem(`cartStorage${element}`)
//             localStorage.setItem(`cartStorage${element}`, JSON.stringify(storage))
//         }
//     }
// })





// Récupération des données du formulaires
const firstName = document.getElementById('firstName')
const firstNameError = document.getElementById('firstNameErrorMsg')
const lastName = document.getElementById('lastName')
const lastNameError = document.getElementById('lastNameErrorMsg')
const address = document.getElementById('address')
const addressError = document.getElementById('addressErrorMsg')
const city = document.getElementById('city')
const cityError = document.getElementById('cityErrorMsg')
const email = document.getElementById('email')
const emailError = document.getElementById('emailErrorMsg')

// Règles regex
const validFlc = RegExp()
const validAddress = RegExp()
const validEmail = RegExp()

