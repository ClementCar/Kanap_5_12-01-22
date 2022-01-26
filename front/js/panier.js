var totalQuantity = 0
var totalPrice = 0
var useless = false

// Déclaration de variable à envoyer à l'API
var products = new Array()
var contact = new Object()
var sendOrder = {
    contact,
    products
}

// Récupere les produits de l'API pour récupérer le prix
const retrieveProductsData = () => {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(function(data) {
        main(data);
    })
    .catch(err => console.log("erreur", err))
}


// récupere la section du panier 
const $cart__items = document.getElementById('cart__items')

// Afficher le produit via l'API et les infos de local Storage
const showApiProduct = (product, price) => {
    const $productArticle = document.createElement('article')
    $productArticle.classList.add('cart__item')
    $productArticle.setAttribute('data-id', `${product.id}`)
    $productArticle.setAttribute('data-color', `${product.colors}`)

    const $itemImage = document.createElement('div')
    $itemImage.classList.add('cart__item__img')
    const $image = document.createElement('img')
    $image.setAttribute('src', `${product.image}`)
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
    $descriptionColor.textContent = `${product.colors}`
    const $descriptionPrice = document.createElement('p')
    $descriptionPrice.textContent = `${price}`
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
    $quantityInput.setAttribute('value', `${product.quantity}`)
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

// Appel l'affichage pour chaque produit du panier 
const main = async (allProducts) => {
    var articleCart = localStorage.length
    console.table(allProducts)
    if ( articleCart > 0) {
        for ( element = 0 ; element < localStorage.length ; element++) {
            var storage = JSON.parse(localStorage.getItem(`cartStorage${element}`))
            console.log(storage)
            products.push(storage.id)
            for ( let product = 0 ; product < allProducts.length ; product++) {
                if (allProducts[product]._id == storage.id) {
                    console.log(storage)
                    await showApiProduct(storage, allProducts[product].price)
                    totalPrice += allProducts[product].price * storage.quantity
                    totalQuantity += parseInt(storage.quantity)
                    document.getElementById('totalQuantity').textContent = totalQuantity
                    document.getElementById('totalPrice').textContent = totalPrice
                }
            }
        }
        console.log(products)
        listen()
        listenForm()
        // console.log("Formulaire non valide", validForm)
        productOrder()
    } else {
        // message de panier vide 
    }
}

retrieveProductsData()


// Fonction de suppression et de changement de quantité
function listen() {

    // Suppression d'élement du panier
    var deleteItem = document.querySelectorAll('.deleteItem')
    console.log(deleteItem)
    console.log('on est la')
    deleteItem.forEach(deleteItem => deleteItem.addEventListener('click', event => {
        const $deleteArticle = deleteItem.closest('article')
        const $deleteId = $deleteArticle.dataset.id
        const $deleteColor = $deleteArticle.dataset.color
        console.log($deleteId)
        console.log($deleteColor)
        const lastLength = localStorage.length
        for ( element = 0 ; element < localStorage.length ; element++) {
            var storage = JSON.parse(localStorage.getItem(`cartStorage${element}`))
            console.log(storage.id)
            console.log(storage.colors)

            // Le produit sélectionné est supprimé de local Storage
            if (( $deleteId === storage.id)&&(storage.colors === $deleteColor)) {
                localStorage.removeItem(`cartStorage${element}`)

                // On remet les numéros de local Storage dans l'ordre pour qu'il n'y ai pas de vide
                for ( newNumb = element + 1 ; newNumb < lastLength ; newNumb++) {
                    var newStorage = JSON.parse(localStorage.getItem(`cartStorage${newNumb}`))
                    localStorage.removeItem(`cartStorage${newNumb}`)
                    localStorage.setItem(`cartStorage${newNumb - 1}`, JSON.stringify(newStorage))
                }
            }
        }
        window.location.reload()
        alert('Produit supprimé du panier')
    }))

    // Changement de quantité
    var changeQuantity = document.querySelectorAll('.itemQuantity')
    changeQuantity.forEach(changeQuantity => changeQuantity.addEventListener('change', event => {
        const $changeArticle = changeQuantity.closest('article')
        const $changeId = $changeArticle.dataset.id
        const $changeColor = $changeArticle.dataset.color
        console.log($changeColor)
        console.log($changeId)
        console.log(changeQuantity.value)
        const lastLength = localStorage.length
        for ( element = 0 ; element < localStorage.length ; element++) {
            var storage = JSON.parse(localStorage.getItem(`cartStorage${element}`))
    
            // On remplace le produit avec la nouvelle quantité
            if (($changeId === storage.id)&&(storage.colors === $changeColor)) {
                storage.quantity = changeQuantity.value
                if (storage.quantity > 0) {
                    localStorage.removeItem(`cartStorage${element}`)
                    localStorage.setItem(`cartStorage${element}`, JSON.stringify(storage))
                } else {
                    localStorage.removeItem(`cartStorage${element}`)
                    for ( newNumb = element + 1 ; newNumb < lastLength ; newNumb++) {
                        var newStorage = JSON.parse(localStorage.getItem(`cartStorage${newNumb}`))
                        localStorage.removeItem(`cartStorage${newNumb}`)
                        localStorage.setItem(`cartStorage${newNumb - 1}`, JSON.stringify(newStorage))
                    }
                }
            }
        }
        window.location.reload()
        alert('Changement de quantité effectué')

    }))
}





// Récupération des données du formulaires
const inputFirstName = document.getElementById('firstName')
const firstNameError = document.getElementById('firstNameErrorMsg')
const inputLastName = document.getElementById('lastName')
const lastNameError = document.getElementById('lastNameErrorMsg')
const inputAddress = document.getElementById('address')
const addressError = document.getElementById('addressErrorMsg')
const inputCity = document.getElementById('city')
const cityError = document.getElementById('cityErrorMsg')
const inputEmail = document.getElementById('email')
const emailError = document.getElementById('emailErrorMsg')
const order = document.getElementById('order')

// Règles regex
const validName = RegExp(/^[A-zÀ-ú\-]+$/) // ne doit être composé que de lettres min ou maj et tiré
const validCity = RegExp(/^[A-zÀ-ú\- ]+$/) // lettres min MAJ, espaces, une ou plusieurs fois
const validAddress = RegExp(/^[0-9A-zÀ-ú\- ]+$/) // lettres min MAJ, chiffres, espaces, une ou plusieurs fois
const validEmail = RegExp(/^[0-9a-z\-_.]+@[0-9a-z\-_.]+.[a-z]{2,3}$/)

// Validation du prénom
const validationFirstName = (name) => {
    var valid = false
    if (name.match(validName)) {
        valid = true
        firstNameError.textContent = ''
    } else {
        firstNameError.textContent = "Votre prénom n'est pas valide"
    }
    return valid
}

// Validation du nom
const validationLastName = (name) => {
    var valid = false
    if (name.match(validName)) {
        valid = true
        lastNameError.textContent = ''
    } else {
        lastNameError.textContent = "Votre nom n'est pas valide"
    }
    return valid
}

// Validation de la ville
const validationCity = (name) => {
    var valid = false
    if (name.match(validCity)) {
        valid = true
        cityError.textContent = ''
    } else {
        cityError.textContent = "Votre ville n'est pas valide"
    }
    return valid
}

// Validation de l'adresse
const validationAddress = (name) => {
    var valid = false
    if (name.match(validAddress)) {
        valid = true
        addressError.textContent = ''
    } else {
        addressError.textContent = "Votre adresse n'est pas valide"
    }
    return valid
}

// Validation de l'email
const validationEmail = (name) => {
    var valid = false
    if (name.match(validEmail)) {
        valid = true
        emailError.textContent = ''
    } else {
        emailError.textContent = "Votre email n'est pas valide"
    }
    return valid
}

var fName = false
var lName = false
var vCity = false
var vAddress = false
var vEmail = false






// Validation du formulaire, retourne true si il est bien rempli
const listenForm = () => {
    inputFirstName.addEventListener('change', event => {
        fName = validationFirstName(inputFirstName.value)
        listenForm()
    })
    inputLastName.addEventListener('change', event => {
        lName = validationLastName(inputLastName.value)
        listenForm()
    })
    inputCity.addEventListener('change', event => {
        vCity = validationCity(inputCity.value)
        listenForm()
    })
    inputAddress.addEventListener('change', event => {
        vAddress = validationAddress(inputAddress.value)
        listenForm()
    })
    inputEmail.addEventListener('change', event => {
        vEmail = validationEmail(inputEmail.value)
        listenForm()
    })
    console.log(sendOrder)
    if ((fName == true)&&(lName == true)&&(vCity == true)&&(vAddress == true)&&(vEmail == true)) {
        contact.firstName = inputFirstName.value
        contact.lastName = inputLastName.value
        contact.address = inputAddress.value
        contact.city = inputCity.value
        contact.email = inputEmail.value
        return true
    } else {
        return false
    }
}

// Envoie du formulaire et du panier à l'API
const productOrder = () => {
    order.addEventListener('click', event => {
        var validOrder = listenForm()
        console.log(validOrder)
        console.log(sendOrder)
        if (validOrder == true) {
            alert('Formulaire valide')
            fetch("http://127.0.0.1:3000/api/products/order", {
                method: "POST",
                headers: {
            'Accept': 'application/json',
            'Content-Type': 'applicaton/json'
                },
                body: JSON.stringify(sendOrder)
            })
            .then(res => res.json())
            .then(function(data) {
                document.location.href = 'http://127.0.0.1:5500/front/html/confirmation.html'
                document.getElementById('orderId').textContent = data.orderId
            })
            .catch(err => console.log("erreur", err))
        } else {
            alert('Formulaire non valide')
        }
    })
}